"use server";

import { auth } from "@/auth";
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

export async function submitResult(testId: string, answers: any[]) {
  const session = await auth();
  if (!session) redirect("/login");

  const result = await prisma.result.findFirst({
    where: {
      testId,
      userId: session?.user?.id,
    },
  });

  if (!result) {
    return;
  }

  const questions = await prisma.question.findMany({
    where: {
      testIds: {
        has: testId,
      },
    },
  });

  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].type === "shortAnswer") {
      if (questions[i].answer === answers[i]) {
        score += 1;
      }
    }
  }

  await prisma.result.update({
    where: {
      id: result.id,
    },
    data: {
      answers,
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
      answers: true,
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
      answers: true,
    },
    where: {
      id,
    },
  });
}