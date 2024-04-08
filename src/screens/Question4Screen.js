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
    if (password === 'programing') {
      try {
        if (!stages.includes(4)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            'https://cog-backend-1.onrender.com/stages/stage4',
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
      <header className="question-header text-center text-success"> Stage 4 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
          While readers peruse a storybook, certain words contain errors, indicated by a star immediately following the mistake. By removing the star and the preceding character, the correct string emerges, aiding readers in enjoying a smoother reading experience.
            <br />
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
            Input 1 : A String consists of characters
           
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; S.strlen() &lt; 10 <br />
          </p>
          <br />
          <h3> OUTPUT: - </h3>
           <p>A output consists of String.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3>{' '}
          <p>
            {' '}
            cogg*nn*issance<br></br>
          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3>
           <p> cognissance </p>
          <br /> 
         
        </div>

        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3>{' '}
          <p>
            {' '}
            enginn*eering<br></br>
          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3>
           <p> engineering </p>
          <br />
         
        </div>

        <br />
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
            pro**rogrr*aming <br />
              <br />
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
