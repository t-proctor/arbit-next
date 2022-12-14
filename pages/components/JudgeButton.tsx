import {
	Button,
	FormLabel,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Stack,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react'
import arbitConfig from '../../config/arbitConfig.json'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useState } from 'react';
export default function JudgeButton(props) {
	// return button with onclick event that calls approveCase
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)

	let [rulingValue, setRulingValue] = React.useState('')
	const [winnerValue, setWinnerValue] = React.useState('1')
	const [winnerAddress, setWinnerAddress] = React.useState(props.party1)
	let handleWinnerChange = e => {
		let inputValue = e.target.value
		setWinnerValue(inputValue)
		if (inputValue === '1') {
			setWinnerAddress(props.party1)
		} else {
			setWinnerAddress(props.party2)
		}
	}
	let handleInputChange = e => {
		let inputValue = e.target.value
		setRulingValue(inputValue)
	}

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm()
	const id = props.id
	// const winner = getValues('winner')
	// const caseRuling = getValues('caseRuling')
	const { config, error } = usePrepareContractWrite({
		addressOrName: arbitConfig.address,
		contractInterface: arbitConfig.abi,
		functionName: 'closeCase',
		args: [id, winnerAddress, rulingValue],
		overrides: {
			gasLimit: 1000000,
		},
	})

	const { write } = useContractWrite(config)
	const onSubmit = () => {
		write?.()
	}
	return (
		<>
			<Button onClick={onOpen}>Judge</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Judge the case</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Winner</FormLabel>
							<RadioGroup onChange={handleWinnerChange} value={winnerValue}>
								<Stack direction="row">
									<Radio value="1">Party 1</Radio>
									<Radio value="2">Party 2</Radio>
								</Stack>
							</RadioGroup>
							{/* <Input ref={initialRef} placeholder='First name' /> */}
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Ruling</FormLabel>
							<Textarea
								value={rulingValue}
								onChange={handleInputChange}
								placeholder="Party 1 was chosen as winner because they are the best"
								size="sm"
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onSubmit} colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
