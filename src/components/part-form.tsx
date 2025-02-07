import { usePartStore } from '@/stores'
import { useCallback, useState } from 'react'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Select, SelectItem } from '@heroui/select'
import { partType as partTypeList, PartType, Part, isPartArray } from '@/types'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { generateCSV, parseCSV } from '@/utils/csv'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'

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
	const clearParts = usePartStore((state) => state.clearParts)
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

	const onFileChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.readAsText(file)
		reader.onload = (e) => {
			const str = (e.target?.result || '') as string
			const data = parseCSV(str)
			if (!data) return
			if (isPartArray(data)) {
				data.forEach((part) => {
					addPart({ ...part, id: uuid() } as Part)
				})
				toast.success('导入成功', {
					autoClose: 2000,
				})
			} else {
				toast.error('文件格式错误', {
					autoClose: 2000,
				})
			}
		}
	}

	const onFileOutput = useCallback(() => {
		const data = generateCSV(
			parts.map((part) => ({
				type: part.type,
				name: part.name,
				price: part.price,
			}))
		)
		const blob = new Blob([data], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'parts.csv'
		a.click()
		URL.revokeObjectURL(url)
		toast.success('导出成功', {
			autoClose: 2000,
		})
	}, [parts])

	return (
		<div className="w-full max-w-xs flex flex-col gap-4">
			<Form validationBehavior="native" onSubmit={onSubmit}>
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
			{!defaultOnSubmit && (
				<div className="flex flex-col gap-3">
					<Input type="file" accept=".csv" onInput={onFileChoose} />
					<Button color="secondary" onPress={onFileOutput}>
						导出配件
					</Button>
					<Popover placement="bottom" showArrow={true}>
						<PopoverTrigger>
							<Button color="danger">删除所有配件</Button>
						</PopoverTrigger>
						<PopoverContent>
							<div className="px-1 py-2 flex flex-col items-center gap-1">
								<div className="font-bold">你确定要删除吗</div>
								<Button color="danger" size="sm" onPress={clearParts}>
									确定
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			)}
		</div>
	)
}
