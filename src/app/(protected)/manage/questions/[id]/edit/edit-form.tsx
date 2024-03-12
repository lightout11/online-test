"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  Spacer,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ShortAnswer from "./short-answer";

const types = [
  { label: "Trả lời ngắn", value: "shortAnswer" },
  { label: "Chọn đáp án đúng", value: "multiChoice" },
  { label: "Chọn nhiều đáp án đúng", value: "multiSelect" },
  { label: "Sắp xếp", value: "ordering" },
  { label: "Điền vào chỗ trống", value: "filling" },
];

export default function EditForm({ question }: { question: any }) {
  const [questionType, setQuestionType] = useState<any>(question.type);

  function renderQuestionByType(type: string) {
    switch (type) {
      case "shortAnswer":
        return <ShortAnswer question={question} />;
    }
  }

  return (
    <Card>
      <CardBody>
        <Autocomplete
          label="Loại câu hỏi"
          defaultItems={types}
          selectedKey={questionType}
          onSelectionChange={setQuestionType}
        >
          {types.map((type) => (
            <AutocompleteItem key={type.value} value={type.value}>
              {type.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Spacer />
        {renderQuestionByType(questionType)}
      </CardBody>
    </Card>
  );
}
