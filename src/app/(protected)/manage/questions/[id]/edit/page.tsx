import { getQuestionById } from "@/lib/questions";
import EditForm from "./edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const question = await getQuestionById(params.id);
  
  return <EditForm question={question} />;
}
