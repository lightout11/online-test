use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Mcq {
    question: String,
    num_choices: i32,
    choices: Vec<String>,
}
