"use client";

import SubmitButton from "@/components/submit-button";
import { createNewUser } from "@/actions/users";
import {
  Checkbox,
  CheckboxGroup,
  Chip,
  Input,
  Link,
  Radio,
  RadioGroup,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  messages: {},
};

export default function RegistrationForm() {
  const [roles, setRoles] = useState([]);
  const [formState, formAction] = useFormState(createNewUser, initialState);

  function renderError() {
    if (Object.keys(formState.messages).length !== 0) {
      for (let field in formState.messages) {
        return (
          <>
            <Chip color="danger">{formState.messages[field]}</Chip>
            <Spacer />
          </>
        );
      }
    }
    return null;
  }

  return (
    <form action={formAction}>
      {renderError()}
      <Input
        name="lastName"
        label="Họ"
        labelPlacement="outside-left"
        isRequired
      />
      <Spacer />
      <Input
        name="firstName"
        label="Tên"
        labelPlacement="outside-left"
        isRequired
      />
      <Spacer />
      <Input
        name="email"
        type="email"
        label="Email"
        labelPlacement="outside-left"
        isRequired
      />
      <Spacer />
      <Input
        name="password"
        type="password"
        label="Mật khẩu"
        labelPlacement="outside-left"
        isRequired
      />
      <Spacer />
      <Input
        name="dateOfBirth"
        type="date"
        label="Ngày sinh"
        labelPlacement="outside-left"
        isRequired
      />
      <Spacer />
      <RadioGroup
        name="gender"
        label="Giới tính"
        isRequired
        orientation="horizontal"
      >
        <Radio value="male">Nam</Radio>
        <Radio value="female">Nữ</Radio>
      </RadioGroup>
      <Spacer />
      {/* <CheckboxGroup
        name="roles"
        value={roles}
        onValueChange={setRoles}
        label="Vai trò"
        isRequired
        orientation="horizontal"
      >
        <Checkbox value="examiner">Ra đề</Checkbox>
        <Checkbox value="examinee">Thí sinh</Checkbox>
      </CheckboxGroup>
      <Spacer /> */}
      <SubmitButton label="Đăng ký" />
      <Spacer />
      <div>
        Đã có tài khoản? <Link href="/api/auth/signin">Đăng nhập</Link>
      </div>
    </form>
  );
}
