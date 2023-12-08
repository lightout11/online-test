use bson::{
    oid::ObjectId,
    DateTime,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub _id: Option<ObjectId>,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    pub date_of_birth: DateTime,
}

#[derive(Deserialize)]
pub struct NewUser {
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    pub date_of_birth: String,
}

#[derive(Serialize)]
pub struct UserJson {
    pub _id: String,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    pub date_of_birth: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserCredentials {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct UserProfile {
    pub _id: String,
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    pub date_of_birth: String,
}