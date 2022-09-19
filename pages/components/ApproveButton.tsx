import { Button } from '@chakra-ui/react'
import arbitConfig from '../../config/arbitConfig.json'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

export default function ApproveButton(props) {
	const id = props.id
	const { config, error } = usePrepareContractWrite({
		addressOrName: arbitConfig.address,
		contractInterface: arbitConfig.abi,
		functionName: 'approveCase',
		args: [id],
		overrides: {
			gasLimit: 1000000,
		},
	})
	const { write } = useContractWrite(config)
	const approveCase = () => {
		write?.()
	}
	return <Button onClick={approveCase}>Approve</Button>
}
