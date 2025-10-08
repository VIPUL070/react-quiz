import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  //loading , error , ready , active , finished
  status : "loading",
  index : 0
}

function reducer(state , action){
  switch (action.type) {
    case 'dataReceived':
      return {...state , 
        questions : action.payload , 
        status:"ready"
      };
    
    case "dataFailed":
      return {...state , status: "error"};

    case "start":
      return {...state , status: "active"};

    default:
      throw new Error("Unknown Action");
  }

}

function App() {
  const [{questions , status , index} , dispatch] = useReducer(reducer , initialState);

  const totalQuestions = questions.length;

  useEffect(() => {
    async function fetchQuestion(){
      try {

      const response = await fetch("http://localhost:8000/questions");
      const data = await response.json();
      dispatch({type: 'dataReceived' , payload : data})
        
      } catch (error) {
        dispatch({type: 'dataFailed'})
      }
    }

    fetchQuestion();

  },[])

  return (
    <div className="app">
      <Header />

      <Main>
         {status === 'loading' && <Loader />}
         {status === 'error' && <Error />}
         {status === 'ready' && 
         <StartScreen  
         totalQuestions={totalQuestions}
         dispatch={dispatch}
         />
         }
         {status === 'active' && 
         <Question question={questions[index]}/>
         }

      </Main>
    </div>
  );
}

export default App;
