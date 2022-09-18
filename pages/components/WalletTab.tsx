import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Navbar from './Navbar'

const WalletTab: NextPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				padding: 12,
			}}
		>
			<Navbar />
			<ConnectButton />
		</div>
	)
}

export default WalletTab
