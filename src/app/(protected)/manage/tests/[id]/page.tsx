import { getTest } from "@/lib/tests";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default async function Page({ params }: { params: { id: string } }) {
  const test = await getTest(params.id);

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
    </div>
  );
}
