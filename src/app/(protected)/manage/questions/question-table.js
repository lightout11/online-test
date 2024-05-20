"use client";

import {
  Button,
  ButtonGroup,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { deleteQuestion, deleteQuestions } from "@/actions/questions";
import { useRouter } from "next/navigation";

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
    key: "owned",
    label: "Sở hữu",
  },
  {
    key: "isPublic",
    label: "Phạm vi",
  },
  {
    key: "actions",
    label: "Thao tác",
  },
];

const difficulty = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

const questionType = {
  shortAnswer: "Trả lời ngắn",
  openedAnswer: "Trả lời mở",
  multiChoice: "Chọn đáp án đúng",
  multiSelect: "Chọn nhiều đáp án đúng",
  ordering: "Sắp xếp",
  filling: "Điện vào chỗ trống",
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function QuestionTable({ session }) {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/questions", fetcher);
  const [rows, setRows] = useState([]);
  const [contentFilter, setContentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoriesFilter, setCategoriesFilter] = useState("all");
  const [isPublicFilter, setIsPublicFilter] = useState("all");
  const [ownedFilter, setOwnedFilter] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "content",
    direction: "ascending",
  });
  const [selectedItems, setSelectedItems] = useState(new Set([]));

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const onContentFilterChange = useCallback((value) => {
    if (value) {
      setContentFilter(value);
    } else {
      setContentFilter("");
    }
  }, []);

  const onClearContentFilter = useCallback(() => {
    setContentFilter("");
  }, []);

  const hasContentFilter = Boolean(contentFilter);

  const filteredItems = useMemo(() => {
    let filteredRows = [...rows];
    if (hasContentFilter) {
      filteredRows = filteredRows.filter((row) =>
        row.content.toLowerCase().includes(contentFilter.toLowerCase())
      );
    }
    if (
      typeFilter !== "all" &&
      Array.from(typeFilter).length !== Object.keys(questionType).length
    ) {
      filteredRows = filteredRows.filter((row) =>
        Array.from(typeFilter).includes(row.type)
      );
    }
    if (
      difficultyFilter !== "all" &&
      Array.from(difficultyFilter).length !== Object.keys(difficulty).length
    ) {
      filteredRows = filteredRows.filter((row) =>
        Array.from(difficultyFilter).includes(row.difficulty)
      );
    }
    if (isPublicFilter !== "all" && Array.from(isPublicFilter).length !== 2) {
      filteredRows = filteredRows.filter((row) =>
        Array.from(isPublicFilter).includes(
          row.isPublic === true ? "$.0" : "$.1"
        )
      );
    }
    return filteredRows;
  }, [
    contentFilter,
    difficultyFilter,
    hasContentFilter,
    isPublicFilter,
    rows,
    typeFilter,
  ]);

  const sortedRows = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const topContent = useMemo(() => {
    function handleDeleteQuestion() {
      deleteQuestions(Array.from(selectedItems)).then(() => {
        window.location.reload();
      });
    }

    return (
      <div>
        <ButtonGroup>
          <Button as={Link} color="primary" href="/manage/questions/new">
            Thêm câu hỏi
          </Button>
          <Button color="danger" onPress={handleDeleteQuestion}>
            Xóa các câu hỏi
          </Button>
        </ButtonGroup>
        <Spacer />
        <Input
          size="sm"
          radius="full"
          placeholder="Tìm nội dung câu hỏi..."
          value={contentFilter}
          onClear={onClearContentFilter}
          onValueChange={onContentFilterChange}
        />
        <Spacer />
        <ButtonGroup>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm">Loại câu hỏi</Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectionMode="multiple"
              closeOnSelect={false}
              selectedKeys={typeFilter}
              onSelectionChange={setTypeFilter}
            >
              {Object.keys(questionType).map((key) => (
                <DropdownItem key={key} value={key}>
                  {getKeyValue(questionType, key)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm">Độ khó</Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectionMode="multiple"
              closeOnSelect={false}
              selectedKeys={difficultyFilter}
              onSelectionChange={setDifficultyFilter}
            >
              {Object.keys(difficulty).map((key) => (
                <DropdownItem key={key} value={key}>
                  {getKeyValue(difficulty, key)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm">Phạm vi</Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectionMode="multiple"
              closeOnSelect={false}
              selectedKeys={isPublicFilter}
              onSelectionChange={setIsPublicFilter}
            >
              <DropdownItem value="public">Công khai</DropdownItem>
              <DropdownItem value="private">Riêng tư</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      </div>
    );
  }, [
    contentFilter,
    difficultyFilter,
    isPublicFilter,
    onClearContentFilter,
    onContentFilterChange,
    selectedItems,
    typeFilter,
  ]);

  function renderActions(item) {
    const deleteQuestionById = deleteQuestion.bind(null, item.id);

    return (
      <Dropdown>
        <DropdownTrigger>Thao tác</DropdownTrigger>
        <DropdownMenu
          disabledKeys={
            item.userId != session.user.id ? ["edit", "delete"] : []
          }
        >
          <DropdownItem
            key="view"
            as={Link}
            href={"/manage/questions/" + item.id}
          >
            Xem chi tiết
          </DropdownItem>
          <DropdownItem
            key="edit"
            as={Link}
            href={"/manage/questions/" + item.id + "/edit"}
          >
            Sửa
          </DropdownItem>
          <DropdownItem
            key="delete"
            onPress={() => {
              deleteQuestionById().then(() => window.location.reload());
            }}
          >
            Xóa
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Table
      selectionMode="multiple"
      topContent={topContent}
      topContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedItems}
      onSelectionChange={setSelectedItems}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={true}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent="Trống"
        items={sortedRows}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.content}</TableCell>
            <TableCell>{questionType[item.type]}</TableCell>
            <TableCell>{difficulty[item.difficulty]}</TableCell>
            <TableCell>{item.categories}</TableCell>
            <TableCell>
              {item.userId == session.user?.id ? (
                <Chip color="success">Sở hữu</Chip>
              ) : null}
            </TableCell>
            <TableCell>
              {item.isPublic ? (
                <Chip color="success">Công khai</Chip>
              ) : (
                <Chip>Riêng tư</Chip>
              )}
            </TableCell>
            <TableCell>{renderActions(item)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
