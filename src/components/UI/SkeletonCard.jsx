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

  return null;
};

export default SkeletonCard;
