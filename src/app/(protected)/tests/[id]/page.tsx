import { getResultInfo } from "@/actions/results";
import { getTestInfo } from "@/actions/tests";
import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";
import test from "node:test";

export default async function Page({ params }: { params: { id: string } }) {
  const testInfo: any = await getTestInfo(params.id);
  const resultInfo: any = await getResultInfo(params.id);

  if (resultInfo.state === "inProgress") redirect(params.id + "/do");

  function renderAction() {
    switch (resultInfo.state) {
      case "completed":
        return (
          <div>
            <p>
              Điểm: {resultInfo.score}/{testInfo.maxScore}
            </p>
            <Button as={Link} href={"/results/" + params.id} color="success">
              Xem kết quả
            </Button>
          </div>
        );
      case "notStarted": {
        if (testInfo.state === "closed") {
          return <p>Bài thi đã đóng</p>;
        }
        return (
          <Button as={Link} href={params.id + "/do"} color="primary">
            Bắt đầu
          </Button>
        );
      }
    }
  }

  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <h1>{testInfo.name}</h1>
          <p>Thời gian làm bài: {testInfo?.duration} phút</p>
          {renderAction()}
        </CardBody>
      </Card>
    </div>
  );
}
