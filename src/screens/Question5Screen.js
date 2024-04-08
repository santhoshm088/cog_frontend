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
    if (password === '1 1 1 2 0 1 2 0 5 0') {
      try {
        if (!stages.includes(5)) {
          const rollno = userInfo.rollno;
          const name = userInfo.name;
          const email = userInfo.email;
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await Axios.put(
            '/stages/stage5',
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
      <header className="question-header"> Stage 5 </header>{' '}
      <main className="question-container">
        <div className="question-description">
          <p>
            Bob the robber is trying to rob a bank, The Vault is highly secured
            and ecoded, however Bob outsmarted the security and reached the
            final security section. The pin for opening the vault is encoded, so
            help Bob to decode the pin and open the vault. The secret key for
            the next stage is result.
          </p>{' '}
        </div>{' '}
        <div className="format">
          <h3> INPUT: - </h3>{' '}
          <p>
            The input consists of a string mixed with numbers and alphabets.
          </p>
          <br />
          <h3> CONSTRAINTS: - </h3>{' '}
          <p>
            {' '}
            0 &lt; strlen(S) &lt; 10<sup>5</sup>
          </p>
          <br />
          <h3> OUTPUT: - </h3> <p>Print the decoded pin.</p>{' '}
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 1: - </h3> <p>a11472o5t6</p>
          <br />
          <h3> SAMPLE OUTPUT 1: - </h3> <p> 0 2 1 0 1 1 1 1 0 0 </p>
        </div>
        <br />
        <div className="sample-input">
          <h3> SAMPLE INPUT 2: - </h3> <p>lw4n88j12n1</p>
          <br />
          <h3> SAMPLE OUTPUT 2: - </h3> <p> 0 2 1 0 1 0 0 0 2 0 </p>
        </div>{' '}
      </main>
      <div className="gift-container">
        <div className="box">
          <div className="box-body">
            <div className="input-container">1v88886l256338ar0ekk</div>
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
