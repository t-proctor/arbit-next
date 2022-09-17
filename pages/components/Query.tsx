import { useQuery } from 'urql'
import CasePreview from './CasePreview'

const CasesQuery = `
  query {
    cases(first: 5) {
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

const Query = () => {
	const [result, reexecuteQuery] = useQuery({
		query: CasesQuery,
	})

	const { data, fetching, error } = result

	if (fetching) return <p>Loading...</p>
	if (error) return <p>Oh no... {error.message}</p>

	return (
		<>
			<ul>
				{data.cases.map(caseObj => (
					<CasePreview key={caseObj.id} caseObj={caseObj} />
				))}
			</ul>
		</>
	)
}
export default Query
