import { getTestQuestionsAndAnswers } from "@/actions/questions";
import { getResultById } from "@/actions/results";
import { getTestAnswersOfResult } from "@/actions/test-answers";
import { getTestInfo } from "@/actions/tests";
import { Card, CardBody, Input, Spacer } from "@nextui-org/react";

export default async function Page({
  params,
}: {
  params: { id: string; resultId: string };
}) {
  const testInfo = await getTestInfo(params.id);
  const result = await getResultById(params.resultId);
  const testAnswers = await getTestAnswersOfResult(result?.id as string);

  function renderShortAnswer(testAnswer: any, index: number) {
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

  function renderOpenedAnswer(testAnswer: any, index: number) {
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

  function renderAnswer(testAnswer: any, index: number) {
    switch (testAnswer.question.type) {
      case "shortAnswer": {
        return renderShortAnswer(testAnswer, index);
      }
      case "openedAnswer": {
        return renderOpenedAnswer(testAnswer, index);
      }
    }
  }

  return (
    <div className="p-2">
      <p>Kỳ thi: {testInfo?.name}</p>
      <p>Thời gian làm bài: {testInfo?.duration} phút</p>
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
