import { Scheme } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

interface State {
	schemes: Scheme[]
	addScheme: () => void
	updateScheme: (schemeName: string, updatedScheme: Scheme) => void
	deleteScheme: (schemeName: string) => void
}

const useSchemeStore = create<State>()(
	persist(
		(set) => ({
			schemes: [],
			addScheme: () =>
				set((state) => ({
					schemes: [
						...state.schemes,
						{
							id: uuid(),
							name: '方案' + (state.schemes.length + 1),
							parts: {
								CPU: [],
								显卡: [],
								风扇: [],
								水冷: [],
								机箱: [],
								内存: [],
								主板: [],
								电源: [],
								固态: [],
								配件: [],
								显示器: [],
							},
						},
					],
				})),
			updateScheme: (schemeId, updatedScheme) =>
				set((state) => ({
					schemes: state.schemes.map((scheme) =>
						scheme.id === schemeId ? updatedScheme : scheme
					),
				})),
			deleteScheme: (schemeId) =>
				set((state) => ({
					schemes: state.schemes.filter((scheme) => scheme.id !== schemeId),
				})),
		}),
		{
			name: 'scheme-storage',
		}
	)
)

export { useSchemeStore }
