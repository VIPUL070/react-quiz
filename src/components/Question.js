import Options from "./Options";

function Question({question ,answer ,dispatch}){
    console.log(question);
    return(
      <Options question={question} answer={answer} dispatch={dispatch}/>
    );
}

export default Question