// return functional component with button that mints nft
import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'

export default function MintButton(props) {
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connectingâ€¦</div>
	if (isDisconnected) return <div>Disconnected</div>

	useEffect(() => {
		async function fetchData() {
			const options = {
				method: 'POST',
				url: 'https://api.nftport.xyz/v0/metadata',
				headers: { 'Content-Type': 'application/json', Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY },
				data: {
					name: props.caseObj.name,
					description: props.caseObj.description,
					file_url: 'https://ipfs.io/ipfs/bafkreifkil52vqgmaeba3mfvgs3hxt466lfcr5u7mbb4k2igdvelqrrgxa',
					custom_fields: {
						judge: props.caseObj.judge,
						party1: props.caseObj.party1,
						party2: props.caseObj.party2,
						winner: props.caseObj.winner,
						case_ruling: props.caseObj.caseRuling,
						tags: props.caseObj.tags,
					},
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
					contract_address: process.env.NEXT_PUBLIC_NFTPORT_CONTRACT_ADDRESS,
					metadata_uri: response.data.metadata_uri,
					mint_to_address: props.caseObj.judge,
				},
			}
			const response2 = await axios.request(options2)
			console.log('options2', options2)
			console.log('response2', response2)
		}
		fetchData()
	}, [])
	return <Button onClick={() => console.log('mint nft', JSON.stringify(props.caseObj))}>Mint NFT</Button>
}
