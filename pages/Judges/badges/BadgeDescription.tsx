import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'
import { MdCheckCircle, MdSettings, MdDangerous } from 'react-icons/md'
import { Text, Icon } from '@chakra-ui/react'

export default function BadgeDescription(props) {
	return (
		<List mb="5">
			{props.conditions.map(condition => (
				<ListItem>
					<ListIcon
						as={condition[0] ? MdCheckCircle : MdDangerous}
						color={condition[0] ? 'green.500' : 'red.500'}
						w={8}
						h={8}
					/>
					<Text as="span" fontSize="2xl">
						{' '}
						{condition[1]}{' '}
					</Text>
				</ListItem>
			))}
		</List>
	)
}
