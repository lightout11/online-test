import { Button, Link } from "@nextui-org/react";

export default async function Page() {
    return (
        <Button as={Link} href="/manage/questions/new">Tạo câu hỏi</Button>
    )
}