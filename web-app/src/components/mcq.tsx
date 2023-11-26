"use client";

import {
  Button,
  Field,
  Input,
  SpinButton,
  Textarea,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";

export default function Mcq() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fields = e.currentTarget;
    const nbody = {
      question: fields.question.value,
      answer: [
        fields.answer1.value,
        fields.answer2.value,
        fields.answer3.value,
        fields.answer4.value,
      ],
      correct_answer: fields.correct_answer.value,
    };
    await fetch("/api/questions/new_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nbody),
    });
    router.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Câu hỏi" required={true}>
        <Textarea name="question" />
      </Field>
      <Field label="Lựa chọn 1" required={true}>
        <Input name="answer1" />
      </Field>
      <Field label="Lựa chọn 2" required={true}>
        <Input name="answer2" />
      </Field>
      <Field label="Lựa chọn 3">
        <Input name="answer3" />
      </Field>
      <Field label="Lựa chọn 4">
        <Input name="answer4" />
      </Field>
      <Field label="Lựa chọn đúng" required={true}>
        <SpinButton name="correct_answer" defaultValue={1} min={1} max={4} />
      </Field>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
}
