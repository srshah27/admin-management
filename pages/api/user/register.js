import executeQuery from '../../../lib/db';
import { hash, compare } from 'bcryptjs';

//------------API for adding new bg to database

export default async function registerUser(req, res) {
  if (req.method != 'POST') {
    res.json({ 'message': 'This is a POST API' }).status(404);
  }

  const {
    email,
    password,
  } = req.body

  let count = await executeQuery({
    query: "SELECT COUNT(*) FROM `user`;",
    values: []
  })
  console.log('this is api', count[0]);
  const user_id = parseInt(count[0]['COUNT(*)']) + 1;
  // check email
  let duplicateEmail = await executeQuery({
    query: "SELECT * FROM user where `email`=?;",
    values: [email]
  })
  if (duplicateEmail.length > 0) {
    res.status(401).json({
      error: 'User with this Email Id already exists'
    }); return
  }
  let insertDataUser
  const hashed = await hash(password, 10)
  let insertDataAuth = await executeQuery({
    query: "INSERT INTO `user`(`user_id`, `email`, `hash`, `is_admin`) VALUES (?,?,?,?);",
    values: [user_id, email, hashed, false]
  })
  if (insertDataAuth.error) {

    res.status(402).json({
      error: insertDataAuth.error.sqlMessage
    });
    return
  }
  res.status(200).json({ error: 'None' })
}