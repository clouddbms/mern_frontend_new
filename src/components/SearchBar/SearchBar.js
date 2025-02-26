import React, { useState } from 'react'
import Styles from './SearchBar.module.css'
import axios from 'axios'
import { backendUrl } from '../../backendUrl'
export default function SearchBar({topic,page,handlefilters}) {
  const [searchvalues,setSearchvalues]=useState({
    searchinput:"",based_on:"title",filter_option:"newest first",topic:topic
  })
  function submithandler(e)
  {
       e.preventDefault();
       
       console.log(searchvalues)
        axios
        .post(backendUrl+'/articles/filter',searchvalues)
        .then((response) => {
          const { success, filtered_data } = response.data;
  
          if (success) {
            // Handle the filteredData and sliderData as needed in your React component
            console.log('Filtered Data:', filtered_data);
            handlefilters(filtered_data)
          } else {
            // Handle the error condition
            console.error('Error:');
          }
        })
        .catch((error) => {
          // Handle network or other errors
          console.error('Network Error:', error);
        });     
       
  }
  return (
    <div className={`${Styles["searchbar-container"]} d-flex`}>
    <form className={`${Styles["searchbar-form"]} d-flex`} onSubmit={submithandler}>
        <input name="searchinput" className={`${Styles["mysearchbar"]} form-control me-5`} type="search"   placeholder="Search"  aria-label="Search" onChange={(e)=>{
          setSearchvalues((prev)=>{
            prev.searchinput=e.target.value;
            return prev;
          })
        }}/>
        <input type="hidden" name="topic_name" />
        <div className={`form-group ${Styles["tags_or_title"]}`}>
          <select className={`${Styles.myselect} form-control`}  name="based_on" id="filter_based_on" onChange={(e)=>{
            setSearchvalues((prev)=>{
              prev.based_on=e.target.value;
            return prev;
            })
          }}>
            <option value="title">Based on Title</option>
            <option value="tags">Based on Tags </option>
          </select>
        </div>

        <div className={`form-group myfilterdropdown ${page=="bookmarks"?"dontshow":""}`}>
            <select name="filter_option"  className={`${Styles.myselect} form-control`} id="filterSelect" onChange={(e)=>{
            setSearchvalues((prev)=>{
              prev.filter_option=e.target.value;
            return prev;
            })
          }}>
              <option value="newest first">Newest First </option>
              <option value="oldest first">Oldest First</option>
              <option value="most liked">Most Liked First</option>
            </select>
        </div>

        {/* <div  className={`form-group topic_choose ${page=="posts"?"dontshow":"" }`}>
          <select className={`${Styles.myselect} form-control`}  name="choose_topic" onChange={(e)=>{
            setSearchvalues((prev)=>{
              prev.topic=e.target.value;
            return prev;
            })
          }}>
            <option value="">Choose a topic</option>
            <option value="health">HEALTH</option>
            <option value="sports">SPORTS</option>
            <option value="education">EDUCATION</option>
            <option value="news_updates">NEWS UPDATES</option>
            <option value="lifestyle">LIFESTYLE</option>
            <option value="entertainment">ENTERTAINMENT</option>
          </select>
        </div> */}

        <button className={`${Styles["searchbar_btn"]} btn btn-outline-success`} type="submit">Search</button>


    </form>
</div>
  )
}




