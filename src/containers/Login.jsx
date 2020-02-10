import React, { useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { login } from '../store/actions'
import SweetAlert from 'sweetalert2-react'
import { CLEAR_USER_ERROR } from '../store/actionTypes'
import loader from '../assets/spin.gif'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.userId)
  const isLoading = useSelector(state => state.users.isLoading)
  const error = useSelector(state => state.users.error)

  const handleLogin = useCallback(() => {
    dispatch(login({
      email: email,
      password: password
    }))
    setPassword('')
    setEmail('')
  }, [dispatch, email, password]);

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_USER_ERROR
    })
  }

  return (
    isLoading
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : error
        ? <SweetAlert
            show={error}
            title="Error"
            text={error}
            onConfirm={() => clearError()}
          />
        : user
          ? <Redirect to="/" />
          : <form className="w-1/2 mx-auto mt-24 max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Email
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" onChange={updateEmail} value={email} type="text" placeholder="john@mail.com" />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Password
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" onChange={updatePassword} value={password} type="password" placeholder="******************" />
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/4"></div>
                  <div className="w-3/4 mx-auto">
                    <button onClick={handleLogin} className="mb-4 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                      Sign In
                    </button>
                    <Link to="/register">
                      <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Doesn't have account? Register!
                      </button>
                    </Link>
                  </div>
                </div>
          </form>
  )
}