import React from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input
  } from '@chakra-ui/react'
import { Formik, Form, Field,  } from 'formik';
import { useForm } from 'react-hook-form';

export default function NewCase() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const onSubmit = data => console.log('a');
//   console.log()
  console.log(errors);
  const a = getValues("Case Name")
  console.log('ayo', a)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <Input type="text" placeholder="Case Name" {...register("Case Name", {required: true})} />
      {/* <input type="text" placeholder="Case Name" {...register("Case Name", {required: true})} /> */}

      <Input type="text" placeholder="Other Party (0x...)" {...register("Other Party", {required: true, minLength: 40, maxLength: 40})} />
      <Input type="text" placeholder="Judge (0x...)" {...register("Judge", {required: true, minLength: 40, maxLength: 40})  } />
      <Input type="text" placeholder="Description" {...register("Description", {required: true})} />
      <Input type="text" placeholder="Tags (defi, social, dao)" {...register("Tags", {required: true})} />

       <button
        type="button"
        onClick={() => {
          console.log(getValues()); // { test: "test-input", test1: "test1-input" }
        //   const singleValue = getValues("test"); // "test-input"
        //   const multipleValues = getValues(["test", "test1"]);
          // ["test-input", "test1-input"]
        }}
      >
        Get Values
      </button>
      <Input type="submit" />
    </form>
  );
}


// let a;
// export default function NewCase() {
//     function validateName(value) {
//       let error
//       if (!value) {
//         error = 'Name is required'
//       } else if (value.toLowerCase() !== 'naruto') {
//         error = "Jeez! You're not a fan 😱"
//       }
//       return error
//     }
  
//     return (
//       <Formik
//         initialValues={{ name: 'Sasuke' }}
//         onSubmit={(values, actions) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2))
//             actions.setSubmitting(false)
//           }, 1000)
//         }}
//       >
//         {(props) => (
//           <Form>
//             <Field name='name' validate={validateName}>
//               {({ field, form }) => (
//                 <FormControl isInvalid={form.errors.name && form.touched.name}>
//                   <FormLabel>First name</FormLabel>
//                   <Input {...field} placeholder='name' />
//                   <FormErrorMessage>{form.errors.name}</FormErrorMessage>
//                 </FormControl>
//               )}
//             </Field>
//             <Button
//               mt={4}
//               colorScheme='teal'
//               isLoading={props.isSubmitting}
//               type='submit'
//             >
//               Submit
//             </Button>
//             {/* {this.a = values.name} */}

//           </Form>
//         )}
//       </Formik>

//     )
//   }