import React, { useState } from 'react'
import MyNavbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Styles from './EditUser.module.css'
import { useUser } from '../../providers/UserProvider'
import axios from 'axios'
import { backendUrl } from '../../backendUrl'
import {toast} from 'sonner'

export default function EditUser() {
    const { user,setUserDetails } = useUser();
    const data = user;

    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setemailError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const [formData, setFormData] = useState({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        gender: data.gender || "",
        email: data.email || "",
        mobile: data.phone || "",
        profile_picture: null,
    });

    function onlyLetters(str) {
        return /^[A-Za-z\s]*$/.test(str);
    }

    function onlyNumbers(str) {
        return /^[0-9]*$/.test(str);
    }

    function validateFirstName(firstName) {
        if (!onlyLetters(firstName)) {
            setFirstNameError('Incorrect first name');
        }
        else {
            setFirstNameError('');
        }
    }

    function validateLastName(lastName) {
        if (!onlyLetters(lastName)) {
            setLastNameError('Incorrect last name');
        }
        else {
            setLastNameError('');
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setemailError('Incorrect Email')
        }
        else {
            setemailError('')
        }
    }

    function validatePhoneNumber(phoneNumber) {
        if (!onlyNumbers(phoneNumber) || phoneNumber.length !== 10) {
            setPhoneNumberError('Incorrect phone number');
        }
        else {
            setPhoneNumberError('');
        }
    }

    const handlegenderChange = (e)=>{
        setFormData((prev) => {
            const newdata = { ...prev, gender: e.target.value }
            // setGender(newdata)
            return newdata
        })
    }

    const handleprofileimageChange = (e)=>{
        const file = e.target.files[0];
        setFormData((prev) => {
            const newdata = { ...prev,
                profile_picture: file 
            }
            return newdata
        })
        
    }

    const handleFirstNameChange = (e) => {
        setFormData((prev) => {
            const newdata = { ...prev, firstname: e.target.value }
            return newdata
        })
        // setFirstName(e.target.value)

        validateFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setFormData((prev) => {
            const newdata = { ...prev, lastname: e.target.value }
            return newdata
        })
        // setLastName(e.target.value)

        validateLastName(e.target.value)

    }

    const handleEmailChange = (e) => {
        setFormData((prev) => {
            const newdata = { ...prev, email: e.target.value }
            return newdata
        })
        // setEmail(e.target.value)

        validateEmail(e.target.value)
    }

    const handlePhoneNumberChange = (e) => {
        setFormData((prev) => {
            const newdata = { ...prev, mobile: e.target.value }
            return newdata
        })
        // setPhoneNumber(e.target.value)

        validatePhoneNumber(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstNameError || lastNameError || emailError || phoneNumberError) {
            return;
        } else {
            const url = backendUrl+"/user/"+user._id;

                axios.put(url,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                })
                .then((res)=>{
                    const url =backendUrl+"/user/email/"+formData.email;
                    axios.get(url)
                    .then((res)=>{
                        setUserDetails(res.data);
                        toast.success("updated details successfully")
                    })
                })
                .catch((err)=>console.log(err));
        }
    };


    return (
        <>
            <MyNavbar />
            <div className={Styles.body}>
                <h1 className={Styles.h1}>All Personal Details</h1>
               
                <form onSubmit={handleSubmit} className={Styles.form}>
                    <div className={Styles.complete}>
                        <div className="one">
                            <label htmlFor="firstname" className={Styles.label}>First Name</label>
                            <span className="incfn" style={{ color: "red" }}></span>
                            <input className={Styles.input} type="text" id="firstname" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleFirstNameChange} required /><span className="incph" style={{ color: "rgba(243, 26, 26, 0.819)" }}>{firstNameError}</span><br />
                            <label htmlFor="lastname" className={Styles.label}>Last Name</label>
                            <span className="incln" style={{ color: "red" }}></span>
                            <input className={Styles.input} type="text" id="lastname" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleLastNameChange} required /><span className="incph" style={{ color: "rgba(243, 26, 26, 0.819)" }}>{lastNameError}</span><br />
                            <label htmlFor="gender" className={Styles.label}>Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handlegenderChange} required >
                                <option value="" selected>Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="Trans">Transgender</option>
                            </select><br />
                            <label htmlFor="email" className={Styles.label}>Email</label>
                            <input className={Styles.input} type="email" id="email" name="email" placeholder="email" value={formData.email} onChange={handleEmailChange} /><span className="incph" style={{ color: "rgba(243, 26, 26, 0.819)" }}>{emailError}</span><br />
                            <label htmlFor="mobile" className={Styles.label}>Mobile Number</label>
                            <span className="inccn" style={{ color: "red" }}></span>
                            <input className={Styles.input} type="tel" id="mobile" name="mobile" value={formData.mobile} pattern="[0-9]{10}" placeholder="10 digit mobile number" onChange={handlePhoneNumberChange} required /><span className="incph" style={{ color: "rgba(243, 26, 26, 0.819)" }}>{phoneNumberError}</span><br />
                            <label htmlFor="link" className={Styles.label}>Profile image link</label>
                            {/* <input className={Styles.input} type="text" id="link" name="link" value={formData.profile_image_link} onChange={handleprofileimageChange} /> */}
                            <input className={Styles.input} type="file" id="profile_picture" name="profile_picture" onChange={handleprofileimageChange} /><br />
                        </div>
                    </div>
                    <button className={`${Styles.register} ${Styles.button}`} type="submit">Save Changes</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
