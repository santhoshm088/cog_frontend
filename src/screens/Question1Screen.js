import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/QuestionScreen.css';
import { getError } from '../utils';
import Axios from 'axios';
import { Store } from '../Store';
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

export default function Question1Screen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, stages } = state;

  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });

  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === 'ZERO') {
      try {
        if (!stages.includes(1)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            '/stages/stage1',
            {
              rollno,
              name,
              email,
            },
            { headers: { authorization: `Bearer ${userInfo.token}` } }
          );
          stages.push(data.stage);
          ctxDispatch({ type: 'STAGE', payload: stages });
          localStorage.setItem('stages', JSON.stringify(stages));
          dispatch({ type: 'FETCH_SUCCESS' });
          navigate('/stage2');
        } else {
          navigate('/stage2');
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED' });
        toast.error(getError(err));
      }
    } else {
      toast.error('Wrong Password!');
    }
  };
  return (
    <section className="question-page">
      {loading && (
        <div className="overlay1">
          <div className="loading-box">
            <ReactLoading
              type="spinningBubbles"
              color="#00a2ff"
              height={'10%'}
              width={'10%'}
            />
          </div>
        </div>
      )}
      <header className="question-header"> Stage 1 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
            Pranesh is a UG Scholar. He is given with problem where he has to
            find the number of characters in a string equivalent to the given
            ASCII value. The secret key for the next stage is higher case of the
            result.
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
            First line contains the string S.
            <br />
            Second line contains an integer N.
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; strlen(S) &lt; 10<sup>5</sup> <br />0 &lt; N &lt; 10
            <sup>10</sup>{' '}
          </p>
          <br />
          <h3> OUTPUT: - </h3>{' '}
          <p>
            Print the number of characters which is equal to the target ASCII.
          </p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3>{' '}
          <p>
            {' '}
            cse coding club <br />
            99{' '}
          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> 3 </p>
          <br /> <h3> EXPLANATION 1: - </h3>{' '}
          <p>
            ASCII value of character 'c' is 99. There are 3 characters 'c' in
            the given string.
          </p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3>{' '}
          <p>
            {' '}
            happy learning <br />
            112{' '}
          </p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3> <p> 2 </p>
          <br /> <h3> EXPLANATION 2: - </h3>{' '}
          <p>
            ASCII value of character 'p' is 113. There are 3 characters 'p' in
            the given string.
          </p>{' '}
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
              cognizance
              <br />
              98
            </div>
            <div className="box-lid">
              <div className="box-bowtie"></div>
            </div>
          </div>
        </div>
      </div>
      <section className="stage-form-container">
        <form className="stage-form" onSubmit={submitHandler}>
          <div className="input-field-tags">
            <label>
              {' '}
              Password <div className="required-element"> * </div>{' '}
            </label>{' '}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-fields stage-input-fields"
              required
            />
          </div>{' '}
          <button type="submit" className="continue-button">
            Continue{' '}
          </button>{' '}
        </form>{' '}
        <div className="coding-image-container">
          <img src={require('../assets/coding.gif')} alt="Coding" />
        </div>{' '}
      </section>{' '}
      <section className="pagination-button-container">
        <Link to="/" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(1) && (
          <Link to="/stage2" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
