"use client";

import { createNewTest } from "@/lib/tests";
import { Button, Chip, Input, Spacer } from "@nextui-org/react";
import { useFormState } from "react-dom";

const initialState = {
  messages: {},
};

export default function TestForm() {
  const [formState, formAction] = useFormState(
    createNewTest,
    initialState
  ) as any;

  function renderError() {
    if (Object.keys(formState.messages).length !== 0) {
      for (let field in formState.messages) {
        return (
          <>
            <Spacer />
            <Chip color="danger">{formState.messages[field]}</Chip>
          </>
        );
      }
    }
    return null;
  }

  return (
    <form action={formAction}>
      <Input isRequired name="name" label="Tên kỳ thi" />
      <Spacer />
      <Input
        isRequired
        name="startDateTime"
        type="datetime-local"
        label="Thời điểm bắt đầu"
        defaultValue={new Date().toISOString().slice(0, 16)}
      />
      <Spacer />
      <Input
        isRequired
        name="duration"
        type="number"
        endContent="phút"
        min={1}
        defaultValue="1"
        label="Thời gian làm bài"
      />
      <Spacer />
      <Input
        isRequired
        type="datetime-local"
        name="endDateTime"
        label="Thời điểm kết thúc"
        defaultValue={new Date().toISOString().slice(0, 16)}
      />
      <Spacer />
      <Button type="submit">Tạo kỳ thi</Button>
      {renderError()}
    </form>
  );
}
