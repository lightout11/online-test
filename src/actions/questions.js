"use server"

import { auth } from "@/auth"
import { writeFile } from "fs/promises"
import { redirect } from "next/navigation"
import prisma from "../libs/prisma"
import { revalidatePath } from "next/cache"
import { existsSync, mkdirSync } from "fs"

export async function createShortAnswerQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const newQuestion = {
    type: "shortAnswer",
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.create({
    data: {
      ...newQuestion,
      user: {
        connect: {
          id: session.user?.id
        }
      }
    }
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function getQuestionById(id) {
  const question = await prisma.question.findFirst({
    where: {
      id
    }
  })

  return question
}

export async function updateShortAnswerQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const id = formData.get("id")

  const updatedQuestion = {
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.update({
    where: {
      id
    },
    data: updatedQuestion
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function deleteQuestion(id) {
  const session = await auth()
  if (!session) redirect("/login")

  await prisma.question.delete({
    where: {
      id
    }
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function deleteQuestions(ids) {
  const session = await auth()
  if (!session) redirect("/login")

  await prisma.question.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function getTestQuestions(testId) {
  const session = await auth()
  if (!session) redirect("/login")

  return await prisma.question.findMany({
    select: {
      id: true,
      type: true,
      content: true,
      choices: true
    },
    where: {
      testIds: {
        has: testId
      }
    }
  })
}

export async function getTestQuestionsAndAnswers(testId) {
  const session = await auth()
  if (!session) redirect("/login")

  return await prisma.question.findMany({
    select: {
      id: true,
      type: true,
      content: true,
      choices: true,
      answer: true,
      correctChoice: true,
      correctChoices: true
    },
    where: {
      testIds: {
        has: testId
      }
    }
  })
}

export async function createOpenedAnswerQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const newQuestion = {
    type: "openedAnswer",
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.create({
    data: {
      ...newQuestion,
      user: {
        connect: {
          id: session.user?.id
        }
      }
    }
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function updateOpenedAnswerQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const id = formData.get("id")

  const updatedQuestion = {
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    answer: formData.get("answer"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.update({
    where: {
      id
    },
    data: updatedQuestion
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function createMultiChoiceQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const newQuestion = {
    type: "multiChoice",
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    choices: formData.getAll("choices"),
    correctChoice: formData.get("correctChoice"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.create({
    data: {
      ...newQuestion,
      user: {
        connect: {
          id: session.user?.id
        }
      }
    }
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function updateMultiChoiceQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const id = formData.get("id")

  const updatedQuestion = {
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    choices: formData.getAll("choices"),
    correctChoice: formData.get("correctChoice"),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.update({
    where: {
      id
    },
    data: updatedQuestion
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function createMultiSelectQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const newQuestion = {
    type: "multiSelect",
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    choices: formData.getAll("choices"),
    correctChoices: formData
      .getAll("correctChoices")
      .slice()
      .sort(),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.create({
    data: {
      ...newQuestion,
      user: {
        connect: {
          id: session.user?.id
        }
      }
    }
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}

export async function updateMultiSelectQuestion(formData) {
  const session = await auth()
  if (!session) redirect("/login")

  const id = formData.get("id")

  const updatedQuestion = {
    categories: formData.getAll("categories"),
    difficulty: formData.get("difficulty"),
    content: formData.get("content"),
    choices: formData.getAll("choices"),
    correctChoices: formData
      .getAll("correctChoices")
      .slice()
      .sort(),
    isPublic: formData.get("isPublic") === "true" ? true : false
  }

  const question = await prisma.question.update({
    where: {
      id
    },
    data: updatedQuestion
  })

  const dir = process.env.MEDIA_DIR + question.id + "/"
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const media = {}

  const image = formData.get("image")
  if (image !== undefined && image !== null && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(dir + image.name, buffer)
    media.imageFilename = image.name
  }

  const audio = formData.get("audio")
  if (audio !== undefined && audio !== null && audio.size > 0) {
    const buffer = Buffer.from(await audio.arrayBuffer())
    await writeFile(dir + audio.name, buffer)
    media.audioFilename = audio.name
  }

  const video = formData.get("video")
  if (video !== undefined && video !== null && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer())
    await writeFile(dir + video.name, buffer)
    media.videoFilename = video.name
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: media
  })

  revalidatePath("/manage/questions")
  redirect("/manage/questions")
}
