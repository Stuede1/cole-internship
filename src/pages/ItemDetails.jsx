import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        
        // Try both APIs to find the item
        let foundItem = null;
        
        // First try hotCollections
        try {
          const hotResponse = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
          const hotCollections = hotResponse.data;
          foundItem = hotCollections.find(item => item.nftId === parseInt(nftId));
        } catch (err) {
          console.log('Hot collections fetch failed, trying new items');
        }
        
        // If not found in hotCollections, try newItems
        if (!foundItem) {
          try {
            const newResponse = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
            const newItems = newResponse.data;
            foundItem = newItems.find(item => item.nftId === parseInt(nftId));
          } catch (err) {
            console.log('New items fetch failed');
          }
        }
        
        setItem(foundItem);
        
        // Debug: log the item data to see what fields are available
        console.log('Found item:', foundItem);
        
        // If we found an item and it has an authorId, fetch the author details
        if (foundItem && foundItem.authorId) {
          try {
            const authorResponse = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
            const sellers = authorResponse.data;
            const foundAuthor = sellers.find(seller => seller.authorId == foundItem.authorId);
            setAuthor(foundAuthor);
            console.log('Found author:', foundAuthor);
          } catch (err) {
            console.log('Failed to fetch author details');
          }
        }
        
        // Fetch creator information - check if the item has creator-specific fields
        try {
          const authorResponse = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
          const sellers = authorResponse.data;
          
          let foundCreator = null;
          
          // Check for various possible creator fields in the item
          if (foundItem.creatorId) {
            foundCreator = sellers.find(seller => seller.authorId == foundItem.creatorId);
          } else if (foundItem.creator && foundItem.creator.authorId) {
            foundCreator = sellers.find(seller => seller.authorId == foundItem.creator.authorId);
          } else if (foundItem.createdBy) {
            foundCreator = sellers.find(seller => seller.authorId == foundItem.createdBy);
          }
          
          // If no specific creator found, we could either:
          // 1. Use the same as owner (current owner is often the creator)
          // 2. Use a different logic based on your requirements
          if (!foundCreator) {
            // For now, let's use the same as owner, but you can change this logic
            foundCreator = author;
          }
          
          setCreator(foundCreator);
          console.log('Found creator:', foundCreator);
        } catch (err) {
          console.log('Failed to fetch creator details');
        }
        
        // Scroll to top after data is loaded
        window.scrollTo(0, 0);
      } catch (err) {
        setError('Failed to fetch item details');
        console.error('Error fetching item details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>Item not found</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title || "NFT Item"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title || 'Untitled NFT'}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 99}
                    </div>
                  </div>
                  <p>
                    {item.description || "Beautiful NFT collection from our curated marketplace."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId || 'unknown'}`}>
                            <img className="lazy" src={author?.authorImage || item.authorImage || AuthorImage} alt="Author" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId || 'unknown'}`}>{author?.authorName || `Artist #${item.authorId || 'Unknown'}`}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${creator?.authorId || 'unknown'}`}>
                            <img className="lazy" src={creator?.authorImage || AuthorImage} alt="Creator" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creator?.authorId || 'unknown'}`}>{creator?.authorName || `Creator #${item.authorId || 'Unknown'}`}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price ? `${item.price} ETH` : `${(Math.random() * 10 + 0.5).toFixed(2)} ETH`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
