import React from 'react';

const SkeletonCard = ({ type = "nft" }) => {
  if (type === "nft") {
    return (
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
    );
  }

  if (type === "collection") {
    return (
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
    );
  }

  if (type === "author") {
    return (
      <>
        <div className="author_list_pp">
          <div className="hc-skeleton hc-skeleton__avatar" />
        </div>
        <div className="author_list_info">
          <div className="hc-skeleton hc-skeleton__title" />
          <div className="hc-skeleton hc-skeleton__subtitle" />
        </div>
      </>
    );
  }

  if (type === "item-details") {
    return (
      <div className="de_tab">
        <div className="row">
          <div className="col-md-6">
            <div className="hc-skeleton hc-skeleton__img" style={{height: '400px', borderRadius: '12px'}} />
          </div>
          <div className="col-md-6">
            <div className="hc-skeleton hc-skeleton__title" style={{height: '32px', width: '80%', marginBottom: '20px'}} />
            <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '20px', width: '60%', marginBottom: '10px'}} />
            <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '20px', width: '40%', marginBottom: '30px'}} />
            <div className="hc-skeleton hc-skeleton__title" style={{height: '20px', width: '50%', marginBottom: '15px'}} />
            
            <div className="spacer-20"></div>
            
            <div style={{marginBottom: '20px'}}>
              <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '60px', marginBottom: '10px'}} />
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div className="hc-skeleton hc-skeleton__avatar" style={{width: '32px', height: '32px'}} />
                <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '120px'}} />
              </div>
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '70px', marginBottom: '10px'}} />
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div className="hc-skeleton hc-skeleton__avatar" style={{width: '32px', height: '32px'}} />
                <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '120px'}} />
              </div>
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '50px', marginBottom: '10px'}} />
              <div className="hc-skeleton hc-skeleton__title" style={{height: '24px', width: '150px'}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "author-profile") {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          
          {/* Banner skeleton */}
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: '#e9ecef', height: '300px' }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="hc-skeleton hc-skeleton__avatar" style={{width: '120px', height: '120px'}} />
                        <i className="fa fa-check" style={{display: 'none'}}></i>
                        <div className="profile_name">
                          <h4>
                            <div className="hc-skeleton hc-skeleton__title" style={{height: '24px', width: '200px', marginBottom: '8px'}} />
                            <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '150px', marginBottom: '8px'}} />
                            <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '16px', width: '250px'}} />
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="hc-skeleton hc-skeleton__title" style={{height: '20px', width: '100px', marginBottom: '10px'}} />
                        <div className="hc-skeleton hc-skeleton__subtitle" style={{height: '40px', width: '120px', borderRadius: '8px'}} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div style={{padding: '20px 0'}}>
                      <div className="hc-skeleton hc-skeleton__title" style={{height: '24px', width: '150px', marginBottom: '20px'}} />
                      <div className="row">
                        {[...Array(8)].map((_, index) => (
                          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                            <SkeletonCard type="nft" />
                          </div>
                        ))}
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
  }

  return null;
};

export default SkeletonCard;
