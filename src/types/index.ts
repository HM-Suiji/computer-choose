import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export interface Part {
	type: PartType
	name: string
	price: number
}

export interface Scheme {
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
