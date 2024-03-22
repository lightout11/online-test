"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

export default function NewMultiChoiceForm() {
  const [choices, setChoices] = useState<string[]>([]);
  const [correctChoice, setCorrectChoices] = useState<any>();

  function removeChoice(index: any) {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  }

  const changeChoice = (index: any, val: string) => {
    const newChoices = [...choices];
    newChoices[index] = val;
    setChoices(newChoices);
  };

  return (
    <form>
      <Textarea label="Câu hỏi" placeholder="Nhập nội dung câu hỏi" />
      <Spacer />
      {choices.map((choice, index) => (
        <div key={index}>
          <Input
            name="choices"
            value={choice}
            label={"Lựa chọn " + (index + 1)}
            isRequired={true}
            onValueChange={(val) => changeChoice(index, val)}
          />
          <Spacer />
          <Button onPress={() => removeChoice(index)}>Xóa lựa chọn</Button>
          <Spacer />
        </div>
      ))}
      <Button onPress={() => setChoices([...choices, ""])}>
        Thêm lựa chọn
      </Button>
      <Spacer />
      <Autocomplete
        label="Đáp án đúng"
        defaultItems={choices}
        selectedKey={correctChoice}
        onSelectionChange={setCorrectChoices}
      >
        {choices.map((choice) => (
          <AutocompleteItem key={choice} value={choice}>
            {choice}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </form>
  );
}
