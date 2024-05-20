import { getResultsByTestId } from "@/actions/results";
import { getTest } from "@/actions/tests";
import { Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";
import CustomAccordion from "./custom-accordion";

export default async function Page({ params }) {
  const test = await getTest(params.id);
  const results = await getResultsByTestId(params.id);

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <h1>Thông tin kỳ thi</h1>
        </CardHeader>
        <CardBody>
          <p>Tên kỳ thi: {test?.name}</p>
          <p>Thời điểm bắt đầu: {test?.startDateTime.toLocaleString()}</p>
          <p>Thời điểm kết thúc: {test?.endDateTime.toLocaleString()}</p>
          <p>Thời gian làm bài: {test?.duration} phút</p>
        </CardBody>
      </Card>
      <Spacer />
      <CustomAccordion />
    </div>
  );
}
