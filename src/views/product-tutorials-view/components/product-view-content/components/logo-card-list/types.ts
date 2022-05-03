import { Collection as ClientCollection } from 'lib/learn-client/types'
import { CompanyLogoOption } from 'lib/learn-client/types'

export interface LogoCardListItem {
  logo: CompanyLogoOption
  collection: ClientCollection
}

export interface LogoCardListProps {
  items: LogoCardListItem[]
}
