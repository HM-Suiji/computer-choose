import { usePartModalStore, usePartStore } from '@/stores'
import { Button } from '@heroui/button'
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	SortDescriptor,
} from '@heroui/table'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { Pagination } from '@heroui/pagination'
import { PartForm } from './part-form'
import { Part } from '@/types'
import { useEffect, useMemo, useState } from 'react'

const PartAction: React.FC<{
	partId: string
	deletePart: (partId: string) => void
	editPart: (partId: string) => void
}> = ({ partId, deletePart, editPart }) => (
	<>
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button color="danger">删除</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="px-1 py-2 flex flex-col items-center gap-1">
					<div className="font-bold">你确定要删除吗</div>
					<Button color="danger" size="sm" onPress={() => deletePart(partId)}>
						确定
					</Button>
				</div>
			</PopoverContent>
		</Popover>
		<Button onPress={() => editPart(partId)} color="primary" variant="light">
			编辑
		</Button>
	</>
)

const PartEditModal: React.FC = () => {
	const isOpen = usePartModalStore((state) => state.isOpen)
	const onOpenChange = usePartModalStore((state) => state.onOpenChange)
	const partId = usePartModalStore((state) => state.partId)
	const parts = usePartStore((state) => state.parts)
	const editPart = usePartStore((state) => state.editPart)
	const part = useMemo(
		() => parts.find((part) => part.id === partId)!,
		[partId, parts]
	)
	const onSubmit = (part: Part) => {
		editPart(partId, part)
		onOpenChange(false)
	}

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					编辑配件：{partId}
				</ModalHeader>
				<ModalBody>
					<PartForm part={part} onSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

const rowsPerPage = 6
export const PartTable: React.FC = () => {
	const [page, setPage] = useState(1)
	const parts = usePartStore((state) => state.parts)
	const pages = Math.ceil(parts.length / rowsPerPage)
	const deletePart = usePartStore((state) => state.deletePart)
	const onOpenChange = usePartModalStore((state) => state.onOpenChange)
	const setPartId = usePartModalStore((state) => state.setPartId)
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: '',
		direction: 'ascending',
	})

	const sortedItems = useMemo(() => {
		return [...parts].sort((a, b) => {
			const first = a[sortDescriptor.column as keyof Part]
			const second = b[sortDescriptor.column as keyof Part]
			if (first < second)
				return sortDescriptor.direction === 'ascending' ? -1 : 1
			if (first > second)
				return sortDescriptor.direction === 'ascending' ? 1 : -1
			return 0
		})
	}, [sortDescriptor, parts])

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage
		return sortedItems.slice(start, end)
	}, [page, sortedItems])

	const editPart = (partId: string) => {
		onOpenChange(true)
		setPartId(partId)
	}

	useEffect(() => {
		setPage(1)
	}, [sortDescriptor])

	return (
		<>
			<Table
				aria-label="Part Table"
				sortDescriptor={sortDescriptor}
				onSortChange={setSortDescriptor}
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="primary"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
				classNames={{
					wrapper: 'h-[30rem]',
				}}>
				<TableHeader>
					<TableColumn key="type" allowsSorting>
						配件类型
					</TableColumn>
					<TableColumn key="name" allowsSorting>
						配件名称
					</TableColumn>
					<TableColumn key="price" allowsSorting>
						价格
					</TableColumn>
					<TableColumn>操作</TableColumn>
				</TableHeader>
				<TableBody items={items} emptyContent={'暂无配件，请添加数据。'}>
					{(part) => (
						<TableRow key={part.id}>
							<TableCell>{part.type}</TableCell>
							<TableCell>{part.name}</TableCell>
							<TableCell>{part.price}</TableCell>
							<TableCell>
								<PartAction
									partId={part.id}
									deletePart={deletePart}
									editPart={editPart}
								/>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<PartEditModal />
		</>
	)
}
