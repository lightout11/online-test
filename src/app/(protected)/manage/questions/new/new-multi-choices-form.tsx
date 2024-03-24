"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Spacer,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

export default function NewMultiChoiceForm() {
  const [choices, setChoices] = useState<string[]>([]);
  const [correctChoice, setCorrectChoices] = useState<any>();
  const [isPublic, setIsPublic] = useState<any>(false);

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
      <Switch
        name="isPublic"
        isSelected={isPublic}
        value={isPublic}
        onValueChange={setIsPublic}
      >
        Câu hỏi công khai
      </Switch>
      <Spacer />
      <Input
        isRequired
        name="categories"
        label="Danh mục"
        placeholder="Nhập danh mục"
      />
      <Spacer />
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
        name="correctChoice"
        value={correctChoice}
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
