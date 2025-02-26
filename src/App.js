import HomePage from "./pages/HomePage/HomePage";
import { AuthProvider } from "./providers/authProvider";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignUpPage/Signup";
import SingleArticle from "./pages/SingleArticlePage/SingleArticle";
import ContactUs from './pages/ContactUsPage/ContactUs'
import Admin from "./pages/AdminPage/Admin";
import Articles from "./pages/ArticlesPage/Articles";
import LandingPage from "./pages/LandingPage/Landingpage";
import ExpertProfile from "./pages/ExpertProfile/ExpertProfile";
import Allarticles from "./pages/AllArticles/Allarticles";
import AllExperts from "./pages/AllExperts/AllExperts";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Query from "./pages/Querypage/Query";
import SendMail from "./pages/Mailpage/Email";
import UserPage from "./pages/UserPage/UserPage";
import ComposePage from "./pages/ComposePage/ComposePage";
import { useUser } from './providers/UserProvider'
import Yourwork from "./pages/YourWork/Yourwork";
import QnA from "./pages/QnA/QnA";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setArticles} from './store/article-slice'
import { getUsers,getExperts} from './store/user-slice'
import AboutUs from "./pages/AboutUs/AboutUs";
import EditDetails from './pages/EditDetails/EditDetails'
import EditUser from "./pages/EditUser/EditUser";
import { backendUrl } from "./backendUrl";

import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import GoogleLogin from "./GoogleLoginPage";



function App() 
{
  const token = localStorage.getItem("token");
  const dispatch=useDispatch()
  function getAllArticles() 
  {
    axios
      .get(backendUrl+"/articles",{
        headers:{
          Authorization:token,
        }
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data)
        dispatch(setArticles(data))
        // console.log(data)
      });
  }
  function getAllExperts() {
    axios
      .get(backendUrl+"/user/role/expert",{
        headers:{
          Authorization:token,
        }
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch(getExperts(data))
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getAllusers() {
    axios
      .get(backendUrl+"/user/role/user",{
        headers:{
          Authorization:token,
        }
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        
        dispatch(getUsers(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getwholedata(){
    getAllArticles();
    getAllExperts();
    getAllusers();
    return 1;
}

const {user}=useUser();
var role="user"
if(user)
{
   role=user.role
}

const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path="/"  loader={getwholedata}>
     <Route index element={<LandingPage/>} />
    <Route path="/login" element={<Login />}></Route>
    <Route path="/googleLogin" element={<GoogleLogin/>} />
    <Route path="/register" element={<Signup/>}/>
    {(role==="admin" || role==="expert"|| role=='user')&&<Route path="/home" element={<HomePage/>} />}
    <Route path="/articles/:articleId" element={<SingleArticle/>}/>
    <Route path="/articles/topic/:topic" element= {<Articles/>} />
    <Route path="/contactus" element={<ContactUs/>}/>
    {(role==="admin" || role==="expert"|| role=='user')&&<Route path="/bookmarks" element={<Bookmarks/>}/>}
    {(role==="admin" || role==="expert"|| role=='user')&&<Route path="/queries" element={<QnA/>}/>}
    {(role==="admin" || (role==="expert" && user.is_blocked===false))&&<Route path="/compose" element={<ComposePage/>}/>}
    {console.log(role)}
    {(role==="admin" || role==="expert")&&<Route path="/yourwork" element={<Yourwork/>}/>}
    {console.log(role)}

        {role==="admin"&&<Route path="/admin" element={<Admin/>} />}
        {role==="admin"&&<Route path="/admin/all_articles" element={<Allarticles></Allarticles>} />}
        {role==="admin"&&<Route path="/admin/all_experts" element={<AllExperts></AllExperts>} />}
        {role==="admin"&&<Route path="/admin/query" element={<Query></Query>}></Route>}
        {role==="admin"&&<Route path="/admin/mail" element={<SendMail></SendMail>}></Route>}
        {(role==="expert"||role==="admin")&&<Route path="/expert/:userId" element={<ExpertProfile/>}/>}
        <Route path="/logout" element={<LandingPage></LandingPage>}></Route>
        <Route path="/user/:userid" element={<UserPage/>}> </Route>
        <Route path="/aboutus" element={<AboutUs/>}> </Route>
        <Route path="/user/edit_e" element={<EditDetails />} ></Route>
        <Route path="/user/edit_u" element={<EditUser/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
    </Route>
  )
)
  return (

   <>
    <RouterProvider router={router} />
    </>

  );
}

export default App;