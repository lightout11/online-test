"use client";

import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableColumnDefinition,
  createTableColumn,
  useFluent,
  useScrollbarWidth,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  question: string;
  question_type: string;
  correct_answer: string;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "question",
    renderHeaderCell: () => {
      return "Question";
    },
    renderCell: (item) => {
      return item.question;
    },
  }),
  createTableColumn<Item>({
    columnId: "question_type",
    renderHeaderCell: () => {
      return "Type";
    },
    renderCell: (item) => {
      return item.question_type;
    },
  }),
  createTableColumn<Item>({
    columnId: "correct_answer",
    renderHeaderCell: () => {
      return "Correct Answer";
    },
    renderCell: (item) => {
      return item.correct_answer;
    },
  }),
];

export default function QuestionTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    fetch("/api/questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setItems(resJson);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (isClient)
    return (
      <DataGrid
        items={items}
        columns={columns}
        selectionMode="multiselect"
        getRowId={(item) => item.question}
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => {
            return (
              <DataGridRow<Item>
                key={rowId}
                selectionCell={{ "aria-label": "Select row" }}
              >
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            );
          }}
        </DataGridBody>
      </DataGrid>
    );
}
