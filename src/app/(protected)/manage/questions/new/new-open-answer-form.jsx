"use client"

import { createOpenedAnswerQuestion } from "@/actions/questions"
import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Textarea
} from "@nextui-org/react"
import { useState } from "react"

export default function NewOpenedAnswerForm() {
  const [imageFile, setImageFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [isPublic, setIsPublic] = useState(false)

  function changeImageFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setImageFile(null)
      return
    }
    setImageFile(event.target.files[0])
  }

  function changeAudioFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setAudioFile(null)
      return
    }
    setAudioFile(event.target.files[0])
  }

  function changeVideoFile(event) {
    if (!event.target.files || event.target.files.length == 0) {
      setVideoFile(null)
      return
    }
    setVideoFile(event.target.files[0])
  }

  return (
    <form action={createOpenedAnswerQuestion}>
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
        isRequired
        label="Câu hỏi"
        placeholder="Nhập nội dung câu hỏi"
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
      <Input isRequired name="answer" label="Đáp án đúng" />
      <Spacer />
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  )
}
