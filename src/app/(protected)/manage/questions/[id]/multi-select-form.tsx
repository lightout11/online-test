"use client";

import {
  createMultiSelectQuestion,
  updateMultiSelectQuestion,
} from "@/actions/questions";
import {
  Switch,
  Spacer,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useState } from "react";

export default function MultiSelectForm({ question }: { question: any }) {
  const [enabledForm, setEnabledForm] = useState<any>(false);
  const [choices, setChoices] = useState<string[]>(question.choices);
  const [correctChoices, setCorrectChoices] = useState<any>(
    question.correctChoices
  );
  const [isPublic, setIsPublic] = useState<any>(question.isPublic);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<any>(question.categories[0]);
  const [difficulty, setDifficulty] = useState<any>(question.difficulty);
  const [content, setContent] = useState<any>(question.content);

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
    <Card>
      <CardBody>
        <form action={updateMultiSelectQuestion}>
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
                onValueChange={(val) => changeChoices(index, val)}
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
          <Select
            isDisabled={!enabledForm}
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
          <Button isDisabled={!enabledForm} color="primary" type="submit">
            Lưu thay đổi
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
