import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        console.log('Fetching author with ID:', authorId); // Debug log
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        console.log('Author API response:', response.data); // Debug log
        setAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author:', error);
        // Fallback to default author on error
        setAuthor({
          authorName: "Unknown Author",
          authorImage: AuthorImage,
          authorId: authorId,
          followers: 0,
          tag: "unknown",
          address: "Unknown Address"
        });
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      // Unfollow: decrement followers
      setAuthor(prev => ({
        ...prev,
        followers: prev.followers - 1
      }));
    } else {
      // Follow: increment followers
      setAuthor(prev => ({
        ...prev,
        followers: prev.followers + 1
      }));
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return <div>Loading author...</div>;
  }

  if (!author) {
    return <div>Author not found</div>;
  }

  // Debug: Check if author has expected data
  console.log('Author state:', author);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
