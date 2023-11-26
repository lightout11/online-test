import { Field, Textarea, Button, Input } from "@fluentui/react-components";
import { useRouter } from "next/navigation";

export default function ShortAnswer() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const nbody = {
      question: e.currentTarget.question.value,
      correct_answer: e.currentTarget.correct_answer.value,
    };
    const res = await fetch("/api/questions/new_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nbody),
    });

    router.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2 min-w-full">
        <Field label="Câu hỏi" required={true}>
          <Textarea name="question" />
        </Field>
        <Field label="Đáp án đúng" required={true}>
          <Input name="correct_answer" />
        </Field>
      </div>
      <div className="p-2">
        <Button type="submit">Tạo câu hỏi</Button>
      </div>
    </form>
  );
}
