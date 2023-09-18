import React from "react";
import "./Card.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ item }) => {


  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (


    <div
      className="card"
      item={item}
      key={item.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <img src={item.image} alt="item.name" className="image" />
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
  );
};

export default Card;
