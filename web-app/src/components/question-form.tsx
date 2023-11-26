"use client";

import Mcq from "./mcq";
import MultipleSelect from "./multiple-select";
import ShortAnswer from "./short-answer";

export default function QuestionForm({ type }: { type: string }) {
  switch (type) {
    case "Short Answer": {
      return <ShortAnswer />;
    }
    case "Multiple Choice": {
      return <Mcq />;
    }
    case "Multiple Select": {
      return <MultipleSelect />;
    }
  }
}
