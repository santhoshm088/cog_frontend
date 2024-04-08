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
    if (password === '1 0 6 4 5 0 9 4 1') {
      try {
        if (!stages.includes(2)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            'https://cog-backend-1.onrender.com/stages/stage2',
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
      <header className="question-header text-center text-success"> Stage 2 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
          
          Ram is given a set of elements but it is a mix of original and duplicate values. Help Ram to find the original values. Indicate the duplicate values using 0.

            <br />
          
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
          An integer n representing the number of elements.<br></br>
          <p>Next line consists of array elements. </p>
           
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; n &lt; 100 <br />
          
          </p>
          <br />
          <h3> OUTPUT: - </h3> 
          <p>      An array containing original values with 0 in place of duplicate values.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3>{' '}
          <p>
          11<br></br>
                     2 2 2 3 3 1 6 7 7 4 9

          </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p>   2 0 0 3 0 1 6 7 0 4 9 </p>
          <br /> <h3> EXPLANATION 1: - </h3>{' '}
          
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3>
          <p>7</p>
          
         <p>8 1 2 7 6 3 3</p> 

          <br />
          <h3> SAMPLE OUTPUT 2: - </h3><br></br>
           <p>  8 1 2 7 6 3 0 </p>
          
          
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
              <p>9<br></br>
             
             1 1 6 4 5 5 9 4 1</p>
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
