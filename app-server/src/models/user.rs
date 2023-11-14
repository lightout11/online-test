use bson::{DateTime, serde_helpers::serialize_bson_datetime_as_rfc3339_string};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    #[serde(serialize_with = "serialize_bson_datetime_as_rfc3339_string")]
    pub date_of_birth: DateTime,
}