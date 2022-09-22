import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { connect } from 'formik'

export default function NFTExpert() {
	// const { address, isConnecting, isDisconnected } = useAccount()
	const [isNFTExpert, setIsNFTExpert] = useState(false)
	const [isNFTExpertLoading, setIsNFTExpertLoading] = useState(true)
	// const address = 'demo.eth'
	const address = '0xfC43f5F9dd45258b3AFf31Bdbe6561D97e8B71de'
	const [data, setData] = useState(null)
	useEffect(() => {
		async function fetchData() {
			let provider = await new ethers.providers.JsonRpcProvider('https://smart-tame-frog.discover.quiknode.pro/')
			const heads = await provider.send('qn_fetchNFTs', {
				wallet: '0x91b51c173a4bdaa1a60e234fc3f705a16d228740',
				// wallet: address,
				omitFields: ['provenance', 'traits'],
				perPage: 40,
			})
			// 	// azuki, bayc, cryptopunks,
			// 	('0xED5AF388653567Af2F388E6224dC7C4b3241C544',
			// 	'0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
			// 	'0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB')
			// ]
			const nftIndex = lodash.findIndex(heads.assets, function (o) {
				const add = o.collectionAddress
				return (
					add == '0xED5AF388653567Af2F388E6224dC7C4b3241C544' ||
					add == '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' ||
					add == '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
				)
			})
			console.log(nftIndex)

			console.log('heads', heads)

			// 	// axie, decentraland, aavegotchi
			// 	('0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d',
			// 	'0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
			// 	'0x3F382DbD960E3a9bbCeaE22651E88158d2791550')
			// ][
			const heads2 = await provider.send('qn_getWalletTokenBalance', {
				// wallet: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
				wallet: address,
				contracts: [
					'0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d',
					'0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
					'0x3F382DbD960E3a9bbCeaE22651E88158d2791550',
					// '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				],
			})
			// [

			console.log('heads2', heads2)

			if (heads.totalPages > 1 && nftIndex > -1 && heads2.totalItems > 0) {
				setIsNFTExpert(true)
			}
		}
		fetchData()
	}, [])
	return (
		<>
			{/* <h1>{JSON.stringify(data)}</h1> */}
			<h1>{isNFTExpert ? 'You are a NFT expert' : 'You are not a NFT Expert'}</h1>
		</>
	)
}
