"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import AccountForm from "./account-form";
import PasswordForm from "./password-form";

export default function CustomTabs() {
  const [selected, setSelected] = useState("account");

  return (
    <Tabs selectedKey={selected} onSelectionChange={setSelected}>
      <Tab key="account" title="Thay đổi thông tin cá nhân">
        <AccountForm />
      </Tab>
      <Tab key="password" title="Đổi mật khẩu">
        <PasswordForm />
      </Tab>
    </Tabs>
  );
}
