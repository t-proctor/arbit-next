import { useRouter } from 'next/router'
import CaseCard from '../components/CaseCard'
import { useQuery } from 'urql'
const Post = () => {
	const router = useRouter()
	const { caseId } = router.query
	const CASE_INFO = `
  query Case($c: ID!) {
    case( id: $c )
    {
      id
        name
        party1
        party2
        judge
        status
        decisionMaker
        winner
        description
        tags
        caseRuling
    }
  }
`

	const [result, reexecuteQuery] = useQuery({
		query: CASE_INFO,
		variables: { c: caseId },
		requestPolicy: 'network-only',
	})
	const refresh = () => {
		// Refetch the query and skip the cache
		reexecuteQuery({ requestPolicy: 'network-only' })
	}

	const { data, fetching, error } = result

	if (fetching) return <p>Loading...</p>
	if (error) return <p>Oh no... {error.message}</p>

	return (
		<>
			<CaseCard caseObj={data.case} />
		</>
	)
}

export default Post
