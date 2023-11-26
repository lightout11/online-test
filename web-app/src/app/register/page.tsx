"use client";

import {
  Button,
  Divider,
  Field,
  FluentProvider,
  Input,
  Label,
  Link,
  Radio,
  RadioGroup,
  webLightTheme,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";

export default function Page() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main className="min-h-screen flex flex-grow items-center justify-center p-8">
        <div className="flex rounded-3xl shadow-2xl p-8 justify-center items-center flex-col">
          <Label size="large" className="p-2">
            Đăng ký
          </Label>
          <Divider />
          <form className="flex flex-col p-2 justify-center items-center">
            <div className="flex flex-col p-4">
              <Field label="Tên người dùng" required={true}>
                <Input />
              </Field>
              <Field label="Mật khẩu" required={true}>
                <Input type="password" />
              </Field>
              <Field label="Email" required={true}>
                <Input type="email" />
              </Field>
              <Field label="Họ" required={true}>
                <Input />
              </Field>
              <Field label="Tên" required={true}>
                <Input />
              </Field>
              <Field label="Giới tính" required={true}>
                <RadioGroup layout="horizontal">
                  <Radio value="male" label="Nam" />
                  <Radio value="female" label="Nữ" />
                </RadioGroup>
              </Field>
              <Field label="Ngày sinh" required={true}>
                <DatePicker />
              </Field>
            </div>
            <Button type="submit">Đăng ký</Button>
          </form>
        </div>
      </main>
    </FluentProvider>
  );
}
