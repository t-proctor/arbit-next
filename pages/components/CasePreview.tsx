import { Box, Badge, Image, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react'
import { Link } from 'next/link'
import { useRouter } from 'next/router';
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
    const router = useRouter();

    // onClick={() => router.push('/Cases/' + caseObj.id)}')
    return (
    <Box as="button" onClick={() => router.push({pathname:'/Cases/' + caseObj.id, query: {"caseObj": JSON.stringify(caseObj)}} )} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

        <Box p='6'>
        <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
            </Badge>
            <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            >
            Party1: {caseObj.party1}  &bull; Party2: {caseObj.party2} 
            </Box>
        </Box>

        <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
        >
            {caseObj.name}
        </Box>

        <Box>
            Judge: {caseObj.judge}
            <Box as='span' color='gray.600' fontSize='sm'>
            {caseObj.judge}
            </Box>
        </Box>
        </Box>
    </Box>
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