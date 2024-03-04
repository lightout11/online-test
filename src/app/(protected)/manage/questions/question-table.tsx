"use client";

import {
  Button,
  Chip,
  Dropdown,
  getKeyValue,
  Input,
  Link,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";

const columns = [
  {
    key: "content",
    label: "Câu hỏi",
  },
  {
    key: "type",
    label: "Loại",
  },
  {
    key: "difficulty",
    label: "Độ khó",
  },
  {
    key: "categories",
    label: "Danh mục",
  },
  {
    key: "isPublic",
    label: "Phạm vi",
  },
];

const difficulty: any = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

const questionType: any = {
  shortAnswer: "Trả lời ngắn",
  multiChoice: "Chọn đáp án đúng",
  multiSelect: "Chọn nhiều đáp án đúng",
  ordering: "Sắp xếp",
  filling: "Điện vào chỗ trống",
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function QuestionTable() {
  const { data, isLoading } = useSWR("/api/questions", fetcher);
  const [rows, setRows] = useState([]);
  const [contentFilter, setContentFilter] = useState("");

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const onContentFilterChange = useCallback((value?: string) => {
    if (value) {
      setContentFilter(value);
    } else {
      setContentFilter("");
    }
  }, []);

  const onClearContentFilter = useCallback(() => {
    setContentFilter("");
  }, []);

  const topContent = useMemo(() => {
    return (
      <div>
        <Button as={Link} color="primary" href="/manage/questions/new">
          Thêm câu hỏi
        </Button>
        <Spacer />
        <Input
          size="sm"
          radius="full"
          placeholder="Tìm nội dung câu hỏi..."
          value={contentFilter}
          onClear={onClearContentFilter}
          onValueChange={onContentFilterChange}
        />
      </div>
    );
  }, [contentFilter, onClearContentFilter, onContentFilterChange]);

  const hasContentFilter = Boolean(contentFilter);

  const filteredItems = useMemo(() => {
    let filteredRows = [...rows];
    if (hasContentFilter) {
      filteredRows = filteredRows.filter((row: any) =>
        row.content.toLowerCase().includes(contentFilter.toLowerCase())
      );
    }
    return filteredRows;
  }, [contentFilter, hasContentFilter, rows]);

  return (
    <Table
      selectionMode="multiple"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent="Trống"
        items={filteredItems}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.content}</TableCell>
            <TableCell>{questionType[item.type]}</TableCell>
            <TableCell>{difficulty[item.difficulty]}</TableCell>
            <TableCell>{item.categories}</TableCell>
            <TableCell>
              {item.isPublic ? (
                <Chip color="success">Công khai</Chip>
              ) : (
                <Chip>Riêng tư</Chip>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
