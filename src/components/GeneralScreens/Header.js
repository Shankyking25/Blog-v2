import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };

    return (

        <header  >
            <div className="averager" >


               <div className='header_options'>

                 <div className="auth_options">

              {/*           
                <Link to="/" className="logo" style={{border:"2px solid blue"}}>
                    <h5>  DEV BLOG   </h5>
                </Link>
    */}
             <Link to="/" className="logo" //style={{display: "flex", alignItems: "center"}}
             >
    <h5 style={{margin: 0, lineHeight: "1"}}>DEV BLOG</h5>
</Link>

                   </div></div>  
                <SearchForm  />
                <div className='header_options'>

                    {auth ?
                        <div className="auth_options"  style={{display: "flex", alignItems: "center"}} >

                           {/*
                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>
                          */}
                            <Link className='addStory-link' style={{marginTop: 0, lineHeight: "1"}}  to="/addstory">Add + </Link>

                            <Link to="/readList" className='readList-link'  style={{marginTop: 0, lineHeight: "0.1"}}>
                                <BsBookmarks   />
                                <span id="readListLength" >
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '  style={{lineHeight: "1"}}>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <img   style={{marginTop: 0, lineHeight: "0"}} src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />

                                }


                                <div className="sub-profile-wrap  "   style={{lineHeight: "1"}}>
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>

                        </div>

                        :
                        <div className="noAuth_options"   style={{lineHeight: "1"}} >

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
