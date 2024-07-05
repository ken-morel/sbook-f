import './../assets/css/styles.sass';
import './../assets/css/w3.css';
// import Captcha from './captcha.jsx';
import './signin.sass';
import {useState} from 'react';
import $ from 'jquery';
let jQuery = $;

function Signin() {
    let errors = false;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    try {
        document.forms.signin.action += location.search;
    } catch(e) {
        console.error(e);
    }
    function submitForm(e) {
        e.preventDefault();
        User.signin(email, password, function(user, err) {
            if(err) {
                setEmailError(err);
                return;
            }
            window.user = user;
        });
    }
    return (
        <form id="signin" onsubmit={submitForm} method="post" className="w3-margin-top bd-antimony50 w3-border bg-clear fg-antimony w3-round-xlarge w3-padding">
            {errors &&
                <div class="trans-05 w3-animate-opacity w3-margin w3-padding w3-display-container w3-red w3-round-large margin-center w3-panel">
                    <div className="w3-margin-small w3-monospace w3-display-topright w3-circle" onClick="this.parentElement.style.display = 'none';">x</div>
                    {errors}
                </div>
            }
            <p className="bg-antimony10 fg-antimony w3-padding w3-margin w3-center w3-round-large">signup</p>
            <div className="padding-5 w3-margin bg-antimony10 w3-round-xlarge fg-antimony">
                <label htmlFor="email">email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="w3-input bg-red-invalid bg-antimony-10 w3-padding-small w3-border-0 margin-5 bg-antimony50-hover bg-naple50  w3-round-large" />
                </label>
                {emailError &&
                    <div className="w3-panel w3-red w3-margin w3-round-large">
                    {emailError}
                    </div>
                }
                <label htmlFor="password">password:
                    <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="w3-input fg-antimony w3-border-0 w3-padding-small margin-5  bg-antimony50-hover bg-naple50  w3-round-large" />
                </label>
            </div>
            <div>
                <p>Don't have an account?, <a href="/signup">signup</a></p>
            </div>
        </form>
    );
}

export default Signin;
