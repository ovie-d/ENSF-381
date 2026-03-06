import "./App.css";
import Controls from "./Controls";
import UserList from "./UserList";
import Footer from "./Footer";

import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  const isLoggedIn = true;

  return (
    <div className="App">
      <h1>ENSF-381: Full Stack Web Development</h1>
      <p>React Components</p>
      <p>The current year is {currentYear}.</p>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
export default App;

