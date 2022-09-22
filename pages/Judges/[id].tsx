import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import ETHPowerUser from './badges/ETHPowerUser'
import NFTExpert from './badges/NFTExpert'
import WorldcoinBadge from './badges/WorldcoinBadge'

export default function JudgeId() {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<p>Judge: {id}</p>
			<h1>Your Qualifications</h1>
			{/* <ETHPowerUser /> */}
			{/* <NFTExpert /> */}
			<WorldcoinBadge />
		</>
	)
}
