import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import ETHPowerUser from './badges/ETHPowerUser'
import NFTExpert from './badges/NFTExpert'
import WorldcoinBadge from './badges/WorldcoinBadge'
import { Button, Box, Heading } from '@chakra-ui/react'

export default function JudgeId() {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			{/* <Box maxW="70%" justifyContent="center" ml="15%" p="5" mt="5%"> */}
			{/* <p>Judge: {id}</p> */}
			{/* <h1>Your Qualifications</h1> */}
			<Heading as="h1" size="2xl" textAlign="center" mb="5">
				Judge Qualifications
			</Heading>
			<ETHPowerUser />
			<NFTExpert />
			<WorldcoinBadge />
			{/* </Box> */}
		</>
	)
}
