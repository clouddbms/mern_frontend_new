import React, { useEffect, useRef, useState } from 'react'
import MyNavbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Styles from './ComposePage.module.css'
import ComposeImage from '../../assets/images/Diary-bro.png'
import {useSearchParams } from 'react-router-dom'
import { useUser } from '../../providers/UserProvider'
import { Modal } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {toast} from 'sonner'
import axios from 'axios'
import "./modalStyles.css"
import { backendUrl } from '../../backendUrl'

export default function ComposePage() {

  const articleId = useSearchParams()[0].get('articleId');
  const {user} = useUser();
  const [article,setArticle] = useState({
    topic:"education",
    title:"",
    content:{ __html: '' },
    author_name:user.firstname+" "+user.lastname,
    date_of_publish:new Date(),
    tags:[],
    author_id:user._id,
    image:null
  });

  const [show, setShow] = useState(false);
  const [newtag,setNewtag]=useState("");
  
  const handleShow = () => setShow(true);
  const handleClose=()=>setShow(false)

  const editorRef = useRef(null);

  useEffect (()=>{
    if(articleId!==undefined && articleId!==null){
      axios.get(`${backendUrl}/articles/${articleId}`)
      .then((res)=>{
        const data = res.data;
        const requiredData = {
          topic:data.topic,
          title:data.title,
          content:{ __html: data.content },
          author_name:data.author_name,
          date_of_publish:data.date_of_publish,
          tags:data.tags,
          author_id:data.author_id,
          image_link:data.image_link,
        }
        setArticle(requiredData);
        console.log(requiredData);
      })
      .catch((err)=>console.log(err));

    }
  },[articleId])

  const handleReady = (editor) => {
    console.log('Editor is ready to use!', editor);

    // Check if the editable element and toolbar element exist
    const editableElement = editor.ui.getEditableElement();
    const toolbarElement = editor.ui.view.toolbar.element;

    if (editableElement && toolbarElement) {
        // Insert the toolbar before the editable area.
        editableElement.parentElement.insertBefore(toolbarElement, editableElement);
    }

    editorRef.current = editor;
};

  const handleError = (error, { willEditorRestart }) => {
      // If the editor is restarted, remove the older toolbar.
      if (willEditorRestart) {
          editorRef.current.ui.view.toolbar.element.remove();
      }
  };

  const handleChange = (event, editor) => {
      console.log({ event, editor });
  };

  const handleSave = () => {
    const data = editorRef.current.getData();
    console.log(data);
    setArticle({
      ...article,
      content:{__html:data}
    });
    handleClose();
  }

 function handleClosetags(e,id){
  e.preventDefault();
  console.log(id)
  let newtags=article.tags.filter((tag,index)=>index!==id)
  article.tags=newtags
  setArticle((prev)=>{
    return ({
      ...prev,tags:newtags
    })
  })

 }

function addnewtag(){
  console.log(newtag)
  if(!newtag||newtag==""){return;}
  else{
    let tags=[...article.tags];
    tags.push(newtag);
    setArticle((prev)=>{
      return ({
        ...prev,tags:tags
      })
    })
    setNewtag("")
    
  }
}

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setArticle({
    ...article,
    image: file
  })
};


const handleSubmit = (e) => {
  e.preventDefault();
  const url = (articleId!==undefined && articleId!==null) ?`${backendUrl}/articles?id=${articleId}`:`${backendUrl}/articles`;
  const article_data = {
    topic:article.topic,
    title:article.title,
    content:article.content.__html,
    author_name:article.author_name,
    date_of_publish:article.date_of_publish,
    tags:article.tags,
    author_id:article.author_id,
    image:article.image
  } 

  console.log(article_data)

  if(article_data.title==='' || article_data.content==='' ||article_data.image_link==='' )
  {
    console.log(article_data)
     toast.error('fill all details')
     return;
  }

  axios.post(url,article_data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  .then((res)=>{
    console.log(res.data);
    toast.success('Article posted successfully')

  })
  .catch((err)=>console.log(err));
  
}

const handleArticleChange = (e) => {
  setArticle({
    ...article,
    [e.target.name]: e.target.value
  })    
}


  return (
    <div className={Styles.composePage}>
      
      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton >
          <Modal.Title>Content</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <CKEditor
                onReady={handleReady}
                onError={handleError}
                onChange={handleChange}
                editor={DecoupledEditor}
                data={article.content.__html}
                config={{
                  toolbar: {
                      items: [
                          'heading',
                          '|',
                          'bold',
                          'italic',
                          'underline',
                          'strikethrough',
                          '|',
                          'bulletedList',
                          'numberedList',
                          '|',
                          'indent',
                          'outdent',
                          '|',
                          'alignment',
                          '|',
                          'imageUpload',
                          'blockQuote',
                          '|',
                          'link',
                          'undo',
                          'redo',
                      ],
                  },
                  language: 'en',
                  image: {
                      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
                      styles: ['full', 'alignLeft', 'alignRight'],
                  },
                  table: {
                      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                  },
                  licenseKey: '',
              }}
            />
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <MyNavbar/>
      <div className={Styles.containerss}>
      <div className = {Styles.left}>
        <img className={Styles.image} src={ComposeImage} alt="" />
      </div>
      <div className = {Styles.right}>
      <h1> Write a Blog of Your Choice </h1>
      <form className = {Styles.form}>
        <label htmlFor="field" style={{"fontWeight":"700","fontSize":"20px"}}>Select Blog Field:</label> 
        <br/>
        <select value={article.topic} onChange={handleArticleChange} name="topic" id="field" required>
          <option value="education">Education</option>
          <option value="lifestyle">Life Style</option>
          <option value="health">Health</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="news_updates">News Updates</option>
        </select>
        <br/>
        <label htmlFor="title" style={{"fontWeight":"700","fontSize":"18px"}}>Title:</label>
        <br/>
        <input value={article.title} onChange={handleArticleChange} type="text" name="title" id="title" className={Styles["input-title"]} required/>
        <br/>
        <label style={{"fontWeight":"700","fontSize":"18px"}}>Content:</label>
        <br/>
        <button type='button' className={`btn ${Styles["trigger-btn"]}`} onClick={handleShow} >
          <div className={Styles["input-content"]} dangerouslySetInnerHTML={article.content} style={{padding:"10px",borderRadius:"5px"}}></div>
        </button>

        <br/>
        <label style={{"fontWeight":"700","fontSize":"18px"}}>Markdown:</label>
        <br/>
        <div className={Styles.header}>
          <input type="text"  id="myInput" placeholder="Tag..." value={newtag} onChange={(e)=>{
            setNewtag(e.target.value)}}/>
          <button className={Styles.addBtn} type='button' onClick={addnewtag} 
          >Add</button>
        </div>
        <div className='tags'>
        <ul id="myUL">
          {
            article.tags.map((tag,i)=>{
              return(
                <li  key={i} >{tag} <button className={Styles.close} onClick={(e)=>{
                  handleClosetags(e,i)
                }}>&times;</button> </li>
              )
            })
          }
        </ul>
        </div>
        <br/>
        <label style={{"fontWeight":"700","fontSize":"18px","marginBottom":"15px"}}>Image Attachment:</label>

        <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} accept="image/png, image/jpeg" style={{"width":"300px"}}/>
       
        <br/>
        
        <button type="button" onClick={handleSubmit} className={Styles.submit}>POST ARTICLE</button>


      </form>
      </div>
      </div>

      <Footer/>
    </div>
  )
}

