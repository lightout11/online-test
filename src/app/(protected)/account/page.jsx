import { Card, CardBody } from "@nextui-org/react"
import CustomTabs from "./custom-tabs"

export default async function Page() {
  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <CustomTabs />
        </CardBody>
      </Card>
    </div>
  )
}
