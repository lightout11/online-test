"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "../libs/prisma";
import { revalidatePath } from "next/cache";
import { TestState } from "@prisma/client";

interface Test {
  name: string;
  startDate: Date;
  endDate: Date;
}

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

export async function createNewTest(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const startDateTime = new Date(formData.get("startDate") as string);
  const [startHour, startMinute] = (formData.get("startTime") as string).split(
    ":"
  );
  console.log(parseInt(startHour), parseInt(startMinute));
  startDateTime.setUTCHours(parseInt(startHour), parseInt(startMinute));
  console.log(startDateTime);

  const endDateTime = new Date(formData.get("endDate") as string);
  const [endHour, endMinute] = (formData.get("endTime") as string).split(":");
  endDateTime.setUTCHours(parseInt(endHour), parseInt(endMinute));
  console.log(endDateTime);

  const newTest = {
    name: formData.get("name") as string,
    startDateTime: startDateTime,
    duration: parseInt(formData.get("duration") as string),
    endDateTime: endDateTime,
    state: ((formData.get("isOpened") as unknown as string) === "true"
      ? "opened"
      : "closed") as TestState,
  };

  const validated = testSchema.safeParse(newTest);
  if (!validated.success) {
    console.log(validated.error.flatten().fieldErrors);
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

export async function deleteTests(ids: string[]) {
  const session = await auth();
  if (!session) redirect("/login");

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

export async function deleteTest(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  await prisma.test.delete({
    where: {
      id,
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function getTest(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  return await prisma.test.findUnique({
    where: {
      id,
    },
  });
}

export async function updateTest(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const updatedTest = {
    name: formData.get("name") as string,
    startDateTime: new Date(formData.get("startDateTime") as string),
    duration: parseInt(formData.get("duration") as string),
    endDateTime: new Date(formData.get("endDateTime") as string),
    state: ((formData.get("isOpened") as unknown as string) === "true"
      ? "opened"
      : "closed") as TestState,
  };

  const validated = testSchema.safeParse(updatedTest);
  if (!validated.success) {
    console.log(validated.error.flatten().fieldErrors);
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
      id: formData.get("id") as string,
    },
    data: {
      ...updatedTest,
    },
  });

  revalidatePath("/manage/tests");
  redirect("/manage/tests");
}

export async function addQuestionsToTest(
  testId: string,
  questionIds: string[]
) {
  const session = await auth();
  if (!session) redirect("/login");

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

export async function removeQuestionsFromTest(
  testId: string,
  questionIds: string[]
) {
  const session = await auth();
  if (!session) redirect("/login");

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

export async function getTestInfo(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  const test = await prisma.test.findFirst({
    select: {
      id: true,
      name: true,
      duration: true,
      state: true,
      maxScore: true,
    },
    where: {
      id,
    },
  });

  return test;
}
