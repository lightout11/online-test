import { auth } from "@/auth";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth(); 
  if (session) redirect("/home");

  return (
    <main className="text-foreground bg-background">
      <Navbar position="static">
        <NavbarBrand as={Link} href="/">
          <p className="font-bold text-inherit">Thi Online</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/manage/questions"
              color="foreground"
              aria-current="page"
            >
              Quản lý câu hỏi
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/manage/tests">
              Quản lý bài thi
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Đăng nhập</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Đăng ký
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </main>
  );
}
