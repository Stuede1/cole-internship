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
