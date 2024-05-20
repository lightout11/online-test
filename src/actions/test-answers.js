"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getTestAnswersOfResult(resultId) {
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

export async function getTestAnswersByTestId(testId) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const answers = await prisma.testAnswer.findMany({
    select: {
      id: true,
      question: {
        select: {
          content: true,
          type: true,
          answer: true,
          choices: true,
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
      result: {
        testId,
        userId: session.user?.id,
      },
    },
  });

  return answers;
}
