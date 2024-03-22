"use client";

import { submitResult } from "@/actions/results";
import { Button, Card, CardBody, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";
import Countdown from "react-countdown";

export default function AnswerSheet({
  testInfo,
  questions,
}: {
  testInfo: any;
  questions: any[];
}) {
  const [answers, setAnswers] = useState<any[]>(
    new Array(questions.length).fill("")
  );
  const [tick, setTick] = useState<any>(Date.now() + testInfo.duration * 60000);

  function renderQuestion(question: any, index: number) {
    switch (question.type) {
      case "shortAnswer": {
        return (
          <div>
            <Input
              placeholder="Nhập câu trả lời"
              onValueChange={(value) => {
                const newAnswers = [...answers];
                newAnswers[index] = value;
                setAnswers(newAnswers);
              }}
            />
          </div>
        );
      }
    }
  }

  return (
    <div>
      <Countdown
        date={tick}
        onComplete={() => submitResult(testInfo.id, answers)}
      />
      <Spacer />
      {questions.map((question, index) => (
        <div key={question.id}>
          <Card>
            <CardBody>
              {question.content}
              {renderQuestion(question, index)}
            </CardBody>
          </Card>
          <Spacer />
        </div>
      ))}
      <Button
        onPress={() => submitResult(testInfo.id, answers)}
        color="primary"
      >
        Nộp bài
      </Button>
    </div>
  );
}