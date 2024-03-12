"use server";

import { auth } from "@/auth";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { existsSync, mkdirSync } from "fs";

export async function createShortAnswerQuestion(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const newQuestion: any = {
    type: "shortAnswer",
    categories: formData.getAll("categories") as unknown[] as string[],
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic:
      (formData.get("isPublic") as unknown as string) === "true" ? true : false,
  };

  const question = await prisma.question.create({
    data: {
      ...newQuestion,
      user: {
        connect: {
          id: session.user?.id,
        },
      },
    },
  });

  const dir = (process.env.MEDIA_DIR as string) + question.id + "/";
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const media: any = {};

  const image = formData.get("image") as unknown as File | null | undefined;
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    await writeFile(dir + image.name, buffer);
    media.imageFilename = image.name;
  }

  const audio = formData.get("audio") as unknown as File | null | undefined;
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer());
    await writeFile(dir + audio.name, buffer);
    media.audioFilename = audio.name;
  }

  const video = formData.get("video") as unknown as File | null | undefined;
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer());
    await writeFile(dir + video.name, buffer);
    media.videoFilename = video.name;
  }

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: media,
  });

  revalidatePath("/manage/questions");
  redirect("/manage/questions");
}

export async function getQuestionById(id: string) {
  const question = await prisma.question.findFirst({
    where: {
      id,
    },
  });

  return question;
}

export async function updateShortAnswerQuestion(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const id = formData.get("id") as unknown as string;

  const updatedQuestion: any = {
    categories: formData.getAll("categories") as unknown[] as string[],
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic:
      (formData.get("isPublic") as unknown as string) === "true" ? true : false,
  };

  const question = await prisma.question.update({
    where: {
      id,
    },
    data: updatedQuestion,
  });

  const dir = (process.env.MEDIA_DIR as string) + question.id + "/";
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const media: any = {};

  const image = formData.get("image") as unknown as File | null | undefined;
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    await writeFile(dir + image.name, buffer);
    media.imageFilename = image.name;
  }

  const audio = formData.get("audio") as unknown as File | null | undefined;
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer());
    await writeFile(dir + audio.name, buffer);
    media.audioFilename = audio.name;
  }

  const video = formData.get("video") as unknown as File | null | undefined;
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer());
    await writeFile(dir + video.name, buffer);
    media.videoFilename = video.name;
  }

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: media,
  });

  revalidatePath("/manage/questions");
  redirect("/manage/questions");
}

export async function deleteQuestion(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  await prisma.question.delete({
    where: {
      id,
    },
  });

  revalidatePath("/manage/questions");
  redirect("/manage/questions");
}

export async function deleteQuestions(ids: string[]) {
  const session = await auth();
  if (!session) redirect("/login");

  await prisma.question.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/manage/questions");
  redirect("/manage/questions");
}
