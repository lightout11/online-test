import { login } from "@/actions/login";
import { Button, Input, Link, Spacer } from "@nextui-org/react";

export default async function LoginForm() {
  return (
    <form action={login}>
      <Input isRequired name="email" type="email" label="Email" />
      <Spacer />
      <Input isRequired name="password" type="password" label="Mật khẩu" />
      <Spacer />
      <Button type="submit">Đăng nhập</Button>
      <Spacer />
      <div>
        Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
      </div>
    </form>
  );
}
