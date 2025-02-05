import { Part } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
	parts: Part[]
	addPart: (part: Part) => void
	deletePart: (partName: string) => void
	editPart: (partName: string, part: Part) => void
}

const usePartStore = create<State>()(
	persist(
		(set) => ({
			parts: [],
			addPart: (part) => set((state) => ({ parts: [...state.parts, part] })),
			deletePart: (partName) =>
				set((state) => ({
					parts: state.parts.filter((part) => part.name !== partName),
				})),
			editPart: (partName, part) =>
				set((state) => {
					const cur_parts = state.parts.concat()
					const index = cur_parts.findIndex((part) => part.name === partName)
					cur_parts[index] = part
					return {
						parts: cur_parts,
					}
				}),
		}),
		{
			name: 'parts-storage',
		}
	)
)

export { usePartStore }
