import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import '../styles/SigninScreen.css';
import Video from '../assets/login_back.mp4';


export default function AdminSigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { isAdmin } = state;
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === 'ccc.23cse@kongu.edu' && password === 'kongu@2022') {
      localStorage.setItem('isAdmin', true);
      ctxDispatch({ type: 'ADMIN', payload: true });
      navigate('/admin');
    } else {
      toast.error('Invalid Credentials!');
    }
  };

  return (
    <div className="sign-in-page">


<video className='video' src={Video} autoPlay loop muted />
      
        {/* <div className="admin-overlay"> </div>{' '} */}

        <div className='login'>
          
        <form className="register-form admin-signin" onSubmit={submitHandler}>
        <div><h1 className='text-center'>ADMIN</h1></div>
          <div className="input-field-tags">
            <label>
              {' '}
              Email <div className="required-element"> * </div>{' '}
            </label>{' '}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-fields"
              required
            />
          </div>{' '}
          <div className="input-field-tags">
            <label>
              {' '}
              Password <div className="required-element"> * </div>{' '}
            </label>{' '}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-fields"
              required
            />
          </div>{' '}
          <button type="submit" className="register-button">
            Sign in{' '}
          </button>{' '}
        </form>{' '}
        </div>
      
    </div>
  );
}
