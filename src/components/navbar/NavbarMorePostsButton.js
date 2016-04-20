import React, { PropTypes } from 'react'
import { ArrowIcon } from '../navbar/NavbarIcons'

export const NavbarMorePostsButton = ({ onClick }) =>
  <button onClick={ onClick } className="NavbarMorePostsButton">
    <ArrowIcon />
    <span>New Posts</span>
  </button>

NavbarMorePostsButton.propTypes = {
  onClick: PropTypes.func,
}

