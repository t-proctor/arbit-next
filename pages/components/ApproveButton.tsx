import {Button} from '@chakra-ui/react'
import arbitConfig from '../../config/arbitConfig.json'
import {  useContractWrite, usePrepareContractWrite } from 'wagmi'

export default function ApproveButton(props) {
    // return button with onclick event that calls approveCase
    const id = props.id
    const { config, error } = usePrepareContractWrite({
        addressOrName: arbitConfig.address,
        contractInterface: arbitConfig.abi,
        functionName: 'approveCase',
        args: [id],
        overrides: {
            gasLimit: 1000000
        }
    })
    console.log('id', id)
    
    const { write } = useContractWrite(config)
    const approveCase = () => {
        write?.()
    }
    return (
        <Button onClick={approveCase}>Approve</Button>
    );

}

// import React from 'react';

// import {
//     Input
//   } from '@chakra-ui/react'
// import { useForm } from 'react-hook-form';
// import arbitConfig from '../../config/arbitConfig.json'
// import {  useContractWrite, usePrepareContractWrite } from 'wagmi'
// import { useEffect } from 'react';

// export default function NewCase() {
//   const { watch, register, handleSubmit, formState: { errors }, getValues } = useForm();
//   const caseName = getValues('caseName')
//   const party2 = getValues("Other Party")
//   const judge = getValues("Judge")
//   const description = getValues("Description")
//   const tags = getValues("Tags")
//   // get rid of white space and seperate by comma in tags
//   const tagsArray = tags.split(',').map(item => item.trim());
//   const { config, error } = usePrepareContractWrite({
//     addressOrName: arbitConfig.address,
//     contractInterface: arbitConfig.abi,
//     functionName: 'openCase',
//     args: [party2, judge, description, tagsArray, caseName]
//   })

//   const { write } = useContractWrite(config)
  
  

//   // console.log('party2', party2, judge)


//   const onSubmit = data => {
//     write?.()
//   }
  
//   // useEffect(() => {
//   //       const party2 = getValues("Other Party")
//   //       const judge = getValues("Judge")
        
//   // }, [onSubmit]);


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>

//       <Input type="text" placeholder="Case Name" {...register("Case Name", {required: true})} /> 
//       <Input type="text" placeholder="Other Party (0x...)" {...register("Other Party", {required: true, minLength: 42, maxLength: 42})} />
//       <Input type="text" placeholder="Judge (0x...)" {...register("Judge", {required: true, minLength: 42, maxLength: 42})  } />
//       <Input type="text" placeholder="Description" {...register("Description", {required: true})} /> 
//       <Input type="text" placeholder="Tags (DeFi, Social, DAO)" {...register("Tags", {required: true})} />
//       <Input type="submit" />
//     </form>
//   );
// }
