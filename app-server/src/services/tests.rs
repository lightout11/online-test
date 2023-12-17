use actix_web::{get, post, put, web, HttpResponse};
use bson::{doc, Document};
use futures::TryStreamExt;
use mongodb::Database;

use crate::models::test::Test;

#[post("/new_test")]
pub async fn create_test(db: web::Data<Database>, data: web::Json<Document>) -> HttpResponse {
    let test = data.into_inner();
    let result = db
        .collection::<Document>("test")
        .insert_one(test, None)
        .await;
    match result {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(_) => HttpResponse::BadRequest().json(""),
    }
}

#[get("/")]
pub async fn get_tests(db: web::Data<Database>) -> HttpResponse {
    let result = db
        .collection::<Test>("tests")
        .find(None, None)
        .await
        .unwrap();
    let tests: Vec<Test> = result.try_collect().await.unwrap();
    HttpResponse::Ok().json(tests)
}

#[get("/{test_id}")]
pub async fn get_test(path: web::Path<String>, db: web::Data<Database>) -> HttpResponse {
    let test_id = path.into_inner();
    let result = db
        .collection::<Test>("tests")
        .find_one(doc! { "_id": test_id }, None)
        .await;
    let test = match result {
        Ok(res) => res,
        Err(_) => {
            return HttpResponse::BadRequest().json("");
        }
    };
    match test {
        Some(res) => HttpResponse::Ok().json(res),
        None => HttpResponse::NotFound().json(""),
    }
}

#[put("/{test_id}")]
pub async fn update_test(
    path: web::Path<String>,
    db: web::Data<Database>,
    data: web::Json<Document>,
) -> HttpResponse {
    let test_id = path.into_inner();
    let filter_doc = doc! { "_id": test_id };
    let modify_doc = data.into_inner();
    let result = db
        .collection::<Document>("tests")
        .update_one(filter_doc, modify_doc, None)
        .await;
    match result {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(_) => HttpResponse::BadRequest().json(""),
    }
}

// #[delete("/")]
// pub async fn delete_test()