import * as React from 'react'

import { IconSvgProps } from '@/types'

export const Logo: React.FC<IconSvgProps> = ({
	size = 36,
	height,
	...props
}) => (
	<svg
		fill="none"
		height={size || height}
		viewBox="0 0 200 200"
		width={size || height}
		{...props}>
		<circle
			cx="100"
			cy="100"
			r="95"
			fill="#f0f4f8"
			stroke="#3b82f6"
			strokeWidth="10"
		/>
		<rect
			x="50"
			y="40"
			width="100"
			height="70"
			rx="10"
			fill="#ffffff"
			stroke="#4a5568"
			strokeWidth="4"
		/>
		<rect
			x="40"
			y="115"
			width="120"
			height="40"
			rx="8"
			fill="#e2e8f0"
			stroke="#4a5568"
			strokeWidth="4"
		/>
		<line
			x1="45"
			y1="125"
			x2="155"
			y2="125"
			stroke="#4A5568"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<line
			x1="45"
			y1="135"
			x2="155"
			y2="135"
			stroke="#4A5568"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<line
			x1="45"
			y1="145"
			x2="105"
			y2="145"
			stroke="#4A5568"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path
			d="M120 70L140 50V90L120 70Z"
			fill="#68d391"
			stroke="#38a169"
			strokeWidth="3"
		/>
		<text x="127" y="75" fontFamily="Arial" fontSize="12" fill="#ffffff">
			¥
		</text>
		<line
			x1="70"
			y1="80"
			x2="90"
			y2="80"
			stroke="#3b82f6"
			strokeWidth="4"
			strokeLinecap="round"
		/>
		<line
			x1="80"
			y1="70"
			x2="80"
			y2="90"
			stroke="#3b82f6"
			strokeWidth="4"
			strokeLinecap="round"
		/>
	</svg>
)

export const PencilIcon: React.FC<IconSvgProps> = ({
	size = 36,
	height,
	width,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size || width}
		height={size || height}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-pencil"
		{...props}>
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
		<path d="m15 5 4 4" />
	</svg>
)

export const MoonFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}>
		<path
			d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
			fill="currentColor"
		/>
	</svg>
)

export const SunFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}>
		<g fill="currentColor">
			<path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
			<path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
		</g>
	</svg>
)
export const GithubIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}>
			<path
				clipRule="evenodd"
				d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	)
}
