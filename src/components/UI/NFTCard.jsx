import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import ShareButtons from "./ShareButtons";

const NFTCard = ({ 
  item, 
  authorImage, 
  authorName, 
  authorId,
  nftImage,
  showCountdown = false,
  expiryDate = null,
  className = ""
}) => {
  return (
    <div className={`nft__item ${className}`}>
      <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
          <img className="lazy" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {showCountdown && expiryDate && (
        <CountdownTimer expiryDate={expiryDate} />
      )}
      
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <ShareButtons />
          </div>
        </div>
        <Link to={`/item-details/${item.nftId || item.id}`}>
          <img
            src={nftImage}
            className="lazy nft__item_preview"
            alt={item.title || "NFT Item"}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId || item.id}`}>
          <h4>{item.title || "Unknown Item"}</h4>
        </Link>
        <div className="nft__item_price">
          {item.price ? `${item.price} ETH` : `ERC-${item.code || "192"}`}
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
