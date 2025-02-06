import { create } from 'zustand'

interface State {
	isOpen: boolean
	partId: string
	onOpenChange: (isOpen: boolean) => void
	setPartId: (partId: string) => void
}

const usePartModalStore = create<State>()((set) => ({
	isOpen: false,
	partId: '',
	onOpenChange: (isOpen) => set({ isOpen }),
	setPartId: (partId) => set({ partId }),
}))

export { usePartModalStore }
