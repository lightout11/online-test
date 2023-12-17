"use client";

import {
  Label,
  Button,
  TabList,
  Tab,
  Persona,
} from "@fluentui/react-components";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const renderProfile = () => {
    
    if (session) {
      return (
        <div className="flex flex-row p-2 space-x-2">
          <Persona name={session.user?.email} />
          <Button onClick={() => signOut()}>Đăng xuất</Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row">
          <div className="p-2">
            <Button
              onClick={() => {
                // router.push("/auth/login");
                signIn();
              }}
            >
              Đăng nhập
            </Button>
          </div>
          <div className="p-2">
            <Button
              onClick={() => {
                router.push("/register");
              }}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <header className="flex justify-center flex-row p-2 items-center">
      <Label
        onClick={() => {
          router.push("/");
        }}
        size="large"
        className="p-2"
      >
        Thi Trắc Nghiệm
      </Label>
      <TabList>
        <Tab value="home" onClick={() => router.push("/")}>
          Trang chủ
        </Tab>
        <Tab value="tests" onClick={() => router.push("/tests")}>
          Bài thi
        </Tab>
        <Tab value="questions" onClick={() => router.push("/questions")}>
          Câu hỏi
        </Tab>
      </TabList>
      {renderProfile()}
    </header>
  );
}
