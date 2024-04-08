import { useReducer, createContext } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  userList: localStorage.getItem('userList')
    ? JSON.parse(localStorage.getItem('userList'))
    : [],
  stage1: localStorage.getItem('stage1')
    ? JSON.parse(localStorage.getItem('stage1'))
    : [],
  stage2: localStorage.getItem('stage2')
    ? JSON.parse(localStorage.getItem('stage2'))
    : [],
  stage3: localStorage.getItem('stage3')
    ? JSON.parse(localStorage.getItem('stage3'))
    : [],
  stage4: localStorage.getItem('stage4')
    ? JSON.parse(localStorage.getItem('stage4'))
    : [],
  stage5: localStorage.getItem('stage5')
    ? JSON.parse(localStorage.getItem('stage5'))
    : [],

  stage6: localStorage.getItem('stage6')
    ? JSON.parse(localStorage.getItem('stage6'))
    : [],

  stage7: localStorage.getItem('stage7')
    ? JSON.parse(localStorage.getItem('stage7'))
    : [],

  stages: localStorage.getItem('stages')
    ? JSON.parse(localStorage.getItem('stages'))
    : [],
  isAdmin: localStorage.getItem('isAdmin')
    ? localStorage.getItem('isAdmin')
    : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LISTS':
      return { ...state, userList: action.payload };
    case 'STAGE_1':
      return { ...state, stage1: action.payload };
    case 'STAGE_2':
      return { ...state, stage2: action.payload };
    case 'STAGE_3':
      return { ...state, stage3: action.payload };
    case 'STAGE_4':
      return { ...state, stage4: action.payload };
    case 'STAGE_5':
      return { ...state, stage5: action.payload };
    case 'STAGE_6':
      return { ...state, stage6: action.payload };
    case 'STAGE_7':
      return { ...state, stage7: action.payload };

    case 'STAGE':
      return { ...state, stages: action.payload };
    case 'ADMIN':
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
