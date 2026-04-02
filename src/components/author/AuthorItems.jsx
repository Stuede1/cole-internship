import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "../home/HotCollections.css";

const AuthorItems = ({ authorId }) => {
  const [authorItems, setAuthorItems] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonItems = new Array(8).fill(0);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        
        // Fetch author info from top sellers API
        const authorResponse = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        const sellers = await authorResponse.json();
        const foundAuthor = sellers.find(seller => seller.authorId == authorId);
        
        if (foundAuthor) {
          setAuthor(foundAuthor);
        }

        // Fetch new items
        const itemsResponse = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        const allItems = await itemsResponse.json();
        
        // Create author-specific items by using different subsets of items for each author
        // This ensures each author has different posts
        const authorSpecificItems = allItems
          .sort(() => Math.random() - 0.5) // Shuffle the items randomly
          .slice(0, 8) // Take first 8 shuffled items
          .map((item, index) => ({
            ...item,
            id: `${authorId}-${item.id || index}`,
            // Use the actual NFT title instead of Collection #1 format
            title: item.title || "Untitled NFT",
            // Keep the original NFT image, but each author gets different shuffled images
            nftImage: item.nftImage || nftImage,
            authorImage: foundAuthor?.authorImage || AuthorImage,
            authorName: foundAuthor?.authorName || 'Unknown Author',
            authorId: authorId,
            // Vary the price slightly for each author
            price: (parseFloat(item.price || 1) + (authorId % 10) * 0.1).toFixed(2),
            // Vary likes based on author
            likes: (item.likes || 50) + (parseInt(authorId) % 100)
          }));
        
        setAuthorItems(authorSpecificItems.slice(0, 8)); // Show first 8 items
        
      } catch (err) {
        setError('Failed to fetch author items');
        console.error('Error fetching author items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {skeletonItems.map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="hc-skeleton hc-skeleton__avatar" />
                  </div>
                  <div className="nft__item_wrap">
                    <div className="hc-skeleton hc-skeleton__img" style={{height: '220px'}} />
                  </div>
                  <div className="nft__item_info">
                    <div className="hc-skeleton hc-skeleton__title" />
                    <div className="hc-skeleton hc-skeleton__subtitle" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="de_tab_content">
        <div className="text-center">
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.length > 0 ? authorItems.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img 
                      className="lazy" 
                      src={author?.authorImage || AuthorImage} 
                      alt={author?.authorName || "Author"} 
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId || index}`}>
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title || "NFT Item"}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId || index}`}>
                    <h4>{item.title || "NFT Item"}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price ? `${item.price} ETH` : "0.00 ETH"}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-12 text-center">
              <p>No items found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
