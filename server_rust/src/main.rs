// imports
use axum::http::{header, HeaderValue, Method};
use axum::Extension;
use axum::{routing::post, Router};
use tower_http::cors::CorsLayer;

//importing from my project
use crate::route::user_auth_route::user_auth_route_fn;

//mods
mod controller;
mod db;
mod middlewares;
mod route;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create HeaderValue for localhost:3000
    let origins = [
        HeaderValue::from_str("http://localhost:3000").expect("invalid header value"),
        HeaderValue::from_str("http://localhost:3033").expect("invalid header value"),
    ];

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers([
            header::AUTHORIZATION,
            header::CONTENT_TYPE,
            header::ACCESS_CONTROL_ALLOW_ORIGIN,
            header::ACCESS_CONTROL_ALLOW_CREDENTIALS,
        ])
        .allow_credentials(true);

    //database pool
    let pool = db::connection::create_pool().await;

    //main route entry point with CORS
    let app = Router::new()
        .merge(user_auth_route_fn())
        .layer(Extension(pool))
        .layer(cors);

    //port listener
    let listener = tokio::net::TcpListener::bind("0.0.0.0:4043").await.unwrap();

    //running the server
    axum::serve(listener, app).await.unwrap();

    Ok(())
}
