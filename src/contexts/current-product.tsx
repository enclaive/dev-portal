/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { createContext, ReactNode, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { ProductData } from 'types/products'

export type RouteChangeStartHandler = (url: string) => void

type CurrentProduct = ProductData | undefined

const CurrentProductContext = createContext<CurrentProduct>(undefined)
CurrentProductContext.displayName = 'CurrentProductContext'

interface CurrentProductProviderProps {
	children: ReactNode
	currentProduct: ProductData
}

const CurrentProductProvider = ({
	children,
	currentProduct,
}: CurrentProductProviderProps) => {
	const pathname = usePathname()
	const value = pathname === '/' ? null : currentProduct

	return (
		<CurrentProductContext.Provider value={value}>
			{children}
		</CurrentProductContext.Provider>
	)
}

const useCurrentProduct = (): ProductData => {
	const context = useContext(CurrentProductContext)
	// if (context === undefined) {
	// 	throw new Error(
	// 		'useCurrentProduct must be used within a CurrentProductProvider'
	// 	)
	// }

	return context || {}
}

export { CurrentProductProvider, useCurrentProduct }
