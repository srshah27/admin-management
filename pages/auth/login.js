import Head from 'next/head'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import styles from '../../styles/Form.module.css';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../../lib/validate';
import { useRouter } from 'next/router';


export default function Login() {

  const [show, setShow] = useState(false)
  const router = useRouter()
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit
  })


  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/"
    })
    if (status.ok) router.push(status.url)

  }

  return (
    <>

      <Head>
        <title>Login</title>
      </Head>
      <div className='m-auto rounded-md w-3/5 h-3/4 grid lg:grid-cols-1 text-center'>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Login</h1>
            <p className='w-3/4 mx-auto text-gray-400'></p>
          </div>

          {/* form */}
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
                placeholder='password'
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                <HiFingerPrint size={25} />
              </span>

            </div>

            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
            {/* login buttons */}
            <div className="input-button">
              <button type='submit' className={styles.button}>
                Login
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className='text-center text-gray-400 '>Don{"'"}t have an account yet? <Link href={'/auth/register'} className='text-blue-400'>Register</Link>
          </p>
        </section>
      </div>
    </>
  )
}