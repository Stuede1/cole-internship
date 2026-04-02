import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NFTCard from "../UI/NFTCard";
import SkeletonCard from "../UI/SkeletonCard";
import axios from "axios";

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
        
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        const authorData = response.data;
        
        setAuthor(authorData);
        setAuthorItems(authorData.nftCollection || []);
        
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
                <SkeletonCard type="nft" />
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
              <NFTCard
                item={item}
                authorImage={author?.authorImage}
                authorName={author?.authorName}
                authorId={authorId}
                nftImage={item.nftImage}
              />
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
