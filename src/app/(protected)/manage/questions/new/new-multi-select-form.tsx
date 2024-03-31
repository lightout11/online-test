"use client";

import { createMultiSelectQuestion } from "@/actions/questions";
import {
  Switch,
  Spacer,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  Button,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

export default function NewMultiSelectForm() {
  const [choices, setChoices] = useState<string[]>([]);
  const [correctChoices, setCorrectChoices] = useState<any>([]);
  const [isPublic, setIsPublic] = useState<any>(false);

  function removeChoice(index: any) {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  }

  const changeChoices = (index: any, val: string) => {
    const newChoices = [...choices];
    newChoices[index] = val;
    setChoices(newChoices);
  };

  return (
    <form action={createMultiSelectQuestion}>
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
            onValueChange={(val) => changeChoices(index, val)}
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
      <Select
        label="Đáp án đúng"
        name="correctChoices"
        selectionMode="multiple"
        value={correctChoices}
        selectedKeys={correctChoices}
        onSelectionChange={setCorrectChoices}
      >
        {choices.map((choice) => (
          <SelectItem key={choice} value={choice}>
            {choice}
          </SelectItem>
        ))}
      </Select>
      <Spacer />
      <Button color="primary" type="submit">
        Tạo câu hỏi
      </Button>
    </form>
  );
}
