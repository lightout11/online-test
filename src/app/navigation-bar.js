"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export default function NavigationBar({ session }) {
  function renderAuth() {
    if (session) {
      return (
        <NavbarItem className="lg:flex">
          <Dropdown>
            <DropdownTrigger>
              <User as="button" name={session.user.name} />
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem as={Link} href="/account" key="settings">
                Cài đặt tài khoản
              </DropdownItem>
              <DropdownItem key="logout" onPress={async () => await signOut()}>
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      );
    } else {
      return (
        <>
          <NavbarItem className="lg:flex">
            <Button onPress={async () => await signIn()}>Đăng nhập</Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Đăng ký
            </Button>
          </NavbarItem>
        </>
      );
    }
  }

  return (
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
          <Link href="/manage/questions" color="foreground" aria-current="page">
            Quản lý câu hỏi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/manage/tests">
            Quản lý bài thi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/tests" color="foreground" aria-current="page">
            Thi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/results" color="foreground" aria-current="page">
            Kết quả
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{renderAuth()}</NavbarContent>
    </Navbar>
  );
}
