import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "./HotCollections.css";
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} customNextArrow`}
      style={{ ...style, display: "flex", right: "-20px" }}
      onClick={onClick}
    >
      ›
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} customPrevArrow`}
      style={{ ...style, display: "flex", left: "-20px" }}
      onClick={onClick}
    >
      ‹
    </div>
  );
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const skeletonItems = new Array(8).fill(0);

  // Update time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        setNewItems(response.data);
      } catch (err) {
        setError('Failed to fetch new items');
        console.error('Error fetching new items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {error && (
              <div className="text-center">
                <p className="text-danger">{error}</p>
              </div>
            )}
            {!error && (
              <Slider {...sliderSettings}>
                {loading
                  ? skeletonItems.map((_, index) => (
                      <div key={index} className="px-2">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <div className="hc-skeleton hc-skeleton__img" />
                          </div>
                          <div className="nft_coll_pp">
                            <div className="hc-skeleton hc-skeleton__avatar" />
                          </div>
                          <div className="nft_coll_info">
                            <div className="hc-skeleton hc-skeleton__title" />
                            <div className="hc-skeleton hc-skeleton__subtitle" />
                          </div>
                        </div>
                      </div>
                    ))
                  : (newItems.length ? newItems : skeletonItems).map((item, index) => (
                      <div key={index} className="px-2">
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          {item.expiryDate && (
                          <div className="de_countdown">
                            {(() => {
                              const timeLeft = item.expiryDate - currentTime;
                              const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                              const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                              const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                              const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                              return `${days}d ${hours}h ${minutes}m ${seconds}s`;
                            })()}
                          </div>
                        )}

                          <div className="nft__item_wrap">
                            <Link to={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage || nftImage}
                                className="lazy nft__item_preview"
                                alt={item.title || "NFT Item"}
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link to={`/item-details/${item.nftId}`}>
                              <h4>{item.title || "Unknown Item"}</h4>
                            </Link>
                            <div className="nft__item_price">{item.price ? `${item.price} ETH` : `ERC-${item.code || "192"}`}</div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart"></i>
                              <span>{item.likes || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
