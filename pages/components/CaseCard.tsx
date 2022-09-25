import {
	Box,
	Badge,
	Image,
	Flex,
	Heading,
	Text,
	Button,
	Stack,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Center,
} from '@chakra-ui/react'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { Link } from 'next/link'
import { useRouter } from 'next/router'
// get user address
import { useAccount } from 'wagmi'
import ApproveButton from './ApproveButton'
import JudgeButton from './JudgeButton'
import MintButton from './MintButton'
export default function CasePreview(props) {
	const caseObj = {
		id: props.caseObj.id,
		name: props.caseObj.name,
		party1: props.caseObj.party1,
		party2: props.caseObj.party2,
		judge: props.caseObj.judge,
		status: props.caseObj.status,
		decisionMaker: props.caseObj.decisionMaker,
		winner: props.caseObj.winner,
		description: props.caseObj.description,
		tags: props.caseObj.tags,
		caseRuling: props.caseObj.caseRuling,
	}
	const router = useRouter()
	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>
	const caseRuling = caseObj.caseRuling ? caseObj.caseRuling : 'No ruling yet'
	const winner = caseObj.winner === 'ox' ? caseObj.winner : 'No winner yet'
	console.log('tags', caseObj.tags[0])
	// take each element in tags and combine it into a string seperated by commas
	const tags = caseObj?.tags.join(', ')
	/// capitalize first letter of status
	const status = caseObj.status.charAt(0).toUpperCase() + caseObj.status.slice(1)

	return (
		//return ul for each property in caseObj
		<>
			<Heading as="h2" size="xl" fontWeight="bold" letterSpacing="tight" mt={4} mb={2}>
				{caseObj.name}
			</Heading>
			<StatGroup>
				<Stat>
					<StatLabel>Description</StatLabel>
					<StatNumber>{caseObj.description}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>ID</StatLabel>
					<StatNumber>{caseObj.id}</StatNumber>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat>
					<StatLabel>Party1</StatLabel>
					<StatNumber>{caseObj.party1}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>Party2</StatLabel>
					<StatNumber>{caseObj.party2}</StatNumber>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat>
					<StatLabel>Judge</StatLabel>
					<StatNumber>{caseObj.judge}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>Decision Maker</StatLabel>
					<StatNumber>{caseObj.decisionMaker}</StatNumber>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat>
					<StatLabel>Status</StatLabel>
					<StatNumber>{status}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>Tags</StatLabel>
					<StatNumber>{tags}</StatNumber>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat>
					<StatLabel>Winner</StatLabel>
					<StatNumber>{winner}</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>Case Ruling</StatLabel>
					<StatNumber>{caseRuling}</StatNumber>
				</Stat>
			</StatGroup>

			{/* // if lowercase decisionMaker is address, show approve button */}
			{address?.toLowerCase() !== caseObj.judge.toLowerCase() ? <ApproveButton id={caseObj.id} /> : null}
			{address?.toLowerCase() === caseObj.judge.toLowerCase() ? (
				<JudgeButton id={caseObj.id} party1={caseObj.party1} party2={caseObj.party2} />
			) : null}
			{caseObj.status.toLowerCase() === 'closed' ? <MintButton caseObj={caseObj} /> : null}
		</>
	)
}
