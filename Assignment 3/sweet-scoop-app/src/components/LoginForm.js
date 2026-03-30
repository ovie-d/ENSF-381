import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [pendingLogin, setPendingLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pendingLogin) {
      return;
    }

    let ignore = false;

    async function checkLogin() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const users = await response.json();
        const userMatch = users.find(
          (user) =>
            user.username === pendingLogin.username &&
            user.email === pendingLogin.password
        );

        if (ignore) {
          return;
        }

        if (userMatch) {
          setMessageType('success');
          setMessage('Login successful! Redirecting to flavors...');
        } else {
          setMessageType('error');
          setMessage('Invalid username or password.');
        }
      } catch {
        if (ignore) {
          return;
        }

        setMessageType('error');
        setMessage('Unable to complete login right now. Please try again.');
      } finally {
        if (!ignore) {
          setPendingLogin(null);
        }
      }
    }

    checkLogin();

    return () => {
      ignore = true;
    };
  }, [pendingLogin]);

  useEffect(() => {
    if (messageType !== 'success') {
      return;
    }

    const timerId = setTimeout(() => {
      navigate('/flavors');
    }, 2000);

    return () => clearTimeout(timerId);
  }, [messageType, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setMessageType('error');
      setMessage('Username and password cannot be empty.');
      return;
    }

    if (trimmedPassword.length < 8) {
      setMessageType('error');
      setMessage('Password must be at least 8 characters.');
      return;
    }

    setMessage('');
    setMessageType('');
    setPendingLogin({
      username: trimmedUsername,
      password: trimmedPassword
    });
  }

  return (
    <main className="main-section">
      <h2>Login</h2>
      <div className="order-list">
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Login</button>
          <div>
            <a href="#" onClick={(event) => event.preventDefault()}>
              Forgot Password?
            </a>
          </div>
        </form>

        {message ? <DisplayStatus type={messageType} message={message} /> : null}
      </div>
    </main>
  );
}

export default LoginForm;
