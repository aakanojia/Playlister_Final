import { useHistory } from "react-router-dom";

export default function SplashScreen() {
  const history = useHistory();

  function handleRegister() {
    history.push("/register/");
  }

  function handleLogin() {
    history.push("/login/");
  }

  return (
    <div id='splash-screen'>
      <div id='splash-screen-logo'>Welcome to the Playlister!</div>
      <p>
        Your one-stop-shop for creating and playing playlists of Youtube music videos!
      </p>
      <div id='splash-screen-button'>
        <button
          className='button'
          id='register-button'
          type='button'
          onClick={handleRegister}
        >
          REGISTER
        </button>
        <button className='button' id='login-button' type="button" onClick={handleLogin}>
          LOGIN
        </button>
        <button className='button' id='guest-button' type="button">
          GUEST
        </button>
      </div>
    </div>
  );
}