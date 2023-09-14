import email_icon from '../assets/signupLogin/email_icon.png'
import password_icon from '../assets/signupLogin/password_icon.png'
import username_icon from '../assets/signupLogin/username_icon.png'
import { StyledSignup } from '../components/styles/signup.styled'

//TODO need to add value attribute to input tags and on change event to update state
//TODO add link attribute to login

const Signup = () => {
    return (
        <StyledSignup>
        <div className='container'>
            <div className='header'>
                <div className='text'>Signup</div>
                <div className="underline"></div>
            </div>
            <div className='input-container'>
                <div className='input'>
                    <img src={email_icon} alt='email icon'/>
                    <input type='text' placeholder='E-mail'/>
                </div>
                <div className='input'>
                    <img src={username_icon} alt='username icon'/>
                    <input type='text' placeholder='Username'/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt='email icon'/>
                    <input type='password' placeholder='Password'/>
                </div>
            </div>
            <div className="login-here">Have an account already? <span>Login Here!</span></div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
            </div>
        </div>
        </StyledSignup>
    )
}

export default Signup