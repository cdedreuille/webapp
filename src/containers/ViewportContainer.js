import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux'
import { setNavbarState, setViewportSizeAttributes } from '../actions/gui'
import { addScrollObject, removeScrollObject } from '../components/interface/ScrollComponent'
import { addResizeObject, removeResizeObject } from '../components/interface/ResizeComponent'
import { Viewport } from '../components/viewport/Viewport'
import { scrollToTop } from '../components/interface/Viewport'

class ViewportContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isNavbarFixed: PropTypes.bool.isRequired,
    isNavbarHidden: PropTypes.bool.isRequired,
    isNavbarSkippingTransition: PropTypes.bool.isRequired,
    isNotificationsActive: PropTypes.bool.isRequired,
    isOffsetLayout: PropTypes.bool.isRequired,
    isProfileMenuActive: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.scrollYAtDirectionChange = null
  }

  componentDidMount() {
    const { isOffsetLayout } = this.props
    addResizeObject(this)
    addScrollObject(this)
    scrollToTop({ isOffsetLayout })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    removeResizeObject(this)
    removeScrollObject(this)
  }

  onResize(resizeAttributes) {
    this.props.dispatch(setViewportSizeAttributes(resizeAttributes))
  }

  onScrollTop() {
    const { dispatch, isNavbarFixed } = this.props
    if (isNavbarFixed) {
      dispatch(setNavbarState({
        isFixed: false,
        isHidden: false,
        isSkippingTransition: false,
      }))
    }
  }

  onScrollDirectionChange(scrollProperties) {
    const { scrollY } = scrollProperties
    if (scrollY >= this.props.offset) {
      this.scrollYAtDirectionChange = scrollY
    }
  }

  onScroll(scrollProperties) {
    const { scrollY, scrollDirection } = scrollProperties
    const { dispatch, isNavbarFixed, isNavbarHidden, isNavbarSkippingTransition } = this.props
    let nextIsFixed = isNavbarFixed
    let nextIsHidden = isNavbarHidden
    let nextIsSkippingTransition = isNavbarSkippingTransition

    // Going from absolute to fixed positioning
    if (scrollY >= this.props.offset && !isNavbarFixed) {
      nextIsFixed = true
      nextIsHidden = true
      nextIsSkippingTransition = true
    }

    // Scroll just changed directions so it's about to either be shown or hidden
    if (scrollY >= this.props.offset && this.scrollYAtDirectionChange) {
      const distance = Math.abs(scrollY - this.scrollYAtDirectionChange)
      const delay = scrollDirection === 'down' ? 20 : 80
      const isScrollingDown = scrollDirection === 'down'

      if (distance >= delay) {
        nextIsHidden = isScrollingDown
        nextIsSkippingTransition = false
        this.scrollYAtDirectionChange = null
      }
    }
    if (isNavbarFixed !== nextIsFixed || isNavbarHidden !== nextIsHidden ||
        isNavbarSkippingTransition !== nextIsSkippingTransition) {
      dispatch(setNavbarState({
        isFixed: nextIsFixed,
        isHidden: nextIsHidden,
        isSkippingTransition: nextIsSkippingTransition,
      }))
    }
  }

  // Add the viewport component then things like scrolling,
  // resizing, etc.
  render() {
    return <Viewport { ...this.props } />
  }

}

const mapStateToProps = (state) => {
  const { gui, modal, routing } = state
  return {
    offset: gui.coverOffset ? gui.coverOffset - 80 : 160,
    isNavbarFixed: gui.isNavbarFixed,
    isNavbarHidden: gui.isNavbarHidden,
    isNavbarSkippingTransition: gui.isNavbarSkippingTransition,
    isNotificationsActive: modal.isNotificationsActive,
    isOffsetLayout: gui.isOffsetLayout,
    isProfileMenuActive: gui.isProfileMenuActive,
    pathname: routing.location.pathname,
  }
}

export default connect(mapStateToProps)(ViewportContainer)

