import {GoogleLogin} from 'react-google-login';

const clientID = "191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

function Login(){
    const onSuccess = (res) =>{
        console.log("Login Success! Current User: ",res.profileObj);
    }

    const onFailure = (res) =>{
        // console.log("Login Failed! res: ",res);
    }

    return (
        <div id="googleButton">
            <GoogleLogin
                clientId={clientID}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}            
            />
        </div>
    )
}

export default Login;