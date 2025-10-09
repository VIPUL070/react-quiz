function Progress({index, totalQuestions ,points ,maxPoints}){
    return(
        <header className="progress">
           <progress max={totalQuestions} value={index} />
           <p>Question <strong>{index + 1 }</strong> / {totalQuestions}</p>
           <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    );
}

export default Progress