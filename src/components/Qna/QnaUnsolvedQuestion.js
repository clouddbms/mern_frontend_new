import React, { useState } from 'react'
import Styles from '../../pages/QnA/QnA.module.css';
import { useUser } from '../../providers/UserProvider';
import Axios from 'axios';
import { backendUrl } from '../../backendUrl';
export default function QnaUnsolvedQuestion({ data, i, role }) {

  const [toggleAnswerBox, setToggleAnswerBox] = useState("none");
  const [answer, setAnswer] = useState("");

  const {user} = useUser();

  const handleAnswerClick = () => {
    setToggleAnswerBox("block");
  }

  const handleCancelClick = () => {
    setToggleAnswerBox("none");
  }

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  }
  
  const handlePostAnswer = (e) => {
    e.preventDefault();
    // post answer
    const url = backendUrl+"/queries/answer";

    Axios.post(url,{
      answer: answer,
      faq_id: data._id,
      expert_id: user._id
    })
    .then((res)=>{
      console.log(res.data);
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  return (
    <div key={i} className={`${Styles["question-wrapper"]} ${data.is_answered ? 'dontshow' : " "}`}>
      <div className={Styles["not_answered_wrapper"]}>
        <div className={Styles["not-answered-question"]}>
          {data.question}
        </div>

        <button onClick={handleAnswerClick} className={`${i} ${Styles.answer} ${data.is_blocked || role == 'user' ? "dontshow" : ""}`} style={{display:toggleAnswerBox==="none"?"block":"none"}}>
          Answer
        </button>
      </div>
      <div className={`${Styles["solution-" + i]} ${Styles["solution-form"]}`} style={{display:toggleAnswerBox}}>
        <form>
          <textarea onChange={handleAnswerChange} required className={Styles["faq-solution"]} placeholder='Write Your answer here' name="faq-solution" cols="100" rows="4">{answer}</textarea>
          <div className={Styles["actn_btns"]}>
            <button onClick={handleCancelClick} type="button" className={`${Styles["cancel-" + i]} btn btn-danger ${Styles.cancel_btn}`}>Cancel</button>
            <button onClick={handlePostAnswer} type="submit" className="btn btn-success post_btn">Post</button>
          </div>

        </form>

      </div>

    </div>
  )
}
