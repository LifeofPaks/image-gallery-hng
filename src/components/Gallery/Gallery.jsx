import React, { useEffect, useState } from "react";
import "./Gallery.scss";
import { nbaStars } from "../../data/Data";
import { Link } from "react-router-dom";
import AuthDetails from "../AuthDetails/AuthDetails";
import Loader from "react-loaders";
const Gallery = ({ isSignedIn, setIsSignedIn }) => {
  const [images, setImages] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleOnchange = (e) =>{
    setSearch(e.target.value)
  }

  const handleSearch = (e) =>{
    e.preventDefault()
    setSearch('')
  }
  useEffect(() =>{
      setImages(nbaStars)
  }, [])

  useEffect(()=>{
    const filterResults = images.filter(card =>
     (((card.name).toLowerCase()).includes(search.toLowerCase()))
     || (((card.team).toLowerCase()).includes(search.toLowerCase()))
     )
 
     setSearchResult(filterResults.reverse())
   },[images, search])
 


  return (
    <div className="gallery">
      <header>
        <div className="logo">
          <img
            width="40"
            src="https://img.icons8.com/ios-filled/100/ffd700/dynamics-365.png"
            alt="dynamics-365"
          />
        </div>
        <div className="profile">
          <img
            width="25"
            src="https://img.icons8.com/material-rounded/48/ffd700/user-male-circle.png"
            alt="user-male-circle"
          />
          {
            !isSignedIn && <div className="btnWrapper">
                   <button className="loginBtn">
            <Link to={"/login"}>Login</Link>
          </button>
          <button className="registerBtn">
            <Link to={"/register"}>Register</Link>
          </button>
            </div>


          }
       

          {isSignedIn && <AuthDetails />}
        </div>
      </header>

      <div className="title">
        <p className="i-text">The athletic X NBA</p>
        <h1>Introducing NBA All stars</h1>
        <h2>Ranking top active all stars</h2>
      </div>

      <form onSubmit={handleSearch} className="searchItems">
        <button>
        <img width="20" src="https://img.icons8.com/ios-filled/100/ffd700/search--v1.png" alt="search--v1"/>
        </button>
        <input type="text" placeholder="Search Name or Team" value={search} onChange={handleOnchange}/>
      </form>

      <div className="galleryContainer">
        {searchResult.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt="item.name" className="image"/>
            <div className="detailWrapper">
            <div className="details">
              <p className="name">{item.name}</p>
              <div className="teamWrapper">

              <p className="team">{item.team}</p>
              </div>
              <p className="position">{item.position}</p>
            </div>
              <img src={item.logo} alt="logo" className="teamLogo" />
            </div>
           
          </div>
        ))}
      </div>
      <Loader type="pacman" />
    </div>
  );
};

export default Gallery;
