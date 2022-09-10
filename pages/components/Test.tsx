import { Box } from "@chakra-ui/react"
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://api.studio.thegraph.com/query/32185/arbit/v0.0.1',
});

export default function Test() {
  return (
    <Provider value={client}>
        <Box m={2}>Tomato</Box>
    </Provider>
  )
}