// create a functional component named Cases that returns a basic button
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import Query from "./components/Query";


export default function Cases() {
    const router = useRouter();

    return (
        <>
        <Button onClick={() => router.push('/CreateCase')}>Create Case</Button>
        <Query/>
        </>
    );

}
    