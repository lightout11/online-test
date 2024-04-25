"use client"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User
} from "@nextui-org/react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function CustomNavbar({ session }) {
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
            Câu hỏi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/manage/tests">
            Kỳ thi
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
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Dropdown>
            <DropdownTrigger>
              <User as="button" name={session.user?.name} />
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
      </NavbarContent>
    </Navbar>
  )
}
