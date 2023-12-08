"use client";

import Header from "@/components/header";
import QuestionTable from "@/components/question-table";
import { Button, Divider, Label, makeStyles } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Add16Filled, Delete16Filled } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  divider: {
    flexGrow: 0,
  },
});

export default function Home() {
  const router = useRouter();
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="flex min-h-screen min-w-full flex-col items-center p-2">
        <Header />
        <Divider className={styles.divider} />
        <div className="flex flex-col flex-grow h-full min-w-full items-center">
          <div className="min-w-full p-2 items-center space-x-2">
            <div className="flex flex-row items-center justify-center p-2 space-x-2">
              <Button
                icon={<Add16Filled />}
                onClick={() => {
                  router.push("/questions/new_question");
                }}
              >
                Tạo câu hỏi
              </Button>
              <Button icon={<Delete16Filled />}>Xóa</Button>
            </div>
            <QuestionTable />
          </div>
          {/* <div className="shrink p-4 items-end">Right</div> */}
        </div>
        <Divider className={styles.divider} />
        <footer className="flex p-4">
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  );
}
