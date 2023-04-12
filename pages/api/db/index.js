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
          query: "SELECT * FROM data",
          values: []
        })
        return res.status(200).json({ data: fetched })
      }
      let fetched = await executeQuery({
        query: "SELECT * FROM data WHERE id=?",
        values: [id]
      })
      return res.status(200).json({ data: fetched })
    case 'POST':
      const body = req.body;
      console.log(body);
      let insertvalues = await executeQuery({
        query: "insert into data (firstname, lastname, mobile, employment )values(?,?,?,?)",
        values: [body.first_name, body.last_name, body.mobile_number, body.employment_status]
      })
      console.log(insertvalues);
      if (insertvalues)
        return res.status(200).json({ message: 'Inserted' })
      return res.status(200).json({ error: 'Database Error' })

    case 'PATCH':
      const patchBody = req.body;
      console.log(patchBody);
      let updateValue = await executeQuery({
        query: "update data set firstname = ?, lastname = ?, mobile = ?, employment = ? where id=?;",
        values: [patchBody.first_name, patchBody.last_name, patchBody.mobile_number, patchBody.employment_status, patchBody.id]
      })
      console.log(updateValue);
      if (updateValue)
        return res.status(200).json({ message: 'Updated' })
      return res.status(200).json({ error: 'Database Error' })

    case 'DELETE':
      console.log('this i body', id);
      if (id) {
        let deleteValue = await executeQuery({
          query: "delete from data where id=?;",
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