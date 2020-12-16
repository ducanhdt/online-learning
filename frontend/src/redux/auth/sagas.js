import { all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import api from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';

function* loginSaga({ userInfo }) {
  let accessToken;
  try {
    const { data } = yield api.auth.login(userInfo);
    if (!data.status) {
      yield put(actions.auth.loginFailure(data.message));
      return;
    }
    ({ accessToken } = data.result);
    yield put(actions.auth.loginSuccess(accessToken));
    yield put(actions.auth.verifyToken(accessToken));
    setCookie('accessToken', accessToken, 1 * 24 * 60 * 60 * 1000);
  } catch (error) {
    yield put(actions.auth.loginFailure('Server ERROR'));
  }
}

function logoutSaga() {
  try {
    setCookie('accessToken', null, 1);
  } catch (error) {
    //console.log(error);
  }
}
function* verifyTokenSaga({ accessToken }) {
  try {
    const { data } = yield api.auth.verify(accessToken);
    if (!data.status) throw new Error();
    yield put(
      actions.auth.verifyTokenSuccess(
        accessToken,
        data.result.account.name,
        data.result.account.avatar,
        data.result.account.isAdmin,
        data.result.account.email,
      ),
    );
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.auth.actionTypes.LOGIN, loginSaga),
    takeLatest(actions.auth.actionTypes.LOGOUT, logoutSaga),
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
