import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <div className="col-lg-12">
      <div className="text-center">
        <h2>{title}</h2>
        <div className="small-border bg-color-2"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
