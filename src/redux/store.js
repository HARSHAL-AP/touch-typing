import { legacy_createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, put, call, takeEvery ,takeLatest} from 'redux-saga/effects';


const initialState = {
  data: [],
};


const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';


const fetchData = (payload) => ({
    type: FETCH_DATA,
    payload:payload
  });
  
  const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
  });
  
  const fetchDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error,
  });

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };


function* loadDataSaga(action) {
    try {
        const { payload } = action;
       
        const response = yield call(fetch, `https://wordapi-g70z.onrender.com/${ payload}`);
        const data = yield call([response, 'json']);
        yield put(fetchDataSuccess(data));
      } catch (error) {
        yield put(fetchDataFailure(error.message));
      }
}


function* rootSaga() {
    yield takeLatest(FETCH_DATA, loadDataSaga);
  }

const sagaMiddleware = createSagaMiddleware();
const store = legacy_createStore(reducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(rootSaga);

export { store, fetchData };