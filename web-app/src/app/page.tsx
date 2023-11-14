'use client'

import CardExample from '../components/card-example'
import { Button, Card, CardFooter, CardHeader, CardPreview, Divider, Label } from '@fluentui/react-components'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { SearchBox } from '@fluentui/react-search-preview'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

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
          <div className='shrink p-4 items-start'>Left</div>
          <div className='grow p-4 items-center'>
            <div className='p-2'>
              <CardExample />
            </div>
            <div className='p-2'>
              <CardExample />
            </div>
          </div>
          <div className='shrink p-4 items-end'>Right</div>
        </div>
        <Divider />
        <footer className='flex p-4'>
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  )
}
