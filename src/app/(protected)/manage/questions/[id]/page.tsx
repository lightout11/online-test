import { getQuestionById } from "@/lib/questions";
import ShortAnswer from "./short-answer";

export default async function Page({ params }: { params: { id: string } }) {
  const question = await getQuestionById(params.id);

  function renderQuestion(questionType: string | null | undefined) {
    switch (questionType) {
      case "shortAnswer":
        return <ShortAnswer question={question} />;
    }
  }

  return <div>{renderQuestion(question?.type)}</div>;
}
