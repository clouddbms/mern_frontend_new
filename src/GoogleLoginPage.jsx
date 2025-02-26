import {useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from './providers/authProvider';
import { useUser } from './providers/UserProvider';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'sonner'
import { backendUrl } from './backendUrl';

import { useEffect } from 'react';

function GoogleLoginPage() {
    const [loading,setLoading]=useState(false)
    const {setToken} = useAuth();
    const {setUserDetails} = useUser();
    const navigate = useNavigate();
    const [csrfToken, setcsrfToken] = useState("");
  
    const loginSuccessHandler = (codeResponse)=>{

        const user = codeResponse;
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        // access profile data.
                        console.log(res.data);
                        let data=res.data
  
                        // fetch user details using email
                        const userEmail = res.data.email;
                        
                        // google signin post request
                        axios.post(backendUrl+'/auth/googleSignIn',data)
                        .then((res)=>{
                            if(res.status===200)
                            {

                                console.log(res);
                                // save token in local storage
                                localStorage.setItem('token',res.data.token);
                                // set token in authProvider
                                setToken(res.data.token);
                    
                                //set user details in context
                                axios.get(`${backendUrl}/user/email/${userEmail}`)
                                .then((res)=>{
                                console.log(res.data);
                                // set user details in context
                                setUserDetails(res.data);
                                })
                    
                                // redirect to home page
                                setLoading(false);
                                navigate('/home');
                            }
                        }).catch((err)=>{
                            const errorMessage = err.response.data.message;
                            if(errorMessage.includes('Email')||errorMessage.includes('password')){
                              setLoading(false)
                              toast.error(errorMessage)
                            }
                            console.log(err.response);
                        })
                    })
                    .catch((err) => console.log(err));
    }
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => loginSuccessHandler(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });


    // log out function to log the user out of google and set the profile array to null
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };

    return (
        <div>
            <button style={{backgroundColor:"black",color:"white",border:"2px solid gray","borderRadius":"5px","padding":"5px"}} onClick={() => login()}>Google SignIn 🚀 </button>
        </div>
    );
}
export default GoogleLoginPage;
