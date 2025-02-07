import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { PartForm } from './part-form'
import { usePartModalStore, usePartStore } from '@/stores'
import { useMemo } from 'react'
import { Part } from '@/types'

export const PartEditModal: React.FC = () => {
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
					编辑配件：{part?.name || ''}
				</ModalHeader>
				<ModalBody>
					<PartForm part={part} onSubmit={onSubmit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
