import type { NavigateOptions } from 'react-router-dom'

import { HeroUIProvider } from '@heroui/system'
import { useHref, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NavigateOptions
	}
}

export function Provider({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate()

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			{children}
			<ToastContainer position="bottom-right" autoClose={2000} />
		</HeroUIProvider>
	)
}
