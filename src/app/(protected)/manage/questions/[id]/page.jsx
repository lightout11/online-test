import { getQuestionById } from "@/actions/questions"
import ShortAnswer from "./short-answer"
import OpenAnsweredForm from "./opened-answer-form"
import MultiChoiceForm from "./multi-choice-form"
import MultiSelectForm from "./multi-select-form"

export default async function Page({ params }) {
  const question = await getQuestionById(params.id)

  function renderQuestion(questionType) {
    switch (questionType) {
      case "shortAnswer":
        return <ShortAnswer question={question} />
      case "openedAnswer":
        return <OpenAnsweredForm question={question} />
      case "multiChoice":
        return <MultiChoiceForm question={question} />
      case "multiSelect":
        return <MultiSelectForm question={question} />
    }
  }

  return <div className="p-2">{renderQuestion(question?.type)}</div>
}
