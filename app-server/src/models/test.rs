use bson::{
    serde_helpers::{
        deserialize_hex_string_from_object_id, serialize_bson_datetime_as_rfc3339_string,
    },
    DateTime,
};
use serde::{Deserialize, Serialize};

use super::question::Question;

#[derive(Serialize, Deserialize)]
pub struct Test {
    #[serde(deserialize_with = "deserialize_hex_string_from_object_id")]
    pub _id: String,
    pub name: String,
    #[serde(serialize_with = "serialize_bson_datetime_as_rfc3339_string")]
    pub start_time: DateTime,
    pub duration: i16,
    pub question: Vec<Question>,
}
