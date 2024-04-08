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
    if (password === 'pInK') {
      try {
        if (!stages.includes(4)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            '/stages/stage4',
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
          navigate('/stage5');
        } else {
          navigate('/stage5');
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
      <header className="question-header"> Stage 4 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
            A toddler named Shawan, who wants to study colors so badly since it
            attracted them. Teach him a few colors that come to your mind. The
            secret key for the next stage is alternate case words of the result
            and start with lowercase.
            <br />
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
            Input 1 : A set of colors
            <br />
            Input 2 : A string
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; strlen(A) &lt; 10 <br />0 &lt; strlen(A[i]) &lt; 10
            <sup>10</sup>{' '}
          </p>
          <br />
          <h3> OUTPUT: - </h3> <p>Print the predicted color.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3>{' '}
          <p>
            {' '}
            Blue green red brown purple rose white black brown <br />
            He wants flowers
          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> 8 </p>
          <br /> <h3> EXPLANATION 1: - </h3>{' '}
          <p>
            72+101+119+97+110+116+102+108+111+119+101+114+115=1385
            <br />
            1+3+8+5=17
            <br />
            1+7=8
          </p>{' '}
        </div>
        <br />
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
              green red blue violet brown black pink black violet brown <br />
              <br />I like coding.
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
        <Link to="/stage3" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(4) && (
          <Link to="/stage5" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
