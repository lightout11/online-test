"use server";

import { hash, verify } from "argon2";
import { z } from "zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: Date;
  roles: string[];
}

const registrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.string(),
  dateOfBirth: z.date(),
  roles: z.array(z.string()),
});

const userInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  gender: z.string(),
  dateOfBirth: z.date(),
  roles: z.array(z.string()),
});

export async function createNewUser(prevState: any, formData: FormData) {
  const newUser: any = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    dateOfBirth: new Date(formData.get("dateOfBirth") as unknown as string),
    gender: formData.get("gender"),
    roles: formData.getAll("roles"),
  };
  const validated = registrationSchema.safeParse(newUser);
  if (!validated.success) {
    return {
      messages: validated.error.flatten().fieldErrors,
    };
  }
  const existedUser = await prisma.user.findUnique({
    select: {
      email: true,
    },
    where: {
      email: newUser.email as unknown as string,
    },
  });
  if (existedUser)
    return {
      message: "Email đã tồn tại, vui lòng chọn email khác",
    };
  const passwordHash = await hash(
    formData.get("password") as unknown as string
  );
  newUser.passwordHash = passwordHash;
  delete newUser.password;
  await prisma.user.create({
    data: newUser,
  });
  revalidatePath("/login");
  redirect("/login");
}

export async function updateUserInfo(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const user: any = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    dateOfBirth: new Date(formData.get("dateOfBirth") as unknown as string),
    roles: formData.getAll("roles"),
  };
  const validated = userInfoSchema.safeParse(user);
  if (!validated.success) {
    return {
      messages: validated.error.flatten().fieldErrors,
    };
  }
  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: user,
  });
  return {
    messages: { success: "Thay đổi thành công" },
  };
}

export async function getUserInfo() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: session.user?.id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      gender: true,
      dateOfBirth: true,
      roles: true,
    },
  });
  return user;
}

export async function updatePassword(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const currentPassword = formData.get("currentPassword") as unknown as string;
  const user = await prisma.user.findFirst({
    select: {
      passwordHash: true,
    },
    where: {
      id: session.user?.id,
    },
  });
  const verified = await verify(
    user?.passwordHash as unknown as string,
    currentPassword
  );
  if (!verified)
    return {
      messages: {
        currentPassword: "Mật khẩu hiện tại sai",
      },
    };
  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      updatedAt: new Date(),
      passwordHash: await hash(
        formData.get("newPassword") as unknown as string
      ),
    },
  });
  return {
    messages: {
      success: "Thay đổi thành công",
    },
  };
}
