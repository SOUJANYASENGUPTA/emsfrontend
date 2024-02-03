import React from 'react'
import './basicForm.css'
import { useNavigate } from 'react-router';

const BasicForm = ({ loginSubmit, otpSubmit, viewOtpForm,ver }) =>{
 const navigate = useNavigate();
return(
 <div>
 
<section class="login">
<div class="login_box">
<div class="left">
<div class="contact">
{!viewOtpForm ?
(<form onSubmit={loginSubmit} id = "loginForm">
<h3>SIGN IN</h3>
<input          type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="false"/>
<button class = "send">
  <div class="spinner"></div>Send OTP
</button>
</form>):
(<form onSubmit={otpSubmit}id = "otpForm">
<input type="number"
                placeholder="One time password"
                name="otp_value"
                autoComplete="false"/>
                
<button class="submit" >VERIFY</button>
</form>)}
</div>
</div>
<div class="right">
<div class="right-text">
<h2>S3S</h2>
<h5>AN EVENT MANAGEMENT SYSTEM</h5>
</div>
<div class="right-inductor"><img src="" alt=""></img></div>
</div>
</div>
</section>
 </div>
)
}
export default BasicForm;