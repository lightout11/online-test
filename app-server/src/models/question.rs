use bson::serde_helpers::deserialize_hex_string_from_object_id;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Question {
    #[serde(deserialize_with = "deserialize_hex_string_from_object_id")]
    pub _id: String,
    pub question: String,
    pub correct_answer: String,
}
