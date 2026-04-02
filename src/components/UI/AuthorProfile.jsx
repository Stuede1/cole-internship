import React from 'react';
import { Link } from 'react-router-dom';

const AuthorProfile = ({ 
  authorImage, 
  authorName, 
  authorId, 
  size = "normal" 
}) => {
  return (
    <div className="author_list_pp">
      <Link to={`/author/${authorId}`}>
        <img className="lazy" src={authorImage} alt={authorName} />
        <i className="fa fa-check"></i>
      </Link>
    </div>
  );
};

export default AuthorProfile;
