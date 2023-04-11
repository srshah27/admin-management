import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'
import InputChakra from '@/components/InputChakra'
import { Select } from '@chakra-ui/react'

const test = () => {

  const AddData = async (data_id) => {
    const res = await fetch(`/api/db/add`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data_id
      })
    })

    const res2 = await res.json()
    if (res2.error) {
      console.log(res2.error)
    } else {
      console.log("Success")
    }
  }
  return (
    <div className='flex flex-col justify-center items-center p-8 mt-4'>
      <div className='w-[80%]'>
        <FormControl isRequired className='mt-12'>
          <div className='mt-12'>
            <FormLabel>First Name</FormLabel>
            <Input placeholder='First Name' />
          </div>
          <div className='mt-12'>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder='Last Name' />
          </div>
          <div className='mt-12'>
            <FormLabel>Mobile Number</FormLabel>
            <Input placeholder='Mobile Number' />
          </div>
          <FormLabel className='mt-12'>Employment Status</FormLabel>
          <Select placeholder='Select Employment Status'>
            <option>Employed</option>
            <option>Unemployed</option>
          </Select>
          <Button
            mt={12}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </FormControl>

      </div>
    </div>
  )
}

export default test