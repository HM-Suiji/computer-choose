import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export interface Part {
	id: string
	type: PartType
	name: string
	price: number
}

export interface Scheme {
	id: string
	name: string
	parts: Record<PartType, (Part & { quantity: number })[]>
}

export const partType = [
	'CPU',
	'显卡',
	'风扇',
	'水冷',
	'机箱',
	'内存',
	'主板',
	'电源',
	'固态',
	'配件',
	'显示器',
] as const

export type PartType = (typeof partType)[number]

export function isPartArray(
	data: Record<string | number, string | number | boolean>[]
) {
	return (
		Array.isArray(data) &&
		data.every(
			(item) =>
				typeof item === 'object' &&
				item !== null &&
				'type' in item &&
				'name' in item &&
				'price' in item &&
				typeof item.name === 'string' &&
				typeof item.price === 'number' &&
				Object.values(partType).includes(item.type as any)
		)
	)
}
