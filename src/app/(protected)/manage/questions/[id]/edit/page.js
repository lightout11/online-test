import { getQuestionById } from "@/actions/questions";
import EditForm from "./edit-form";

export default async function Page({ params }) {
  const question = await getQuestionById(params.id);

  return <EditForm question={question} />;
}
