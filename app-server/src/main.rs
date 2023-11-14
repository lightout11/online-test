use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;
use mongodb::Client;
use services::questions::{create_question, delete_question, get_questions};
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
        App::new().app_data(web::Data::new(db.clone())).service(
            web::scope("/questions")
                .service(create_question)
                .service(get_questions)
                .service(delete_question),
        )
    })
    .bind((host, port))?
    .run()
    .await
}
