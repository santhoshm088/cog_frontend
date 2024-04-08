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
    if (password === "'225''229''110''109'") {
      try {
        if (!stages.includes(3)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            '/stages/stage3',
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
          navigate('/stage4');
        } else {
          navigate('/stage4');
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
      <header className="question-header"> Stage 3 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
            Raja has a 10 days holidays for his semester, while he was alone in
            home, he gets bored. He wants to play a game with his friend Ragu.
            He has two arrays of characters. His task is to add the respective
            characters. He need reverse the first script and perform operation.
            Help him to add those characters. The secret key for the next stage
            is result and each value is enclosed within single quotes.
            <br />
            <strong>Note:-</strong>
            <span>Don't consider white spaces in secret key.</span>
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3> <p>First line contains the 2D array.</p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            Array contains lowercase alphabets.
            <br /> 0 &lt; strlen(A[i]) &lt; 10
            <sup>5</sup> <br />0 &lt; strlen(A) &lt; 2{' '}
          </p>
          <br />
          <h3> OUTPUT: - </h3> <p>Print the resultant array.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3> <p>[ [‘a’,’b’,’c’],[‘d’,’e’,’f’] ]</p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> [201,199,197]</p>
          <br /> <h3> EXPLANATION 1: - </h3>{' '}
          <p>
            Reversing the first subscript [c , b , a]
            <br />
            Reversing the second subscript [ f, e, d]
            <br />
            Adding - ASCII values of c and f - 201 , b and e – 199 , d and a
            -197
            <br />
            Res = [201, 199 , 197]
            <br />
          </p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3> <p>[ [‘x’,’y’,’z’],[‘p’,’q’,’r’] ]</p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3> <p> [234,234,234] </p>
          <br /> <h3> EXPLANATION 2: - </h3>{' '}
          <p>
            Reversing the first subscript [z , y , x]
            <br />
            Reversing the second subscript [ p, q, r]
            <br />
            Adding - ASCII values of z and p - 234 , y and q – 234 , x and r
            -234
            <br />
            Res = [234, 234 , 234]
            <br />
          </p>
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">[['m','n','r','q'],['p','s']]</div>
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
        <Link to="/stage2" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(3) && (
          <Link to="/stage4" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
