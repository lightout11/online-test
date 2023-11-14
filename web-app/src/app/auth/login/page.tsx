'use client'

import { Button, Divider, Field, FluentProvider, Input, Label, Link, webLightTheme } from "@fluentui/react-components";

export default function Page() {
    return (
        <FluentProvider theme={webLightTheme}>
            <main className="min-h-screen flex flex-grow items-center justify-center p-8">
                <div className="flex rounded-3xl shadow-2xl p-8 justify-center items-center flex-col">
                    <Label size="large" className="p-2">Đăng nhập</Label>
                    <Divider />
                    <form className="flex flex-col p-2 justify-center items-center">
                        <div className="flex flex-col p-4 justify-center items-center">
                            <Field label="Tên người dùng">
                                <Input />
                            </Field>
                            <Field label="Mật khẩu">
                                <Input type="password" />
                            </Field>
                        </div>
                        <Button type="submit">Đăng nhập</Button>
                    </form>
                    <Link href="/">Quên mật khẩu</Link>
                </div>
            </main>
        </FluentProvider>
    );
}
