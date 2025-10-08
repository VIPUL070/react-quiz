import Options from "./Options";

function Question({question}){
    console.log(question)
    return(
      <Options question={question}/>
    );
}

export default Question