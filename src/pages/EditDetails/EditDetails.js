import React,{useState} from "react";
import MyNavbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Styles from './EditDetails.module.css'
import { useUser } from "../../providers/UserProvider";
import {toast} from 'sonner'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../backendUrl";

export default function EditDetails() {
  const {user,setUserDetails} = useUser();
  const data = user;
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    firstname: data.firstname || '',
    lastname: data.lastname || '',
    domain: data.domain || '',
    gender: data.gender || '',
    mobile: data.phone || '',
    profile_picture: null,
    insta_link: data.insta_link || '',
    github_link: data.github_link || '',
    facebook_link: data.facebook_link || '',
    dob:  '19-7-1990',
    email: data.email || '',
    qualification: data.qualification || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: file,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = backendUrl+"/user/" + user._id;

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
                        navigate(`/expert/${user._id}`)
                    })
                })
                .catch((err)=>console.log(err));
  };


  return (
    <>
      <MyNavbar />
      <div className={Styles.body}>
        <form onSubmit={handleSubmit} className={Styles.form}>
        <h1 className={Styles.h1}>All Personal Details</h1>
          <div className={Styles.complete}>
            <div className={`${Styles.one} ${Styles.marginRightZero}`}>
              <label className={Styles.label} htmlFor="firstname">First Name:</label>
              <span className={Styles.incfn} style={{ color: "red" }}></span>
              <input className={Styles.input} type="text" id="firstname" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required /><br />
              <label className={Styles.label} htmlFor="lastname">Last Name:</label>
              <span className={Styles.incln} style={{ color: "red" }}></span>
              <input className={Styles.input} type="text" id="lastname" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required /><br />
              <label className={Styles.label} htmlFor="domain">Domain:</label>
              <input className={Styles.input} type="text" id="Domain" name="domain" placeholder="Domain" value={formData.domain} onChange={handleChange} required /><br />
              <label className={Styles.label} htmlFor="gender">Gender:</label>
              <select className={Styles.select} id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="" className={formData.gender === "" ? Styles.selected : ''}>Select Gender</option>
                <option value="M" className={formData.gender === "M" ? Styles.selected : ''}> Male</option>
                <option value="F" className={formData.gender === "F" ? Styles.selected : ''}>Female</option>
                <option value="Trans" className={formData.gender === "Trans" ? Styles.selected : ''}>Transgender</option>
              </select><br />
              <label className={Styles.label} htmlFor="mobile">Mobile Number:</label>
              <span className={Styles.inccn} style={{ color: "red" }}></span>
              <input className={Styles.input} type="tel" id="mobile" name="mobile" value={formData.mobile} pattern="[0-9]{10}" placeholder="10 digit mobile number" onChange={handleChange} required /><br />
              <label className={`${Styles.label} ${Styles.profilePicture}`} htmlFor="profile_picture">Profile image Link:</label>
              {/* <input className={Styles.input} type="text" id="profile_picture" value={formData.profile_picture} name="profile_picture" onChange={handleChange} /><br /> */}
              <input className={Styles.input} type="file" id="profile_picture" name="profile_picture" onChange={handleImageChange} /><br />
              <small className={Styles.small}><pre> </pre></small><br />
            </div>
            <div className={Styles.two}>
              <label className={Styles.label} htmlFor="instaid">Instagram Link</label>
              <input className={Styles.input} type="text" value={formData.insta_link} name="insta_link" placeholder="Insta Link" onChange={handleChange} /><br />
              <label className={Styles.label} htmlFor="Github">Github Profile Link</label>
              <input className={Styles.input} type="text" value={formData.github_link} name="github_link" placeholder="Github Profile Link" onChange={handleChange} /><br />
              <label className={Styles.label} htmlFor="LinkedIn">LinkedIn Profile Link</label>
              <input className={Styles.input} type="text" value={formData.facebook_link} name="facebook_link" placeholder="LinkedIn Profile Link" onChange={handleChange} /> <br />
              <label className={Styles.label} htmlFor="dateofbirth">Date-of-birth</label>
              <input className={Styles.input} type="date" placeholder="dateofbirth" name="dob" value={"19-7-1990"} onChange={handleChange} /><br />
              <label className={Styles.label} htmlFor="email">Email</label>
              <input className={Styles.input} type="email" value={formData.email} name="email" placeholder="email" onChange={handleChange} /><br />
              <label className={Styles.label} htmlFor="education">Education</label>
              <textarea  className={Styles.textarea} rows="3" cols="50" name="qualification" value={formData.qualification} onChange={handleChange}></textarea><br />
            </div>
          </div>``
          <button className={`${Styles.register} ${Styles.button}`} type="submit">Save Changes</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
