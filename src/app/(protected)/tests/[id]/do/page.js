import { getTestQuestions } from "@/actions/questions";
import AnswerSheet from "./answer-sheet";
import { Spacer } from "@nextui-org/react";
import { getTestInfo } from "@/actions/tests";
import { getResultInfo } from "@/actions/results";

export default async function Page({ params }) {
  const questions = await getTestQuestions(params.id);
  const testInfo = await getTestInfo(params.id);
  const resultInfo = await getResultInfo(params.id);
  console.log("resultId: " + resultInfo.id);

  return (
    <div className="p-2">
      <h1>{testInfo?.name}</h1>
      <Spacer />
      <AnswerSheet
        resultInfo={resultInfo}
        testInfo={testInfo}
        questions={questions}
      />
    </div>
  );
}
