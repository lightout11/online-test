"use server";

import { auth } from "@/auth";
import { examineOpenedAnswer } from "@/libs/judge";
import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getResultInfo(testId: string) {
  const session = await auth();
  if (!session) redirect("/login");

  const result = await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true,
    },
    where: {
      testId,
      userId: session?.user?.id,
    },
  });

  if (!result) {
    const newResult = await prisma.result.create({
      data: {
        test: {
          connect: {
            id: testId,
          },
        },
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
        state: "notStarted",
      },
    });
  }

  return await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true,
    },
    where: {
      testId,
      userId: session?.user?.id,
    },
  });
}

export async function submitResult(testId: string, answers: any) {
  const session = await auth();
  if (!session) redirect("/login");

  console.log(answers);

  const result = await prisma.result.findFirst({
    where: {
      testId,
      userId: session?.user?.id,
    },
  });

  if (!result) {
    return;
  }

  let score = 0;
  for (let questionId in answers) {
    const question = await prisma.question.findFirst({
      select: {
        id: true,
        type: true,
        answer: true,
        correctChoice: true,
        correctChoices: true,
      },
      where: {
        id: questionId,
      },
    });

    if (!question) {
      continue;
    }

    let isCorrect = false;

    switch (question.type) {
      case "shortAnswer": {
        if (question.answer == answers[questionId]) {
          score++;
          isCorrect = true;
        }
        await prisma.testAnswer.create({
          data: {
            result: {
              connect: {
                id: result.id,
              },
            },
            question: {
              connect: {
                id: questionId,
              },
            },
            answer: answers[questionId],
            isCorrect
          }
        });
        break;
      }
      case "openedAnswer": {
        const correct = await examineOpenedAnswer(question, answers[questionId]);
        if (correct) {
          score++;
          isCorrect = true;
        }
        await prisma.testAnswer.create({
          data: {
            result: {
              connect: {
                id: result.id,
              },
            },
            question: {
              connect: {
                id: questionId,
              },
            },
            answer: answers[questionId],
            isCorrect
          }
        });
        break;
      }
    }
  }
  
  await prisma.result.update({
    where: {
      id: result.id,
    },
    data: {
      score,
      state: "completed",
    },
  });

  redirect("/tests/" + testId);
}

export async function getTestResult(testId: string) {
  const session = await auth();
  if (!session) redirect("/login");

  const result = await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true,
      testAnswer: {
        select: {
          id: true,
          answer: true,
          choice: true,
          choices: true,
        },
      },
    },
    where: {
      testId,
      userId: session?.user?.id,
    },
  });

  return result;
}

export async function getResultsByUser() {
  const session = await auth();
  if (!session) redirect("/login");

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      test: {
        select: {
          name: true,
        },
      },
    },
    where: {
      userId: session?.user?.id,
    },
  });

  return results;
}

export async function getResultsByTestId(testId: string) {
  const session = await auth();
  if (!session) redirect("/login");

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    where: {
      testId,
    },
  });

  return results;
}

export async function getResultById(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  return await prisma.result.findFirst({
    select:{
      id: true,
      score: true,
      state: true,
    },
    where: {
      id,
    },
  });
}