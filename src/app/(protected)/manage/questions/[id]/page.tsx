import { getQuestionById } from "@/actions/questions";
import ShortAnswer from "./short-answer";
import OpenAnsweredForm from "./opened-answer-form";

export default async function Page({ params }: { params: { id: string } }) {
  const question = await getQuestionById(params.id);

  function renderQuestion(questionType: string | null | undefined) {
    switch (questionType) {
      case "shortAnswer":
        return <ShortAnswer question={question} />;
      case "openedAnswer":
        return <OpenAnsweredForm question={question} />;
    }
  }

  return <div className="p-2">{renderQuestion(question?.type)}</div>;
}
