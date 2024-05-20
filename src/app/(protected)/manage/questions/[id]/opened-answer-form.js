"use client";

import { updateOpenedAnswerQuestion } from "@/actions/questions";
import {
  Button,
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Textarea,
  Image,
} from "@nextui-org/react";
import { useState } from "react";

export default function OpenAnsweredForm({ question }) {
  const [enabledForm, setEnabledForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isPublic, setIsPublic] = useState(question.isPublic);
  const [categories, setCategories] = useState(question.categories[0]);
  const [difficulty, setDifficulty] = useState(question.difficulty);
  const [content, setContent] = useState(question.content);
  const [answer, setAnswer] = useState(question.answer);

  function changeImageFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setImageFile(null);
      return;
    }
    setImageFile(event.target.files[0]);
  }

  function changeAudioFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setAudioFile(null);
      return;
    }
    setAudioFile(event.target.files[0]);
  }

  function changeVideoFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setVideoFile(null);
      return;
    }
    setVideoFile(event.target.files[0]);
  }

  return (
    <Card>
      <CardBody>
        <form action={updateOpenedAnswerQuestion}>
          <input type="hidden" name="id" value={question.id} />
          <Switch
            name="enabledForm"
            isSelected={enabledForm}
            value={enabledForm}
            onValueChange={setEnabledForm}
          >
            Chế độ sửa
          </Switch>
          <Switch
            name="isPublic"
            isSelected={isPublic}
            value={isPublic}
            onValueChange={setIsPublic}
            isDisabled={!enabledForm}
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
            isRequired
            label="Câu hỏi"
            placeholder="Nhập nội dung câu hỏi"
            value={content}
            onValueChange={setContent}
          />
          <Spacer />
          <Card>
            <CardBody>
              <label>Hình ảnh</label>
              <input
                disabled={!enabledForm}
                name="image"
                type="file"
                accept="image/*"
                onChange={changeImageFile}
              />
              {imageFile && (
                <>
                  <Spacer />
                  <Image src={URL.createObjectURL(imageFile)} alt="image" />
                  <Spacer />
                  <Button onPress={() => setImageFile(null)}>
                    Xóa hình ảnh
                  </Button>
                </>
              )}
            </CardBody>
          </Card>
          <Spacer />
          <Card>
            <CardBody>
              <label>Âm thanh</label>
              <input
                disabled={!enabledForm}
                name="audio"
                type="file"
                accept="audio/*"
                onChange={changeAudioFile}
              />
              {audioFile && (
                <>
                  <Spacer />
                  <audio src={URL.createObjectURL(audioFile)} controls />
                  <Spacer />
                  <Button onPress={() => setAudioFile(null)}>Xóa audio</Button>
                </>
              )}
            </CardBody>
          </Card>
          <Spacer />
          <Card>
            <CardBody>
              <label>Đoạn phim</label>
              <input
                disabled={!enabledForm}
                name="video"
                type="file"
                accept="video/*"
                onChange={changeVideoFile}
              />
              {videoFile && (
                <>
                  <Spacer />
                  <video src={URL.createObjectURL(videoFile)} controls />
                  <Spacer />
                  <Button onPress={() => setVideoFile(null)}>Xóa video</Button>
                </>
              )}
            </CardBody>
          </Card>
          <Spacer />
          <Input
            isDisabled={!enabledForm}
            isRequired
            name="answer"
            label="Đáp án đúng"
            value={answer}
            onValueChange={setAnswer}
          />
          <Spacer />
          <Button isDisabled={!enabledForm} type="submit">
            Lưu thay đổi
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
