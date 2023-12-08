use actix_web::{delete, get, post, put, web, HttpResponse};
use bson::{doc, oid::ObjectId, Document};
use futures::TryStreamExt;
use mongodb::Database;

use crate::models::question::Question;

#[post("/new_question")]
async fn create_question(db: web::Data<Database>, data: web::Json<Document>) -> HttpResponse {
    let question = data.into_inner();
    let result = db.collection("questions").insert_one(question, None).await;
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
    let object_id = ObjectId::parse_str(id).unwrap();
    let query = db
        .collection::<Question>("questions")
        .find_one(
            doc! {
                "_id": object_id
            },
            None,
        )
        .await
        .unwrap()
        .unwrap();
    HttpResponse::Ok().json(query)
}

#[put("/{id}")]
async fn update_question(
    path: web::Path<String>,
    db: web::Data<Database>,
    data: web::Json<Document>,
) -> HttpResponse {
    let id = path.into_inner();
    let object_id = ObjectId::parse_str(id).unwrap();
    let updating = data.into_inner();
    let query = db
        .collection::<Question>("questions")
        .update_one(
            doc! {
                "_id": object_id
            },
            doc! {
                "$set": updating
            },
            None,
        )
        .await
        .unwrap();
    HttpResponse::Ok().json(query)
}

#[delete("/{question_id}")]
async fn delete_question(path: web::Path<String>, db: web::Data<Database>) -> HttpResponse {
    let question_id = path.into_inner();
    let object_id = ObjectId::parse_str(&question_id).unwrap();
    let query = db
        .collection::<Question>("questions")
        .delete_one(
            doc! {
                "_id": object_id
            },
            None,
        )
        .await
        .unwrap();
    HttpResponse::Ok().json(query)
}
