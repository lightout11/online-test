"use client"

import { Accordion, AccordionItem } from "@nextui-org/react"
import ResultTable from "./result-table"

export default function CustomAccordion() {
    return (
        <Accordion>
            <AccordionItem title="Kết quả">
                <ResultTable />
            </AccordionItem>
        </Accordion>
    )
}