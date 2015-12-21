import React, { Component } from 'react'
import { Link } from 'react-router'
import { ElloMark, ElloRainbowMark, ElloDonutMark } from '../interface/ElloIcons'

class NavbarMark extends Component {
  renderMark() {
    switch (ENV.LOGO_MARK) {
      case 'rainbow':
        return <ElloRainbowMark />
      case 'donut':
        return <ElloDonutMark />
      case 'none':
        return null
      case 'normal':
      default:
        return <ElloMark />
    }
  }

  render() {
    return (
      <Link className="NavbarMark" to="/explore">
        { this.renderMark() }
      </Link>
    )
  }
}

export default NavbarMark

