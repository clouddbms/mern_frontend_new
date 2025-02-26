import React from 'react';
import MyNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import Styles from './UserPage.module.css';
import {useUser} from '../../providers/UserProvider'
import {Link} from 'react-router-dom'

export default function UserPage() {

  const {user} = useUser();
  const data = user;
  const { userId } = useParams();

  return (
    <>
    <MyNavbar/>
    <div className={Styles.bigDiv}>
      <div className={`${Styles.desc} position-relative`}>
        <h3>Personal Information</h3>

        <Link to="/user/edit_u" style={{ display: 'none' }} className={`edit_text ${Styles["edit_user_det"]} position-absolute ${userId === data._id ? 'show' : ''} show`}>
        <i className="fa-solid fa-pen-to-square"></i> Edit Details
        </Link>

        <img src={data.profile_image_link} alt="img" className={`${Styles["user_profile_image"]} rounded-circle d-block mx-auto`}/>
        
        <div className={Styles.info}>
          <div className={Styles.firstname}>
            <h4>First Name:</h4>
            <h4>{data.firstname}</h4>
          </div>
          <div className={Styles.lastname}>
            <h4>Last Name:</h4>
            <h4>{data.lastname}</h4>
          </div>
          <div className={Styles.Gender}>
            <h4>Gender:</h4>
            <h4>{data.gender === 'M' ? 'Male' : data.gender === 'F' ? 'Female' : data.gender === 'Trans' ? 'Transgender' : ' '}</h4>
          </div>
          <div className={Styles.emailicon}>
          <i className="fa-solid fa-envelope"></i>
            <h4 style={{display:'flex',alignItems:'center'}}><a href={`mailto:${data.email}`} style={{textDecoration:'none'}}>{data.email}</a></h4>
          </div>
          <div className={Styles.phoneicon}>
          <i className="fa-solid fa-phone"></i>
            <h4 style={{display:'flex',alignItems:'center'}}>+91 {data.phone}</h4>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
