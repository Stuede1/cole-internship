import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NFTCard from "../UI/NFTCard";
import SkeletonCard from "../UI/SkeletonCard";
import "../home/HotCollections.css";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [currentFilter, setCurrentFilter] = useState("");
  const skeletonItems = new Array(8).fill(0);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const apiUrl = currentFilter 
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${currentFilter}`
          : 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
        
        const response = await axios.get(apiUrl);
        setExploreItems(response.data);
        setDisplayedItems(response.data.slice(0, itemsToShow));
      } catch (err) {
        setError('Failed to fetch explore items');
        console.error('Error fetching explore items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [currentFilter]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setCurrentFilter(newFilter);
    setItemsToShow(8); 
  };

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + 4;
    setItemsToShow(newItemsToShow);
    setDisplayedItems(exploreItems.slice(0, newItemsToShow));
  };
  return (
    <>
      <div>
        <select id="filter-items" value={currentFilter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      {error && (
        <div className="text-center">
          <p className="text-danger">{error}</p>
        </div>
      )}
      
      {!error && (
        <div className="row">
          {loading
            ? skeletonItems.map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <SkeletonCard type="nft" />
                </div>
              ))
            : displayedItems.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
                  <NFTCard
                    item={item}
                    authorImage={item.authorImage}
                    authorName={`Author ${item.authorId}`}
                    authorId={item.authorId}
                    nftImage={item.nftImage}
                    showCountdown={!!item.expiryDate}
                    expiryDate={item.expiryDate}
                  />
                </div>
              ))
          }
        </div>
      )}
      
      {!loading && !error && displayedItems.length < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
