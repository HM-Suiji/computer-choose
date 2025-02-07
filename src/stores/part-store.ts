import { Part } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
	parts: Part[]
	addPart: (part: Part) => void
	deletePart: (id: string) => void
	editPart: (partName: string, part: Part) => void
	clearParts: () => void
}

const usePartStore = create<State>()(
	persist(
		(set) => ({
			parts: [],
			addPart: (part) => set((state) => ({ parts: [...state.parts, part] })),
			deletePart: (id) =>
				set((state) => ({
					parts: state.parts.filter((part) => part.id !== id),
				})),
			editPart: (partId, part) =>
				set((state) => {
					const cur_parts = state.parts.concat()
					const index = cur_parts.findIndex((part) => part.id === partId)
					cur_parts[index] = part
					return {
						parts: cur_parts,
					}
				}),
			clearParts: () => set({ parts: [] }),
		}),
		{
			name: 'parts-storage',
		}
	)
)

export { usePartStore }
