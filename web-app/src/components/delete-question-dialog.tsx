"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { Delete16Filled } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";

export default function DeleteQuestionDialog({ questionId }: { questionId: any }) {
  const router = useRouter();

  const handleOnClick = () => {
    const res = fetch("/api/questions/" + questionId, {
      method: "DELETE",
    });

    router.refresh();
    window.location.reload();

    return res;
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<Delete16Filled />}></Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Xóa câu hỏi</DialogTitle>
          <DialogContent>Bạn chắc chắn muốn xóa câu hỏi này?</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button>Không</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleOnClick}>
              Có
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
