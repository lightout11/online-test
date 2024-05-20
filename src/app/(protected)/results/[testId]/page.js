import { getTestResult } from "@/actions/results";
import { getTestAnswersByTestId } from "@/actions/test-answers";
import { getTestInfo } from "@/actions/tests";
import {
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spacer,
} from "@nextui-org/react";

export default async function Page({ params }) {
  const testInfo = await getTestInfo(params.testId);
  const result = await getTestResult(params.testId);
  const testAnswers = await getTestAnswersByTestId(params.testId);

  function renderMultiSelect(testAnswer, index) {
    return (
      <Card>
        <CardBody>
          <p>
            Câu {index + 1}: {testAnswer.question.content}
          </p>
          <CheckboxGroup
            isDisabled
            value={testAnswer.choices}
            color={testAnswer.isCorrect ? "success" : "danger"}
          >
            {testAnswer.question.choices.map((choice, choiceIndex) => (
              <Checkbox key={choiceIndex} value={choice}>
                {choice}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <p>
            Câu trả lời đúng: {testAnswer.question.correctChoices.toString()}
          </p>
        </CardBody>
      </Card>
    );
  }

  function renderShortAnswer(testAnswer, index) {
    return (
      <Card>
        <CardBody>
          <p>
            Câu {index + 1}: {testAnswer.question.content}
          </p>
          <Input
            isDisabled
            value={testAnswer.answer}
            label="Câu trả lời của bạn"
            labelPlacement="outside-left"
            color={testAnswer.isCorrect ? "success" : "danger"}
          />
          <p>Câu trả lời đúng: {testAnswer.question.answer}</p>
        </CardBody>
      </Card>
    );
  }

  function renderOpenedAnswer(testAnswer, index) {
    return (
      <Card>
        <CardBody>
          <p>
            Câu {index + 1}: {testAnswer.question.content}
          </p>
          <Input
            isDisabled
            value={testAnswer.answer}
            label="Câu trả lời của bạn"
            labelPlacement="outside-left"
            color={testAnswer.isCorrect ? "success" : "danger"}
          />
          <p>Câu trả lời đúng: {testAnswer.question.answer}</p>
        </CardBody>
      </Card>
    );
  }

  function renderMultiChoice(testAnswer, index) {
    return (
      <Card>
        <CardBody>
          <p>
            Câu {index + 1}: {testAnswer.question.content}
          </p>
          <RadioGroup
            isDisabled
            value={testAnswer.choice}
            color={testAnswer.isCorrect ? "success" : "danger"}
          >
            {testAnswer.question.choices.map((choice, choiceIndex) => (
              <Radio key={choiceIndex} value={choice}>
                {choice}
              </Radio>
            ))}
          </RadioGroup>
          <p>Câu trả lời đúng: {testAnswer.question.correctChoice}</p>
        </CardBody>
      </Card>
    );
  }

  function renderAnswer(testAnswer, index) {
    switch (testAnswer.question.type) {
      case "shortAnswer": {
        return renderShortAnswer(testAnswer, index);
      }
      case "openedAnswer": {
        return renderOpenedAnswer(testAnswer, index);
      }
      case "multiChoice": {
        return renderMultiChoice(testAnswer, index);
      }
      case "multiSelect": {
        return renderMultiSelect(testAnswer, index);
      }
    }
  }

  return (
    <div className="p-2">
      <p>Kỳ thi: {testInfo?.name}</p>
      <p>Thời gian làm bài: {testInfo?.duration}</p>
      <p>
        Điểm: {result?.score} / {testInfo?.maxScore}
      </p>
      <Spacer />
      {testAnswers?.map((testAnswer, index) => (
        <div key={testAnswer.id}>
          {renderAnswer(testAnswer, index)}
          <Spacer />
        </div>
      ))}
    </div>
  );
}
