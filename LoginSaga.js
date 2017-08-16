import { put,call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import firebase from 'firebase'

export function * login ({ username, password }){
  let userId;

  try{
    userId = yield call(firebaseLogin, username, password)
    yield put(LoginActions.loginSuccess(username))
  }catch(error){
    try{
      userId = yield call(firebaseCreate, username, password)
      yield put(LoginActions.loginSuccess(username))
    }catch(e){
      yield put(LoginActions.loginFailure('wrong'))
    }
  }

}

const firebaseLogin = (username,password) => {
  return firebase.auth().signInWithEmailAndPassword(username,password).then(
    (userId) => {
       return(userId)
    }
  ).catch((e)=>{
    throw e
  })
}

const firebaseCreate = (username,password) => {
  return firebase.auth().createUserWithEmailAndPassword(username,password).then(
    (userId) => {
       return(userId)
    }
  ).catch((e)=>{
    throw e
  })
}
