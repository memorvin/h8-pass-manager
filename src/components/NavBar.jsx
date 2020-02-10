import React, { useState } from 'react'
import firebaseApp from '../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_SUCCESS, CLEAR_USER_SUCCESS } from '../store/actionTypes'
import { useHistory } from 'react-router-dom'
import SweetAlert from 'sweetalert2-react'
import { searchPasswords, fetchPasswords } from '../store/actions'

export default function NavBar() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const success = useSelector(state => state.users.success)
  const user = useSelector(state => state.users.userId)

  const handleLogout = () => {
    firebaseApp.auth().signOut()
    dispatch({
      type: LOGOUT_SUCCESS
    })
    history.push('/login')
  }

  const handleSearch = () => {
    if (keyword) {
      dispatch(searchPasswords(keyword))
      setKeyword('')
    } else {
      dispatch(fetchPasswords())
    }
  }

  const updateKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const clearSuccess = () => {
    dispatch({
      type: CLEAR_USER_SUCCESS
    })
  }

  return (
    success
      ? <SweetAlert
        show={success}
        title="Success"
        text={success}
        onConfirm={() => clearSuccess()}
      />
      : <nav className="flex py-8 pb-6 border-b-2 border-gray-300 mb-8">
          <div className="flex w-full items-center">
            <div className="w-1/5 flex items-center mb-4 md:mb-0 ml-10 text-2xl">
              P455 manager
            </div>
            <div className="w-2/5 flex items-center">
              <input className="bg-gray-100 border-2 focus:border-yellow-200 p-1 rounded-lg shadow-inner w-full" placeholder="Find your password..." type="text" onChange={updateKeyword} value={keyword} />
              <button onClick={() => handleSearch()} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">Search</button>
            </div>
            <div className="flex w-2/5 justify-end">
              <div className="dropdown inline-block relative">
                {
                  user
                  ? <button data-testid="signout-btn" onClick={handleLogout} className="relative z-10 mr-10 overflow-hidden focus:outline-none text-sm leading-loose cursor-pointer text-white bg-blue-500 py-1 px-2 rounded inline-flex items-center">
                      sign out
                    </button>
                  : <></> 
                }
              </div>
            </div>
          </div>
        </nav>
  )
}

