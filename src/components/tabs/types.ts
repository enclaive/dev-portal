import { ReactNode } from 'react'
/**
 * TODO: We more than likely want to require an accessible label on Tabs in the
 * future, but we do not currently require it on our existing Tabs from
 * react-components. For migration purposes, labels are not currently marked as
 * required.
 *
 * The commented out code below this `TabsProps` interface is how we would
 * accomplish requiring either `aria-label` or `aria-labelledby`.
 */
export interface TabsProps {
  /**
   * A non-visible label describing the purpose of the Tabs
   */
  ariaLabel?: string

  /**
   * The `id` of an element containing a label describing the purpose of the
   * Tabs
   */
  ariaLabelledBy?: string

  /**
   * At least two `Tab` components, one for each button and panel to render
   */
  children: ReactNode

  /**
   * The index of the tab to show as active on initial render
   */
  initialActiveIndex?: number

  /**
   * Whether or not a full-width border should be shown below the tab buttons
   */
  showAnchorLine?: boolean
}

// interface BaseProps {
//   children: ReactNode
//   initialActiveIndex?: number
// }

// interface PropsForAriaLabel extends BaseProps {
//   ariaLabel: string
//   ariaLabelledBy?: never
// }

// interface PropsForAriaLabelledBy extends BaseProps {
//   ariaLabel?: never
//   ariaLabelledBy: string
// }

// export type TabsProps = PropsForAriaLabel | PropsForAriaLabelledBy

/**
 * RawTabItem is used for items parsed directly from <Tab /> children
 */
export interface RawTabItem {
  label: string
  content: ReactNode
  group?: string
}

/**
 * RawTabItemWithID includes tabId & panelId properties.
 * These are regenerated at the same time as RawTabItem entries are parsed,
 * so the separation here is for convenience and clarity.
 */
export interface RawTabItemWithIds extends RawTabItem {
  tabId: string
  panelId: string
}

/**
 * TabItem includes all properties needed to render tabs,
 * which includes active state.
 */
export interface TabItem extends RawTabItemWithIds {
  isActive: boolean
}

/**
 * TabControlsProps is used for both TabButtonControls & TabDropdownControls.
 * Those components are meant to be interchangeable, so they share
 * the same interface.
 */
export interface TabControlsProps {
  tabItems: TabItem[]
  activeTabIndex: number
  setActiveTabIndex: (newActiveIndex: number) => void
  ariaLabel?: TabsProps['ariaLabel']
  ariaLabelledBy?: TabsProps['ariaLabelledBy']
}
