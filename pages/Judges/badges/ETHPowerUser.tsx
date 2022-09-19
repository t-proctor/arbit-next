import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import { useAccount } from 'wagmi'

export default function ETHPowerUser() {
	// const { address, isConnecting, isDisconnected } = useAccount()
	const [isPowerUser, setIsPowerUser] = useState(false)
	const [isPowerUserLoading, setIsPowerUserLoading] = useState(true)
	const address = 'demo.eth'
	const [data, setData] = useState(null)
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
			// in response, look through the items array. find an item with contract_name === 'Ether" and take the average price of the quote_rate in it's holding array balance
			// use lodash.find to find the item with contract_name === 'Ether'
			const eth = lodash.find(response.data.data.items, { contract_name: 'Ether' })
			console.log('eth', eth)
			let avg = lodash.meanBy(eth.holdings, 'quote_rate')
			console.log('avg', avg)
			setData(response.data)
			//api.covalenthq.com/v1/:chain_id/address/:address/transactions_v2/?&key=ckey_1e4b2ced7920416a8f50db51a34
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

			if (avg > 1000 && tranLen > 75 && ethAmt > 1) {
				setIsPowerUser(true)
			}
		}
		fetchData()
	}, [])
	return (
		<>
			{/* <h1>{JSON.stringify(data)}</h1> */}
			<h1>{isPowerUser ? 'You are an ETH power user' : 'You are not an ETH power user'}</h1>
		</>
	)
}
