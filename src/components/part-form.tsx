import { usePartStore } from '@/stores'
import { useState } from 'react'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Select, SelectItem } from '@heroui/select'
import { partType as partTypeList, PartType, Part } from '@/types'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'

export const PartForm: React.FC<{
	part?: Part
	onSubmit?: (part: Part) => void
}> = ({
	part: {
		id: defaultPartId,
		type: defaultPartType,
		name: defaultPartName,
		price: defaultPartPrice,
	} = {
		id: uuid(),
		type: partTypeList[0],
		name: '',
		price: 0,
	},
	onSubmit: defaultOnSubmit,
}) => {
	const addPart = usePartStore((state) => state.addPart)
	const parts = usePartStore((state) => state.parts)
	const [partType, setPartType] = useState<PartType>(defaultPartType)
	const [partName, setPartName] = useState<string>(defaultPartName)
	const [partPrice, setPartPrice] = useState<number>(defaultPartPrice)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (defaultOnSubmit) {
			return defaultOnSubmit({
				id: defaultPartId,
				type: partType,
				name: partName,
				price: partPrice,
			})
		}
		if (parts.find((part) => part.name === partName)) {
			return toast.error('该配件已存在', {
				autoClose: 2000,
			})
		}
		addPart({
			id: defaultPartId,
			type: partType,
			name: partName,
			price: partPrice,
		})
		setPartName(defaultPartName)
		setPartPrice(defaultPartPrice)
	}

	return (
		<Form
			className="w-full max-w-xs"
			validationBehavior="native"
			onSubmit={onSubmit}>
			<Select
				isRequired
				errorMessage="请选择配件类型"
				className="max-w-xs"
				name="partType"
				label="配件类型"
				defaultSelectedKeys={[defaultPartType]}
				value={partType}
				onChange={(e) => setPartType(e.target.value as PartType)}>
				{partTypeList.map((type) => (
					<SelectItem key={type}>{type}</SelectItem>
				))}
			</Select>
			<Input
				isRequired
				errorMessage="请输入配件名称"
				value={partName}
				onChange={(e) => setPartName(e.target.value)}
				label="配件名称"
				name="partName"
				placeholder="配件名称"
			/>
			<Input
				isRequired
				min={0}
				errorMessage="请输入配件价格"
				value={partPrice.toString()}
				onChange={(e) => setPartPrice(Number(e.target.value))}
				label="配件价格"
				name="partPrice"
				placeholder="配件价格"
				type="number"
			/>
			<Button type="submit" variant="bordered">
				确认
			</Button>
		</Form>
	)
}
