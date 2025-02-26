import MyNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Styles from './ContactUs.module.css';
import { useEffect, useState } from 'react';
import contactUsImage from "../../assets/images/Contact us-rafiki.svg";
import axios from 'axios';
import { backendUrl } from '../../backendUrl';
export default function ContactUs({data}) 
{
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setemailError] = useState('');
  const [messageError,setMessageError] = useState('');
 
  function onlyLetters(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }

  function onlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }

  function validateFirstName(firstName) {
    if(!onlyLetters(firstName)) {
      setFirstNameError('Incorrect first name');
    }
    else {
     setFirstNameError('');
    }
  }

  function validateLastName(lastName) {
    if(!onlyLetters(lastName)) {
      setLastNameError('Incorrect last name');
    }
    else {
      setLastNameError('');
    }
  }
  function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      setemailError('Incorrect Email')
    }
    else{
      setemailError('')
    }
  }

  function validatePhoneNumber(phoneNumber) {
    if(!onlyNumbers(phoneNumber) || phoneNumber.length !== 10) {
      setPhoneNumberError('Incorrect phone number');
    }
    else {
      setPhoneNumberError('');
    }
  }

  function validateMessage(message){
    if (!message){
      setMessageError('Message should not be null')
    }
    else{
      setMessageError('')
    }
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    validateFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    validateLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
    validatePhoneNumber(e.target.value);
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
    validateMessage(e.target.value)
  }
  
  function handleSubmit(e){
    e.preventDefault();
    if (firstNameError || lastNameError || emailError || phoneNumberError || messageError){
      return;
    }else{
      axios.post(backendUrl+'/utility/contact',{firstname:firstName,lastname:lastName,email:email,phone:phoneNumber,message:message}).then((response)=>{
    return response.data
  }).then((data)=>{
    console.log(data.success)
    if (data.success){
      setFirstName('');
      setLastName('')
      setEmail('')
      setPhoneNumber('')
      setMessage('')
    }
  })
    }
  }

  const gettoken = () => {
    axios.get(backendUrl+"/auth/csrf-token", {withCredentials: true}).then((res) => {
      
      setToken(res.data.csrfToken);
      // axios.defaults.headers.post["X-CSRF-Token"] = res.data.csrfToken;
    }).catch((err) => console.log(err))
  };
  
  useEffect(() => {
    gettoken(); 
  }, []);

  return (
    <>
    
    <MyNavbar/>
    <div className={Styles.body}>
    <div className={Styles["contactus-container"]}>
        <div className={Styles["contactus-left"]}>
            <h2 className={Styles["contactus-title"]}>
                Contact Info
            </h2>
            <div className={Styles["contactus-links"]}>
                <p className={Styles["single-link"]}><i className="fa-solid fa-location-crosshairs"></i>Indian Institute of Information Technology ,
                Sricity</p>
                <p className={Styles["single-link"]}><i className="fa-solid fa-phone"></i>+91 1234567890</p>
                <p className={Styles["single-link"]}><i className="fa-solid fa-envelope"></i> contactmindmeld2003@gmail.com</p>
                <p className={Styles["single-link"]}><i className="fa-brands fa-facebook"></i>facebook</p>
                <p className={Styles["single-link"]}><i className="fa-brands fa-linkedin"></i>linked in</p>
                <p className={Styles["single-link"]}><i className="fa-brands fa-twitter"></i>twitter</p>
            </div>
            <div className={Styles["contactus-image"]}>

              <img src={contactUsImage} alt=""/>

            </div>
        </div>
        <div className={Styles["contactus-right"]}>
            <h2 className={Styles["contactus-title"]}>
                Send a message
            </h2>
          <form onSubmit={handleSubmit} className={`${Styles["contactus-form"]} ${Styles["myform"]}`}>

              <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" type="text" name="firstname" className={Styles["firstname"]}/>
              <span className="incfn" style={{color: "rgba(243, 26, 26, 0.819)"}}>{firstNameError}</span>

              <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" type="text" name="lastname" className={Styles["lastname"]}/>
              <span className="incln" style={{color: "rgba(243, 26, 26, 0.819)"}}>{lastNameError}</span>

              <input value={email} onChange={handleEmailChange} placeholder="Email" type="email" name="email" className="email"/><span className="incph" style={{color: "rgba(243, 26, 26, 0.819)"}}>{emailError}</span>

              <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" type="text" name="phoneno" className={Styles["phoneno"]}/>
              <span className="incph" style={{color: "rgba(243, 26, 26, 0.819)"}}>{phoneNumberError}</span>

              <textarea value={message} onChange={handleMessageChange} name="message" id="contactus-msg" cols="30" rows="20" className={Styles["message"]} placeholder="Leave a Message"></textarea>
              <p>{data}</p><span className="incph" style={{color: "rgba(243, 26, 26, 0.819)"}}>{messageError}</span>
              
              <button className={`${Styles["contactus-submit"]} ${Styles["register"]}`} type="submit">Submit</button>
          </form>
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}













