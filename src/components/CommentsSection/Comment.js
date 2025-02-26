import React, { useState } from 'react'
import Styles from './CommentsSection.module.css'
import { useUser } from '../../providers/UserProvider'
import axios from 'axios';
import { backendUrl } from '../../backendUrl';

export default function Comment({comment_info, isReply=false, main_comment_id=""}) {

  const {user} = useUser();
  const [showReplyBox,setShowReplyBox] = useState(false);
  const [replyBoxValue,setReplyBoxValue] = useState("");


  const handlePostComment = async()=>{
    const url = backendUrl+"/articles/comments/"+comment_info.article_id;
    const data = {
      user_id:user._id,
      comment_info:replyBoxValue,
      profile_image_link:user.profile_image_link,
      user_name:user.firstname+" "+user.lastname,
      is_main_comment:false,
      main_comment_id:main_comment_id!==""?main_comment_id:comment_info._id,
      reply_for:comment_info.user_name
    }
    // console.log(data);

    axios.post(url,data).then((res)=>{
      console.log(res.data);
      window.location.reload();
    })
    .catch((err)=>console.log(err));

    setShowReplyBox(false);
    setReplyBoxValue("");
  }

  const handleReplyChange = (e)=>{
    setReplyBoxValue(e.target.value);
  }

  const handleDeleteComment = ()=>{
    const url = backendUrl+"/articles/comments/"+comment_info._id;

    axios.delete(url,{
      is_main_comment:comment_info.is_main_comment,
      main_comment_id:comment_info.main_comment_id
    })
    .then((res)=>window.location.reload());

  }

  return (
    <>
    <div className={`${isReply && Styles["single-reply"]} ${Styles["comment-container"]} ${user._id===comment_info.user_id?Styles["your-comment"]:" "}`}>
              <div className={Styles["upvotes-part"]}>
                <div className={Styles["upvotes-wrapper"]}>
                  <button className={Styles['plus']}><i className="fa-solid fa-2x fa-caret-up" style={{"color":"hsl(238, 40%, 52%)"}}></i></button>
                  <span className={Styles["upvotes-cnt"]}>
                    {comment_info.popularity}
                  </span>
                  <button className={Styles['minus']}><i className="fa-solid fa-2x fa-caret-down" style={{"color":"hsl(238, 40%, 52%)"}}></i></button>
                </div>
              </div>
              <div className={Styles["right-part"]}>
                <div className={Styles["comment-header"]}> <a href={`/user/"+comment_info.user_i`}> <img className={`${Styles["comment-profile-image"]} rounded-circle`} src={comment_info.profile_image_link}
                    alt=""/></a>
                  <span className={Styles["name"]}>{comment_info.user_name}</span>
                  <span className={Styles["youTag"]}>You</span>
                  <div className={Styles["time"]}>{comment_info.posted_date.split("T")[0]}</div> 
                  <a onClick={()=>setShowReplyBox(!showReplyBox)} className={Styles["reply"]}><i className="fa-solid fa-reply"></i> Reply</a>


                  <span className={Styles["edit"]}><i className="fa-solid fa-edit"></i> Edit</span>
                  <span className={`${Styles["edit"]} ${Styles["edit-2"]}`}><i className="fa-solid fa-edit"></i></span>
                  <span onClick={handleDeleteComment} className={Styles["delete"]}><i className="fa-solid fa-trash"></i> delete</span>
                  <span onClick={handleDeleteComment} className={`${Styles["delete"]} ${Styles["delete-2"]}`}><i className="fa-solid fa-trash"></i> </span>
              </div>
              <div className={Styles["comment-info"]}>{isReply && <span className={Styles["tag-person"]}>@{comment_info.reply_for}</span>}{comment_info.comment_info}</div>
              
            </div>
            </div>

            {/* reply bar */}
            <div className={`${Styles["reply-bar"]} ${showReplyBox?"show": "dontshow"}`}>
              <form >
                <input onChange={handleReplyChange} value={replyBoxValue} placeholder="Enter your reply here" required type="text" className={Styles["reply-input-box"]}/>
                <button type='button' onClick={()=>setShowReplyBox(false)} className={`btn btn-danger ${Styles["cancel_reply"]} ${Styles["btn"]}`}>Cancel</button>
                <button type='button' onClick={handlePostComment} className={"btn btn-success "+Styles.btn}>Send</button>
              </form>
            </div>
    </>
  )
}
