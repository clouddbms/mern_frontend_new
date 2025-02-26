import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import styles from "./allexperts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'sonner'
import { useSelector,useDispatch } from "react-redux";
import {deleteExpert,updateExpertsdetails} from '../../store/user-slice'
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation.js'
import { backendUrl } from "../../backendUrl.js";
const AllExperts = () => {
  const dispatch=useDispatch();
  const experts= useSelector((state)=>state.users.experts)
  const articles=useSelector((state)=>state.articles.articles)
 let articleCounts = {};
  const counts = articles.reduce((acc, article) => {
    const authorId = article.author_id; // Assuming author_id is a string
    acc[authorId] = (acc[authorId] || 0) + 1;
    return acc;
  }, {});
 articleCounts=counts

  function removeExpert(id,e) {
    e.preventDefault();
   
    axios
      .delete(backendUrl+`/auth/${id}`)
      .then((response) => {
        // Check the status property sent by the backend
        const { status } = response.data;
  
        if (status) {
          // Successful deletion
          console.log('Expert deleted successfully');
          dispatch(deleteExpert(id))
          // setExperts(newdata)
          toast.success('Expert removed successfully')
          // Add any other actions you want to perform on successful deletion
        } else {
          // Handle failure
          console.error('Failed to delete expert');
          // Add any other actions you want to perform on failure
        }
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error('Error:', error.message);
      });
  }
  function approveExpert(e, id, index) {
    e.preventDefault();
    axios.put(`${backendUrl}/auth/${id}/updateblocked`)
    .then((response) => {
      // Check the status property received from the backend
      const { status, expert } = response.data;
          
      if (status) {
        toast.success('updated state of expert successfully')
        dispatch(updateExpertsdetails(index))
      } else {
        // Handle failure
        console.error('Failed to update expert');
        // Add any other actions you want to perform on failure
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      console.error('Error:', error.message);
    });
  }
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    const timeinterval=setTimeout(() => {
      setLoading(false)
      
    }, 300);
    return () => clearTimeout(timeinterval);
  },[]
  )

  return (
    <>
     {loading && <LoadingAnimation></LoadingAnimation>}
    <div className={styles.body}>
      <AdminNavbar></AdminNavbar>
      <div className={styles.right}>
        <h1
          style={{
            marginLeft: "30px",
            marginBottom: "20px",
            padding: "3px",
            borderBottom: "6px solid rgb(47, 46, 46)",
            width: "205px",
            borderRight: "6px solid rgb(47, 46, 46)",
            fontSize: "35px",
          }}
        >
          All Experts
        </h1>
        <div className={styles.total_experts}>
          {experts.map((expert,index) => (
            <Link to={`/expert/${expert._id}`} key={expert._id}>
              <div className={styles.single_expert}>
                <div className={styles.detailss}>
                  <h3>
                    <b>{expert.firstname} {expert.lastname} </b>
                  </h3>
                  <div className={styles.box}>
                    <h4>Expert</h4>
                  </div>
                </div>
                <div className={styles.subdetailss}>
                  <h4>{expert.email}</h4>
                  <h4>{expert.phone}</h4>
                 
                </div>
                <div className={styles.posted}>
                  <h3> Posted articles: {articleCounts[expert._id] || 0} </h3>
                  <div className={`${styles.delete_block_btns}`}>
                  <button className={styles.btn1} onClick={(e)=>{
                    removeExpert(expert._id,e)
                  }}>Remove</button>
                  <button className={styles.btn2} onClick={(e)=>{
                    approveExpert(e,expert._id,index)
                  }}>{expert.is_blocked?<span>Approve</span>:<span>Block</span>}</button>

                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AllExperts;
