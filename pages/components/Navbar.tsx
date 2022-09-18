import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import Link from 'next/link'

//   import { Logo } from './Logo'

export default function Navbar() {
	const isDesktop = useBreakpointValue({ base: false, lg: true })
	return (
		<Box as="section" pb={{ base: '12', md: '24' }}>
			<Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
				<Container py={{ base: '4', lg: '5' }}>
					<HStack spacing="10" justify="space-between">
						{/* <Logo /> */}
						{isDesktop ? (
							<Flex justify="space-between" flex="1">
								<ButtonGroup variant="link" spacing="8">
									{['Cases', 'Judges'].map(item => (
										<Button key={item}>
											<Link href={`/${item}`}>
												<a>{item}</a>
											</Link>
										</Button>
									))}
								</ButtonGroup>
							</Flex>
						) : (
							<IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
						)}
					</HStack>
				</Container>
			</Box>
		</Box>
	)
}
