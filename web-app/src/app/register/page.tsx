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
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null | undefined>();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const formData = {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      gender,
      date_of_birth: dateOfBirth?.toISOString(),
    };

    console.log(formData);

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      if (res.status === 201) {
        toast.success("Đăng ký thành công");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const res_body = await res.json();
        toast.error("Đăng ký thất bại: " + res_body.message);
      }
    });
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="min-h-screen flex flex-grow items-center justify-center p-8">
        <div className="flex rounded-3xl shadow-2xl p-8 justify-center items-center flex-col">
          <Label size="large" className="p-2">
            Đăng ký
          </Label>
          <Divider />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-2 justify-center items-center"
          >
            <div className="flex flex-col p-4">
              <Field label="Tên người dùng" required={true}>
                <Input onChange={(_, data) => setUsername(data.value)} />
              </Field>
              <Field label="Mật khẩu" required={true}>
                <Input
                  type="password"
                  onChange={(_, data) => setPassword(data.value)}
                />
              </Field>
              <Field label="Email" required={true}>
                <Input
                  type="email"
                  onChange={(_, data) => setEmail(data.value)}
                />
              </Field>
              <Field label="Họ" required={true}>
                <Input onChange={(_, data) => setLastName(data.value)} />
              </Field>
              <Field label="Tên" required={true}>
                <Input onChange={(_, data) => setFirstName(data.value)} />
              </Field>
              <Field label="Giới tính" required={true}>
                <RadioGroup
                  layout="horizontal"
                  value={gender}
                  onChange={(_, data) => setGender(data.value)}
                >
                  <Radio value="male" label="Nam" />
                  <Radio value="female" label="Nữ" />
                </RadioGroup>
              </Field>
              <Field label="Ngày sinh" required={true}>
                <DatePicker
                  onSelectDate={setDateOfBirth}
                />
              </Field>
            </div>
            <Button type="submit">Đăng ký</Button>
          </form>
        </div>
      </main>
    </FluentProvider>
  );
}
