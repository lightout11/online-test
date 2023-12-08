"use client";

import Header from "@/components/header";
import {
  Button,
  Divider,
  Field,
  Input,
  Label,
} from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
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
            <form>
              <Field label="Tên bài thi" required={true}>
                <Input />
              </Field>
              <Field label="Ngày bắt đầu" required={true}>
                <DatePicker placeholder="Chọn ngày" />
                <Input type="time" />
              </Field>
              <Field label="Thời lượng (phút)" required={true}>
                <Input type="number" />
              </Field>
              <Button type="submit">Tạo bài thi</Button>
            </form>
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
