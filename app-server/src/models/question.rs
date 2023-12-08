use bson::{serde_helpers::serialize_object_id_as_hex_string, oid::ObjectId};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Question {
    #[serde(serialize_with = "serialize_object_id_as_hex_string")]
    pub _id: ObjectId,
    // #[serde(rename = "questionType")]
    pub question_type: String,
    pub difficulty: String,
    pub categories: String,
    // #[serde(rename = "questionText")]
    pub question_text: String,
    pub answer: String,
    pub choices: Vec<String>,
    // #[serde(rename = "correctChoice")]
    pub correct_choice: String,
    // #[serde(rename = "selectedOptions")]
    pub selected_options: Vec<String>,
    // #[serde(rename = "orderItems")]
    pub order_items: Vec<String>,
    pub fills: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct QuestionData {
    // #[serde(rename = "questionType")]
    pub question_type: String,
    pub difficulty: String,
    pub categories: String,
    // #[serde(rename = "questionText")]
    pub question_text: String,
    pub answer: String,
    pub choices: Vec<String>,
    // #[serde(rename = "correctChoice")]
    pub correct_choice: String,
    // #[serde(rename = "selectedOptions")]
    pub selected_options: Vec<String>,
    // #[serde(rename = "orderItems")]
    pub order_items: Vec<String>,
    pub fills: Vec<String>,
}