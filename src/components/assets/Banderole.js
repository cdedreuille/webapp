import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import random from 'lodash.random'
import { addResizeObject, removeResizeObject } from '../interface/ResizeComponent'
import Credits from '../assets/Credits'

const STATUS = {
  PENDING: 'isPending',
  REQUEST: 'isRequesting',
  SUCCESS: null,
  FAILURE: 'isFailing',
}

class Banderole extends Component {
  static propTypes = {
    creditsClickAction: PropTypes.func,
    userlist: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      featuredUser: null,
      imageSize: 'hdpi',
      status: STATUS.PENDING,
    }
  }

  componentWillMount() {
    const { userlist } = this.props
    const index = random(0, userlist.length - 1)
    this.setState({ featuredUser: userlist[index], status: STATUS.REQUEST })
  }

  componentDidMount() {
    addResizeObject(this)
    if (this.state.status === STATUS.REQUEST) {
      this.createLoader()
    }
  }

  componentWillUnmount() {
    removeResizeObject(this)
    this.disposeLoader()
  }

  onResize(resizeProperties) {
    const { coverImageSize } = resizeProperties
    this.setState({ imageSize: coverImageSize })
  }

  getCoverSource() {
    const { featuredUser, imageSize } = this.state
    if (!featuredUser) { return null }
    const { coverImage } = featuredUser
    return coverImage[imageSize].url
  }

  createLoader() {
    const src = this.getCoverSource()
    this.disposeLoader()
    if (src) {
      this.img = new Image()
      this.img.onload = ::this.loadDidSucceed
      this.img.onerror = ::this.loadDidFail
      this.img.src = src
    }
  }

  disposeLoader() {
    if (this.img) {
      this.img.onload = null
      this.img.onerror = null
      this.img = null
    }
  }

  loadDidSucceed() {
    this.disposeLoader()
    this.setState({ status: STATUS.SUCCESS })
  }

  loadDidFail() {
    this.disposeLoader()
    this.setState({ status: STATUS.FAILURE })
  }

  render() {
    const { featuredUser, status } = this.state
    const { creditsClickAction } = this.props
    if (!featuredUser) { return null }
    const { caption } = featuredUser
    const src = this.getCoverSource()
    const klassNames = classNames('Banderole', status)
    const style = src ? { backgroundImage: `url(${src})` } : null

    return (
      <div className={klassNames}>
        <figure className="BanderoleImage" style={style} />
        <div className="BanderoleCaption">
          { caption }
          <Link to="https://ello.co/wtf/about/what-is-ello/" target="_blank">Learn More</Link>
        </div>
        <Credits clickAction={creditsClickAction} user={featuredUser} />
      </div>
    )
  }
}

export default Banderole

