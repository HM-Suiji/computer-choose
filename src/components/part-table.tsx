import { usePartModalStore, usePartStore } from '@/stores'
import { Button } from '@heroui/button'
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@heroui/table'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { PartForm } from './part-form'
import { Part } from '@/types'

const PartAction: React.FC<{
	partName: string
	deletePart: (partName: string) => void
	editPart: (partName: string) => void
}> = ({ partName, deletePart, editPart }) => (
	<>
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button color="danger">删除</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="px-1 py-2 flex flex-col items-center gap-1">
					<div className="font-bold">你确定要删除吗</div>
					<Button color="danger" size="sm" onPress={() => deletePart(partName)}>
						确定
					</Button>
				</div>
			</PopoverContent>
		</Popover>
		<Button onPress={() => editPart(partName)} color="primary" variant="light">
			编辑
		</Button>
	</>
)

const PartEditModal: React.FC = () => {
	const isOpen = usePartModalStore((state) => state.isOpen)
	const onOpenChange = usePartModalStore((state) => state.onOpenChange)
	const partName = usePartModalStore((state) => state.partName)
	const parts = usePartStore((state) => state.parts)
	const editPart = usePartStore((state) => state.editPart)
	const part = parts.find((part) => part.name === partName)!
	const onSubmit = (part: Part) => {
		editPart(partName, part)
		onOpenChange(false)
	}

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					编辑配件：{partName}
				</ModalHeader>
				<ModalBody>
					<PartForm {...part} onSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export const PartTable: React.FC = () => {
	const parts = usePartStore((state) => state.parts)
	const deletePart = usePartStore((state) => state.deletePart)
	const onOpenChange = usePartModalStore((state) => state.onOpenChange)
	const setPartName = usePartModalStore((state) => state.setPartName)

	const editPart = (partName: string) => {
		onOpenChange(true)
		setPartName(partName)
	}

	return (
		<>
			<Table aria-label="Part Table">
				<TableHeader>
					<TableColumn>配件类型</TableColumn>
					<TableColumn>配件名称</TableColumn>
					<TableColumn>价格</TableColumn>
					<TableColumn>操作</TableColumn>
				</TableHeader>
				<TableBody>
					{parts.map((part) => (
						<TableRow key={part.name}>
							<TableCell>{part.type}</TableCell>
							<TableCell>{part.name}</TableCell>
							<TableCell>{part.price}</TableCell>
							<TableCell>
								<PartAction
									partName={part.name}
									deletePart={deletePart}
									editPart={editPart}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<PartEditModal />
		</>
	)
}
