import React from "react";
import "./Gallery.css";
import { schoolImages } from "./GalleryData";

const Gallery = () => {
  return (
    <div className="gallery-container bg-gray-100">
      <h1 className="font-opensans font-bold text-dark">Event's Gallery</h1>
      <div className="grid-wrapper">
        <div>
          <img src={schoolImages.School0} alt="" />
        </div>
        <div>
          <img src={schoolImages.School1} alt="" />
        </div>
        <div className="tall">
          <img src={schoolImages.School2} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School3} alt="" />
        </div>
        <div>
          <img src={schoolImages.School4} alt="" />
        </div>
        <div className="tall">
          <img src={schoolImages.School5} alt="" />
        </div>
        <div className="big">
          <img src={schoolImages.School6} alt="" />
        </div>
        <div>
          <img src={schoolImages.School7} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School8} alt="" />
        </div>
        <div className="big">
          <img src={schoolImages.School9} alt="" />
        </div>
        <div className="tall">
          <img src={schoolImages.School10} alt="" />
        </div>
        <div>
          <img src={schoolImages.School11} alt="" />
        </div>
        <div>
          <img src={schoolImages.School12} alt="" />
        </div>
        <div>
          <img src={schoolImages.School13} alt="" />
        </div>
        <div>
          <img src={schoolImages.School14} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School15} alt="" />
        </div>
        <div>
          <img src={schoolImages.School16} alt="" />
        </div>
        <div>
          <img src={schoolImages.School17} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School18} alt="" />
        </div>
        <div>
          <img src={schoolImages.School19} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School20} alt="" />
        </div>
        <div className="big">
          <img src={schoolImages.School21} alt="" />
        </div>
        <div>
          <img src={schoolImages.School22} alt="" />
        </div>
        <div>
          <img src={schoolImages.School23} alt="" />
        </div>
        <div className="big">
          <img src={schoolImages.School24} alt="" />
        </div>
        <div className="tall">
          <img src={schoolImages.School25} alt="" />
        </div>
        <div>
          <img src={schoolImages.School26} alt="" />
        </div>
        <div>
          <img src={schoolImages.School27} alt="" />
        </div>
        <div className="wide">
          <img src={schoolImages.School28} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
