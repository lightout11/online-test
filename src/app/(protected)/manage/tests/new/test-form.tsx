"use client";

import { createNewTest } from "@/actions/tests";
import { Button, Chip, Input, Spacer, Switch } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  messages: {},
};

export default function TestForm() {
  const [formState, formAction] = useFormState(
    createNewTest,
    initialState
  ) as any;
  const [isOpened, setIsOpened] = useState<any>(false);

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
      <Switch
        name="isOpened"
        value={isOpened}
        isSelected={isOpened}
        onValueChange={setIsOpened}
      >
        Mở kỳ thi
      </Switch>
      <Spacer />
      <Input isRequired name="name" label="Tên kỳ thi" />
      <Spacer />
      <Input isRequired name="startDate" type="date" label="Ngày bắt đầu" />
      <Spacer />
      <Input isRequired name="startTime" type="time" label="Giờ bắt đầu" />
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
      <Input isRequired name="endDate" type="date" label="Ngày kết thúc" />
      <Spacer />
      <Input isRequired name="endTime" type="time" label="Giờ kết thúc" />
      <Spacer />
      <Button type="submit">Tạo kỳ thi</Button>
      {renderError()}
    </form>
  );
}
