import React from 'react';

const ShareButtons = () => {
  return (
    <div className="nft__item_share">
      <h4>Share</h4>
      <button 
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
        className="share-button"
        aria-label="Share on Facebook"
      >
        <i className="fa fa-facebook fa-lg"></i>
      </button>
      <button 
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
        className="share-button"
        aria-label="Share on Twitter"
      >
        <i className="fa fa-twitter fa-lg"></i>
      </button>
      <button 
        onClick={() => window.location.href = `mailto:?subject=Check this out&body=${encodeURIComponent(window.location.href)}`}
        className="share-button"
        aria-label="Share via Email"
      >
        <i className="fa fa-envelope fa-lg"></i>
      </button>
    </div>
  );
};

export default ShareButtons;
