import executeQuery from '../../../lib/db';
import { getSession } from 'next-auth/react';

//------------API for adding new bg to database

export default async function AddData(req, res) {
  let updateCount = await executeQuery({
    query: "insert into data values(?,?)",
    values: ['Snehil', 'Student']
  })

  res.json(updateCount, insertData)
}