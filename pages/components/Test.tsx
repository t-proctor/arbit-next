import { Box } from "@chakra-ui/react"
import { createClient, Provider } from 'urql';
import Query from "./Query";
import NewCase from "./NewCase";
const client = createClient({
  url: 'https://api.studio.thegraph.com/query/32185/arbit/v0.0.1',
});

export default function Test() {
  return (
    <Provider value={client}>
        {/* <Navbar /> */}
        <Query></Query>
        <Box m={2}>Tomato</Box>
        <NewCase></NewCase>
    </Provider>
  )
}