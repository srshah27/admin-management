import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint, HiOutlinePhone, HiOutlineUser, HiOutlineKey, HiOutlineDocumentText, HiOutlineAnnotation } from "react-icons/hi";
import { useState } from 'react';
import styles from '../../styles/Form.module.css';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const Register = () => {


  const [show, setShow] = useState(false)
  const [cshow, setCShow] = useState(false)
  const [next, setNext] = useState(true)
  const [errorReq, setError] = useState('')
  const router = useRouter()
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      // validate confirm password
      if (!values.cpassword) {
        errors.cpassword = "Required";
      } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password Not Match...!"
      } else if (values.cpassword.includes(" ")) {
        errors.cpassword = "Invalid Confirm Password"
      }

      // validation for password
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
      } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
      }
      return errors;
    },
    onSubmit: onSubmit
  })

  async function onSubmit(values) {

    const status = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      })
    }).then(res => res.json())
      .then(res => {
        if (res.error)
          setError(res.error);
        else
          router.push('/auth/login');
      })
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className='m-auto rounded-md w-3/5 h-3/4 grid lg:grid-cols-1 text-center'>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            <p className='w-3/4 mx-auto text-gray-400'></p>
          </div>

          <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
            <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
              <input
                type="email"
                name='email'
                placeholder='Email'
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className='icon flex items-center px-4'>
                <HiAtSymbol size={25} />
              </span>

            </div>
            {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}

            <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
              <input
                type={`${show ? "text" : "password"}`}
                name='password'
                placeholder='Password'
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                <HiFingerPrint size={25} />
              </span>

            </div>

            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

            <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
              <input
                type={`${cshow ? "text" : "password"}`}
                name='cpassword'
                placeholder='Confirm Password'
                className={styles.input_text}
                {...formik.getFieldProps('cpassword')}
              />
              <span className='icon flex items-center px-4' onClick={() => setCShow(!cshow)}>
                <HiFingerPrint size={25} />
              </span>

            </div>
            {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
            <div className="input-button">
              <button type='submit' className={styles.button}>
                Register
              </button>
            </div>
            {errorReq != '' ? <span className='text-rose-500'>{errorReq}</span> : <></>}
            {/* login buttons */}
          </form >

          {/* bottom */}
          <p className='text-center text-gray-400 ' > Have an account ? <Link href={'/auth/login'} className='text-blue-400'>Login</Link></p>
        </section>
      </div>
    </>
  );
}

export default Register;