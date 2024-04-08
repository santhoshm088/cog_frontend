import Axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import '../styles/AdminScreen.css';
import { getError } from '../utils';
import ReactLoading from 'react-loading';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false };
  }
};

export default function AdminScreen() {
  const [stage, setStage] = useState(0);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userList, stage1, stage2, stage3, stage4, stage5,stage6,stage7 } = state;

  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/users/logincount');
        localStorage.setItem('userLists', JSON.stringify(data));
        ctxDispatch({ type: 'USER_LISTS', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage1 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage1count');
        localStorage.setItem('stage1', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_1', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage2 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage2count');
        localStorage.setItem('stage2', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_2', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage3 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage3count');
        localStorage.setItem('stage3', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_3', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage4 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage4count');
        localStorage.setItem('stage4', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_4', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage5 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage5count');
        localStorage.setItem('stage5', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_5', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };
    const fetchStage6 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage6count');
        localStorage.setItem('stage6', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_6', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };

    const fetchStage7 = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get('/stages/stage7count');
        localStorage.setItem('stage7', JSON.stringify(data));
        ctxDispatch({ type: 'STAGE_7', payload: data });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    };

    fetchStage1();
    fetchStage2();
    fetchStage3();
    fetchStage4();
    fetchStage5();
    fetchStage6();
    fetchStage7();
    fetchUsers();
  }, []);

  const users =
    stage === 1
      ? stage1
      : stage === 2
      ? stage2
      : stage === 3
      ? stage3
      : stage === 4
      ? stage4
      : stage === 5
      ? stage5
      :stage === 6
      ? stage6
      :stage === 7
      ? stage7
      : userList;
  return (
    <section className="admin-page">
      <header className="admin-header"> ADMIN </header>{' '}
      {loading && (
        <div className="loading-box">
          <ReactLoading
            type="spinningBubbles"
            color="#00a2ff"
            height={'10%'}
            width={'10%'}
          />
        </div>
      )}
      {!loading && (
        <section className="stage-button-container">
          <button
            className={
              stage === 0
                ? 'stage-button btn0 stage-active'
                : 'stage-button btn0'
            }
            onClick={() => setStage(0)}
          >
            {' '}
            Login Count{' '}
          </button>{' '}
          <button
            className={
              stage === 1
                ? 'stage-button btn1 stage-active'
                : 'stage-button btn1'
            }
            onClick={() => setStage(1)}
          >
            {' '}
            Stage 1{' '}
          </button>{' '}
          <button
            className={
              stage === 2
                ? 'stage-button btn2 stage-active'
                : 'stage-button btn2'
            }
            onClick={() => setStage(2)}
          >
            {' '}
            Stage 2{' '}
          </button>{' '}
          <button
            className={
              stage === 3
                ? 'stage-button btn3 stage-active'
                : 'stage-button btn3'
            }
            onClick={() => setStage(3)}
          >
            {' '}
            Stage 3{' '}
          </button>{' '}
          <button
            className={
              stage === 4
                ? 'stage-button btn4 stage-active'
                : 'stage-button btn4'
            }
            onClick={() => setStage(4)}
          >
            {' '}
            Stage 4{' '}
          </button>{' '}
          <button
            className={
              stage === 5
                ? 'stage-button btn5 stage-active'
                : 'stage-button btn5'
            }
            onClick={() => setStage(5)}
          >
            {' '}
            Stage 5{' '}
          </button>{' '}



          <button
            className={
              stage === 6
                ? 'stage-button btn1 stage-active'
                : 'stage-button btn1'
            }
            onClick={() => setStage(6)}
          >
            {' '}
            Stage 6{' '}
          </button>{' '}

          <button
            className={
              stage === 7
                ? 'stage-button btn1 stage-active'
                : 'stage-button btn1'
            }
            onClick={() => setStage(7)}
          >
            {' '}
            Stage 7{' '}
          </button>{' '}


        </section>
      )}
      {!loading && (
        <main className="stage-table-container">
          <table className="stage-table">
            <thead>
              <tr>
                <th> S.No </th>
                <th> Name </th>
                <th> Roll No </th>
                <th> Email </th>
                <th> Time </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((data, idx) => (
                  <tr key={idx + 1}>
                    <td> {idx + 1} </td>
                    <td> {data.name} </td>
                    <td> {data.rollno} </td>
                    <td> {data.email} </td>
                    <td> {data.loginTime} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      )}
    </section>
  );
}
