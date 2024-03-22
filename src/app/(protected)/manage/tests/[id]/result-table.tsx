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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const columns = [
  {
    key: "name",
    label: "Thí sinh",
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ResultTable() {
  const params = useParams<{id: string}>();

  const { data, isLoading } = useSWR("/api/tests/" + params.id + "/results", fetcher);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  function renderActions(result: any) {
    return (
      <Button as={Link} href={params.id + "/" + result.id} color="success">
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
            <TableCell>
              {result.user.lastName + " " + result.user.firstName}
            </TableCell>
            <TableCell>{result.score}</TableCell>
            <TableCell>{renderActions(result)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
