use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;
use mongodb::Client;
use services::{
    questions::{create_question, delete_question, get_question, get_questions, update_question},
    users::{create_user, get_user},
};
use std::env;

mod models;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let uri = match env::var("MONGODB_URI") {
        Ok(v) => v.to_string(),
        Err(_) => format!("Error loading env variable"),
    };
    let client = Client::with_uri_str(uri)
        .await
        .expect("error connecting to database");
    let db = client.database("online_test");
    let host = match env::var("HOSTNAME") {
        Ok(v) => v.to_string(),
        Err(_) => format!("Error loading env variable"),
    };
    let port = match env::var("PORT") {
        Ok(p) => p.parse::<u16>().unwrap(),
        Err(_) => panic!(),
    };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db.clone()))
            .service(
                web::scope("/questions")
                    .service(create_question)
                    .service(get_questions)
                    .service(get_question)
                    .service(update_question)
                    .service(delete_question),
            )
            .service(web::scope("/users").service(create_user).service(get_user))
    })
    .bind((host, port))?
    .run()
    .await
}
