"use client";

import {
  Button,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns = [
  {
    key: "name",
    label: "Tên kỳ thi",
  },
  {
    key: "score",
    label: "Điểm",
  },
  {
    key: "actions",
    label: "Thao tác",
  },
];

export default function Page() {
  const { data, isLoading } = useSWR("/api/examinee/results", fetcher);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  function renderActions(result: any) {
    return (
      <Button as={Link} href={"/results/" + result.test.id} color="success">
        Xem
      </Button>
    );
  }

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<CircularProgress />}
        emptyContent="Trống"
        items={results}
      >
        {(result: any) => (
          <TableRow key={result.id}>
            <TableCell>{result.test.name}</TableCell>
            <TableCell>{result.score}</TableCell>
            <TableCell>{renderActions(result)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
