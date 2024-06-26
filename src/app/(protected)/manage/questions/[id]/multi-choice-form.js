"use client";

import { updateMultiChoiceQuestion } from "@/actions/questions";
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

export default function MultiChoiceForm({ question }) {
  const [enabledForm, setEnabledForm] = useState(false);
  const [choices, setChoices] = useState(question.choices);
  const [correctChoice, setCorrectChoice] = useState(question.correctChoice);
  const [isPublic, setIsPublic] = useState(question.isPublic);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [categories, setCategories] = useState(question.categories[0]);
  const [difficulty, setDifficulty] = useState(question.difficulty);
  const [content, setContent] = useState(question.content);

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
    <form action={updateMultiChoiceQuestion}>
      <input type="hidden" name="id" value={question.id} />
      <Switch
        name="enabledForm"
        isSelected={enabledForm}
        value={enabledForm}
        onValueChange={setEnabledForm}
      >
        Chế độ sửa
      </Switch>
      <Spacer />
      <Switch
        isDisabled={!enabledForm}
        name="isPublic"
        isSelected={isPublic}
        value={isPublic}
        onValueChange={setIsPublic}
      >
        Câu hỏi công khai
      </Switch>
      <Spacer />
      <Input
        isDisabled={!enabledForm}
        isRequired
        name="categories"
        label="Danh mục"
        placeholder="Nhập danh mục"
        value={categories}
        onValueChange={setCategories}
      />
      <Spacer />
      <RadioGroup
        isDisabled={!enabledForm}
        isRequired
        name="difficulty"
        label="Độ khó"
        orientation="horizontal"
        defaultValue="easy"
        value={difficulty}
        onValueChange={setDifficulty}
      >
        <Radio value="easy">Dễ</Radio>
        <Radio value="medium">Trung Bình</Radio>
        <Radio value="hard">Khó</Radio>
      </RadioGroup>
      <Spacer />
      <Textarea
        isDisabled={!enabledForm}
        name="content"
        label="Câu hỏi"
        placeholder="Nhập nội dung câu hỏi"
        value={content}
        onValueChange={setContent}
      />
      <Spacer />
      {choices.map((choice, index) => (
        <div key={index}>
          <Input
            isDisabled={!enabledForm}
            name="choices"
            value={choice}
            label={"Lựa chọn " + (index + 1)}
            isRequired={true}
            onValueChange={(val) => changeChoice(index, val)}
          />
          <Spacer />
          <Button
            isDisabled={!enabledForm}
            color="danger"
            onPress={() => removeChoice(index)}
          >
            Xóa lựa chọn
          </Button>
          <Spacer />
        </div>
      ))}
      <Button
        isDisabled={!enabledForm}
        onPress={() => setChoices([...choices, ""])}
      >
        Thêm lựa chọn
      </Button>
      <Spacer />
      <Autocomplete
        isDisabled={!enabledForm}
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
      <Button isDisabled={!enabledForm} color="primary" type="submit">
        Lưu thay đổi
      </Button>
    </form>
  );
}
