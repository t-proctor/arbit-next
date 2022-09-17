import React from 'react'

import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import arbitConfig from '../../config/arbitConfig.json'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useEffect } from 'react'

export default function NewCase() {
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm()
	const caseName = getValues('Case Name')
	const party2 = getValues('Other Party')
	const judge = getValues('Judge')
	const description = getValues('Description')
	let tags = getValues('Tags')
	// get rid of white space and seperate by comma in tags
	const tagsArray = tags?.split(',').map(item => item.trim())
	const { config, error } = usePrepareContractWrite({
		addressOrName: arbitConfig.address,
		contractInterface: arbitConfig.abi,
		functionName: 'openCase',
		args: [party2, judge, description, tagsArray, caseName],
	})
	const { write } = useContractWrite(config)

	const onSubmit = data => {
		write?.()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input type="text" placeholder="Case Name" {...register('Case Name', { required: true })} />
			<Input
				type="text"
				placeholder="Other Party (0x...)"
				{...register('Other Party', { required: true, minLength: 42, maxLength: 42 })}
			/>
			<Input
				type="text"
				placeholder="Judge (0x...)"
				{...register('Judge', { required: true, minLength: 42, maxLength: 42 })}
			/>
			<Input type="text" placeholder="Description" {...register('Description', { required: true })} />
			<Input type="text" placeholder="Tags (DeFi, Social, DAO)" {...register('Tags', { required: true })} />
			<Input type="submit" />
		</form>
	)
}
