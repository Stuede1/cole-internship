import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { CustomNextArrow, CustomPrevArrow } from "../UI/SliderArrows";
import SectionHeader from "../UI/SectionHeader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SkeletonCard from "../UI/SkeletonCard";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
    const fetchHotCollections = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        setCollections(response.data);
      } catch (err) {
        setError('Failed to fetch hot collections');
        console.error('Error fetching hot collections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <SectionHeader title="Hot Collections" />
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
                  : (collections.length ? collections : skeletonItems).map((collection, index) => (
                      <div key={index} className="px-2">
                        <div className="nft_coll">
                          {collections.length ? (
                            <>
                              <div className="nft_wrap">
                                <Link to={`/item-details/${collection.nftId}`}>
                                  <img
                                    src={collection.nftImage || nftImage}
                                    className="lazy img-fluid"
                                    alt={collection.title || "NFT Collection"}
                                  />
                                </Link>
                              </div>
                              <div className="nft_coll_pp">
                                <Link to={`/author/${collection.authorId}`}>
                                  <img
                                    className="lazy pp-coll"
                                    src={collection.authorImage || AuthorImage}
                                    alt={collection.author || "Author"}
                                  />
                                </Link>
                                <i className="fa fa-check"></i>
                              </div>
                              <div className="nft_coll_info">
                                <Link to="/explore">
                                  <h4>{collection.title || "Unknown Collection"}</h4>
                                </Link>
                                <span>ERC-{collection.code || "192"}</span>
                              </div>
                            </>
                          ) : (
                            <SkeletonCard type="collection" />
                          )}
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

export default HotCollections;
