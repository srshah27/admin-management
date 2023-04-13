import executeQuery from '../../../lib/db';
import { getSession } from 'next-auth/react';

//------------API for adding new bg to database

export default async function CRUD(req, res) {

  const reqtype = req.method;
  let { id } = req.query

  switch (reqtype) {
    case 'GET':
      if (!id) {
        console.log('no query');
        let fetched = await executeQuery({
          query: "SELECT * FROM employee",
          values: []
        })
        return res.status(200).json({ data: fetched })
      }
      let fetched = await executeQuery({
        query: "SELECT * FROM employee WHERE id=?",
        values: [id]
      })
      return res.status(200).json({ data: fetched })
    case 'POST':
      const body = req.body;
      console.log(body);
      let insertvalues = await executeQuery({
        query: "insert into employee (roll, fullname, mobile, batch_month, batch_no, batch_time)values(?,?,?,?,?,?)",
        values: [body.roll_number, body.full_name, body.mobile_number, body.batch_month, body.batch_no, body.batch_time]
      })
      console.log(insertvalues);
      if (insertvalues)
        return res.status(200).json({ message: 'Inserted' })
      return res.status(200).json({ error: 'Database Error' })

    case 'PATCH':
      const patchBody = req.body;
      console.log(patchBody);
      let updateValue = await executeQuery({
        query: "update employee set roll = ?, fullname = ?, mobile = ?, batch_month = ?, batch_no = ?, batch_time=? where id=?;",
        values: [patchBody.roll_number, patchBody.full_name, patchBody.mobile_number, patchBody.batch_month, patchBody.batch_no, patchBody.batch_time, patchBody.id]
      })
      console.log(updateValue);
      if (updateValue)
        return res.status(200).json({ message: 'Updated' })
      return res.status(200).json({ error: 'Database Error' })

    case 'DELETE':
      console.log('this i body', id);
      if (id) {
        let deleteValue = await executeQuery({
          query: "delete from employee where id=?;",
          values: [id]
        })
        if (deleteValue)
          return res.status(200).json({ message: 'Deleted' })
        return res.status(200).json({ error: 'Database Error' })
      }
      return res.status(200).json({ error: 'No id provided' })

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}