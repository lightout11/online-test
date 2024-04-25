import { getTest } from "@/actions/tests"
import TestForm from "./test-form"
import { Card, CardBody, Spacer } from "@nextui-org/react"
import { auth } from "@/auth"
import QuestionManager from "./question-manager"

export default async function Page({ params }) {
  const session = await auth()
  const test = await getTest(params.id)

  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <TestForm test={test} />
        </CardBody>
      </Card>
      <Spacer />
      <QuestionManager session={session} testId={params.id} />
    </div>
  )
}
