use actix_web::{post, web, HttpResponse};
use bson::{doc, DateTime};
use mongodb::Database;

use crate::models::user::{NewUser, User, UserCredentials, UserProfile};

#[post("/new_user")]
async fn create_user(db: web::Data<Database>, data: web::Json<NewUser>) -> HttpResponse {
    let find_user = db
        .collection::<User>("users")
        .find_one(
            doc! {
                "username": data.username.to_owned()
            },
            None,
        )
        .await;
    let found_user = match find_user {
        Ok(res) => res,
        Err(_) => return HttpResponse::BadRequest().finish(),
    };
    match found_user {
        Some(_) => {
            return HttpResponse::Accepted().json(doc! {
                "status": "error",
                "message": "username is already taken"
            })
        }
        None => {}
    }
    let user = User {
        _id: None,
        username: data.username.to_owned(),
        password: data.password.to_owned(),
        email: data.email.to_owned(),
        first_name: data.first_name.to_owned(),
        last_name: data.last_name.to_owned(),
        gender: data.gender.to_owned(),
        date_of_birth: DateTime::parse_rfc3339_str(data.date_of_birth.to_owned()).unwrap(),
    };
    let query_res = db.collection::<User>("users").insert_one(user, None).await;
    match query_res {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().json(doc! {
            "status": "error",
            "message": "Something goes wrong with the database"
        }),
    }
}

#[post("/user")]
async fn get_user(db: web::Data<Database>, data: web::Json<UserCredentials>) -> HttpResponse {
    let credentials = data.into_inner();
    let find_user = db
        .collection::<User>("users")
        .find_one(
            doc! {
                "username": credentials.username.to_owned(),
                "password": credentials.password.to_owned()
            },
            None,
        )
        .await
        .unwrap();
    match find_user {
        Some(res) => {
            let user_profile = UserProfile {
                _id: res._id.to_owned().unwrap().to_hex(),
                username: res.username.to_owned(),
                email: res.email.to_owned(),
                first_name: res.first_name.to_owned(),
                last_name: res.last_name.to_owned(),
                gender: res.gender.to_owned(),
                date_of_birth: res.date_of_birth.to_owned().try_to_rfc3339_string().unwrap()
            };
            HttpResponse::Ok().json(user_profile)
        },
        None => HttpResponse::Unauthorized().finish(),
    }
}
