import { Inter } from 'next/font/google'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ fetched }) {

  const [data, setdata] = useState(fetched)

  const handleDelete = async (id) => {
    console.log(id);
    const res = await fetch(`/api/db/?id=${id}`, {
      method: 'DELETE',
    })
    const { fetched } = await res.json()
    if (fetched?.error) {
      alert(fetched.error)
      return
    }
    let newData = data.filter(item => item.id !== id)
    setdata(newData)
  }

  return (
    <div className='flex flex-col items-center bg-[url(/bg.webp)] h-screen'>
      <Heading>Employee Details</Heading>
      <TableContainer className='m-8 p-4 border-solid border-2 border-black'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Mobile Number</Th>
              <Th>isEmployed</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.firstname}</Td>
                    <Td>{item.lastname}</Td>
                    <Td isNumeric>{item.mobile}</Td>
                    <Td>{item.employment}</Td>
                    <Td><Link href={`/update/${item.id}`}>Update</Link></Td>
                    <Td><button onClick={() => handleDelete(item.id)}>Delete</button></Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export async function getServerSideProps(context) {
  // session check
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/db`)
  let { data } = await res.json()
  return {
    props: {
      fetched: data
    }
  }
}