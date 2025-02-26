import React from 'react'
import MyNavbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Styles from './AboutUs.module.css'
import aboutUsImage from '../../assets/images/About us22.png';
import {Link} from 'react-router-dom';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
export default function AboutUs() {
  return (
    <>
  
    <MyNavbar />
    <div className={Styles.body}>
      <div className={Styles["aboutus-container"]}>
      <div className={Styles["aboutus_image"]}>
        <img src={aboutUsImage} alt="about us pic" />
      </div>

      <div className={Styles["aboutus_team"]}>
        <h2 style={{fontWeight:"600",fontFamily:'inherit'}}>Our Motive</h2>
        <p className={Styles.motive}>
          Our website is a platform dedicated to sharing informative and engaging content related to education, health, and lifestyle. It provides a wealth of resources for readers who are seeking to improve their knowledge and understanding of various topics in these areas. One of the key features of your website is its blog section, which features articles written by knowledgeable writers. In addition to its blog section, our website also offers a comprehensive FAQ section where readers can find answers to common questions related to education, health, and lifestyle. This section is designed to help readers quickly and easily find the information they need, without having to spend hours searching the internet.
        </p>
      </div>
      </div>
      <div id="team" className={Styles.team}>
        <div className={Styles.totalabout}>
          <div className={Styles.member}>
            <div className={Styles["member-img"]}>
              <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" className="img-fluid" alt="" />
            </div>
            <div className={Styles["member-info"]}>
              <h3>Likith</h3>
              <div className={Styles.social}>
                <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                <Link to="/"><i class="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
              </div>
              <h4>Web Designer </h4>
              <p>Designed MindMeld website</p>
            </div>
          </div>

          <div className={Styles.member}>
            <div className={Styles["member-img"]}>
              <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" className="img-fluid" alt="" />
            </div>
            <div className={Styles["member-info"]}>
              <h3>Sri Ganesh</h3>
              <div className={Styles.social}>
              <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                <Link to="/"><i class="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
              </div>
              <h4>Web Designer </h4>
              <p>Designed MindMeld website</p>
            </div>
          </div>

          <div className={Styles.member}>
            <div className={Styles["member-img"]}>
              <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" className="img-fluid" alt="" />
            </div>
            <div className={Styles["member-info"]}>
              <h3>Bhanu Pradeep</h3>
              <div className={Styles.social}>
              <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                <Link to="/"><i class="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
              </div>
              <h4>Web Designer </h4>
              <p>Designed MindMeld website</p>
            </div>
          </div>

          <div className={Styles.member}>
            <div className={Styles["member-img"]}>
              <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" className="img-fluid" alt="" />
            </div>
            <div className={Styles["member-info"]}>
              <h3>Avinash</h3>
              <div className={Styles.social}>
              <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                <Link to="/"><i class="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
              </div>
              <h4>Web Designer </h4>
              <p>Designed MindMeld website</p>
            </div>
          </div>

          <div className={Styles.member}>
            <div className={Styles["member-img"]}>
              <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" className="img-fluid" alt="" />
            </div>
            <div className={Styles["member-info"]}>
              <h3>Jagadeesh</h3>
              <div className={Styles.social}>
              <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                <Link to="/"><i class="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
              </div>
              <h4>Web Designer </h4>
              <p>Designed MindMeld website</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
    </>
    
  )
}