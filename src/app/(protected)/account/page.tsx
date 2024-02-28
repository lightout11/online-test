import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import CustomTabs from "./custom-tabs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex flex-row">
      <CustomTabs />
    </div>
  );
}
