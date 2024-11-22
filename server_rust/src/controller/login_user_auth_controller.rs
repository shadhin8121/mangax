use axum::http::header::SET_COOKIE;
use axum::http::StatusCode;
use axum::response::{AppendHeaders, IntoResponse};
use axum::{Extension, Json};
use bcrypt::verify;
use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};
use std::env;
use uuid::Uuid;
use validator::Validate;

#[derive(Serialize, Deserialize, Debug, Validate)]
pub struct UserLoginData {
    #[validate(email)]
    email: String,
    #[validate(length(min = 4))]
    password: String,
}

//message
#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    message: String,
}

//claims for jwt
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    id: Uuid,
    email: String,
    username: String,
    exp: usize,
}

//queried data from
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct QueryData {
    id: Uuid,
    username: String,
    email: String,
    password: String,
}

pub async fn login_user(
    Extension(pool): Extension<PgPool>,
    Json(body): Json<UserLoginData>,
) -> Result<impl IntoResponse, impl IntoResponse> {
    //dot env enabled

    //if validation failed then return
    if let Err(error) = body.validate() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(Message {
                message: format!("{}", error),
            }),
        ));
    }

    //if validation was success then codes start from here
    let user_mail = &body.email;
    let user_password = &body.password;

    //search for user
    let user_result = sqlx::query_as::<_, QueryData>("select * from users where email = $1")
        .bind(&user_mail)
        .fetch_one(&pool)
        .await;

    match user_result {
        Ok(user_data) => match verify(&user_password, &user_data.password) {
            Ok(true) => {
                //time now
                let now = Utc::now();
                let expire = now + Duration::days(15);
                //my claims
                let claims = Claims {
                    id: user_data.id,
                    email: user_data.email,
                    username: user_data.username,
                    exp: expire.timestamp() as usize,
                };

                //env
                let secret =
                    env::var("JWT_SECRET").expect("you need to declare env JWT_SECRET first");

                //creating jwt
                let token = encode(
                    &Header::default(),
                    &claims,
                    &EncodingKey::from_secret(secret.as_ref()),
                )
                .map_err(|_| {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(Message {
                            message: "Token generation failed".to_string(),
                        }),
                    )
                })?;

                //cookie
                let cookie = format!(
                    "token={}; HttpOnly; Path=/; Max-Age=1296000; SameSite=Lax",
                    token
                );
                let response = (
                    StatusCode::OK,
                    AppendHeaders([(SET_COOKIE, cookie)]),
                    Json(Message {
                        message: "Logged in successfully".to_string(),
                    }),
                );

                return Ok(response);
            }
            Ok(false) => {
                return Err((
                    StatusCode::UNAUTHORIZED,
                    Json(Message {
                        message: "wrong email or password".to_string(),
                    }),
                ));
            }
            Err(_) => {
                return Err((
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(Message {
                        message: "something went down".to_string(),
                    }),
                ))
            }
        },
        Err(error) => match error {
            sqlx::Error::RowNotFound => Err((
                StatusCode::NOT_FOUND,
                Json(Message {
                    message: "User not found".to_string(),
                }),
            )),
            _ => {
                // Log the actual error here
                Err((
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(Message {
                        message: "Internal Server Error".to_string(),
                    }),
                ))
            }
        },
    }
}
