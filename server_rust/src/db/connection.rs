use dotenvy::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

pub async fn create_pool() -> PgPool {
    dotenv().ok(); // Load environment variables

    //databse url
    let database_url =
        env::var("DATABASE_URL").unwrap_or_else(|_| panic!("DATABASE_URL must be set"));

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .unwrap_or_else(|err| panic!("Failed to connect to database: {}", err))
}
