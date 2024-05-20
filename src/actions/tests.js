"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "../libs/prisma";
import { revalidatePath } from "next/cache";
import {
  parseAbsolute,
  parseDateTime,
  parseZonedDateTime,
} from "@internationalized/date";

const testSchema = z.object({
  name: z.string(),
  startDateTime: z
    .date()
    .min(new Date(), "Thời điểm bắt đầu phải sau thời điểm hiện tại"),
  duration: z.number().min(1),
  endDateTime: z
    .date()
    .min(new Date(), "Thời điểm kết thúc phải sau thời điểm hiện tại"),
});

export async function createNewTest(prevState, formData) {
  const session = await auth();
  if (!session) redirect("/login");

  const startDateTime = new Date(formData.get("startDate"));
  const [startHour, startMinute] = formData.get("startTime").split(":");
  startDateTime.setUTCHours(parseInt(startHour), parseInt(startMinute));

  const endDateTime = new Date(formData.get("endDate"));
  const [endHour, endMinute] = formData.get("endTime").split(":");
  endDateTime.setUTCHours(parseInt(endHour), parseInt(endMinute));

  const newTest = {
    name: formData.get("name"),
    startDateTime: startDateTime,
    duration: parseInt(formData.get("duration")),
    endDateTime: endDateTime,
    state: formData.get("isOpened") === "true" ? "opened" : "closed",
  };

  const validated = testSchema.safeParse(newTest);
  if (!validated.success) {
    return { messages: validated.error.flatten().fieldErrors };
  }

  if (newTest.startDateTime >= newTest.endDateTime) {
    return {
      messages: {
        startDateTime: "Thời điểm bắt đầu phải trước thời điểm kết thúc",
      },
    };
  }

  if (
    newTest.endDateTime.valueOf() - newTest.startDateTime.valueOf() <
    newTest.duration * 60000
  ) {
    return {
      messages: {
        duration:
          "Thời gian làm bài không thể lớn hơn thời gian giữa thời điểm bắt đầu và kết thúc",
      },
    };
  }

  await prisma.test.create({
    data: {
      ...newTest,
      user: {
        connect: {
          id: session?.user?.id,
        },
      },
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function deleteTests(ids) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  await prisma.test.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function deleteTest(id) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  await prisma.test.delete({
    where: {
      id,
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function getTest(id) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return await prisma.test.findUnique({
    where: {
      id,
    },
  });
}

export async function updateTest(prevState, formData) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const updatedTest = {
    name: formData.get("name"),
    startDateTime: new Date(formData.get("startDateTime")),
    duration: parseInt(formData.get("duration")),
    endDateTime: new Date(formData.get("endDateTime")),
    state: formData.get("isOpened") === "true" ? "opened" : "closed",
  };

  const validated = testSchema.safeParse(updatedTest);
  if (!validated.success) {
    return { messages: validated.error.flatten().fieldErrors };
  }

  if (updatedTest.startDateTime >= updatedTest.endDateTime) {
    return {
      messages: {
        startDateTime: "Thời điểm bắt đầu phải trước thời điểm kết thúc",
      },
    };
  }

  if (
    updatedTest.endDateTime.valueOf() - updatedTest.startDateTime.valueOf() <
    updatedTest.duration * 60000
  ) {
    return {
      messages: {
        duration:
          "Thời gian làm bài không thể lớn hơn thời gian giữa thời điểm bắt đầu và kết thúc",
      },
    };
  }

  await prisma.test.update({
    where: {
      id: formData.get("id"),
    },
    data: {
      ...updatedTest,
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function addQuestionsToTest(testId, questionIds) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  await prisma.test.update({
    where: {
      id: testId,
    },
    data: {
      questions: {
        connect: questionIds.map((id) => ({ id })),
      },
      maxScore: {
        increment: questionIds.length,
      },
    },
  });

  return { messages: { success: "Câu hỏi đã được thêm vào bài thi" } };
}

export async function removeQuestionsFromTest(testId, questionIds) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  await prisma.test.update({
    where: {
      id: testId,
    },
    data: {
      questions: {
        disconnect: questionIds.map((id) => ({ id })),
      },
      maxScore: {
        decrement: questionIds.length,
      },
    },
  });

  return { messages: { success: "Câu hỏi đã được xóa khỏi bài thi" } };
}

export async function getTestInfo(id) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const test = await prisma.test.findFirst({
    select: {
      id: true,
      name: true,
      duration: true,
      state: true,
      maxScore: true,
      startDateTime: true,
    },
    where: {
      id,
    },
  });

  return test;
}

export async function startTest(resultId, testId) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  await prisma.result.update({
    where: {
      id: resultId,
    },
    data: {
      state: "inProgress",
      startDateTime: new Date(),
    },
  });

  revalidatePath("/tests/" + testId + "/do");
  redirect("/tests/" + testId + "/do");
}
