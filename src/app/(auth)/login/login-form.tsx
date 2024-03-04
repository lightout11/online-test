import { login } from "@/lib/login";
import { Button, Input, Spacer } from "@nextui-org/react";

export default async function LoginForm() {
  return (
    <form action={login}>
      <Input isRequired name="email" label="Email" />
      <Spacer />
      <Input isRequired name="password" label="Mật khẩu" type="password" />
      <Spacer />
      <Button type="submit">Đăng nhập</Button>
    </form>
  );
}
