import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import lodash from 'lodash'
import ETHPowerUser from './badges/ETHPowerUser'

export default function JudgeId() {
	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<p>Judge: {id}</p>
			<h1>Your Qualifications</h1>
			<ETHPowerUser />
		</>
	)
}
