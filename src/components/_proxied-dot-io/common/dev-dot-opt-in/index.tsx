import { IconAlertCircleFill16 } from '@hashicorp/flight-icons/svg-react/alert-circle-fill-16'
import useProductMeta from '@hashicorp/platform-product-meta'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { ProductData } from 'types/products'
import s from './dev-dot-opt-in.module.css'

const DAYS_UNTIL_EXPIRE = 180

const getDevDotLink = (product, path) => {
	const pathWithoutProxy = path.includes('_proxied-dot-io')
		? path.split('/').slice(3).join('/') // remove proxy path segments, which are present during SSR
		: path.slice(1) // remove leading slash
	const url = new URL(
		`/${product}/${pathWithoutProxy}`,
		__config.dev_dot.canonical_base_url
	)
	url.searchParams.set('optInFrom', `${product}-io`)

	return url.toString()
}

/**
 * Largely copied from: https://github.com/hashicorp/learn/pull/4480
 */
export default function DevDotOptIn({ product }: { product?: ProductData }) {
	const { asPath } = useRouter()
	const productMeta = useProductMeta()

	// Prefer `product` prop over `productMeta`
	const productName = product?.name || productMeta.name
	const productSlug = product?.slug || productMeta.slug

	function handleOptIn() {
		// Set a cookie to ensure any future navigation will send them to dev dot
		Cookies.set(`${productSlug}-io-beta-opt-in`, true, {
			expires: DAYS_UNTIL_EXPIRE,
		})
	}

	return (
		<div className={s.container}>
			<IconAlertCircleFill16 className={s.icon} />
			<p className={s.alert}>
				The {productName} website is being redesigned to help you find what you
				are looking for more effectively.
				<a
					className={s.optInLink}
					href={getDevDotLink(productSlug, asPath)}
					onClick={handleOptIn}
				>
					Join the Beta
				</a>
			</p>
		</div>
	)
}
