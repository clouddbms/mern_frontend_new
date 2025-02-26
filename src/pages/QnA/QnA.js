import React, { useEffect, useState } from 'react'
import Styles from './QnA.module.css'
import qnaImage from '../../assets/images/qAImage.svg'
import QnaSolvedQuestion from '../../components/Qna/QnaSolvedQuestion';
import QnaUnsolvedQuestion from '../../components/Qna/QnaUnsolvedQuestion';
import MyNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useUser } from '../../providers/UserProvider';
import axios from 'axios';
import { backendUrl } from '../../backendUrl';

export default function QnA() {

  const {user} = useUser();

  const [faqData, setFaqData] = useState([]);

  const [query, setQuery] = useState({
    question: "",
    topic: "Health",
    user_id: user._id
  });

  const [filters, setFilters] = useState({
    is_solved: "true",
    all_or_your: "all",
    choose_topic: "",
    search_value: "",
    userId: user._id
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    handleApplyFilter();
  },[])

  const handleApplyFilter = ()=>{
    
    const url = backendUrl+"/queries/filters";
    // fetch(url,{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify(filters)
    // })
    // .then((res)=>res.json())
    // .then((data)=>{
    //   setFaqData(data);
    // })

    axios.post(url,filters)
    .then((res)=>{
      const data = res.data;
      setFaqData(data);
    })
    .catch((err)=>console.log(err));

  }

  const handlePostQuestion = () => {
    // post question
    const url = backendUrl+"/queries";
    // fetch(url,{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify(query)
    // })
    // .then((res)=>res.json())
    // .then((data)=>{
    //   console.log(data);
    //   setQuery({
    //     question: "",
    //     topic: "Health",
    //     user_id: user._id
    //   });
    // })
    // .catch((err)=>console.log(err));

    axios.post(url,query)
    .then((res)=>{
      setQuery({
        question: "",
        topic: "Health",
        user_id: user._id
      });
    })
    .catch((err)=>console.log(err));
  }

  const handleInputChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    })
  }


  return (
  <>
    <MyNavbar/>
    <div className={Styles.body}>
      <h1 className={Styles.heading}>Ask Your Questions Here...</h1>
      <div className={Styles["question-input-section"]}>
        <div className={Styles.qAicon}>
          <img src={qnaImage} alt="hell" />
        </div>
        <div className={Styles["right-box"]}>
          <form >
            <label className={Styles.topic_label} htmlFor="questionTopic">
              Choose Topic :
            </label>
            <select value={query.topic} onChange={handleInputChange} name="topic" id="questionTopic">
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Fashion">Fashion</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="News updates">News Updates</option>
            </select>
            <div className={Styles["textarea-container-2"]}>
              <div className={Styles["textarea-container"]}>
                <textarea
                  value={query.question}
                  onChange={handleInputChange}
                  className={Styles.askbar}
                  placeholder="Ask Your Question..."
                  name="question"
                  id="question-1"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <button onClick={handlePostQuestion} type='button' className={Styles.submitQuestion}>
              Post Question
            </button>
          </form>
        </div>
        </div>

        <div className={Styles.faqs}>
          <h1 className={Styles.heading}>Frequently Asked Questions</h1>
          <form  className={Styles["filter_form_faq_page"]} >
            <label className={Styles.label_show} htmlFor="show_dontshow" >
              Filter:
            </label>
            <select value={filters.is_solved} onChange={handleFilterChange} className={Styles.filter_select} name="is_solved" id="show_dontshow">
              <option value="true">Solved</option>
              <option value="false">Unsolved</option>
            </select>
            <select value={filters.all_or_your} onChange={handleFilterChange} name="all_or_your" className={Styles.all_or_your_select}>
              <option value="all">All Questions</option>
              <option value="your">Your Questions</option>
              <option value="solved">  {/* restrict based on role */}
                Answered by you
              </option>
            </select>

            <select value={filters.choose_topic} onChange={handleFilterChange} className={Styles.topic_choose_select} name="choose_topic">
              <option value="">Choose a topic</option>
              <option value="Health">HEALTH</option>
              <option value="Sports">SPORTS</option>
              <option value="Education">EDUCATION</option>
              <option value="News updates">NEWS UPDATES</option>
              <option value="Lifestyle">LIFESTYLE</option>
              <option value="Entertainment">ENTERTAINMENT</option>
            </select>

            <input value={filters.search_value} onChange={handleFilterChange} className={Styles.search_question_input} type="search" placeholder="Search for something" name="search_value" />
            <button onClick={handleApplyFilter} className={Styles.filter_apply} type="button">
              Apply
            </button>
          </form>

        {
          faqData.map((data,i)=>{
            return(
              <>

              {/* for showing unanswered questions. */}
              {!data.is_answered && ( <QnaUnsolvedQuestion key={i} role={user.role} data={data} i={i} /> )}

              {/* for showing answered questions. */}
              {data.is_answered && ( <QnaSolvedQuestion key={i} data={data} i={i} /> )}

              </>
            )

          })
        }

        </div>

    </div>
    <Footer/>
    </>
  )
}

