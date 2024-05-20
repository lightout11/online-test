"use client";

import { createMultiChoiceQuestion } from "@/actions/questions";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

export default function NewMultiChoiceForm() {
  const [choices, setChoices] = useState([]);
  const [correctChoice, setCorrectChoice] = useState();
  const [isPublic, setIsPublic] = useState(false);

  function removeChoice(index) {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  }

  const changeChoice = (index, val) => {
    const newChoices = [...choices];
    newChoices[index] = val;
    setChoices(newChoices);
  };

  return (
    <form action={createMultiChoiceQuestion}>
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
      <RadioGroup
        isRequired
        name="difficulty"
        label="Độ khó"
        orientation="horizontal"
        defaultValue="easy"
      >
        <Radio value="easy">Dễ</Radio>
        <Radio value="medium">Trung Bình</Radio>
        <Radio value="hard">Khó</Radio>
      </RadioGroup>
      <Spacer />
      <Textarea
        name="content"
        label="Câu hỏi"
        placeholder="Nhập nội dung câu hỏi"
      />
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
          <Button color="danger" onPress={() => removeChoice(index)}>
            Xóa lựa chọn
          </Button>
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
        onSelectionChange={setCorrectChoice}
      >
        {choices.map((choice) => (
          <AutocompleteItem key={choice} value={choice}>
            {choice}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Spacer />
      <Button color="primary" type="submit">
        Tạo câu hỏi
      </Button>
    </form>
  );
}
