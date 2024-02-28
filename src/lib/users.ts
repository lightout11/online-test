"use server";

import { hash } from "argon2";
import { z } from "zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: Date;
  roles: string[];
}

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
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
  const validated = schema.safeParse(newUser);
  if (!validated.success) {
    console.log(validated.error.flatten().fieldErrors);
    return {
      messages: validated.error.flatten().fieldErrors
    }
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
  const passwordHash = await hash(formData.get("password") as unknown as string);
  newUser.passwordHash = passwordHash;
  delete newUser.password;
  await prisma.user.create({
    data: newUser,
  });
  revalidatePath("/login");
  redirect("/login");
}
