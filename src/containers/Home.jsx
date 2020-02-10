import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from "../components/Auth";
import { LOGIN_SUCCESS } from '../store/actionTypes';
import { PasswordForm } from '../components/PasswordForm'
import { PasswordCard } from '../components/PasswordCard'
import { fetchPasswords } from '../store/actions'

export default function Home() {

  const dispatch = useDispatch()
  const { currentUser } = useContext(AuthContext);
	const passwords = useSelector(state => state.passwords.passwords)
	const [modalIsActive, setModalIsActive] = useState(false)

  useEffect(() => {
		if (currentUser) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: currentUser.uid
			})
			dispatch(fetchPasswords())
		}
	}, [dispatch, currentUser])

	function handleToggleModal() {
		setModalIsActive(!modalIsActive)	
	}
	
	function renderPasswordCard() {
		return passwords.map(password => {
      return <PasswordCard password={password} key={password.id} toggleModal={handleToggleModal}/>
    })
	}

  return (
	<div className="container my-4 mx-auto px-4 md:px-12">
		<PasswordForm toggleModal={handleToggleModal} show={modalIsActive} />
	  <div className="flex flex-wrap -mx-1 lg:-mx-4">
			{renderPasswordCard()}
		</div>
	</div>
  )
}