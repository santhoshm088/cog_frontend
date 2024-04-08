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
    if (password === 'nineThousandNineHundredNinetyNine') {
      try {
        if (!stages.includes(2)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            '/stages/stage2',
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
          navigate('/stage3');
        } else {
          navigate('/stage3');
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
      <header className="question-header"> Stage 2 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
            Raju,a student weak in maths is doing his maths homework.His
            homework is to write the alphabet series upto n terms.While doing
            his father called him.He went and after sometime he starts resuming
            his work.But atlast,he found that he had missed a number within the
            range. Help him to find the missing number. The secret key for the
            next stage is camel case words of the result.
            <br />
            <strong>Note:-</strong>
            <span>Don't consider white spaces in secret key.</span>
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
            First line contains the number of elements in the series.
            <br />
            Second line contains the N integers of space separated.
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; N &lt; 10<sup>5</sup> <br />0 &lt; A[i] &lt; 10<sup>10</sup>{' '}
          </p>
          <br />
          <h3> OUTPUT: - </h3> <p>Print the missing number.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3>{' '}
          <p>
            {' '}
            5 <br />5 10 7 6 9{' '}
          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> 8 </p>
          <br /> <h3> EXPLANATION 1: - </h3>{' '}
          <p>The missed value in the series is 8.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3> <p>7 2 3 5 4 8 7 9</p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3> <p> 6 </p>
          <br /> <h3> EXPLANATION 2: - </h3>{' '}
          <p>The missed value in the series is 6.</p>
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
              3
              <br />
              9998 10000 10001
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
        <Link to="/stage1" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(2) && (
          <Link to="/stage3" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
