import styles from '../LoginPage/loginstyles.module.css'
import LefttLogin from './Leftlogin.js'
import LoginSlider from './Loginslider'
import mmicon from '../../assets/images/mm.jpg'
import { Link } from 'react-router-dom'
import GoogleLoginPage from '../../GoogleLoginPage.jsx'
import LoginForm from './LoginForm'
const Login=()=>{
   


    return (
        <div className={styles.total} >
    <div className={`${styles.left} animated wow fadeInLeft`}> 
      <LefttLogin></LefttLogin>
      <LoginSlider/>
    </div>
     <div className={`${styles.right} animated wow fadeInRight`}>
      <div className={styles.loginimage}>
        <img src={mmicon} height="120px" width="120px" style={{borderRadius: "50%"}} className={styles.name} alt=""/>
      </div>
      <div className={styles.wrapper}>
        <h1>LOGIN PAGE</h1>
        
        <div className={styles["form-container"]}>
           <div className={styles["slide-controls"]}>
            <input type="radio" name="slide" id="login" defaultChecked/>
            <label htmlFor="login" className={styles.slide} >Login</label>
            <Link to="/register" className={styles.slide} style={{textDecoration: "none"}}>SignUp</Link>
            <div className={styles["slider-tab"]}></div>
          </div>
          {/* <GoogleLoginPage/> */}
          <div className={styles["form-inner"]}>
            <LoginForm></LoginForm>
          </div>
            
        </div> 
      </div>

    </div> 
  </div>
  

  
   )

}

export default Login

