import Link from 'next/link'
import HashiCorpLogo from '@hashicorp/mktg-logos/corporate/hashicorp/logomark/white.svg?include'
import InlineSvg from '@hashicorp/react-inline-svg'
import HeaderSearchInput from 'components/header-search-input'
import ProductSwitcher from 'components/product-switcher'
// TODO: we'll need a programatic way to get this data when there are more products
import waypointData from 'data/waypoint.json'
import s from './style.module.css'
import { useRouter } from 'next/router'

const isCurrentPage = (pagePath, currentPath) => {
  const currentPathSplit = currentPath.split('/')
  const currentProductSlug = currentPathSplit[1]
  const currentProductSubpage = currentPathSplit[2]

  if (currentProductSubpage) {
    return pagePath === `/${currentProductSlug}/${currentProductSubpage}`
  } else {
    return pagePath === `/${currentProductSlug}`
  }
}

const NavigationHeader: React.FC = () => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <header className={s.navigationHeader}>
      <nav>
        <div className={s.headerLeft}>
          <InlineSvg className={s.siteLogo} src={HashiCorpLogo} />
          <ProductSwitcher />
        </div>
        <div className={s.headerRight}>
          <ul className={s.navLinks}>
            {waypointData.subnavItems.map((navLink) => {
              const isCurrent = isCurrentPage(navLink.path, currentPath)

              return (
                <li className={s.navLinksListItem} key={navLink.id}>
                  <Link href={navLink.path}>
                    <a
                      aria-current={isCurrent ? 'page' : undefined}
                      className={s.navLinksAnchor}
                    >
                      {navLink.label}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
          <HeaderSearchInput />
        </div>
      </nav>
    </header>
  )
}

export default NavigationHeader
