/* eslint-disable max-len */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const AppleStoreLink = ({ to }) =>
  <Link to={to} className="AppleStoreLink">
    <svg width="135" height="40">
      <path fill="black" d="M0 0h135v40h-135z" />
      <path fill="white" d="M30.1 19.9c0-3.2 2.6-4.8 2.8-4.9-1.5-2.2-3.9-2.5-4.7-2.5-2-.2-3.9 1.2-4.9 1.2-1 0-2.6-1.2-4.2-1.1-2.1 0-4.1 1.3-5.2 3.2-2.3 3.9-.6 9.7 1.6 12.9 1.1 1.6 2.4 3.3 4 3.2 1.6-.1 2.2-1 4.2-1 1.9 0 2.5 1 4.2 1 1.7 0 2.8-1.6 3.9-3.1 1.3-1.8 1.8-3.5 1.8-3.6-.1-.2-3.4-1.5-3.5-5.3zM26.9 10.4c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.8 1.9-.8.9-1.5 2.5-1.3 3.9 1.5.2 2.9-.6 3.8-1.7zM53.6 31.6h-2.3l-1.2-3.9h-4.3l-1.2 3.9h-2.2l4.3-13.3h2.6l4.3 13.3zm-3.8-5.6l-1.1-3.5c-.1-.4-.3-1.2-.7-2.5-.1.6-.3 1.4-.6 2.5l-1.2 3.5h3.6zM64.7 26.7c0 1.6-.4 2.9-1.3 3.9-.8.8-1.8 1.3-2.9 1.3-1.3 0-2.2-.5-2.7-1.4v5.1h-2.1v-10.5c0-1 0-2.1-.1-3.2h1.9l.1 1.5c.7-1.1 1.8-1.7 3.2-1.7 1.1 0 2.1.4 2.8 1.3.7 1 1.1 2.2 1.1 3.7zm-2.2 0c0-.9-.2-1.7-.6-2.3-.5-.6-1.1-.9-1.9-.9-.5 0-1 .2-1.4.5-.4.3-.7.8-.8 1.4-.1.3-.1.5-.1.7v1.6c0 .7.2 1.3.6 1.8.4.5 1 .7 1.7.7.8 0 1.4-.3 1.9-.9.4-.7.6-1.5.6-2.6zM75.7 26.7c0 1.6-.4 2.9-1.3 3.9-.8.8-1.8 1.3-2.9 1.3-1.3 0-2.2-.5-2.7-1.4v5.1h-2.1v-10.5c0-1 0-2.1-.1-3.2h1.9l.1 1.5c.7-1.1 1.8-1.7 3.2-1.7 1.1 0 2.1.4 2.8 1.3.7 1 1.1 2.2 1.1 3.7zm-2.2 0c0-.9-.2-1.7-.6-2.3-.5-.6-1.1-.9-1.9-.9-.5 0-1 .2-1.4.5-.4.3-.7.8-.8 1.4-.1.3-.1.5-.1.7v1.6c0 .7.2 1.3.6 1.8.4.5 1 .7 1.7.7.8 0 1.4-.3 1.9-.9.4-.7.6-1.5.6-2.6zM88 27.8c0 1.1-.4 2.1-1.2 2.8-.9.8-2.1 1.2-3.6 1.2-1.4 0-2.6-.3-3.4-.8l.5-1.8c.9.6 2 .8 3.1.8.8 0 1.4-.2 1.9-.5.4-.4.7-.8.7-1.5 0-.5-.2-1-.6-1.4-.4-.4-1-.7-1.8-1-2.3-.9-3.5-2.1-3.5-3.8 0-1.1.4-2 1.2-2.7.8-.7 1.9-1 3.3-1 1.2 0 2.2.2 3 .6l-.6 1.7c-.8-.4-1.6-.6-2.5-.6-.8 0-1.3.2-1.8.6-.4.3-.5.7-.5 1.2s.2 1 .6 1.3c.4.3 1 .7 1.9 1 1.1.5 2 1 2.5 1.6.6.7.8 1.4.8 2.3zM95.1 23.6h-2.3v4.7c0 1.2.4 1.8 1.2 1.8.4 0 .7 0 .9-.1l.1 1.6c-.4.2-1 .2-1.7.2-.8 0-1.5-.3-2-.8s-.7-1.4-.7-2.6v-4.8h-1.4v-1.6h1.4v-1.8l2.1-.6v2.4h2.3v1.6zM105.7 26.7c0 1.5-.4 2.7-1.3 3.6-.9 1-2.1 1.5-3.5 1.5s-2.5-.5-3.4-1.4c-.8-.9-1.3-2.1-1.3-3.5 0-1.5.4-2.7 1.3-3.7.9-.9 2-1.4 3.5-1.4 1.4 0 2.5.5 3.4 1.4.9.9 1.3 2.1 1.3 3.5zm-2.2.1c0-.9-.2-1.6-.6-2.3-.4-.8-1.1-1.1-1.9-1.1-.9 0-1.5.4-2 1.1-.4.6-.6 1.4-.6 2.3 0 .9.2 1.6.6 2.3.5.8 1.1 1.1 1.9 1.1.8 0 1.5-.4 1.9-1.2.5-.6.7-1.3.7-2.2zM112.6 23.9c-.2 0-.4-.1-.7-.1-.8 0-1.3.3-1.7.8-.4.5-.5 1.1-.5 1.9v5h-2.1v-6.6c0-1.1 0-2.1-.1-3h1.9l.1 1.8h.1c.2-.6.6-1.1 1.1-1.5.5-.3 1-.5 1.5-.5h.5v2.2zM122.2 26.3c0 .4 0 .7-.1 1h-6.4c0 .9.3 1.7.9 2.2.5.4 1.2.7 2.1.7.9 0 1.8-.2 2.6-.5l.3 1.5c-.9.4-2 .6-3.2.6-1.5 0-2.7-.4-3.5-1.3-.8-.9-1.3-2-1.3-3.5 0-1.4.4-2.7 1.2-3.6.8-1 1.9-1.5 3.4-1.5 1.4 0 2.4.5 3.1 1.5.6.7.9 1.7.9 2.9zm-2.1-.5c0-.6-.1-1.2-.4-1.6-.4-.6-.9-.9-1.7-.9-.7 0-1.3.3-1.7.9-.4.5-.6 1-.6 1.7h4.4zM49.1 10.1c0 1.2-.4 2.1-1.1 2.7-.7.5-1.6.8-2.8.8-.6 0-1.1 0-1.5-.1v-6.4c.6-.1 1.2-.1 1.8-.1 1.1 0 2 .2 2.6.7.6.5 1 1.3 1 2.4zm-1.2 0c0-.8-.2-1.3-.6-1.8-.4-.4-1-.6-1.8-.6-.3 0-.6 0-.8.1v4.9h.7c.8 0 1.4-.2 1.9-.7.4-.4.6-1 .6-1.9zM54.9 11.1c0 .7-.2 1.3-.6 1.8-.4.5-1 .7-1.7.7s-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8c.4-.5 1-.7 1.7-.7s1.2.2 1.7.7c.4.4.6 1 .6 1.7zm-1.1 0c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.2.3-.6.3-1.1zM62.8 8.8l-1.5 4.7h-1l-.6-2c-.2-.5-.3-1-.4-1.5-.1.5-.2 1-.4 1.5l-.6 2h-1l-1.4-4.7h1.1l.5 2.2.3 1.5c.1-.4.2-.9.4-1.5l.7-2.3h.9l.6 2.2c.2.5.3 1.1.4 1.6.1-.5.2-1 .3-1.6l.6-2.2h1.1zM68.2 13.5h-1v-2.7c0-.8-.3-1.2-1-1.2-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v2.8h-1v-4.7h.9v.7c.1-.2.3-.4.5-.6.3-.2.6-.3 1-.3s.8.1 1.1.4c.4.3.5.9.5 1.6v2.9zM71.1 13.5h-1v-6.9h1v6.9zM77.3 11.1c0 .7-.2 1.3-.6 1.8-.4.5-1 .7-1.7.7s-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8c.4-.5 1-.7 1.7-.7s1.2.2 1.7.7c.4.4.6 1 .6 1.7zm-1.1 0c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.2.3-.6.3-1.1zM82.3 13.5h-.9l-.1-.5c-.3.4-.8.6-1.4.6-.4 0-.8-.1-1.1-.4-.2-.3-.4-.6-.4-1 0-.6.2-1 .7-1.3.5-.3 1.2-.5 2-.4v-.1c0-.6-.3-.9-1-.9-.5 0-.9.1-1.2.3l-.2-.7c.4-.3 1-.4 1.6-.4 1.2 0 1.8.6 1.8 1.9v1.7c.2.6.2.9.2 1.2zm-1.1-1.6v-.7c-1.2 0-1.7.3-1.7 1 0 .2.1.4.2.6.1.1.3.2.5.2s.4-.1.6-.2c.2-.1.3-.3.4-.6v-.3zM88.3 13.5h-.9v-.8c-.3.6-.8.9-1.5.9-.6 0-1-.2-1.4-.7-.4-.4-.6-1-.6-1.7 0-.8.2-1.4.6-1.9.4-.4.9-.7 1.5-.7s1.1.2 1.3.6v-2.6h1v5.6c-.1.5 0 .9 0 1.3zm-1.1-2v-1.1c-.1-.3-.2-.5-.4-.6-.2-.2-.4-.3-.7-.3-.4 0-.7.2-.9.5-.2.3-.3.7-.3 1.2s.1.8.3 1.1c.2.3.5.5.9.5.3 0 .6-.1.8-.4.2-.3.3-.5.3-.9zM97.2 11.1c0 .7-.2 1.3-.6 1.8-.4.5-1 .7-1.7.7s-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8c.4-.5 1-.7 1.7-.7s1.2.2 1.7.7c.4.4.6 1 .6 1.7zm-1 0c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.2.3-.6.3-1.1zM102.9 13.5h-1v-2.7c0-.8-.3-1.2-1-1.2-.3 0-.6.1-.8.3s-.3.5-.3.8v2.8h-1v-4.7h.9v.7c.1-.2.3-.4.5-.6.3-.2.6-.3 1-.3s.8.1 1.1.4c.4.3.5.9.5 1.6v2.9zM109.9 9.6h-1.2v2.3c0 .6.2.9.6.9h.5v.8c-.2.1-.5.1-.8.1-.4 0-.7-.1-1-.4-.2-.3-.3-.7-.3-1.3v-2.4h-.7v-.8h.7v-.9l1-.3v1.2h1.2v.8zM115.5 13.5h-1v-2.7c0-.8-.3-1.3-.9-1.3-.5 0-.8.2-1 .7v3.1999999999999997h-1v-6.8h1v2.8c.3-.5.8-.8 1.4-.8.4 0 .8.1 1.1.4.4.4.5.9.5 1.6v2.9zM121.2 10.9v.5h-3.2c0 .5.2.8.5 1.1.3.2.6.3 1 .3.5 0 .9-.1 1.3-.2l.2.7c-.4.2-1 .3-1.6.3-.7 0-1.3-.2-1.7-.6-.4-.4-.6-1-.6-1.7s.2-1.3.6-1.8c.4-.5 1-.8 1.6-.8.7 0 1.2.3 1.5.8.3.3.4.8.4 1.4zm-1-.2c0-.3-.1-.6-.2-.8-.2-.3-.5-.4-.8-.4-.3 0-.6.1-.8.4-.2.2-.3.5-.3.8h2.1z" />
    </svg>
  </Link>

AppleStoreLink.propTypes = {
  to: PropTypes.string.isRequired,
}

AppleStoreLink.defaultProps = {
  to: 'http://appstore.com/ello/ello',
}

export default AppleStoreLink

