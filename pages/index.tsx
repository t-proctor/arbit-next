import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getAuthOptions } from './api/auth/[...nextauth]'
import { Grid, Heading, Text, Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	return {
		props: {
			session: await unstable_getServerSession(req, res, getAuthOptions(req)),
		},
	}
}

const Home: NextPage = () => {
	const router = useRouter()

	return (
		// <>
		// push to right
		// <Flex justifyContent="flex-end">
		<Flex gap={4} mb={8} w="full" justifyContent="center">
			<Grid textAlign="center" pt={100}>
				<Heading as="h1" fontSize="200px">
					Arbit
				</Heading>
				<Text fontSize="3xl" color="gray.500">
					An open judicial system
				</Text>
				<Text fontSize="lg" color="gray.500">
					Create your case, choose your judge, receive your ruling
				</Text>
				<Button onClick={() => router.push('/CreateCase')}>Get Started</Button>
			</Grid>
		</Flex>
		// </>
	)

	// return <>An open judicial system. Create your case, choose your judge, receive your ruling</>
}

export default Home
