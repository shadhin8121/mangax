use crate::controller::register_user_auth_controller::register_user;
use axum::{routing::post, Router};

pub fn user_auth_route_fn() -> Router {
    Router::new().route("/register", post(register_user))
}
