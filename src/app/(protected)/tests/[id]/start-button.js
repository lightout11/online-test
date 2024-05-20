"use client";

import { startTest } from "@/actions/tests";
import { Button } from "@nextui-org/react";

export default function StartButton({ resultId, testId }) {
  return (
    <Button onPress={async () => startTest(resultId, testId)} color="primary">
      Bắt đầu
    </Button>
  );
}
