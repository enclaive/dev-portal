import classNames from 'classnames'
import { useDisclosure } from 'components/disclosure/provider'
import disclosureStyles from 'components/disclosure/disclosure.module.css'
import { DisclosureContentProps } from './types'

/**
 * Component for rendering content within a `Disclosure`.
 *
 * @see https://developer.hashi-mktg.com/swingset/components/disclosure
 */
const DisclosureContent = ({ children, className }: DisclosureContentProps) => {
  const { contentContainerId } = useDisclosure()

  return (
    <div
      className={classNames(disclosureStyles.contentContainer, className)}
      id={contentContainerId}
    >
      {children}
    </div>
  )
}

export type { DisclosureContentProps }
export default DisclosureContent
