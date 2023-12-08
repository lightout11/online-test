"use client";

import Header from "@/components/header";
import {
  Divider,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import CreateQuestionForm from "@/components/create-question-form";

const useStyles = makeStyles({
  divider: {
    flexGrow: 0,
  },
});

export default function Home() {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="flex min-h-screen min-w-full flex-col items-center p-2">
        <Header />
        <Divider as="div" className={styles.divider} />
        <div className="flex flex-col flex-grow h-full min-w-full items-center">
          <CreateQuestionForm />
        </div>
        <Divider as="div" className={styles.divider} />
        <footer className="flex p-4">
          <Label>End</Label>
        </footer>
      </main>
    </FluentProvider>
  );
}
