import { updateShortAnswerQuestion } from "@/actions/questions";
import {
  Switch,
  Spacer,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  Card,
  CardBody,
  Button,
  Image,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

export default function ShortAnswer({ question }: { question: any }) {
  const [content, setContent] = useState(question.content);
  const [difficulty, setDifficulty] = useState(question.difficulty);
  const [isPublic, setIsPublic] = useState<any>(question.isPublic);
  const [categories, setCategories] = useState(question.categories);
  const [answer, setAnswer] = useState(question.answer);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  function changeImageFile(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || event.target.files.length == 0) {
      setImageFile(null);
      return;
    }
    setImageFile(event.target.files[0]);
  }

  function changeAudioFile(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || event.target.files.length == 0) {
      setAudioFile(null);
      return;
    }
    setAudioFile(event.target.files[0]);
  }

  function changeVideoFile(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || event.target.files.length == 0) {
      setVideoFile(null);
      return;
    }
    setVideoFile(event.target.files[0]);
  }

  return (
    <form action={updateShortAnswerQuestion}>
      <input type="hidden" name="id" value={question.id} />
      <Switch
        name="isPublic"
        value={isPublic}
        isSelected={isPublic}
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
        value={categories}
      />
      <Spacer />
      <RadioGroup
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
              <Button onPress={() => setImageFile(null)}>Xóa hình ảnh</Button>
            </>
          )}
        </CardBody>
      </Card>
      <Spacer />
      <Card>
        <CardBody>
          <label>Âm thanh</label>
          <input
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
        isRequired
        name="answer"
        label="Đáp án đúng"
        value={answer}
        onValueChange={setAnswer}
      />
      <Spacer />
      <Button type="submit">Lưu thay đổi</Button>
    </form>
  );
}
