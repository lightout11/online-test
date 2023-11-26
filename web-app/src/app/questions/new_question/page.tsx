"use client";

import Header from "@/components/header";
import QuestionForm from "@/components/question-form";
import { Divider, Field, Label, Select } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useState } from "react";

export default function Home() {
  const [questionType, setQuestionType] = useState("Short Answer");

  const handleOnOptionSelect = (e: any, data: any) => {
    setQuestionType(data.value);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="flex min-h-screen min-w-full flex-col items-center p-2 ">
        <Header />
        <Divider />
        <div className=" min-w-full flex flex-col items-center justify-center">
          <Field label="Chọn loại câu hỏi">
            <Select onChange={handleOnOptionSelect}>
              <option>Trả lời ngắn</option>
              <option>Nhiều lựa chọn</option>
              <option>Nhiều lựa chọn đúng</option>
              <option>Sắp xếp</option>
            </Select>
          </Field>
          <QuestionForm type={questionType} />
        </div>
        <Divider />
        <footer className="flex p-4">
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  );
}
