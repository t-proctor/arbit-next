import { WidgetProps } from '@worldcoin/id'
import dynamic from 'next/dynamic'
import { utils } from '@worldcoin/id'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { Button } from '@chakra-ui/react'

const submitNFT = async address => {
	const options = {
		method: 'POST',
		url: 'https://api.nftport.xyz/v0/metadata',
		headers: { 'Content-Type': 'application/json', Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY },
		data: {
			name: 'Verified Judge',
			description: 'This judge verified themselves on Worldcoin ID as human',
			file_url: 'https://ipfs.io/ipfs/bafkreifkil52vqgmaeba3mfvgs3hxt466lfcr5u7mbb4k2igdvelqrrgxa',
		},
	}
	console.log('options', options)
	const response = await axios.request(options)
	console.log('response', response)
	const options2 = {
		method: 'POST',
		url: 'https://api.nftport.xyz/v0/mints/customizable',
		headers: {
			'Content-Type': 'application/json',
			Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY,
		},
		data: {
			chain: 'polygon',
			contract_address: process.env.NEXT_PUBLIC_NFTPORT_JUDGE_ADDRESS,
			metadata_uri: response.data.metadata_uri,
			mint_to_address: address,
		},
	}
	const response2 = await axios.request(options2)
	console.log('options2', options2)
	console.log('response2', response2)
}
export default function WorldcoinBadge() {
	const WorldIDWidget = dynamic<WidgetProps>(() => import('@worldcoin/id').then(mod => mod.WorldIDWidget), {
		ssr: false,
	})
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>

	// const widgetProps: WidgetProps = {
	// 	// actionId: 'wid_staging_PCNQeDC5CX',
	// 	actionId: 'wid_staging_20aa3bc815bc51bc9c0f8cb953f5dc03',
	// 	signal: 'user-id-1',
	// 	enableTelemetry: true,
	// 	appName: 'ConfCon',
	// 	signalDescription: 'Get your ticket to ConfCon 2023',
	// 	// theme: 'dark',
	// 	debug: true, // Recommended **only** for development
	// 	onSuccess: result => console.log(result),
	// 	onError: ({ code, detail }) => console.log({ code, detail }),
	// 	onInitSuccess: () => console.log('Init successful'),
	// 	onInitError: error => console.log('Error while initialization World ID', error),
	// }
	// const WorldIDWidget = dynamic<WidgetProps>(() => import('@worldcoin/id').then(mod => mod.WorldIDWidget), {
	// 	ssr: false,
	// })
	return (
		// <WorldIDWidget {...widgetProps} />

		<WorldIDWidget
			actionId={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID}
			// actionId="wid_staging_20aa3bc815bc51bc9c0f8cb953f5dc03"
			// obtain this from developer.worldcoin.org
			signal="my_signal"
			enableTelemetry
			// onSuccess={verificationResponse => console.log(verificationResponse)}
			onSuccess={() => submitNFT(address)}
			onError={error => console.error(error)}
			debug={true} // to aid with debugging, remove in production
		/>
		// <Button onClick={() => submitNFT(address)}>Submit NFT</Button>
	)
}
