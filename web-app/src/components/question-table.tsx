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
} from "@fluentui/react-components";
import { SearchBox } from "@fluentui/react-search-preview";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteQuestionDialog from "./delete-question-dialog";
import QuestionDetailDialog from "./question-detail-dialog";
import EditQuestionDialog from "./edit-question-dialog";

export type Item = {
  _id: string;
  question_text: string;
  question_type: string;
  difficulty: string;
  categories: string;
  answer: string;
  choices: string[];
  correct_choice: string;
  selected_options: string[];
  order_items: string[];
  fills: string[];
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "question_id",
    renderHeaderCell: () => {
      return "Mã câu hỏi";
    },
    renderCell: (item) => {
      return item._id;
    },
  }),
  createTableColumn<Item>({
    columnId: "question_type",
    renderHeaderCell: () => {
      return "Loại câu hỏi";
    },
    renderCell: (item) => {
      switch (item.question_type) {
        case "shortAnswer":
          return "Trả lời ngắn";
        case "multipleChoice":
          return "Trắc nghiệm";
        case "multipleSelect":
          return "Trắc nghiệm nhiều đáp án";
        case "ordering":
          return "Sắp xếp";
        case "fillingParagraph":
          return "Điền vào đoạn văn";
      }
    },
  }),
  createTableColumn<Item>({
    columnId: "difficulty",
    renderHeaderCell: () => {
      return "Độ khó";
    },
    renderCell: (item) => {
      switch (item.difficulty) {
        case "easy":
          return "Dễ";
        case "normal":
          return "Trung bình";
        case "hard":
          return "Khó";
      }
    }
  }),
  createTableColumn<Item>({
    columnId: "categories",
    renderHeaderCell: () => {
      return "Lĩnh vực";
    },
    renderCell: (item) => {
      switch (item.categories) {
        case "math":
          return "Toán";
        case "physics":
          return "Vật lý";
        case "chemistry":
          return "Hóa học";
        case "biology":
          return "Sinh học";
        case "literature":
          return "Văn học";
        case "history":
          return "Lịch sử";
        case "geography":
          return "Địa lý"
      }
    }
  }),
  createTableColumn<Item>({
    columnId: "question_text",
    renderHeaderCell: () => {
      return "Câu hỏi";
    },
    renderCell: (item) => {
      return item.question_text;
    },
  }),
  createTableColumn<Item>({
    columnId: "action",
    renderHeaderCell: () => {
      return "Hành động";
    },
    renderCell: (item) => {
      return (
        <div className="space-x-2">
          <QuestionDetailDialog question={item} />
          <EditQuestionDialog item={item} />
          <DeleteQuestionDialog questionId={item._id} />
        </div>
      );
    },
  }),
];

export default function QuestionTable() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <SearchBox className="min-w-full" placeholder="Tìm câu hỏi" />
      <DataGrid
        items={items}
        columns={columns}
        selectionMode="multiselect"
        getRowId={(item) => item._id}
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
    </div>
  );
}
