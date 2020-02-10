import {
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_FAILURE,
  ADD_PASSWORD_SUCCESS,
  PASSWORD_PROCESS_START,
  PASSWORD_PROCESS_FAILURE,
  FETCH_PASSWORDS_SUCCESS,
  DELETE_PASSWORD_SUCCESS,
  EDIT_PASSWORD_SUCCESS,
  SEARCH_PASSWORDS_SUCCESS,
  SEARCH_PASSWORDS_FAILURE
} from '../actionTypes'
import firebaseApp from '../../firebaseConfig'
const db = firebaseApp.firestore();

export function login(obj) {
  return function(dispatch, getState) {
    let id;
    dispatch({
      type: LOGIN_START
    })
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then((user) => {
        id = user.user.uid
      })
      .then(() => {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: id
        })
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.message
        })
      })
  }
}

export function register(obj) {
  return function(dispatch, getState) {
    let id;
    dispatch({
      type: LOGIN_START
    })
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(obj.email, obj.password)
      .then((user) => {
        id = user.user.uid
      })
      .then(querySnapshot => {
        return db.collection('users')
        .doc(`${id}`)
        .set({
          email: obj.email,
          password: obj.password,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      .then(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: id
        })
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.message
        })
      })
  }
}

export function addPassword(obj) {
  return function(dispatch, getState) {
    let id = getState().users.userId
    dispatch({
      type: PASSWORD_PROCESS_START
    })
    db.collection('users')
      .doc(id)
      .collection('passwords')
      .add({
        url: obj.url,
        username: obj.username,
        password: obj.password,
        image: `http://logo.clearbit.com/${obj.url}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_PASSWORD_SUCCESS
        })
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_PROCESS_FAILURE,
          payload: err.message
        })
      })
  }
}

export function fetchPasswords() {
  return function(dispatch, getState) {
    let id = getState().users.userId
    dispatch({
      type: PASSWORD_PROCESS_START
    })
    db.collection('users')
      .doc(id)
      .collection('passwords')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() }});
        dispatch({
          type: FETCH_PASSWORDS_SUCCESS,
          payload: data
        })
      })
  }
}

export function editPassword(obj) {
  return function(dispatch, getState) {
    let user = getState().users.userId
    dispatch({
      type: PASSWORD_PROCESS_START
    })
    db.collection('users')
      .doc(user)
      .collection('passwords')
      .doc(obj.id)
      .set({
        url: obj.url,
        username: obj.username,
        password: obj.password,
        image: `http://logo.clearbit.com/${obj.url}`,
        createdAt: obj.createdAt,
        updatedAt: new Date()
      })
      .then(() => {
        dispatch({
          type: EDIT_PASSWORD_SUCCESS
        })
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_PROCESS_FAILURE,
          payload: err.message
        })
      })
  }
}

export function deletePassword(id) {
  return function(dispatch, getState) {
    let user = getState().users.userId
    dispatch({
      type: PASSWORD_PROCESS_START
    })
    db.collection('users')
      .doc(user)
      .collection('passwords')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_PASSWORD_SUCCESS
        })
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_PROCESS_FAILURE,
          payload: err.message
        })
      })
  }
}

export function searchPasswords(keyword) {
  return function(dispatch, getState) {
    let id = getState().users.userId
    dispatch({
      type: PASSWORD_PROCESS_START
    })
    const passwords = db.collection('users').doc(id).collection('passwords').where("url", "==", keyword)
    passwords
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() }});
        if (data.length === 0) {
          dispatch({
            type: SEARCH_PASSWORDS_FAILURE
          })
        } else {
          dispatch({
            type: SEARCH_PASSWORDS_SUCCESS,
            payload: data
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_PROCESS_FAILURE,
          payload: err.message
        })
      })
  }
}