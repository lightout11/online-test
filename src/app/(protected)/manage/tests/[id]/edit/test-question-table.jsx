"use client"
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Input,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react"
import useSWR from "swr"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { removeQuestionsFromTest } from "@/actions/tests"
import toast from "react-hot-toast"

const columns = [
  {
    key: "content",
    label: "Câu hỏi"
  },
  {
    key: "type",
    label: "Loại"
  },
  {
    key: "difficulty",
    label: "Độ khó"
  },
  {
    key: "categories",
    label: "Danh mục"
  },
  {
    key: "owned",
    label: "Sở hữu"
  },
  {
    key: "isPublic",
    label: "Phạm vi"
  },
  {
    key: "actions",
    label: "Thao tác"
  }
]

const difficulty = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó"
}

const questionType = {
  shortAnswer: "Trả lời ngắn",
  openedAnswer: "Trả lời mở",
  multiChoice: "Chọn đáp án đúng",
  multiSelect: "Chọn nhiều đáp án đúng",
  ordering: "Sắp xếp",
  filling: "Điện vào chỗ trống"
}

const fetcher = url => fetch(url).then(res => res.json())

export default function TestQuestionTable({ session, testId }) {
  const router = useRouter()
  const { data, isLoading } = useSWR(`/api/tests/${testId}/questions`, fetcher)
  const [rows, setRows] = useState([])
  const [contentFilter, setContentFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoriesFilter, setCategoriesFilter] = useState("all")
  const [isPublicFilter, setIsPublicFilter] = useState("all")
  const [ownedFilter, setOwnedFilter] = useState("all")
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "content",
    direction: "ascending"
  })
  const [selectedItems, setSelectedItems] = useState(new Set([]))

  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [data])

  const onContentFilterChange = useCallback(value => {
    if (value) {
      setContentFilter(value)
    } else {
      setContentFilter("")
    }
  }, [])

  const onClearContentFilter = useCallback(() => {
    setContentFilter("")
  }, [])

  const hasContentFilter = Boolean(contentFilter)

  const filteredItems = useMemo(() => {
    let filteredRows = [...rows]
    if (hasContentFilter) {
      filteredRows = filteredRows.filter(row =>
        row.content.toLowerCase().includes(contentFilter.toLowerCase())
      )
    }
    if (
      typeFilter !== "all" &&
      Array.from(typeFilter).length !== Object.keys(questionType).length
    ) {
      filteredRows = filteredRows.filter(row =>
        Array.from(typeFilter).includes(row.type)
      )
    }
    if (
      difficultyFilter !== "all" &&
      Array.from(difficultyFilter).length !== Object.keys(difficulty).length
    ) {
      filteredRows = filteredRows.filter(row =>
        Array.from(difficultyFilter).includes(row.difficulty)
      )
    }
    if (isPublicFilter !== "all" && Array.from(isPublicFilter).length !== 2) {
      filteredRows = filteredRows.filter(row =>
        Array.from(isPublicFilter).includes(
          row.isPublic === true ? "$.0" : "$.1"
        )
      )
    }
    return filteredRows
  }, [
    contentFilter,
    difficultyFilter,
    hasContentFilter,
    isPublicFilter,
    rows,
    typeFilter
  ])

  const sortedRows = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [filteredItems, sortDescriptor])

  const topContent = useMemo(() => {
    function handleRemove() {
      removeQuestionsFromTest(testId, Array.from(selectedItems)).then(res => {
        if (res.messages.success) {
          toast.success(res.messages.success)
          window.location.reload()
        }
      })
    }

    return (
      <div>
        <Button color="danger" onPress={handleRemove}>
          Xóa khỏi danh sách
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
        <Spacer />
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
            {Object.keys(questionType).map(key => (
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
            {Object.keys(difficulty).map(key => (
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
      </div>
    )
  }, [
    contentFilter,
    difficultyFilter,
    isPublicFilter,
    onClearContentFilter,
    onContentFilterChange,
    selectedItems,
    testId,
    typeFilter
  ])

  function renderActions(item) {
    function handleDeleteQuestion() {
      removeQuestionsFromTest(testId, [item.id]).then(res => {
        if (res.messages.success) {
          toast.success(res.messages.success)
          window.location.reload()
        }
      })
    }

    return (
      <Button color="danger" onPress={handleDeleteQuestion}>
        Xóa
      </Button>
    )
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
        {column => (
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
        {item => (
          <TableRow key={item.id}>
            <TableCell>{item.content}</TableCell>
            <TableCell>{questionType[item.type]}</TableCell>
            <TableCell>{difficulty[item.difficulty]}</TableCell>
            <TableCell>{item.categories}</TableCell>
            <TableCell>
              {item.userId == session.user?.id ? (
                <Chip color="success">Sở hứu</Chip>
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
  )
}
