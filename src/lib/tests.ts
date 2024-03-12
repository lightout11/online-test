"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

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

  const newTest = {
    name: formData.get("name") as string,
    startDateTime: new Date(formData.get("startDateTime") as string),
    duration: parseInt(formData.get("duration") as string),
    endDateTime: new Date(formData.get("endDateTime") as string),
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
