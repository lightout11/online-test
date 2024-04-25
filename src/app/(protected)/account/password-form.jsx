"use client"

import { updatePassword } from "@/actions/users"
import { Button, Chip, Input, Spacer } from "@nextui-org/react"
import { useFormState } from 'react-dom'

const initialState = {
  messages: {}
}

export default function PasswordForm() {
  const [formState, formAction] = useFormState(updatePassword, initialState)

  function renderError() {
    if (Object.keys(formState.messages).length !== 0) {
      for (let field in formState.messages) {
        return (
          <>
            <Chip color="danger">{formState.messages[field]}</Chip>
            <Spacer />
          </>
        )
      }
    }
    return null
  }

  return (
    <form action={formAction}>
      <Input
        name="currentPassword"
        label="Mật khẩu hiện tại"
        type="password"
        isRequired
      />
      <Spacer />
      <Input
        name="newPassword"
        label="Mật khẩu mới"
        type="password"
        isRequired
      />
      <Spacer />
      {renderError()}
      <Button type="submit">Thay đổi</Button>
    </form>
  )
}
