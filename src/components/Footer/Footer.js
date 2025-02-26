import React from 'react'
import styles from './Footer.module.css'
import { Container,Row } from 'react-bootstrap'

export default function Footer() {
  return (
    <>
    <footer>
        <Container>
        <div className={styles["footer-row"]}>
    <div className={styles["footer-col"]}>
        <h4>Navigations</h4>
        <ul>
            <li><a href="home">Home</a></li>
            <li><a href="aboutus">About Us</a></li>
            <li><a href="contactus">Contact Us</a></li>
            <li><a href="queries">FAQ</a></li>
        </ul>
    </div>
    <div className={styles["footer-col"]}>
       <h4>Quick Links</h4>
       <ul>
            <li><a href="articles/topic/education">Education</a></li>
            <li><a href="articles/topic/lifestyle">Fashion</a></li>
            <li><a href="articles/topic/health">Health</a></li>

            <li><a href="articles/topic/sports">Sports</a></li>
            <li><a href="articles/topic/entertainment">Entertainment</a></li>
            <li><a href="articles/topic/news_updates">News_updates</a></li>

    </ul>

    </div>
    <div className={styles["footer-col"]}>
        <h4>Contact Info</h4> 
        <ul>
            <li><a href="#"><i className="fa-solid fa-phone"></i><span>+91 9273635224</span></a></li>
            <li><a href="#"><i className="fa-solid fa-envelope"></i><span>mindmeld@gmail.com</span></a></li>
            <li><a href="#"><i className="fa-solid fa-location-dot"></i><span>Sricity Chittoor ,517646</span></a></li>
        </ul>
    </div>
</div>
        </Container>

</footer>
<p className={styles["copyright"]}><i className="fa-regular fa-copyright"></i>2023 Copyright:<span>MindMeld.com</span></p>
    </>
  )
}
