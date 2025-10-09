function Options({question ,answer ,dispatch}){
    const hasAnswer = answer !== null;

    return(
        <div>
        <h4>{question.question}</h4>
        <div className="options">

          {question.options.map((option , index) => 

          <button className={` btn btn-option 
            ${index === answer ? "answer" : ""} 
            ${hasAnswer 
                ? index === question.correctOption 
                ? "correct" 
                : "wrong"
                : "" } 
                `} 
          key={option} 
          disabled={answer}
          onClick={() => dispatch({type:'newAnswer' , payload : index})}>
              {option}
          </button>)
          }
        </div>
      </div>
    );
}

export default Options