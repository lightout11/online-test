"use client";

import { updateTest } from "@/actions/tests";
import { Button, Chip, Input, Spacer, Switch } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  messages: {},
};

export default function TestForm({ test }) {
  const [name, setName] = useState(test?.name);
  const [startDateTime, setStartDateTime] = useState(
    new Date(test.startDateTime).toISOString().slice(0, 16)
  );
  const [duration, setDuration] = useState(test.duration);
  const [endDateTime, setEndDateTime] = useState(
    new Date(test.endDateTime).toISOString().slice(0, 16)
  );
  const [isOpened, setIsOpened] = useState(
    test.state == "opened" ? true : false
  );

  const [formState, formAction] = useFormState(updateTest, initialState);

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
      <input type="hidden" name="id" value={test.id} />
      <Switch
        name="isOpened"
        value={isOpened}
        isSelected={isOpened}
        onValueChange={setIsOpened}
      >
        Mở kỳ thi
      </Switch>
      <Input
        isRequired
        name="name"
        defaultValue={test.name}
        label="Tên kỳ thi"
      />
      <Spacer />
      <Input
        isRequired
        name="startDateTime"
        type="datetime-local"
        label="Thời điểm bắt đầu"
        defaultValue={test.startDateTime.toISOString().slice(0, 16)}
      />
      <Spacer />
      <Input
        isRequired
        value={duration}
        onValueChange={setDuration}
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
        defaultValue={test.endDateTime.toISOString().slice(0, 16)}
      />
      <Spacer />
      <Button type="submit">Lưu thay đổi</Button>
      {renderError()}
    </form>
  );
}
