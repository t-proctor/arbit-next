import '../styles/global.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, wallet } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import WalletTab from './components/WalletTab'
import { Box } from '@chakra-ui/react'
import * as Urql from 'urql'

const client = Urql.createClient({
	url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
})

const { chains, provider, webSocketProvider } = configureChains(
	[
		chain.mainnet,
		chain.polygon,
		chain.optimism,
		chain.arbitrum,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
			? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
			: []),
	],
	[alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }), publicProvider()]
)

const { wallets } = getDefaultWallets({
	appName: 'RainbowKit demo',
	chains,
})

const demoAppInfo = {
	appName: 'Rainbowkit Demo',
}

const connectors = connectorsForWallets([
	...wallets,
	{
		groupName: 'Other',
		wallets: [wallet.argent({ chains }), wallet.trust({ chains }), wallet.ledger({ chains })],
	},
])

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider,
})

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
	statement: 'Sign in to the Arbit app',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<SessionProvider refetchInterval={0} session={pageProps.session}>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
						<RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
							<Urql.Provider value={client}>
								<WalletTab />
								<Box maxW="70%" justifyContent="center" ml="25%" p="5" mt="5%">
									<Component {...pageProps} />
								</Box>
							</Urql.Provider>
						</RainbowKitProvider>
					</RainbowKitSiweNextAuthProvider>
				</WagmiConfig>
			</SessionProvider>
		</ChakraProvider>
	)
}
