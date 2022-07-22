import { useSession, signIn, signOut } from 'next-auth/react'
import { SessionData, UserData, ValidAuthProviderId } from 'types/auth'

const DEFAULT_PROVIDER_ID = ValidAuthProviderId.CloudIdp

/**
 * A minimal wrapper around next-auth/react's `signIn` function. Purpose is to
 * handle invoking the wrapped function with a default value.
 */
const signInWrapper = (provider: ValidAuthProviderId = DEFAULT_PROVIDER_ID) => {
	return signIn(provider)
}

interface UseAuthenticationOptions {
	/**
	 * Optional boolean. If true, `onUnauthenticated` is invoked if the user is
	 * not been authenticated.
	 */
	isRequired?: boolean

	/**
	 * Optional callback function. Invoked by next-auth when `isRequired` is true.
	 * By default, we invoke `signInWrapper` with no parameters.
	 */
	onUnauthenticated?: () => void
}

/**
 * Hook for consuming user, session, and authentication state. Sources all data
 * from next-auth/react's `useSession` hook.
 */
const useAuthentication = (options: UseAuthenticationOptions = {}) => {
	// Get option properties from `options` parameter
	const { isRequired = false, onUnauthenticated = () => signInWrapper() } =
		options

	// Pull data and status from next-auth's hook, and pass options
	const { data, status } = useSession({
		required: isRequired,
		onUnauthenticated,
	})

	// Deriving booleans about auth state
	const isLoading = status === 'loading'
	const isAuthenticated = status === 'authenticated'

	// Separating user and session data
	let session: SessionData, user: UserData
	if (isAuthenticated) {
		session = { ...data }
		user = data.user
		delete session.user
	}

	// Return everything packaged up in an object
	return {
		isAuthenticated,
		isLoading,
		session,
		signIn: signInWrapper,
		signOut,
		status,
		user,
	}
}

export default useAuthentication
