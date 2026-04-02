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
        console.log('Fetching item with ID:', nftId); // Debug log
        
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
        const itemData = response.data;
        console.log('Item API response:', itemData); // Debug log
        
        setItem(itemData);
        
        // Set owner info from the API response
        if (itemData.ownerId) {
          setAuthor({
            authorId: itemData.ownerId,
            authorName: itemData.ownerName,
            authorImage: itemData.ownerImage
          });
        }
        
        // Set creator info from the API response
        if (itemData.creatorId) {
          setCreator({
            authorId: itemData.creatorId,
            authorName: itemData.creatorName,
            authorImage: itemData.creatorImage
          });
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
                  <h2>{item.title || 'Untitled NFT'}<span style={{ display: 'inline', marginLeft: '5px', fontWeight: 'bold' }}>#{item.tag}</span></h2>

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
                          <Link to={`/author/${author?.authorId || item.ownerId}`}>
                            <img className="lazy" src={author?.authorImage || item.ownerImage || AuthorImage} alt="Owner" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${author?.authorId || item.ownerId}`}>{author?.authorName || item.ownerName || 'Unknown Owner'}</Link>
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
                          <Link to={`/author/${creator?.authorId || item.creatorId}`}>
                            <img className="lazy" src={creator?.authorImage || item.creatorImage || AuthorImage} alt="Creator" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creator?.authorId || item.creatorId}`}>{creator?.authorName || item.creatorName || 'Unknown Creator'}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price ? `${item.price}` : '0.00 ETH'}</span>
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
