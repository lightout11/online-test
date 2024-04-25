import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Spacer
} from "@nextui-org/react"

const difficulty = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó"
}

const questionType = {
  shortAnswer: "Trả lời ngắn",
  multiChoice: "Chọn đáp án đúng",
  multiSelect: "Chọn nhiều đáp án đúng",
  ordering: "Sắp xếp",
  filling: "Điện vào chỗ trống"
}

export default async function ShortAnswer({ question }) {
  const imagePath = "/media/" + question.id + "/" + question?.imageFilename
  const audioPath = "/media/" + question.id + "/" + question?.audioFilename
  const videoPath = "/media/" + question.id + "/" + question?.videoFilename

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          {question.isPublic ? (
            <Chip color="success">Công khai</Chip>
          ) : (
            <Chip>Riêng tư</Chip>
          )}
        </CardHeader>
        <CardBody>
          <p>Danh mục: {question.categories}</p>
          <Spacer />
          <p>Loại câu hỏi: {questionType[question.type]}</p>
          <Spacer />
          <p>Độ khó: {difficulty[question.difficulty]}</p>
          <Spacer />
          <p>Câu hỏi: {question.content}</p>
          {question.imageFilename && question.imageFilename !== "" ? (
            <Image src={imagePath} alt="image" />
          ) : null}
          {question.audioFilename && question.audioFilename !== "" ? (
            <audio src={audioPath} controls />
          ) : null}
          {question.videoFilename && question.videoFilename !== "" ? (
            <video src={videoPath} controls />
          ) : null}
        </CardBody>
        <CardFooter>Đáp án: {question.answer}</CardFooter>
      </Card>
    </div>
  )
}
