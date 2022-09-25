import { Box, Badge, Image, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react'
import { Link } from 'next/link'
import { useRouter } from 'next/router'
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
	const tags = caseObj?.tags.join(', ')

	return (
		<Box
			as="button"
			onClick={() =>
				router.push({ pathname: '/Cases/' + caseObj.id, query: { caseObj: JSON.stringify(caseObj) } })
			}
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
		>
			<Box p="6">
				<Box display="flex" alignItems="baseline">
					<Badge borderRadius="full" px="2" colorScheme="teal">
						New
					</Badge>
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						{tags}
						{/* Party1: {caseObj.party1} &bull; Party2: {caseObj.party2} */}
					</Box>
				</Box>

				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
					<Text fontSize="xl">{caseObj.name}</Text>
					{/* {caseObj.name} */}
				</Box>

				<Box>
					{/* Judge: {caseObj.judge} */}
					{/* Status: {caseObj.status} */}
					{caseObj.description}
				</Box>
				<Box as="span" color="gray.600" fontSize="sm">
					{caseObj.status}
				</Box>
			</Box>
		</Box>
	)
}
