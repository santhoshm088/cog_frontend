import React, { useContext, useReducer, useState } from 'react';
import '../styles/SigninScreen.css';
import Axios from 'axios';
import { getError } from '../utils.js';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Video from '../assets/login_back.mp4';



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

export default function SigninScreen() {
  const [rollno, setRollno] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Civil Engineering');
  const [year, setYear] = useState('2');
  const [section, setSection] = useState('A');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await Axios.put('https://cog-backend-1.onrender.com/users/signin', {
        rollno,
        name,
        email,
        department,
        year,
        section,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'FETCH_SUCCESS' });
      toast.success(data.name + ' loggedin successfully!');
      navigate('/guidelines');
    } catch (err) {
      dispatch({ type: 'FETCH_FAILED' });
      toast.error(getError(err));
    }
  };

  return (
    <div className="sign-in-page">





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

    
     
        {/* <div className="overlay"> </div> */}

        <video className='video' src={Video} autoPlay loop muted />

  
   
       <div className='login'>
        <form className="register-form my-5" onSubmit={registerHandler}>

          <div>
            <h1 className='text-center'>LOGIN</h1>
          </div>
          <div className="input-field-tags">
            <label>
              {' '}
              Rollno <div className="required-element"> * </div>{' '}
            </label>{' '}
            <input
              type="text"
              onChange={(e) => setRollno(e.target.value)}
              className="input-fields"
              required
            />{' '}
          </div>{' '}
          <div className="input-field-tags">
            <label>
              Name <div className="required-element"> * </div>
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="input-fields"
              required
            />
          </div>
          <div className="input-field-tags">
            <label>
              Email <div className="required-element"> * </div>{' '}
            </label>{' '}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-fields"
              required
            />{' '}
          </div>{' '}
          <div className="input-field-tags">
            <label>
              {' '}
              Department <div className="required-element"> * </div>{' '}
            </label>{' '}
            <select onChange={(e) => setDepartment(e.target.value)}>
              <option value="Civil Engineering"> Civil Engineering </option>{' '}
              <option value="Mechanical Engineering">
                Mechanical Engineering{' '}
              </option>{' '}
              <option value="Mechatronics Engineering">
                Mechatronics Engineering{' '}
              </option>{' '}
              <option value="Automobile Engineering">
                Automobile Engineering{' '}
              </option>{' '}
              <option value="Chemical Engineering">
                {' '}
                Chemical Engineering{' '}
              </option>{' '}
              <option value="Food Technology"> Food Technology </option>{' '}
              <option value="Electrical and Electronics Engineering">
                Electrical and Electronics Engineering{' '}
              </option>{' '}
              <option value="Electronics and Instrumentation Engineering">
                Electronics and Instrumentation Engineering{' '}
              </option>{' '}
              <option value="Electrical and Communication Engineering">
                Electrical and Communication Engineering{' '}
              </option>{' '}
              
              <option value="B.Sc Computer Systems and Design">
                B.Sc Computer Systems and Design{' '}
              </option>{' '}
              <option value="B.Sc Information Systems">
                B.Sc Information Systems{' '}
              </option>{' '}
              <option value="B.Sc Software Systems">
                B.Sc Software Systems{' '}
              </option>{' '}
              <option value="M.Sc Software Systems">
                M.Sc Software Systems{' '}
              </option>{' '}
              <option value="MBA"> MBA </option>{' '}
              <option value="MCA"> MCA </option>{' '}
              <option value="CT-UG"> CT - UG </option>{' '}
              <option value="CT-PG"> CT - PG </option>{' '}
            </select>{' '}
          </div>{' '}
          <div className="input-field-tags">
            <label>
              {' '}
              Year <div className="required-element"> * </div>{' '}
            </label>{' '}
            <select onChange={(e) => setYear(e.target.value)}>
              <option value="2"> II </option> <option value="3"> III </option>{' '}
              <option value="4"> IV </option> <option value="5"> V </option>{' '}
            </select>{' '}
          </div>{' '}
          <div className="input-field-tags">
            <label>
              {' '}
              Section <div className="required-element"> * </div>{' '}
            </label>{' '}
            <select type="text" onChange={(e) => setSection(e.target.value)}>
              <option value="A"> A </option> <option value="B"> B </option>{' '}
              <option value="C"> C </option> <option value="D"> D </option>{' '}
            </select>{' '}
          </div>{' '}
          <button type="submit" className="register-button">
            Register{' '}
          </button>{' '}
        </form>{' '}
     
     
    </div>

    </div>
  );
}
