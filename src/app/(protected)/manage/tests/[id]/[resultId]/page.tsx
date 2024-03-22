import { getTestQuestionsAndAnswers } from "@/actions/questions";
import { getResultById } from "@/actions/results";
import { getTestInfo } from "@/actions/tests";
import { Card, CardBody, Input, Spacer } from "@nextui-org/react";

export default async function Page({
  params,
}: {
  params: { id: string; resultId: string };
}) {
  const testInfo = await getTestInfo(params.id);
  const result = await getResultById(params.resultId);
  const questions = await getTestQuestionsAndAnswers(params.id);

  function renderShortAnswer(question: any, index: number) {
    return (
      <Card>
        <CardBody>
          <p>
            Câu {index + 1}: {question.content}
          </p>
          <Input
            isDisabled
            value={result?.answers[index]}
            label="Câu trả lời của bạn"
            labelPlacement="outside-left"
          />
          <p>Câu trả lời đúng: {question.answer}</p>
        </CardBody>
      </Card>
    );
  }

  function renderAnswer(question: any, index: number) {
    switch (question.type) {
      case "shortAnswer": {
        return renderShortAnswer(question, index);
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
      {questions?.map((question, index) => (
        <div key={question.id}>
          {renderAnswer(question, index)}
          <Spacer />
        </div>
      ))}
    </div>
  );
}
