"use client"
import { submitResult } from "@/actions/results"
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spacer
} from "@nextui-org/react"
import { useState } from "react"
import Countdown from "react-countdown"

export default function AnswerSheet({ testInfo, questions }) {
  const [answers, setAnswers] = useState({})
  const [tick, setTick] = useState(Date.now() + testInfo.duration * 60000)

  function renderMultiSelect(question, index) {
    return (
      <div>
        <CheckboxGroup
          onValueChange={value => {
            const newAnswers = { ...answers }
            newAnswers[question.id] = value
            setAnswers(newAnswers)
          }}
        >
          {question.choices.map((choice, choiceIndex) => (
            <Checkbox key={choiceIndex} value={choice}>
              {choice}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    )
  }

  function renderMultiChoice(question, index) {
    return (
      <div>
        <RadioGroup
          onValueChange={value => {
            const newAnswers = { ...answers }
            newAnswers[question.id] = value
            setAnswers(newAnswers)
          }}
        >
          {question.choices.map((choice, choiceIndex) => (
            <Radio key={choiceIndex} value={choice}>
              {choice}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    )
  }

  function renderQuestion(question, index) {
    switch (question.type) {
      case "shortAnswer": {
        return (
          <div>
            <Input
              placeholder="Nhập câu trả lời"
              onValueChange={value => {
                const newAnswers = { ...answers }
                newAnswers[question.id] = value
                setAnswers(newAnswers)
              }}
            />
          </div>
        )
      }
      case "openedAnswer": {
        return (
          <div>
            <Input
              placeholder="Trả lời ngắn gọn"
              onValueChange={value => {
                const newAnswers = { ...answers }
                newAnswers[question.id] = value
                setAnswers(newAnswers)
              }}
            />
          </div>
        )
      }
      case "multiChoice": {
        return renderMultiChoice(question, index)
      }
      case "multiSelect": {
        return renderMultiSelect(question, index)
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
  )
}
