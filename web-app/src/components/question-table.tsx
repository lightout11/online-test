import { TableCellLayout, TableColumnDefinition, createTableColumn } from "@fluentui/react-components"

type Item = {
    question: String
}

const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: "question",
        renderHeaderCell: () => {
            return "Question";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.question}
                </TableCellLayout>
            );
        },
    })
]

export default function QuestionTable() {

}