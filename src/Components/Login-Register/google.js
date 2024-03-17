import {GoogleLogin} from 'react-google-login';
const clientID = "191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

function GoogleButton(){
    const onSuccess = (res) =>{
        console.log("Login Success! Current User: ",res.profileObj);
    }

    const onFailure = (res) =>{
        // console.log("Login Failed! res: ",res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                // buttonText='Login with Google' 
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true} 
                className="google-login-button" 
                icon={false}
                // redirectUri
            >
                <div class="container" style={{ height: '25px'}}>
                    <div class="row">
                        <div>
                          <img 
                            src={require("../../assets/google-logo.png")}
                            style={{ width: '25px', height: '25px',marginBottom:'5px'}}/>
                        </div>
                        <h6 style={{ marginTop: '2px',marginInlineStart: '5px'}}>  ورود با گوگل </h6>
                    </div> 
                </div>
            </GoogleLogin>
        </div> 
    )
}
 
export default GoogleButton;