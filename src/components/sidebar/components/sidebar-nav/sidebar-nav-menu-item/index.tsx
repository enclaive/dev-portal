import { KeyboardEventHandler, useRef, useState } from 'react'
import { IconChevronRight16 } from '@hashicorp/flight-icons/svg-react/chevron-right-16'
import useCurrentPath from 'hooks/use-current-path'
import { MenuItem } from 'components/sidebar'
import s from './style.module.css'

interface SidebarMenuItemProps {
  isSearching: boolean
  item: MenuItem
}

/**
 * Builds the path for an item based on the current page path.
 */
const getItemPath = (item: MenuItem, currentPath: string): string => {
  const currentPathSplit = currentPath.split('/')
  const currentProductSlug = currentPathSplit[1]
  const currentProductSubpage = currentPathSplit[2]

  return `/${currentProductSlug}/${currentProductSubpage}/${item.path}`
}

// TODO: use next/link
const SidebarNavLink = ({ item }) => {
  const currentPath = useCurrentPath({ excludeHash: true, excludeSearch: true })

  return (
    <li>
      <a
        aria-current={item.isActive ? 'page' : undefined}
        className={s.sidebarNavMenuItem}
        // TODO: this might break some accessible labels, probably need aria-label
        dangerouslySetInnerHTML={{ __html: item.title }}
        href={item.href || getItemPath(item, currentPath)}
      />
    </li>
  )
}

const SidebarNavSubmenu: React.FC<{
  isSearching: boolean
  item: MenuItem
}> = ({ isSearching, item }) => {
  const buttonRef = useRef<HTMLButtonElement>()
  const [isOpen, setIsOpen] = useState(item.hasActiveChild)

  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      setIsOpen(false)
      buttonRef.current.focus()
    }
  }

  /**
   * TODO: after ids are generated in sidebar-nav, set:
   *   - the <ul> id attribute based on the item.id
   *   - the <button> aria-controls attribute to be the <ul> id
   */
  return (
    <li>
      <button
        aria-expanded={isSearching || isOpen}
        className={s.sidebarNavMenuItem}
        onClick={() => setIsOpen((prevState) => !prevState)}
        ref={buttonRef}
      >
        <span className={s.submenuButtonLabel}>{item.title}</span>
        <IconChevronRight16 />
      </button>
      {(isSearching || isOpen) && (
        <ul onKeyDown={handleKeyDown}>
          {item.routes.map((route) =>
            route.routes ? (
              <SidebarNavSubmenu isSearching={isSearching} item={route} />
            ) : (
              <SidebarNavLink item={route} />
            )
          )}
        </ul>
      )}
    </li>
  )
}

const SidebarNavMenuItem: React.FC<SidebarMenuItemProps> = ({
  isSearching,
  item,
}) => {
  if (item.divider) {
    return <hr className={s.divider} />
  }

  if (item.routes) {
    return <SidebarNavSubmenu isSearching={isSearching} item={item} />
  }

  return <SidebarNavLink item={item} />
}

export default SidebarNavMenuItem
