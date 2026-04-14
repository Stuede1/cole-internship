import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NFTCard from "../UI/NFTCard";
import { CustomNextArrow, CustomPrevArrow } from "../UI/SliderArrows";
import SectionHeader from "../UI/SectionHeader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SkeletonCard from "../UI/SkeletonCard";
import "./HotCollections.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonItems = new Array(8).fill(0);

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
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
          <SectionHeader title="New Items" />
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
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
                        <SkeletonCard type="collection" />
                      </div>
                    ))
                  : (newItems.length ? newItems : skeletonItems).map((item, index) => (
                      <div key={index} className="px-2">
                        {/* Mobile view - use nft_coll structure */}
                        <div className="d-lg-none">
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <Link to={`/item-details/${item.id || item.nftId}`}>
                                <img
                                  src={item.nftImage || nftImage}
                                  className="lazy img-fluid"
                                  alt={item.title || item.name || "NFT Item"}
                                />
                              </Link>
                            </div>
                            <div className="nft_coll_pp">
                              <Link to={`/author/${item.authorId}`}>
                                <img
                                  className="lazy pp-coll"
                                  src={item.authorImage || AuthorImage}
                                  alt={item.authorName || "Author"}
                                />
                              </Link>
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft_coll_info">
                              <Link to="/explore">
                                <h4>{item.title || item.name || "Unknown Item"}</h4>
                              </Link>
                              <span>{item.price ? `${item.price} ETH` : "New Item"}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop view - use NFTCard */}
                        <div className="d-none d-lg-block">
                          <NFTCard
                            item={item}
                            authorImage={item.authorImage || AuthorImage}
                            authorName={item.authorName || "Unknown Author"}
                            authorId={item.authorId}
                            nftImage={item.nftImage || nftImage}
                            showCountdown={!!item.expiryDate}
                            expiryDate={item.expiryDate}
                          />
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
