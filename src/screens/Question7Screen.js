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
    if (password === 'true') {
      try {
        if (!stages.includes(7)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            'https://cog-backend-1.onrender.com/stages/stage7',
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
          navigate('/finish');
        } else {
          navigate('/finish');
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
      <header className="question-header  text-center text-success"> Stage 7 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
          Let’s dive into the colorful world of the ABC School’s march-past event. Imagine a grand parade ground with 9 rows and 9 columns, just like a giant Sudoku board.Zoom in further, Divide the entire parade ground into 9 smaller groups, each group has 3*3 students, 
          so entire parade is divided as 9(3*3) groups.9 colours of dresses were given to student in the manner, each student one colour. On the sports day, some of the participants where absent, so it is planned to leave space for the absenties. <br></br>
There are more constraints presented by principal for the way in which students should be arranged in the march-past parade, they are <br></br>
* In a row, there should not be students with same colour.<br></br>
* In a column, there should not be students with same colour.<br></br>
* In a each 3x3 group, there should not be students with same colour.<br></br>
It was instructed to students to follow these rules, but some didn't follow the rules because they wanted to be with friend.<br></br>
Imagine you are the event coordinator for march-past event and check whether the rule is followed are not.(Imagine 9 colours as numbers from 0-9)<br></br>
let’s check our colorful masterpiece!<br></br>

          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
          81 elements, in 9 rows and 9 columns like a two dimensional matrix. The '.'(dot) represents the absence of students.
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            elements[i][j] is a digit 0-9 or '.' only.

          </p>
          <br />
          <h3> OUTPUT: - </h3>
           <p>Boolean value True if all the rules are followed, False if one or more rule is violated.
</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3> 
          <p>: 5 3 . . 7 . . . .<br></br>
          6 . . 1 9 5 . . .<br></br>
          . 9 8 . . . . 6 .<br></br>
          8 . . . 6 . . . 3<br></br>
          4 . . 8 . 3 . . 1<br></br>
          7 . . . 2 . . . 6<br></br>
          . 6 . . . . 2 8 .<br></br>
          . . . 4 1 9 . . 5<br></br>
          . . . . 8 . . 7 9<br></br>

</p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> 
          <p>true</p>
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3>
           <p>8 3 . . 7 . . . .<br></br>
              6 . . 1 9 5 . . .<br></br>
              . 9 8 . . . . 6 .<br></br>
              8 . . . 6 . . . 3<br></br>
              4 . . 8 . 3 . . 1<br></br>
              7 . . . 2 . . . 6<br></br>
              . 6 . . . . 2 8 .<br></br>
              . . . 4 1 9 . . 5<br></br>
              . . . . 8 . . 7 9<br></br>





           </p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3>
           <p>  false </p>
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">
         . . 4 6 . 8 9 1 2<br></br>
		     . 7 2 . . . 3 4 8<br></br>
		     1 . . 3 4 2 5 . 7<br></br>
		     . 5 9 7 . 1 4 2 .<br></br>
		     . 2 6 . 5 . 7 9 .<br></br>
		     . 1 3 9 . 4 8 5 .<br></br>
		     9 . 1 5 3 7 . . 4<br></br>
		     2 8 7 . . . 6 3 .<br></br>
		     3 4 5 2 . 6 1 . .<br></br>

              
              
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
        <Link to="/stage6" className="previous-button">
          <i className="fa-solid fa-angles-left left-arrow"> </i> Previous{' '}
        </Link>{' '}
        {stages.includes(7) && (
          <Link to="/finish" className="next-button">
            Next <i className="fa-solid fa-angles-right right-arrow"> </i>{' '}
          </Link>
        )}
      </section>{' '}
    </section>
  );
}
