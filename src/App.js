import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminScreen from './screens/AdminScreen';
import AdminSigninScreen from './screens/AdminSigninScreen';
import FinishScreen from './screens/FinishScreen';
import GuidelinesScreen from './screens/GuidelinesScreen';
import HomeScreen from './screens/HomeScreen';
import Question1Screen from './screens/Question1Screen';
import Question2Screen from './screens/Question2Screen';
import Question3Screen from './screens/Question3Screen';
import Question4Screen from './screens/Question4Screen';
import Question5Screen from './screens/Question5Screen';
import Question6Screen from './screens/Question6Screen';
import Question7Screen from './screens/Question7Screen';



import SigninScreen from './screens/SigninScreen';
import { Store } from './Store';
import { Helmet } from 'react-helmet-async';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, stages, isAdmin } = state;

  return (
    <BrowserRouter>
      <Helmet>
        <title>7zcoders</title>
        <link rel="icon" href={require('../src/assets/ccc_logo.png')} />
      </Helmet>
      <ToastContainer
        position="top-right"
        style={{ marginTop: '1%' }}
        limit={1}
      />
      <Routes>
        {!userInfo && <Route path="/signin" element={<SigninScreen />} />}

        <Route path="/" element={<HomeScreen />} />
        
        <Route path="/guidelines" element={<GuidelinesScreen />} />
        {!isAdmin && (
          <Route path="/admin-signin" element={<AdminSigninScreen />} />
        )}
        {isAdmin && <Route path="/admin" element={<AdminScreen />} />}
        {userInfo && <Route path="/stage1" element={<Question1Screen />} />}
        {userInfo && stages.includes(1) && (
          <Route path="/stage2" element={<Question2Screen />} />
        )}
        {userInfo && stages.includes(2) && (
          <Route path="/stage3" element={<Question3Screen />} />
        )}
        {userInfo && stages.includes(3) && (
          <Route path="/stage4" element={<Question4Screen />} />
        )}
        {userInfo && stages.includes(4) && (
          <Route path="/stage5" element={<Question5Screen />} />
        )}


        
        {userInfo && stages.includes(5) && (
          <Route path="/stage6" element={<Question6Screen/>} />
        )}


{userInfo && stages.includes(6) && (
          <Route path="/stage7" element={<Question7Screen />} />
        )}

{userInfo && stages.includes(7) && (
          <Route path="/finish" element={<FinishScreen />} />
        )}

      </Routes>{' '}
    </BrowserRouter>
  );
}

export default App;
