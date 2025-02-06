import { Tabs, Tab } from '@heroui/tabs'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import { useEffect, useMemo, useState } from 'react'
import { Chip } from '@heroui/chip'
import { PieChart } from './pie-chart'
import { Part, PartType, partType, Scheme } from '@/types'
import { groupBy } from '@/utils/group-by'
import { usePartStore, useSchemeStore } from '@/stores'

const PartEditor: React.FC<{
	partType: PartType
	parts: Part[]
	scheme_parts: Part[]
	setNewScheme: React.Dispatch<React.SetStateAction<Scheme | undefined>>
}> = ({ partType, parts, scheme_parts, setNewScheme }) => {
	const [choosePart, setChoosePart] = useState<Part[]>()

	useEffect(() => {
		setChoosePart(scheme_parts)
	}, [parts, scheme_parts])

	useEffect(() => {
		if (choosePart) {
			setNewScheme((prev) => {
				if (!prev) return prev
				return {
					name: prev.name,
					parts: {
						...prev.parts,
						[partType]: choosePart,
					},
				}
			})
		}
	}, [choosePart])
	return (
		<div className="flex flex-wrap gap-2">
			{parts?.map((_part) => (
				<Chip
					className="cursor-pointer"
					onClick={() => {
						setChoosePart((_prev) => {
							return [_part]
						})
					}}
					key={_part.name}
					color={
						choosePart?.some((part) => part.name === _part.name)
							? 'primary'
							: 'default'
					}>
					{_part.name} - {_part.price}
				</Chip>
			))}
		</div>
	)
}

export const SchemeTab: React.FC = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [newScheme, setNewScheme] = useState<Scheme>()

	const schemes = useSchemeStore((state) => state.schemes)
	const addScheme = useSchemeStore((state) => state.addScheme)
	const deleteScheme = useSchemeStore((state) => state.deleteScheme)
	const updateScheme = useSchemeStore((state) => state.updateScheme)
	const parts = usePartStore((state) => state.parts)
	const group_parts = useMemo(() => groupBy(parts, 'type'), [parts])
	const scheme_data = useMemo(() => {
		const res: { name: string; value: number }[][] = []
		for (const scheme of schemes) {
			const _res: (typeof res)[number] = []
			for (const partType in scheme.parts) {
				_res.push({
					name: partType,
					//@ts-ignore
					value: scheme.parts[partType].reduce(
						//@ts-ignore
						(prev, part) => prev + part.price,
						0
					),
				})
			}
			res.push(_res)
		}
		return res
	}, [schemes])

	const handleFinishEdit = () => {
		setIsEditing(!isEditing)
		if (newScheme) {
			updateScheme(newScheme.name, newScheme)
		}
	}

	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Scheme Tabs"
				onSelectionChange={(key) => {
					setIsEditing(false)
					setNewScheme({
						name: key as string,
						//@ts-ignore
						parts: schemes?.find((scheme) => scheme.name === key)?.parts || {},
					})
				}}>
				{schemes.map((scheme, i) => (
					<Tab key={scheme.name} title={scheme.name}>
						<Card>
							<CardHeader className="flex justify-between">
								<p>{scheme.name}</p>
								{isEditing && '编辑ing'}
							</CardHeader>
							<CardBody>
								<div className="grid grid-cols-3 gap-4">
									<div className="flex flex-col gap-2 col-span-2">
										{partType.map((type) => (
											<div key={type} className="flex gap-4">
												<div>{type}:</div>
												<div className="flex flex-row gap-2">
													{isEditing ? (
														<PartEditor
															partType={type}
															parts={group_parts[type]}
															scheme_parts={scheme.parts[type]}
															setNewScheme={setNewScheme}
														/>
													) : (
														scheme.parts[type]?.map((part) => (
															<div key={part.name}>
																{part.name} - {part.price}
															</div>
														))
													)}
												</div>
											</div>
										))}
									</div>
									<PieChart data={scheme_data[i]} />
								</div>
								<div className="flex flex-row gap-2">
									<Popover placement="bottom" showArrow={true}>
										<PopoverTrigger>
											<Button color="danger">删除</Button>
										</PopoverTrigger>
										<PopoverContent>
											<div className="px-1 py-2 flex flex-col items-center gap-1">
												<div className="font-bold">你确定要删除吗</div>
												<Button
													color="danger"
													size="sm"
													onPress={() => deleteScheme(scheme.name)}>
													确定
												</Button>
											</div>
										</PopoverContent>
									</Popover>
									<Button
										color={isEditing ? 'default' : 'primary'}
										onPress={handleFinishEdit}>
										{isEditing ? '完成' : '编辑'}
									</Button>
								</div>
							</CardBody>
						</Card>
					</Tab>
				))}
				<Tab
					key="new"
					title={
						<Button className="bg-transparent" size="sm" onPress={addScheme}>
							+
						</Button>
					}>
					<Card>
						<CardBody>
							<p>新方案</p>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	)
}
