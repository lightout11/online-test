use actix_web::{delete, get, post, web, HttpResponse};
use bson::{doc, Document};
use futures::TryStreamExt;
use mongodb::Database;

use crate::models::question::Question;

#[post("/new_question")]
async fn create_question(db: web::Data<Database>, data: web::Json<Document>) -> HttpResponse {
    let question = data.into_inner();
    let result = db
        .collection::<Document>("questions")
        .insert_one(question, None)
        .await;
    match result {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(_) => HttpResponse::Forbidden().json(""),
    }
}

#[get("/")]
async fn get_questions(db: web::Data<Database>) -> HttpResponse {
    let query = db
        .collection::<Question>("questions")
        .find(None, None)
        .await
        .unwrap();
    let questions: Vec<Question> = query.try_collect().await.unwrap();
    HttpResponse::Ok().json(questions)
}

#[get("/{id}")]
async fn get_question(path: web::Path<String>, db: web::Data<Database>) -> HttpResponse {
    let id = path.into_inner();
    let query = db
        .collection::<Question>("questions")
        .find_one(
            doc! {
                "_id": id
            },
            None,
        )
        .await
        .unwrap()
        .unwrap();
    HttpResponse::Ok().json(query)
}

#[delete("/{question_id}")]
async fn delete_question(path: web::Path<String>, db: web::Data<Database>) -> HttpResponse {
    let question_id = path.into_inner();
    let query = db
        .collection::<Question>("questions")
        .delete_one(
            doc! {
                "question_id": question_id
            },
            None,
        )
        .await
        .unwrap();
    HttpResponse::Ok().json(query)
}
