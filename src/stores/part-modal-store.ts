import { create } from 'zustand'

interface State {
	isOpen: boolean
	partName: string
	onOpenChange: (isOpen: boolean) => void
	setPartName: (partName: string) => void
}

const usePartModalStore = create<State>()((set) => ({
	isOpen: false,
	partName: '',
	onOpenChange: (isOpen) => set({ isOpen }),
	setPartName: (partName) => set({ partName }),
}))

export { usePartModalStore }
