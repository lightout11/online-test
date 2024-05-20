"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import ResultTable from "./result-table";

export default function CustomAccordion() {
  return (
    <Accordion defaultExpandedKeys={["result"]}>
      <AccordionItem key="result" title="Kết quả">
        <ResultTable />
      </AccordionItem>
    </Accordion>
  );
}
