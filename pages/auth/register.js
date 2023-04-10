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
      designation: '',
      title: '',
      f_name: '',
      m_name: '',
      l_name: '',
      mob: '',
      qualification: ''
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

      // validation for designation
      if (values.designation.includes(" ")) {
        errors.designation = "Invalid Designation";
      }
      // validation for title
      if (!values.title) {
        errors.title = "Required";
      } else if (values.title.includes(" ")) {
        errors.title = "Invalid Title";
      }
      // validation for f_name
      if (!values.f_name) {
        errors.f_name = "Required";
      } else if (values.f_name.includes(" ")) {
        errors.f_name = "Invalid First Name";
      }
      // validation for m_name
      if (values.m_name.includes(" ")) {
        errors.m_name = "Invalid Middle Name";
      }
      // validation for l_name
      if (values.l_name.includes(" ")) {
        errors.l_name = "Invalid First Name";
      }

      // validation for mob
      if (!/^[0-9]*$/i.test(values.mob)) {
        errors.mob = "Mobile Number should only contains numbers";
      } else if (values.mob.length != 10) {
        errors.mob = "Mobile Number should be 10 digits";
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
        designation: values.designation,
        title: values.title,
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        mob: values.mob,
        qualification: values.qualification,
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

          {/* form */}
          <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>

            {/* first page */}
            {/* {next ? <FirstPage /> : <SecondPage />} */}

            {(() => {
              if (next) {
                return (
                  <>
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
                  </>
                )
              }
              else {
                return (<>
                  {/* Designation */}
                  <div className={`${styles.input_group} ${formik.errors.designation && formik.touched.designation ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='designation'
                      placeholder='Designation'
                      className={styles.input_text}
                      {...formik.getFieldProps('designation')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineKey size={25} />
                    </span>

                  </div>
                  {formik.errors.designation && formik.touched.designation ? <span className='text-rose-500'>{formik.errors.designation}</span> : <></>}

                  {/* Title */}
                  <div className={`${styles.input_group} ${formik.errors.title && formik.touched.title ? 'border-rose-600' : ''}`}>
                    <select
                      name='title'
                      placeholder='Title'
                      default=''
                      className={styles.input_text}
                      {...formik.getFieldProps('title')}
                    >
                      <option value="" className={styles.input_text}>Title</option>
                      <option value="Mr" className={styles.input_text}>Mr</option>
                      <option value="Miss" className={styles.input_text}>Miss</option>
                      <option value="Mrs" className={styles.input_text}>Mrs</option>
                      <option value="Dr" className={styles.input_text}>Dr</option>
                      <option value="Fr" className={styles.input_text}>Fr</option>
                      <option value="Sr" className={styles.input_text}>Sr</option>
                    </select>
                    <span className='icon flex items-center px-4'>
                      <HiOutlineAnnotation size={25} />
                    </span>

                  </div>
                  {formik.errors.title && formik.touched.title ? <span className='text-rose-500'>{formik.errors.title}</span> : <></>}

                  {/* First Name */}
                  <div className={`${styles.input_group} ${formik.errors.f_name && formik.touched.f_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='f_name'
                      placeholder='First Name'
                      className={styles.input_text}
                      {...formik.getFieldProps('f_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.f_name && formik.touched.f_name ? <span className='text-rose-500'>{formik.errors.f_name}</span> : <></>}

                  {/* Middle Name */}
                  <div className={`${styles.input_group} ${formik.errors.m_name && formik.touched.m_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='m_name'
                      placeholder='Middle Name'
                      className={styles.input_text}
                      {...formik.getFieldProps('m_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.m_name && formik.touched.m_name ? <span className='text-rose-500'>{formik.errors.m_name}</span> : <></>}

                  {/* Last Name */}
                  <div className={`${styles.input_group} ${formik.errors.l_name && formik.touched.l_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='l_name'
                      placeholder='Last Name'
                      className={styles.input_text}
                      {...formik.getFieldProps('l_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.l_name && formik.touched.l_name ? <span className='text-rose-500'>{formik.errors.l_name}</span> : <></>}

                  {/* Qualification */}
                  <div className={`${styles.input_group} ${formik.errors.qualification && formik.touched.qualification ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='qualification'
                      placeholder='Qualification'
                      className={styles.input_text}
                      {...formik.getFieldProps('qualification')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineDocumentText size={25} />
                    </span>

                  </div>
                  {formik.errors.qualification && formik.touched.qualification ? <span className='text-rose-500'>{formik.errors.qualification}</span> : <></>}

                  {/* Mobile Number */}
                  <div className={`${styles.input_group} ${formik.errors.mob && formik.touched.mob ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='mob'
                      placeholder='Mobile Number'
                      className={styles.input_text}
                      {...formik.getFieldProps('mob')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlinePhone size={25} />
                    </span>

                  </div>
                  {formik.errors.mob && formik.touched.mob ? <span className='text-rose-500'>{formik.errors.mob}</span> : <></>}


                </>)
              }

            })()}

            {/* login buttons */}
            {next ?
              <>
                <div className="input-button">
                  <button type="button" className={styles.button} onClick={() => setNext(!next)}>
                    Next
                  </button>
                </div></>
              :
              <>
                <div className="input-button">
                  <button type="button" className={styles.button} onClick={() => setNext(!next)}>
                    Back
                  </button>
                </div>
                <div className="input-button">
                  <button type='submit' className={styles.button}>
                    Register
                  </button>
                </div>
                {errorReq != '' ? <span className='text-rose-500'>{errorReq}</span> : <></>}
              </>}
          </form>

          {/* bottom */}
          <p className='text-center text-gray-400 '>Have an account? <Link href={'/auth/login'} className='text-blue-400'>Login</Link>
          </p>
        </section>
      </div>
    </>
  );
}

export default Register;