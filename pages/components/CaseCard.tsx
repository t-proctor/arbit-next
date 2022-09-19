import { Box, Badge, Image, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react'
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
	// onClick={() => router.push('/Cases/' + caseObj.id)}')

	// if user is logged in, show edit button
	// if user is not logged in, show nothing

	const { address, isConnecting, isDisconnected } = useAccount()
	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>

	return (
		//return ul for each property in caseObj
		<>
			<ul>
				<li>id: {caseObj.id}</li>
				<li>name: {caseObj.name}</li>
				<li>party1: {caseObj.party1}</li>
				<li>party2: {caseObj.party2}</li>
				<li>judge: {caseObj.judge}</li>
				<li>status: {caseObj.status}</li>
				<li>decisionMaker: {caseObj.decisionMaker}</li>
				<li>winner: {caseObj.winner}</li>
				<li>description: {caseObj.description}</li>
				<li>tags: {caseObj.tags}</li>
				<li>caseRuling: {caseObj.caseRuling}</li>
			</ul>
			{console.log('address', address)}
			{console.log('decisionMaker', caseObj.decisionMaker)}
			{/* // if lowercase decisionMaker is address, show approve button */}
			<ApproveButton id={caseObj.id} />
			<JudgeButton id={caseObj.id} party1={caseObj.party1} party2={caseObj.party2} />
			<MintButton caseObj={caseObj} />

			{/* {address.toLowerCase() === caseObj.decisionMaker.toLowerCase() ? <ApproveButton id={caseObj.id} /> : null} */}
			{/* {caseObj.decisionMaker === address ? <ApproveButton id={caseObj.id}/> : null} */}
		</>

		// <Box as="button" onClick={() => router.push({pathname:'/Cases/' + caseObj.id, query: {"caseObj": JSON.stringify(caseObj)}} )} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
		//     {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

		//     <Box p='6'>
		//     <Box display='flex' alignItems='baseline'>
		//         <Badge borderRadius='full' px='2' colorScheme='teal'>
		//         New
		//         </Badge>
		//         <Box
		//         color='gray.500'
		//         fontWeight='semibold'
		//         letterSpacing='wide'
		//         fontSize='xs'
		//         textTransform='uppercase'
		//         ml='2'
		//         >
		//         Party1: {caseObj.party1}  &bull; Party2: {caseObj.party2}
		//         </Box>
		//     </Box>

		//     <Box
		//         mt='1'
		//         fontWeight='semibold'
		//         as='h4'
		//         lineHeight='tight'
		//         noOfLines={1}
		//     >
		//         {caseObj.name}
		//     </Box>

		//     <Box>
		//         Judge: {caseObj.judge}
		//         <Box as='span' color='gray.600' fontSize='sm'>
		//         {caseObj.judge}
		//         </Box>
		//     </Box>
		//     </Box>
		// </Box>
	)
}

// function AirbnbCard() {
//     const property = {
//       imageUrl: 'https://bit.ly/2Z4KKcF',
//       imageAlt: 'Rear view of modern home with pool',
//       beds: 3,
//       baths: 2,
//       title: 'Modern home in city center in the heart of historic Los Angeles',
//       formattedPrice: '$1,900.00',
//       reviewCount: 34,
//       rating: 4,
//     }

//     return (
//       <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
//         <Image src={property.imageUrl} alt={property.imageAlt} />

//         <Box p='6'>
//           <Box display='flex' alignItems='baseline'>
//             <Badge borderRadius='full' px='2' colorScheme='teal'>
//               New
//             </Badge>
//             <Box
//               color='gray.500'
//               fontWeight='semibold'
//               letterSpacing='wide'
//               fontSize='xs'
//               textTransform='uppercase'
//               ml='2'
//             >
//               {property.beds} beds &bull; {property.baths} baths
//             </Box>
//           </Box>

//           <Box
//             mt='1'
//             fontWeight='semibold'
//             as='h4'
//             lineHeight='tight'
//             noOfLines={1}
//           >
//             {property.title}
//           </Box>

//           <Box>
//             {property.formattedPrice}
//             <Box as='span' color='gray.600' fontSize='sm'>
//               / wk
//             </Box>
//           </Box>

//           <Box display='flex' mt='2' alignItems='center'>
//             {Array(5)
//               .fill('')
//               .map((_, i) => (
//                 <StarIcon
//                   key={i}
//                   color={i < property.rating ? 'teal.500' : 'gray.300'}
//                 />
//               ))}
//             <Box as='span' ml='2' color='gray.600' fontSize='sm'>
//               {property.reviewCount} reviews
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     )
//   }
