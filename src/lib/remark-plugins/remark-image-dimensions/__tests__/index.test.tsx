/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render } from '@testing-library/react'

import remarkPluginCalculateImageDimensions from '../index'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { MdxThemedImage } from 'components/dev-dot-content/mdx-components'

const source = `
# Hello

How goes it

<ThemedImage
	src={{
        dark: 'img/boundary/boundary-components-min.png',
        light: 'img/boundary/boundary-desktop-cluster-url.png'
    }}
    alt='themed image'
    width='500'
    height='300'
/>
`

describe('themed image dimensions remark plugin', () => {
	process.env.VERCEL_ENV = 'preview'

	it('should rewrite src urls', async () => {
		const mdxSource = await serialize(source, {
			mdxOptions: {
				remarkPlugins: [remarkPluginCalculateImageDimensions],
			},
		})

		const { container, getAllByAltText } = render(
			<MDXRemote {...mdxSource} components={{ ThemedImage: MdxThemedImage }} />
		)

		expect(container).toMatchInlineSnapshot(`
		<div>
		  <h1>
		    Hello
		  </h1>
		  <p>
		    How goes it
		  </p>
		  <span
		    class="root"
		    data-hide-on-theme="dark"
		  >
		    <img
		      alt="themed image"
		      class="image"
		      data-nimg="1"
		      decoding="async"
		      height="431"
		      loading="lazy"
		      src="/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-desktop-cluster-url.png&w=3840&q=75"
		      srcset="/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-desktop-cluster-url.png&w=1200&q=75 1x, /_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-desktop-cluster-url.png&w=3840&q=75 2x"
		      style="color: transparent;"
		      width="1192"
		    />
		  </span>
		  <span
		    class="root"
		    data-hide-on-theme="light"
		  >
		    <img
		      alt="themed image"
		      class="image"
		      data-nimg="1"
		      decoding="async"
		      height="431"
		      loading="lazy"
		      src="/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-components-min.png&w=3840&q=75"
		      srcset="/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-components-min.png&w=1200&q=75 1x, /_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dtutorials%26version%3Dmain%26asset%3Dpublic%252Fimg%252Fboundary%252Fboundary-components-min.png&w=3840&q=75 2x"
		      style="color: transparent;"
		      width="1192"
		    />
		  </span>
		</div>
	`)
	})
})

/** *
 * test if THEMED IMAGE JSX
 *
 * test if light and dark are swapped
 *
 * test if asset 404s
 *
 * test various tabs / spacing setups
 *
 * test if width /height are passed that it overrides
 */
