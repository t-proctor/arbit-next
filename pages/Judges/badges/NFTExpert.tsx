import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { connect } from 'formik'
import BadgeDescription from './BadgeDescription'
import { Text } from '@chakra-ui/react'

export default function NFTExpert() {
	// const { address, isConnecting, isDisconnected } = useAccount()
	const [isNFTExpert, setIsNFTExpert] = useState(false)
	const [isNFTExpertLoading, setIsNFTExpertLoading] = useState(true)
	const [data, setData] = useState(null)
	const [isVal, setIsVal] = useState(false)
	const [isLegit, setIsLegit] = useState(false)
	const [isTx, setIsTx] = useState(false)
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>
	useEffect(() => {
		async function fetchData() {
			let provider = await new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_URL)
			const heads = await provider.send('qn_fetchNFTs', {
				wallet: address,
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
				wallet: address,
				contracts: [
					'0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d',
					'0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
					'0x3F382DbD960E3a9bbCeaE22651E88158d2791550',
s				],
			})
			// [

			console.log('heads2', heads2)
			if (heads.totalPages > 1) {
				setIsVal(true)
			}
			if (nftIndex > -1) {
				setIsLegit(true)
			}
			if (heads2.totalItems > 0) {
				setIsTx(true)
			}
			if (heads.totalPages > 1 && nftIndex > -1 && heads2.totalItems > 0) {
				setIsNFTExpert(true)
			}
		}
		fetchData()
	}, [])
	return (
		<>
			{/* <h1>{JSON.stringify(data)}</h1> */}
			<Text fontSize="4xl">{isNFTExpert ? 'A NFT expert' : 'Not a NFT Expert'}</Text>
			<BadgeDescription
				conditions={[
					[isVal, 'You have at least 1 Azuki, BAYC, or CryptoPunk'],
					[isLegit, 'You have at least 1 Aavegotchi, Axie, or Decentraland token'],
					[isTx, 'You have at least 10 NFTS'],
				]}
			/>
		</>
	)
}
