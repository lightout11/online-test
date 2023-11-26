"use client";

import { Label, Button, TabList, Tab } from "@fluentui/react-components";
import { SearchBox } from "@fluentui/react-search-preview";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex justify-center flex-row p-4 items-center">
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
      <div className="p-2">
        <Button
          onClick={() => {
            router.push("/auth/login");
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
    </header>
  );
}
