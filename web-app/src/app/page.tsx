"use client";

import Header from "@/components/header";
import CardExample from "../components/card-example";
import { Divider, Label } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <FluentProvider theme={webLightTheme}>
        <main className="flex min-h-screen min-w-full flex-col items-center p-2 ">
          <Header />
          <Divider />
          <div className="flex flex-row items-center justify-center">
            <div className="shrink p-4 items-start">Left</div>
            <div className="grow p-4 items-center">
              <div className="p-2">
                <CardExample />
              </div>
              <div className="p-2">
                <CardExample />
              </div>
            </div>
            <div className="shrink p-4 items-end">Right</div>
          </div>
          <Divider />
          <footer className="flex p-4">
            <Label>End</Label>
          </footer>
        </main>
      </FluentProvider>
    </SessionProvider>
  );
}
