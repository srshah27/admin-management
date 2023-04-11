import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

const InputChakra = (props) => {
  return (
    <div className='mt-12'>
      <FormLabel>First Name</FormLabel>
      <Input placeholder='First Name' />
    </div>
  )
}

export default InputChakra