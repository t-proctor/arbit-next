// create a functional component named Cases that returns a basic button
import { Button, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Query from './components/Query'

export default function Cases() {
	const router = useRouter()

	return (
		<>
			{/* <Box maxW="70%" justifyContent="center" ml="15%" p="5" mt="5%"> */}
			<Button mb="5" onClick={() => router.push('/CreateCase')}>
				Create Case
			</Button>
			<Query />
			{/* </Box> */}
		</>
	)
}
