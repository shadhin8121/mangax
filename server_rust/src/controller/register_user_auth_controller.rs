use axum::{http::StatusCode, response::IntoResponse, Extension, Json};
use bcrypt::{hash, DEFAULT_COST};
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPool, prelude::FromRow};
use uuid::Uuid;
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]
pub struct UserRegisterData {
    #[validate(email)]
    email: String,
    #[validate(length(min = 4))]
    password: String,
    #[validate(length(min = 3, max = 20))]
    username: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    message: String,
}

#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct UserInsertData {
    id: Uuid,
    username: String,
    email: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct UserExistData {
    email: String,
}

pub async fn register_user(
    Extension(pool): Extension<PgPool>, // Use PgPool
    Json(body): Json<UserRegisterData>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    // Validate the input data
    if let Err(errors) = body.validate() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(Message {
                message: format!("Validation failed: {:?}", errors),
            }),
        ));
    }

    // Find the user and check if the user already exists
    let user_exist_result =
        sqlx::query_as::<_, UserExistData>("SELECT email FROM users WHERE email = $1")
            .bind(&body.email)
            .fetch_optional(&pool)
            .await;

    // Return if the user already exists
    if let Ok(Some(user_exist_data)) = user_exist_result {
        return Ok((
            StatusCode::CONFLICT,
            Json(Message {
                message: format!(
                    "User with this Email '{}' Already Exists",
                    user_exist_data.email
                ),
            }),
        ));
    }

    //hashing the password
    let hashing_password = match hash(&body.password, DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(Message {
                    message: "Failed to hash password".to_string(),
                }),
            ));
        }
    };

    // Generating UUID for the new user
    let user_id = Uuid::new_v4();

    // Insert the new user into the database
    let new_user = sqlx::query_as::<_, UserInsertData>(
        "INSERT INTO users (id, username, email, password) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email",
    )
    .bind(&user_id) // Bind the generated UUID
    .bind(&body.username)
    .bind(&body.email)
    .bind(&hashing_password)
    .fetch_one(&pool)
    .await;

    // Handle database insertion failure
    match new_user {
        Ok(_) => Ok((
            StatusCode::CREATED, // Use CREATED (201) for successful creation
            Json(Message {
                message: "user created successfully. now you can login.".to_string(),
            }), // Return the created user data
        )),
        Err(_) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Message {
                message: format!("Failed to create user."),
            }),
        )),
    }
}
