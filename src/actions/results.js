"use server"

import { auth } from "@/auth"
import { examineOpenedAnswer } from "@/libs/judge"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"

export async function getResultInfo(testId) {
  const session = await auth()
  if (!session) redirect("/login")

  const result = await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true
    },
    where: {
      testId,
      userId: session?.user?.id
    }
  })

  if (!result) {
    const newResult = await prisma.result.create({
      data: {
        test: {
          connect: {
            id: testId
          }
        },
        user: {
          connect: {
            id: session?.user?.id
          }
        },
        state: "notStarted"
      }
    })
  }

  return await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true
    },
    where: {
      testId,
      userId: session?.user?.id
    }
  })
}

export async function submitResult(testId, answers) {
  const session = await auth()
  if (!session) redirect("/login")

  const questions = await prisma.question.findMany({
    where: {
      testIds: {
        has: testId
      }
    }
  })

  const result = await prisma.result.findFirst({
    where: {
      testId,
      userId: session?.user?.id
    }
  })

  if (!result) {
    return
  }

  for (let question of questions) {
    await prisma.testAnswer.create({
      data: {
        result: {
          connect: {
            id: result.id
          }
        },
        question: {
          connect: {
            id: question.id
          }
        }
      }
    })
  }

  let score = 0
  for (let questionId in answers) {
    const question = await prisma.question.findFirst({
      select: {
        content: true,
        id: true,
        type: true,
        answer: true,
        correctChoice: true,
        correctChoices: true
      },
      where: {
        id: questionId
      }
    })

    if (!question) {
      continue
    }

    let isCorrect = false

    switch (question.type) {
      case "shortAnswer": {
        if (question.answer == answers[questionId]) {
          score++
          isCorrect = true
        }
        await prisma.testAnswer.updateMany({
          where: {
            resultId: result.id,
            questionId: question.id
          },
          data: {
            answer: answers[questionId],
            isCorrect
          }
        })
        break
      }
      case "openedAnswer": {
        const correct = await examineOpenedAnswer(question, answers[questionId])
        if (correct) {
          score++
          isCorrect = true
        }
        await prisma.testAnswer.updateMany({
          where: {
            resultId: result.id,
            questionId: question.id
          },
          data: {
            answer: answers[questionId],
            isCorrect
          }
        })
        break
      }
      case "multiChoice": {
        if (question.correctChoice == answers[questionId]) {
          score++
          isCorrect = true
        }
        await prisma.testAnswer.updateMany({
          where: {
            resultId: result.id,
            questionId: question.id
          },
          data: {
            choice: answers[questionId],
            isCorrect
          }
        })
        break
      }
      case "multiSelect": {
        const yourChoices = JSON.stringify(answers[questionId].slice().sort())
        const correctChoices = JSON.stringify(
          question.correctChoices.slice().sort()
        )
        if (yourChoices == correctChoices) {
          score++
          isCorrect = true
        }
        await prisma.testAnswer.updateMany({
          where: {
            resultId: result.id,
            questionId: question.id
          },
          data: {
            choices: answers[questionId],
            isCorrect
          }
        })
        break
      }
    }
  }

  await prisma.result.update({
    where: {
      id: result.id
    },
    data: {
      score,
      state: "completed"
    }
  })

  redirect("/tests/" + testId)
}

export async function getTestResult(testId) {
  const session = await auth()
  if (!session) redirect("/login")

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
          choices: true
        }
      }
    },
    where: {
      testId,
      userId: session?.user?.id
    }
  })

  return result
}

export async function getResultsByUser() {
  const session = await auth()
  if (!session) redirect("/login")

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      test: {
        select: {
          name: true
        }
      }
    },
    where: {
      userId: session?.user?.id
    }
  })

  return results
}

export async function getResultsByTestId(testId) {
  const session = await auth()
  if (!session) redirect("/login")

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      user: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    where: {
      testId
    }
  })

  return results
}

export async function getResultById(id) {
  const session = await auth()
  if (!session) redirect("/login")

  return await prisma.result.findFirst({
    select: {
      id: true,
      score: true,
      state: true
    },
    where: {
      id
    }
  })
}
