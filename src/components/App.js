import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  //loading , error , ready , active , finished
  status : "loading",
  index : 0,
  answer : null,
  points : 0,
  highscore : 0
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

    case 'newAnswer':
      const currQuestion = state.questions.at(state.index);

      return {...state , 
        answer : action.payload , 
        points : action.payload === currQuestion.correctOption 
        ? state.points + currQuestion.points
        : state.points
      };
    
    case 'nextQuestion':
      return {...state , index : state.index + 1 , answer : null}

    case 'finished':
      return {...state , status : 'finished' , highscore : state.points > state.highscore ? state.points : state.highscore}

    case 'restart':
      return {...initialState , questions: state.questions , status : 'ready' }

    default:
      throw new Error("Unknown Action");
  }

}

function App() {
  const [{questions , status , index , answer , points , highscore} , dispatch] = useReducer(reducer , initialState);

  const totalQuestions = questions.length;
  const maxPoints = questions.reduce((acc,curr) => acc + curr.points , 0)

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
         <>
         <Progress 
         index={index} 
         totalQuestions={totalQuestions} 
         points={points}
         maxPoints={maxPoints}
         />
         <Question question={questions[index]}
          dispatch={dispatch}
          answer={answer}
         />
         <NextButton dispatch={dispatch} answer={answer} index={index} 
         totalQuestions={totalQuestions} />
         </>
         }

         {status === 'finished' && <FinishScreen 
         points={points} 
         dispatch={dispatch}
         maxPoints={maxPoints}
         highscore={highscore}
         />}
      </Main>
    </div>
  );
}

export default App;
