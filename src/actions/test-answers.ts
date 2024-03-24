"use server";

import prisma from "@/libs/prisma";

export async function getTestAnswersOfResult(resultId: string) {
  const answers = await prisma.testAnswer.findMany({
    select: {
      id: true,
      question: {
        select: {
          content: true,
          type: true,
          answer: true,
          correctChoice: true,
          correctChoices: true,
        },
      },
      answer: true,
      choice: true,
      choices: true,
      isCorrect: true,
    },
    where: {
      resultId,
    },
  });

  return answers;
}
