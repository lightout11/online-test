"use client";

import Header from "@/components/header";
import { Button, Divider, Label } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { SearchBox } from "@fluentui/react-search-preview";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="flex min-h-screen min-w-full flex-col items-center p-2 ">
        <Header />
        <Divider />
        <div className="flex flex-row items-center justify-center">
          <div className="shrink p-4 items-start">Left</div>
          <div className="grow p-4 items-center space-x-2">
            <Button
              onClick={() => {
                router.push("/tests/new_test");
              }}
            >
              Tạo bài thi
            </Button>
            <Button>Xóa</Button>
          </div>
          <div className="shrink p-4 items-end">Right</div>
        </div>
        <Divider />
        <footer className="flex p-4">
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  );
}
