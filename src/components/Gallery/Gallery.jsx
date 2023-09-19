import React, { useEffect, useState } from "react";
import "./Gallery.scss";
import { nbaStars } from "../../data/Data";
import { Link } from "react-router-dom";
import AuthDetails from "../AuthDetails/AuthDetails";
import Loader from "react-loaders";
import Card from "../Card/Card";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


const Gallery = ({ isSignedIn, setIsSignedIn }) => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };
  useEffect(() => {
    setImages(nbaStars);
  }, []);

  useEffect(() => {
    const filterResults = images.filter(
      (card) =>
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.team.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filterResults);
  }, [images, search]);


  const onDragEnd = (e) => {

    if(isSignedIn){
      const { active, over } = e;
      if (active.id === over.id) {
        return;
      }
  
      setSearchResult((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  
  };

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
          <Link to='/register'>
          <img
            width="25"
            src="https://img.icons8.com/material-rounded/48/ffd700/user-male-circle.png"
            alt="user-male-circle"
          />
          </Link>
         
          {!isSignedIn && (
            <div className="btnWrapper">
              <button className="loginBtn">
                <Link to={"/"}>Login</Link>
              </button>
              <button className="registerBtn">
                <Link to={"/register"}>Register</Link>
              </button>
            </div>
          )}

          {isSignedIn && <AuthDetails />}
        </div>
      </header>

      <div className="title"></div>

      <form onSubmit={handleSearch} className="searchItems">
        <button>
          <img
            width="20"
            src="https://img.icons8.com/ios-filled/100/ffd700/search--v1.png"
            alt="search--v1"
          />
        </button>
        <input
          type="text"
          placeholder="Search Name or Team"
          value={search}
          onChange={handleOnchange}
        />
      </form>

      <div className="galleryContainer">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={searchResult}
            strategy={verticalListSortingStrategy}
          >
            {searchResult.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Loader type="pacman" />
    </div>
  );
};

export default Gallery;
