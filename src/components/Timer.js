import { useEffect } from "react";

function Timer({dispatch , secondRemains}){

    let mins = Math.floor(secondRemains / 60);
    mins = mins.toString().padStart(2 , '0');
    let secs  = secondRemains % 60;
    secs = secs.toString().padStart(2 , '0');

    useEffect(() => {
       const id = setInterval(() => {
         dispatch({type :'tick'})
       },1000)

       return () => clearInterval(id);
    },[dispatch])

    return(
        <div className="timer">
            {mins}:{secs}
        </div>
    );
}

export default Timer;