import React, { ReactNode } from "react";
import PropTypes from 'prop-types';
import Image from 'next/image'
//* component wrapper and header profile wrapper


export const ProfileHeaderWrapper= ({
  children,
  coverUrl,
  ...props
}) => {
  return (
    <div className="bg-primary-800 rounded-8 relative" {...props}>
      <img
        alt="cover"
        src={coverUrl}
        className="rounded-t-8 w-full object-cover"
        style={{ height: "60px" }}
      />
      <div className="container mx-auto sm:flex p-4 relative">{children}</div>
    </div>
  );
};




ProfileHeaderWrapper.propTypes  ={
  children:PropTypes.ReactNode,
  coverUrl:PropTypes.string.isRequired
}