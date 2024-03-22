"use client";

import SubmitButton from "@/components/submit-button";
import { updateUserInfo } from "@/actions/users";
import {
  Checkbox,
  CheckboxGroup,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import useSWR from "swr";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  roles: string[];
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const initialState = {
  messages: {},
};

export default function AccountForm() {
  const [formState, formAction] = useFormState(
    updateUserInfo,
    initialState
  ) as any;
  const { data, isLoading } = useSWR("api/users/info", fetcher, {
    keepPreviousData: true,
  });
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form action={formAction}>
      <Input
        isRequired
        name="lastName"
        value={info ? info.lastName : ""}
        label="Họ"
        onValueChange={(val) => setInfo({ ...info, lastName: val })}
      />
      <Spacer />
      <Input
        isRequired
        name="firstName"
        value={info ? info.firstName : ""}
        label="Tên"
        onValueChange={(val) => setInfo({ ...info, firstName: val })}
      />
      <Spacer />
      <Input
        isRequired
        name="email"
        type="email"
        value={info ? info.email : ""}
        label="Email"
        onValueChange={(val) => setInfo({ ...info, email: val })}
      />
      <Spacer />
      <RadioGroup
        isRequired
        name="gender"
        label="Giới tính"
        orientation="horizontal"
        value={info ? info.gender : ""}
        onValueChange={(val) => setInfo({ ...info, gender: val })}
      >
        <Radio value="male">Nam</Radio>
        <Radio value="female">Nữ</Radio>
      </RadioGroup>
      <Spacer />
      <Input
        isRequired
        name="dateOfBirth"
        value={
          info ? new Date(info.dateOfBirth).toISOString().split("T")[0] : ""
        }
        label="Ngày sinh"
        type="date"
        onValueChange={(val) => {
          setInfo({
            ...info,
            dateOfBirth: new Date(Date.parse(val)).toISOString().split("T")[0],
          });
        }}
      />
      <Spacer />
      <CheckboxGroup
        isRequired
        name="roles"
        label="Vai trò"
        orientation="horizontal"
        value={info ? info.roles : []}
        onValueChange={(val) => setInfo({ ...info, roles: val })}
      >
        <Checkbox value="examinee">Thí sinh</Checkbox>
        <Checkbox value="examiner">Ra đề</Checkbox>
      </CheckboxGroup>
      <Spacer />
      {renderError()}
      <SubmitButton label="Lưu thay đổi" />
    </form>
  );
}
