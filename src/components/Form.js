import { React, useState } from 'react'
import { StyledForm } from '../styled/Form.styled'
import axios from 'axios'

let txnId = "";
// let mobileNumber = "";
const baseURL = "http://localhost:8000";

function Form1() {
    const [aadhaar, setAadhaar] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [healthId, setHealthId] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    async function submitMobileAndAadhaar(e)
    {
        e.preventDefault();
        
        try{
            const response = await axios.post(baseURL + "/register", {aadhaar : aadhaar, mobile : mobile});
            // console.log(response);
            if(response.data && response.data.res){
                let {txnId, mobile} = response.data.res;
                const responseData = {"TransactionId" : txnId, "Mobile" : mobile};
                console.log(responseData);
                console.log("OTP sent to mobile number");
                txnId = responseData.TransactionId;
            }
            
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    async function submitFirstOtp(e)
    {
        e.preventDefault();

        try{
            const response = await axios.post(baseURL + "/submitOtp", {mobile, txnId, otp});
            console.log(response.data.res.txnId);
            console.log("First OTP verified. Second OTP sent to mobile number");
            txnId = response.data.res.txnId;
        }
        catch(err){
            console.log(err);
        }
    }

    async function submitSecondOtp(e)
    {
        e.preventDefault();

        try{
            const res = await axios.post(baseURL + "/verifySecondOtp", {txnId, otp});
            console.log(res.data.txnId);
            console.log("Second OTP verified. Please fill further details");
            txnId = res.data.txnId;
        }
        catch(err){
            console.log(err);
        }

    }

    async function submitDetails(e)
    {
        e.preventDefault();

        try{
            const res = await axios.post(baseURL + "/submitRegDetails", email, firstName, healthId, lastName, middleName, password, profilePhoto);
            console.log(res);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <StyledForm>
                <div>
                    <form onSubmit={submitMobileAndAadhaar}>
                        <div className='formdiv'>
                            <div className='formelements'>
                                <label>aadhaar</label>
                                <br />
                                <input name='aadhaar' placeholder='aadhaar' type='text' onChange={(e) => { setAadhaar(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Mobile</label>
                                <br />
                                <input type='text' name='mobile' placeholder='mobile' onChange={(e) => { setMobile(e.target.value) }}></input>
                            </div>
                            
                            <div className='formelements'><button type='submit'>submit</button></div>
                            
                        </div>
                    </form>
                </div>
            </StyledForm>
            
            <StyledForm>
                <div>
                    <form onSubmit={submitFirstOtp}>
                        <div className='formdiv'>
                            <div className='formelements'>
                                <label>OTP-1</label>
                                <br />
                                <input name='otp' placeholder='otp' type='text' onChange={(e) => { setOtp(e.target.value) }}></input>
                            </div>
                            <div className='formelements'><button type='submit'>submit</button></div>
                        </div>
                    </form>
                </div>
            </StyledForm>
            
            <StyledForm>
                <div>
                    <form onSubmit={submitSecondOtp}>
                        <div className='formdiv'>
                            <div className='formelements'>
                                <label>OTP-2</label>
                                <br />
                                <input name='otp' placeholder='otp' type='text' onChange={(e) => { setOtp(e.target.value) }}></input>
                            </div>
                            <div className='formelements'><button type='submit'>submit</button></div>
                        </div>
                    </form>
                </div>
            </StyledForm>

            <StyledForm>
                <div>
                    <form onSubmit={submitDetails}>
                        <div className='formdiv'>
                            <div className='formelements'>
                                <label>Email</label>
                                <br />
                                <input name='email' placeholder='email' type='Email' onChange={(e) => { setEmail(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Firstname</label>
                                <br />
                                <input name='firstName' placeholder='firstname' type='text' onChange={(e) => { setFirstName(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>healthId</label>
                                <br />
                                <input name='healthId' placeholder='healthId' type='text' onChange={(e) => { setHealthId(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Lastname</label>
                                <br />
                                <input name='lastName' placeholder='lastname' type='text' onChange={(e) => { setLastName(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Middlename</label>
                                <br />
                                <input name='middleName' placeholder='middlename' type='text' onChange={(e) => { setMiddleName(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Password</label>
                                <br />
                                <input name='password' placeholder='password' type='Password' onChange={(e) => { setPassword(e.target.value) }}></input>
                            </div>
                            <div className='formelements'>
                                <label>Profile Photo</label>
                                <br />
                                <input name='profilePhoto' type='file' onChange={(e) => { setProfilePhoto(e.target.files[0]) }}></input>
                            </div>
                            <div className='formelements'><button type='submit'>submit</button></div>
                        </div>
                    </form>
                </div>
            </StyledForm>
        </>
    )
}

export default Form1
