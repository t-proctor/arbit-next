import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAccount } from 'wagmi'
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'
// import { MdCheckCircle, MdSettings } from '@chakra-ui/icons'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import BadgeDescription from './BadgeDescription'
import { Text } from '@chakra-ui/react'

export default function ETHPowerUser() {
	// const { address, isConnecting, isDisconnected } = useAccount()
	const [isPowerUser, setIsPowerUser] = useState(false)
	const [isPowerUserLoading, setIsPowerUserLoading] = useState(true)
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>
	// const address = 'demo.eth'
	const [data, setData] = useState(null)
	// create state array for each badge
	const [isVal, setIsVal] = useState(false)
	const [isTx, setIsTx] = useState(false)
	const [isEth, setIsEth] = useState(false)
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/portfolio_v2/`, {
				params: {
					key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
				},
				headers: {
					Accept: 'application/json',
				},
			})
			const eth = lodash.find(response.data.data.items, { contract_name: 'Ether' })
			console.log('eth', eth)
			let avg = lodash.meanBy(eth.holdings, 'quote_rate')
			console.log('avg', avg)
			setData(response.data)
			const response2 = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/`, {
				params: {
					key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
				},
				headers: {
					Accept: 'application/json',
				},
			})
			console.log('response2', response2)
			const tranLen = response2.data.data.items.length
			const response3 = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/`, {
				params: {
					key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
				},
				headers: {
					Accept: 'application/json',
				},
			})
			console.log('response3', response3)
			const ethAmt = lodash.find(response.data.data.items, { contract_name: 'Ether' }).balance * Math.pow(10, -18)
			if (avg > 1000) {
				setIsVal(true)
			}
			if (tranLen > 75) {
				setIsTx(true)
			}
			if (ethAmt > 1) {
				setIsEth(true)
			}
			if (avg > 1000 && tranLen > 75 && ethAmt > 1) {
				setIsPowerUser(true)
			}
		}
		fetchData()
	}, [])
	return (
		<>
			{/* <h1>{JSON.stringify(data)}</h1> */}

			<Text fontSize="4xl">{isPowerUser ? 'An ETH power user' : 'Not an ETH power user'}</Text>
			<BadgeDescription
				conditions={[
					[isVal, 'You have an average of $1000 or more in wallet balance last 30 days'],
					[isTx, 'You have more than 75 transactions'],
					[isEth, 'You have more than 1 ETH'],
				]}
			/>
		</>
	)
}
