import { Card, CardBody, Input } from "@nextui-org/react";
import TestForm from "./test-form";

export default async function Page() {
  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <TestForm />
        </CardBody>
      </Card>
    </div>
  );
}
