'use client'

import { Button, Divider, Field, Input, Label, Textarea } from '@fluentui/react-components'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IFormInput {
  question: string,
  correct_answer: string
}

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="flex min-h-screen min-w-full flex-col items-center p-2 ">
        <header className='flex justify-center flex-row p-4 items-center'>
          <Label size='large' className='p-2 '>Thi Trắc Nghiệm</Label>
          <SearchBox className='m-2 p-2' />
          <div className='p-2'>
            <Button onClick={() => { router.push("/auth/login") }}>Đăng nhập</Button>
          </div>
          <div className='p-2'>
            <Button onClick={() => { router.push("/register") }}>Đăng ký</Button>
          </div>
        </header>
        <Divider />
        <div className='flex flex-row items-center justify-center'>
          <form onSubmit={(e) => {
            e.preventDefault();
            const nbody = {
              "question": e.currentTarget.question.value,
              "correct_answer": e.currentTarget.correct_answer.value
            };
            fetch("/api/questions/new_question", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(nbody)
            }).then((res) => { })
          }}>
            <div className='p-2'>
              <Field label="Câu hỏi" required={true}>
                <Textarea name='question' />
              </Field>
              <Field label="Đáp án đúng" required={true}>
                <Input name='correct_answer' />
              </Field>
            </div>
            <div className='p-2'>
              <Button type='submit'>Tạo câu hỏi</Button>
            </div>
          </form>
        </div>
        <Divider />
        <footer className='flex p-4'>
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  )
}