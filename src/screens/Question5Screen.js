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
    if (password === '[1,2,5,8,0,9,3,4]') {
      try {
        if (!stages.includes(5)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            'https://cog-backend-1.onrender.com/stages/stage5',
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
          navigate('/stage6');
        } else {
          navigate('/stage6');
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
      <header className="question-header  text-center text-success"> Stage 5 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
                   
          Sheela built a spiral staircase in her house and represents the steps as elements of a matrix. help her to find the way from ground floor to the first floor

          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
          First line consists of number of rows and number of columns<br></br>
		      
          Next line consists of matrix elements<br></br>

          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            1 &lt;= m,n &lt;= 10
          </p>
          <br />
          <h3> OUTPUT: - </h3> 
          <p>    m x n matrix, return all elements of the matrix in spiral order.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3> <p>
            3 3<br></br>
            [[1,2,3],[4,5,6],[7,8,9]]
            </p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> 
          [1,2,3,6,9,8,7,4,5]<br></br> 
            </p>
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3> <p>
          4 4 <br></br>
          [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
          </p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3> <p> [1,2,3,4,8,12,11,10,9,5,6,7] </p>
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
             <p>
              4 2<br></br>
              [[1,2],[4,5],[3,8],[9,0]]
             </p>
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
        <Link to="/stage4" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(5) && (
          <Link to="/stage6" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
