"use client";

import {
  Button,
  Checkbox,
  Divider,
  Field,
  Image,
  Input,
  Label,
  Select,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { Delete16Filled, Delete20Filled } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateQuestionForm = () => {
  const router = useRouter();
  const [questionType, setQuestionType] = useState("shortAnswer");
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctChoice, setCorrectChoice] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [orderItems, setOrderItems] = useState([""]);
  const [fills, setFills] = useState([""]);
  const [file, setFile] = useState<string>();
  const [audio, setAudio] = useState<string>();
  const [video, setVideo] = useState<string>();
  const [categories, setCategories] = useState<string>("math");
  const [difficulty, setDifficulty] = useState<string>("easy");

  const handleQuestionTypeChange = (e: any) => {
    setQuestionType(e.target.value);
  };

  const handleChoiceChange = (index: any, e: any) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const handleOrderItemChange = (index: any, e: any) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index] = e.target.value;
    setOrderItems(newOrderItems);
  };

  const handleCheckboxChange = (value: any) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
  };

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index: any) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleAddOrderItem = () => {
    setOrderItems([...orderItems, ""]);
  };

  const handleRemoveOrderItem = (index: number) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handleFillChange = (index: any, e: any) => {
    const newFills = [...fills];
    newFills[index] = e.target.value;
    setFills(newFills);
  };

  const handleAddFill = () => {
    setFills([...fills, ""]);
  };

  const handleRemoveFill = (index: number) => {
    const newFills = [...fills];
    newFills.splice(index, 1);
    setFills(newFills);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      // _id,
      question_type: questionType,
      categories,
      difficulty,
      question_text: questionText,
      answer,
      choices,
      correct_choice: correctChoice,
      selected_options: selectedOptions,
      order_items: orderItems,
      fills,
    };

    try {
      const response = await fetch("/api/questions/new_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        // Optionally, you can reset the form after successful submission
        // resetForm();
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }

    router.push("/questions");
  };

  const renderImage = () => {
    if (file) {
      return <Image src={file} alt="image" />;
    }
  };

  const renderAudio = () => {
    if (audio) {
      return (
        <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio>
      );
    }
  };

  const renderVideo = () => {
    if (video) {
      return (
        <video controls>
          <source src={video} type="video/mp4" />
        </video>
      );
    }
  };

  const renderQuestionForm = () => {
    switch (questionType) {
      case "shortAnswer":
        return (
          <div>
            <Field label="Câu trả lời đúng" required={true}>
              <Input
                appearance="underline"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Field>
          </div>
        );

      case "multipleChoice":
        return (
          <div className="space-y-2">
            {choices.map((choice, index) => (
              <div key={index}>
                <Field label={"Lựa chọn " + (index + 1)} required={true}>
                  <div className="flex flex-row space-x-1">
                    <Input
                      appearance="underline"
                      className="w-full"
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, e)}
                    />
                    <Button
                      icon={<Delete20Filled />}
                      appearance="transparent"
                      onClick={() => handleRemoveChoice(index)}
                    ></Button>
                  </div>
                </Field>
              </div>
            ))}
            <Button appearance="subtle" onClick={handleAddChoice}>
              Thêm lựa chọn
            </Button>
            <Field required={true} label="Lựa chọn đúng">
              <Select
                value={correctChoice}
                onChange={(e) => setCorrectChoice(e.target.value)}
              >
                {choices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        );

      case "multipleSelect":
        return (
          <div className="space-y-2">
            {choices.map((choice, index) => (
              <Field
                key={index}
                label={"Lựa chọn " + (index + 1)}
                required={true}
              >
                <div className="flex flex-row space-x-1">
                  <Checkbox
                    required={false}
                    value={choice}
                    checked={selectedOptions.includes(choice)}
                    onChange={() => handleCheckboxChange(choice)}
                  />
                  <Input
                    appearance="underline"
                    className="w-full"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e)}
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete20Filled />}
                    onClick={() => handleRemoveChoice(index)}
                  ></Button>
                </div>
              </Field>
            ))}
            <Button appearance="subtle" onClick={() => handleAddChoice()}>
              Thêm lựa chọn
            </Button>
          </div>
        );

      case "ordering":
        return (
          <div className="space-y-2">
            {orderItems.map((item, index) => (
              <Field
                key={index}
                label={"Thứ tự " + (index + 1)}
                required={true}
              >
                <div className="flex flex-row space-x-1">
                  <Input
                    appearance="underline"
                    className="w-full"
                    value={item}
                    onChange={(e) => handleOrderItemChange(index, e)}
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete20Filled />}
                    onClick={() => handleRemoveOrderItem(index)}
                  ></Button>
                </div>
              </Field>
            ))}
            <Button appearance="subtle" onClick={() => handleAddOrderItem()}>
              Thêm đối tượng
            </Button>
          </div>
        );

      case "fillingParagraph":
        return (
          <div className="space-y-2">
            {fills.map((fill, index) => (
              <Field
                key={index}
                label={"Ô trống " + (index + 1)}
                required={true}
              >
                <div className="flex flex-row space-x-1">
                  <Input
                    appearance="underline"
                    className="w-full"
                    value={fill}
                    onChange={(e) => handleFillChange(index, e)}
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete20Filled />}
                    onClick={() => handleRemoveFill(index)}
                  ></Button>
                </div>
              </Field>
            ))}
            <Button appearance="subtle" onClick={() => handleAddFill()}>
              Thêm ô trống
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderCreateQuestionButton = () => {
    if (questionType === "") {
      return null;
    } else {
      return (
        <Button appearance="primary" type="submit">
          Tạo câu hỏi
        </Button>
      );
    }
  };

  return (
    <form
      className="flex flex-row-reverse min-w-full p-2 justify-normal"
      onSubmit={handleSubmit}
    >
      <div className="p-2 space-x-1">
        <Field label="Chọn loại câu hỏi">
          <Select value={questionType} onChange={handleQuestionTypeChange}>
            <option value="shortAnswer">Trả lời ngắn</option>
            <option value="multipleChoice">Trắc nghiệm</option>
            <option value="multipleSelect">Trắc nghiệm nhiều đáp án</option>
            <option value="ordering">Sắp xếp</option>
            <option value="fillingParagraph">Điền vào đoạn văn</option>
          </Select>
        </Field>
        <div className="flex flex-row items-center">
          <input
            type="file"
            onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
          />
          <Button
            appearance="subtle"
            onClick={() => {
              setFile("");
            }}
          >
            Xóa ảnh
          </Button>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="file"
            onChange={(e) => setAudio(URL.createObjectURL(e.target.files[0]))}
          />
          <Button appearance="subtle" onClick={() => setAudio("")}>
            Xóa âm thanh
          </Button>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="file"
            onChange={(e) => setVideo(URL.createObjectURL(e.target.files[0]))}
          />
          <Button appearance="subtle" onClick={() => setVideo("")}>
            Xóa đoạn phim
          </Button>
        </div>
      </div>
      <Divider vertical={true} />
      <div className="flex-grow w-full p-2 space-y-2">
        <Field label="Câu hỏi" required={true}>
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Field>
        <div className="flex flex-col">
          {renderImage()}
          {renderAudio()}
          {renderVideo()}
        </div>
        {renderQuestionForm()}
        {renderCreateQuestionButton()}
      </div>
      <Divider vertical={true} />
      <div className="flex flex-col p-2 space-x-1">
        <Field label="Lĩnh vực">
          <Select value={categories} onChange={(e) => setCategories(e.target.value)}>
            <option value="math">Toán</option>
            <option value="physics">Vật lý</option>
            <option value="chemistry">Hóa học</option>
            <option value="biology">Sinh học</option>
            <option value="literature">Văn học</option>
            <option value="history">Lịch sử</option>
            <option value="geography">Địa lý</option>
          </Select>
        </Field>
        <Field label="Độ khó">
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Dễ</option>
            <option value="normal">Trung bình</option>
            <option value="hard">Khó</option>
          </Select>
        </Field>
      </div>
    </form>
  );
};

export default CreateQuestionForm;
