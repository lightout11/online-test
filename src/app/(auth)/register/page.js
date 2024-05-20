import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import RegistrationForm from "./registration-form";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <Link href="/">Thi Online</Link>
      </CardHeader>
      <CardBody>
        <RegistrationForm />
      </CardBody>
    </Card>
  );
}
