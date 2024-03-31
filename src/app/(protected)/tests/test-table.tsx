"use client";

import { deleteTest, deleteTests } from "@/actions/tests";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  SortDescriptor,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const columns = [
  {
    key: "name",
    label: "Tên kỳ thi",
  },
  {
    key: "startDateTime",
    label: "Thời điểm bắt đầu",
  },
  {
    key: "duration",
    label: "Thời gian làm bài",
  },
  {
    key: "endDateTime",
    label: "Thời điểm kết thúc",
  },
  {
    key: "actions",
    label: "Thao tác",
  },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TestTable({ session }: { session: any }) {
  const { data, isLoading } = useSWR("/api/examinee/tests", fetcher);
  const [tests, setTests] = useState([]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [nameFilter, setNameFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState<any>(new Set([]));
  const [durationFilter, setDurationFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [endTimeFilter, setEndTimeFilter] = useState("");

  const hasNameFilter = Boolean(nameFilter);
  const hasDurationFilter = Boolean(durationFilter);
  const hasStartDateFilter = Boolean(startDateFilter);

  useEffect(() => {
    if (data) {
      setTests(data);
    }
  }, [data]);

  const onStartDateFilterChange = useCallback((value?: string) => {
    if (value) {
      setStartDateFilter(value);
    } else {
      setStartDateFilter("");
    }
  }, []);

  const onClearStartDateFilter = useCallback(() => {
    setStartDateFilter("");
  }, []);

  const onNameFilterChange = useCallback((value?: string) => {
    if (value) {
      setNameFilter(value);
    } else {
      setNameFilter("");
    }
  }, []);

  const onClearNameFilter = useCallback(() => {
    setNameFilter("");
  }, []);

  const onDurationFilterChange = useCallback((value?: string) => {
    if (value) {
      setDurationFilter(value);
    } else {
      setDurationFilter("");
    }
  }, []);

  const onClearDurationFilter = useCallback(() => {
    setDurationFilter("");
  }, []);

  const filteredItems = useMemo(() => {
    let filteredRows = [...tests];
    if (hasNameFilter) {
      filteredRows = filteredRows.filter((row: any) =>
        row.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (hasDurationFilter) {
      filteredRows = filteredRows.filter((row: any) =>
        row.duration.toString().includes(durationFilter)
      );
    }
    if (hasStartDateFilter) {
      filteredRows = filteredRows.filter((row: any) => {
        row.startDateTime.toString().includes(startDateFilter);
      });
    }
    return filteredRows;
  }, [
    durationFilter,
    hasDurationFilter,
    hasNameFilter,
    hasStartDateFilter,
    nameFilter,
    startDateFilter,
    tests,
  ]);

  const sortedRows = useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const topContent = useMemo(() => {
    return (
      <div>
        <Input
          value={nameFilter}
          onClear={onClearNameFilter}
          onValueChange={onNameFilterChange}
          radius="full"
          placeholder="Tìm kiếm kỳ thi"
        />
        <Spacer />
        <Input
          placeholder="Tìm theo thời gian làm bài"
          radius="full"
          type="number"
          min="1"
          value={durationFilter}
          onClear={onClearDurationFilter}
          onValueChange={onDurationFilterChange}
        />
        <Spacer />
      </div>
    );
  }, [
    durationFilter,
    nameFilter,
    onClearDurationFilter,
    onClearNameFilter,
    onDurationFilterChange,
    onNameFilterChange,
  ]);

  function renderActions(item: any) {
    return (
      <Button as={Link} href={"tests/" + item.id}>
        Vào thi
      </Button>
    );
  }

  return (
    <Table
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      selectedKeys={selectedItems}
      onSelectionChange={setSelectedItems}
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn allowsSorting key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<CircularProgress />}
        emptyContent="Trống"
        items={sortedRows}
      >
        {(test: any) => (
          <TableRow key={test.id}>
            <TableCell>{test.name}</TableCell>
            <TableCell>
              {new Date(test.startDateTime).toLocaleString("vi-VN")}
            </TableCell>
            <TableCell>{test.duration} phút</TableCell>
            <TableCell>
              {new Date(test.endDateTime).toLocaleString("vi-VN")}
            </TableCell>
            <TableCell>{renderActions(test)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
