import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
export default function Judges() {
	const router = useRouter()
	const { address, isConnecting, isDisconnected } = useAccount()

	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>
	return <Button onClick={() => router.push('/Judges/' + address)}>View your profile</Button>
}
