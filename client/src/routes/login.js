const Login = () => (
  <div>
    <div>
      Please Login to continue.
      <input onClick={openLoginWindow} type="button" value="Login"/>
    </div>
  </div>
)

function openLoginWindow () {
  window.open("http://localhost:5000/auth/google", "_self");
}

export default Login
