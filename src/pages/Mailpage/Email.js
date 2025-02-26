import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import styles from "./sendmail.module.css";
import axios from 'axios'
import {toast} from 'sonner'
import { backendUrl } from "../../backendUrl";
const SendMail = () => {
  const [emaildetails, setEmaildetails] = useState({
    users: false,
    experts: false,
    subject: "",
    message: "",
  });
  function submithandler(e) {
    e.preventDefault();
    axios.post(backendUrl+'/queries/email',emaildetails).then((res)=>{
      return res
    }).then((data)=>{
      // console.log(data)
      if(data.data.success)
      {
        
        toast.success('sent email successfully')
      
      }
      else
      {
        toast.error('could not send mail')
      }

    })
    setEmaildetails({
      users: false,
      experts: false,
      subject: "",
      message: "",
    })
   
    
  }
 
  return (
    <div className={styles.bodysss}>
      <AdminNavbar />
      <div className={styles.sendmails}>
        <h2
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: "900",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Email MINDMELD members
        </h2>
        <h3 style={{ fontFamily: "Open Sans, sans-serif" }}>Category</h3>
        <form onSubmit={submithandler} className={styles.form}>
          <label className={styles.checkboxLabel}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              name="experts"
              {...(emaildetails.experts ? "checked" : "")}
              value="1"
              onChange={(e) => {
              setEmaildetails((oldata) => {
                return { ...oldata, experts:!oldata.experts };
              });
            }}
            />
            Experts
          </label>
          <label className={styles.checkboxLabel}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              {...(emaildetails.users ? "checked" : "")}
              name="users"
              value="2"
              onChange={(e) => {
              setEmaildetails((oldata) => {
                return { ...oldata, users:!oldata.users };
              });
            }}
            />
            Users
          </label>
          <h3 style={{ fontFamily: "Open Sans, sans-serif" }}>Subject</h3>
          <input
            type="text"
            name="subject"
            className={styles.subject}
            value={emaildetails.subject}
            required
            onChange={(e) => {
              setEmaildetails((oldata) => {
                return { ...oldata, subject: e.target.value };
              });
            }}
          />
          <h3 style={{ fontFamily: "Open Sans, sans-serif" }}>Message</h3>
          <textarea
            className={styles.textarea}
            id=""
            cols="100"
            rows="8"
            name="content"
            value={emaildetails.message}
            onChange={(e) => {
              setEmaildetails((oldata) => {
                return { ...oldata, message: e.target.value };
              });
            }}
            required
          ></textarea>
          
          <button type="submit" className={styles.submitButton}>
            SEND MAIL
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMail;
