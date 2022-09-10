import { useQuery } from 'urql';

const CasesQuery = `
  query {
    cases(first: 5) {
        id
        party1
        party2
        judge
    }
  }
`;

const Query = () => {
  const [result, reexecuteQuery] = useQuery({
    query: CasesQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
      
<>    <ul>
    {data.cases.map(({ id, party1, party2, judge }) => (<li key={id}>{party1} {party2}{judge}</li>))}

    </ul></>
  );
};
export default Query;