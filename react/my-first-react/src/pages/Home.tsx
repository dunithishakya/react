import { useState } from "react";
import Student from "../components/Student";
import { Link } from "react-router-dom";

function Home() {
    
  const [counter, setCounter] = useState<number>(0);
  const [username,setUsername]  = useState<string>("");

  function increase() {
    const newCount = counter + 1;
    setCounter(newCount);
  }

  function decrease() {
    const newCount = counter - 1;
    setCounter(newCount);
  }

  function handleUsername(event: any) {
    setUsername(event.target.value);
  }
  
  return (
    <>
      <h1>Welcome {username}!</h1>

      <Link to="/profile">Profile</Link>

      <div>
        <p>Login with your username</p>
        <input type="text" onChange={handleUsername} />
      </div>


      <h1>{counter}</h1>

      

      <button onClick={increase}>Increase Counter</button>
      <button onClick={decrease}>Decrease Counter</button>
      
      
      <Student name="Bimsara" age={29} />
      <Student name="Gihan" age={23} />
    </>
  )
}

export default Home;