import React from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  // Initialize AOS and scroll to top
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section
        id="section-hero"
        aria-label="section"
        className="no-top no-bottom vh-100"
        data-bgimage="url(images/bg-shape-1.jpg) bottom"
        style={{ background: `url(${backgroundImage}) bottom / cover` }}
      >
        <div className="v-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="spacer-single"></div>
                <h6 data-aos="fade-down" data-aos-delay="100">
                  <span className="text-uppercase id-color-2">
                    Ultraverse Market
                  </span>
                </h6>
                <div className="spacer-10"></div>
                <h1 data-aos="fade-down" data-aos-delay="200">Create, sell or collect digital items.</h1>
                <p className="lead" data-aos="fade-down" data-aos-delay="300">
                  Unit of data stored on a digital ledger, called a blockchain,
                  that certifies a digital asset to be unique and therefore not
                  interchangeable
                </p>
                <div className="spacer-10"></div>
                <Link className="btn-main lead" to="/explore" data-aos="fade-down" data-aos-delay="400">
                  Explore
                </Link>
                <div className="mb-sm-30"></div>
              </div>
              <div className="col-md-6 xs-hide" data-aos="fade-in" data-aos-delay="500">
                <img src={NFT} className="lazy img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}; 
export default Landing;
