import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const enter = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    employment_status: ''
  })
  const AddData = async () => {
    const res = await fetch(`/api/db`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData
      })
    })

    const res2 = await res.json()
    if (res2.error) {
      console.log(res2.error)
    } else {
      console.log("Success")
      router.push('/')
    }
  }
  return (
    <div className='flex flex-col justify-center items-center p-8 mt-4'>
      <div className='w-[80%]'>
        <FormControl isRequired className='mt-12'>
          <div className='mt-12'>
            <FormLabel>First Name</FormLabel>
            <Input placeholder='First Name' value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder='Last Name' value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>Mobile Number</FormLabel>
            <Input placeholder='Mobile Number' value={formData.mobile_number} onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })} />
          </div>
          <FormLabel className='mt-12'>Employment Status</FormLabel>
          <Select placeholder='Select Employment Status' value={formData.employment_status} onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}>
            <option>Employed</option>
            <option>Unemployed</option>
          </Select>
          <Button
            mt={12}
            colorScheme='teal'
            type='submit'
            onClick={() => AddData()}
          >
            Submit
          </Button>
        </FormControl>

      </div>
    </div>
  )
}

export default enter