import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import '../styles/GuidelinesScreen.css';

export default function GuidelinesScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    // <section className="guidelines-container">
      
    //   <div className="guidelines w-100">
    //     <div className="loader w-100">
    //       <h1 className='text-center'> Instructions: - </h1>{' '}
    //     </div>{' '}
    //     <ul className="guideline-points">
    //       <li> Read the instructions carefully🧐. </li>{' '}
    //       <li> Total seven questions and the duration is⏰ 01: 30: 00 hrs. </li>{' '}
    //       <li>
    //         Enter the contest by clicking👆 the button 'Tap to code' below👇.{' '}
    //       </li>{' '}
    //       <li> Enter your details correctly✔. </li>{' '}
    //       <li> After submitting your details 1 st question is displayed. </li>{' '}
    //       <li>
    //         The passwords for the further questions is that output of the
    //         current question🔐.{' '}
    //       </li>{' '}
    //       <li>
    //         The input for the password is given by respective event -
    //         coordinators after verifying certain testcases.{' '}
    //       </li>{' '}
    //     </ul>{' '}
    //     <div className="get-started-button-container">
    //       {' '}
    //       {userInfo ? (
    //         <Link to="/stage1" className="get-started-button">
    //           Tap to Code <i className="fa-solid fa-arrow-right arrows"> </i>{' '}
    //         </Link>
    //       ) : (
    //         <Link
    //           to="/signin
    //         "
    //           className="get-started-button"
    //         >
    //           Tap to Code <i className="fa-solid fa-arrow-right arrows"> </i>{' '}
    //         </Link>
    //       )}{' '}
    //     </div>{' '}
    //   </div>{' '}
    // </section>



    <div className='body'>

    <div className='w-100 top '>
      <div className='w-25'>
      <h1 className='ins my-5 '>INSTRUCTIONS</h1>
      </div>
    </div>


    <div className='p-5'>

   
      
      <div className="guidelines w-100 px-5">
       
        <ul className="guideline-points">
          <li> Read the instructions carefully🧐. </li>{' '}
          <li> Total seven questions and the duration is⏰ 01: 30: 00 hrs. </li>{' '}
          <li>
            Enter the contest by clicking👆 the button 'Tap to code' below👇.{' '}
          </li>{' '}
          <li> Enter your details correctly✔. </li>{' '}
          <li> After submitting your details 1 st question is displayed. </li>{' '}
          <li>
            The passwords for the further questions is that output of the
            current question🔐.{' '}
          </li>{' '}
          <li>
            The input for the password is given by respective event -
            coordinators after verifying certain testcases.{' '}
          </li>{' '}
        </ul>{' '}
        <div className="get-started-button-container">
          {' '}
          {userInfo ? (
            <Link to="/stage1" className="get-started-button">
              Tap to Code <i className="fa-solid fa-arrow-right arrows"> </i>{' '}
            </Link>
          ) : (
            <Link
              to="/signin
            "
              className="get-started-button"
            >
              Tap to Code <i className="fa-solid fa-arrow-right arrows"> </i>{' '}
            </Link>
          )}{' '}
        </div>{' '}
      </div>{' '}
   

      
    </div>

    </div>
  );
}
