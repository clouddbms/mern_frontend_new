import React from 'react'
import Styles from '../../pages/QnA/QnA.module.css';

export default function QnaSolvedQuestion({data, i}) {
  const [toggleStyle, setToggleStyle] = React.useState("none");

  const handleViewAnswer = ()=>{
    setToggleStyle("block");
  }

  const handleHideAnswer = ()=>{
   setToggleStyle("none");
  }

  return (
    <div className={`${Styles["question-wrapper"]} ${!data.is_answered?'dontshow':" "}`}>

                <div className={Styles["fa-ques"]}>

                  <div className={Styles["faq-first-part"]}>
                    <i className="fa-solid fa-caret-up"></i>
                    <span className={Styles["faq-scr-cnt"]}>
                      {data.popularity}
                    </span>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>

                  <div className={Styles["faq-left-part"]}>

                    <div className={Styles["question-part"]}>
                      {data.question}
                    </div>
                    <div className={Styles["solution-part"]}>
                      {data.answer.substring(0,100)}...
                        <a onClick={handleViewAnswer} className={`${i} ${Styles.viewFullAnswer}`} style={{cursor:'pointer',textDecoration:'none'}} > view full answer</a>
                    </div>
                  </div>

                  <div className={Styles["faq-right-part"]}>
                    Answered by :
                    <br />
                    <a href={`/expert/${data.expert_id}`}>
                      <img src={data["profile-image-link"]} alt="" className={Styles["faq-profile"]} />
                    </a>
                  </div>

                </div>

                <div style={{display:toggleStyle}} className={`${Styles["answer-box"]} ${Styles["answer-box-"+i]} answer-box-${i}`}>
                  <i onClick={handleHideAnswer} className={`${i} fa-solid fa-xmark ${Styles.closeBtn}`}></i>
                  <span className={Styles["answer_text"]}>
                    {data.answer}
                  </span>
                </div>

              </div>
  )
}
