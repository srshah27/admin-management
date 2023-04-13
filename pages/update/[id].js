import React, { useState } from 'react'
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

const enter = ({ data }) => {



  const [formData, setFormData] = useState({
    id: data.id,
    roll_number: data.roll,
    full_name: data.fullname,
    mobile_number: data.mobile,
    batch_month: data.batch_month,
    batch_no: data.batch_no,
    batch_time: data.batch_time,
  })
  const AddData = async () => {
    const res = await fetch(`/api/db`, {

      method: 'PATCH',
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
    }
  }
  return (
    <div className='flex flex-col justify-center items-center p-8 mt-4'>
      <div className='w-[80%]'>
      <FormControl isRequired className='mt-12'>
          <div className='mt-12'>
            <FormLabel>ROLL NUMBER</FormLabel>
            <Input placeholder='ROLL NUMBER' value={formData.roll_number} onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>FULL NAME</FormLabel>
            <Input placeholder='FULL NAME' value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>MOBILE NUMBER</FormLabel>
            <Input placeholder='Mobile Number' value={formData.mobile_number} onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>BATCH MONTH</FormLabel>
            <Input placeholder='BATCH MONTH' value={formData.batch_month} onChange={(e) => setFormData({ ...formData, batch_month: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>BATCH NO.</FormLabel>
            <Input placeholder='BATCH NUMBER' value={formData.batch_no} onChange={(e) => setFormData({ ...formData, batch_no: e.target.value })} />
          </div>
          <div className='mt-12'>
            <FormLabel>BATCH TIME</FormLabel>
            <Input placeholder='BATCH TIME' value={formData.batch_time} onChange={(e) => setFormData({ ...formData, batch_time: e.target.value })} />
          </div>
          {/* <FormLabel className='mt-12'>Employment Status</FormLabel>
          <Select placeholder='Select Employment Status' value={formData.employment_status} onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}>
            <option>Employed</option>
            <option>Unemployed</option>
          </Select> */}
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

export default enter;

export async function getServerSideProps(context) {
  // session check

  let query = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/db?id=${query}`)
  let { data } = await res.json()
  console.log(data);

  return {
    props: {
      data: data[0]
    }
  }
}