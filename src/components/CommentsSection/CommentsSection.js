import React, { useEffect, useState } from 'react'
import Styles from './CommentsSection.module.css'
import { useUser } from '../../providers/UserProvider'
import axios from 'axios';
import Comment from './Comment';
import { backendUrl } from '../../backendUrl';

export default function CommentsSection({articleId}) {
  const {user} = useUser();

  const [comments_data,setCommentsData] = useState([]);
  const [commentBoxValue,setCommentBoxValue] = useState("");

  useEffect(()=>{
    console.log("article id is "+articleId);
    const fetchComments = async()=>{
      const url = backendUrl+"/articles/comments/"+articleId;
      const comments = await axios.get(url).then((res)=>{
        return res.data;
      })
      setCommentsData(comments);
    }
    fetchComments();
  },[articleId])


  const handlePostComment = async ()=>{
    const url = backendUrl+"/articles/comments/"+articleId;
    const data = {
      user_id:user._id,
      comment_info:commentBoxValue,
      profile_image_link:user.profile_image_link,
      user_name:user.firstname+" "+user.lastname,
      is_main_comment:true,
      main_comment_id:""
    }
    console.log(data);
    
    axios.post(url,data).then((res)=>{
      console.log(res);
    })
    .catch((err)=>console.log(err));

    setCommentBoxValue("");
  }


  return (
    <>
    {

    comments_data.map((comment_info,i)=>{
      return(
          <div key={i} className={Styles["comment-parent-wrapper"]}>

            <Comment comment_info={comment_info} />

            {/* replies for maincomment  */}
            <div className={Styles['replies-container']}>
            {
              comment_info['replies'].map((single_reply,j)=>{
                return(
                  <Comment key={j} comment_info={single_reply}  isReply={true} main_comment_id={comment_info._id} />
                )
              })
            }
            </div>
          </div>
      )
    })
  
    }

    <div className={`${Styles["comment-container"]} ${Styles["write-comment"]}`}>
      <a href={"/user/"+user["_id"]}>
      <img className={`${Styles["comment-profile-image"]} rounded-circle`} src={user["profile_image_link"]} alt=""/>
      </a>
      <form>
        <textarea defaultValue={commentBoxValue} onChange={(e)=>setCommentBoxValue(e.target.value)} placeholder='Add a comment...' name="comment-message" style={{height:"100px"}} cols="55" rows="3" />
        <button onClick={handlePostComment} className={Styles["send-btn"]}>Send</button>
      </form>
    </div>
    </>
  )
}

