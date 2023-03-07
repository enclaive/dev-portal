/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useRef } from 'react'
import getFullNavHeaderHeight from 'lib/get-full-nav-header-height'
import { useIntegrationsSearchContext } from 'views/product-integrations-landing/contexts/integrations-search-context'
import Pagination from 'components/pagination'
import IntegrationsList from '../integrations-list'
import s from './style.module.css'

interface PaginatedIntegrationsListProps {
	onClearFiltersClicked: () => void
}

export default function PaginatedIntegrationsList({
	onClearFiltersClicked,
}: PaginatedIntegrationsListProps) {
	const isFirstRender = useRef(true)
	const containerRef = useRef(null)

	const {
		filteredIntegrations,
		paginatedIntegrations,
		page,
		setPage,
		pageSize,
		setPageSize,
	} = useIntegrationsSearchContext()

	/**
	 * If our pagination page changes, scroll up to the top of the wrapper.
	 *
	 * We also focus the search input, since otherwise, keyboard users would
	 * be scrolled to the top of the page (due to scrollTo), and then
	 * immediately scrolled to the bottom of the page.
	 *
	 * TODO: consider hooking into <Pagination/>'s `onPageChange`.
	 * This might be more clear than a separate effect (but for now, would
	 * not result in the same focus behaviour on the first result link.)
	 */
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		} else {
			// Try to find the first result link, and focus it
			const targetElement = containerRef.current?.querySelector('a')
			if (targetElement) {
				targetElement.focus({ forceVisible: true })
				/**
				 * We need to scroll up a bit, as the focused item may be slightly
				 * hidden behind the top navigation bar. Note this approach is slightly
				 * brittle, as --navigationHeader. We also add an extra 64px,
				 * which makes it more clear we've scrolled to the top of results.
				 */
				const navScrollCompensation = getFullNavHeaderHeight() + 64
				window.scrollBy(0, navScrollCompensation * -1)
			}
		}
	}, [page])

	return (
		<div className={s.paginatedIntegrationsList} ref={containerRef}>
			<IntegrationsList
				integrations={paginatedIntegrations}
				onClearFiltersClicked={onClearFiltersClicked}
			/>
			<div className={s.paginatorWrapper}>
				<Pagination
					onPageChange={setPage}
					onPageSizeChange={setPageSize}
					page={page}
					pageSize={pageSize}
					totalItems={filteredIntegrations.length}
				>
					<div className="g-hide-on-mobile">
						<Pagination.Info />
					</div>
					<div className="g-hide-on-mobile">
						<Pagination.Nav type="truncated" />
					</div>
					<div className="g-hide-on-tablet g-hide-on-desktop">
						<Pagination.Nav type="compact" />
					</div>
					<div className="g-hide-on-mobile g-hide-on-desktop">
						<Pagination.SizeSelector sizes={[4, 8, 16, 24]} />
					</div>
				</Pagination>
			</div>
		</div>
	)
}
