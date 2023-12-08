"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Label,
} from "@fluentui/react-components";
import { MoreHorizontal20Filled } from "@fluentui/react-icons";

export default function QuestionDetailDialog({ question }: { question: any }) {
  const renderQuestionDetail = () => {
    switch (question.question_type) {
      case "shortAnswer":
        return (
          <div className="p-2 flex flex-col">
            <Label size="large">Câu trả lời</Label>
            {question.answer}
          </div>
        );
      case "multipleChoice":
        return (
          <div className="p-2 flex flex-col">
            <Label size="large">Các lựa chọn</Label>
            <ol>
              {question.choices.map((choice: any, index: any) => (
                <li key={index}>{choice}</li>
              ))}
            </ol>
            <Label size="large">Lựa chọn đúng</Label>
            {question.correct_choice}
          </div>
        );
      case "multipleSelect":
        return (
          <div className="p-2 flex flex-col">
            <Label size="large">Các lựa chọn</Label>
            <ol>
              {question.choices.map((choice: any, index: any) => (
                <li key={index}>{choice}</li>
              ))}
            </ol>
            <Label size="large">Các lựa chọn đúng</Label>
            <ol>
              {question.selected_options.map((option: any, index: any) => (
                <li key={index}>{option}</li>
              ))}
            </ol>
          </div>
        );
      case "ordering":
        return (
          <div className="p-2 flex flex-col">
            <Label size="large">Thứ tự sắp xếp</Label>
            <ol>
              {question.order_items.map((item: any, index: any) => (
                <li key={index}>{index + 1 + ". " + item}</li>
              ))}
            </ol>
          </div>
        );
      case "fillingParagraph":
        return (
          <div className="p-2 flex flex-col">
            <Label size="large">Câu trả lời</Label>
            <ol>
              {question.fills.map((fill: any, index: any) => (
                <li key={index}>{index + 1 + ". " + fill}</li>
              ))}
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDifficulty = () => {
    switch (question.difficulty) {
      case "easy":
        return "Dễ";
      case "normal":
        return "Trung bình";
      case "hard":
        return "Khó";
    }
  }

  const renderCategories = () => {
    switch (question.categories) {
      case "math":
        return "Toán";
      case "physics":
        return "Vật lý";
      case "chemistry":
        return "Hóa học";
      case "literature":
        return "Văn học";
      case "history":
        return "Lịch sử";
      case "geography":
        return "Địa lý"
    }
  }

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<MoreHorizontal20Filled />}></Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Chi Tiết Câu Hỏi</DialogTitle>
          <DialogContent>
            <div className="p-2">
              <Label size="large">Mã câu hỏi: </Label>
              {question._id}
            </div>
            <div className="p-2">
              <Label size="large">Độ khó: </Label>
              {renderDifficulty()}
            </div>
            <div className="p-2">
              <Label size="large">Lĩnh vực: </Label>
              {renderCategories()}
            </div>
            <div className="p-2 flex flex-col">
              <Label size="large">Câu hỏi</Label>
              {question.question_text}
            </div>
            {renderQuestionDetail()}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button>Đóng</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
