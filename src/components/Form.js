import { React, useState } from 'react'
import { StyledForm } from '../styled/Form.styled'
import axios from 'axios'

let txnId = "";
const baseURL = "http://localhost:8000";

function Form1() {
    const [aadhaar, setAadhaar] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    

    async function submitMobileAndAadhaar(e)
    {
        e.preventDefault();
        
        try{
            const res = await axios.post(baseURL + "/register", {aadhaar : aadhaar, mobile : mobile});
            console.log(res.data.txnId);
            console.log("OTP sent to mobile number");
            txnId = res.data.txnId;
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    async function submitFirstOtp(e)
    {
        e.preventDefault();

        try{
            const res = await axios.post(baseURL + "/submitOtp", {mobile, txnId, otp});
            console.log(res.data.txnId);
            console.log("First OTP verified. Second OTP sent to mobile number");
            txnId = res.data.txnId;
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
        </>
    )
}

export default Form1
