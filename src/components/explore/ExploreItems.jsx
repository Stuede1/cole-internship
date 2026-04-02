import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import CountdownTimer from "../UI/CountdownTimer";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {
  // Create expiry dates for demo items (5 hours 30 minutes 32 seconds from now)
  const getExpiryDate = () => {
    return Date.now() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000) + (32 * 1000);
  };
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NFTCard
            item={{
              title: "Pinky Ocean",
              price: "1.74",
              likes: 69,
              nftId: index
            }}
            authorImage={AuthorImage}
            authorName="Author"
            authorId="author"
            nftImage={nftImage}
            showCountdown={true}
            expiryDate={getExpiryDate()}
          />
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
