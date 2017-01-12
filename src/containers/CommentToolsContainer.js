import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ACTION_TYPES from '../constants/action_types'
import { selectIsLoggedIn } from '../selectors/authentication'
import { selectIsOwnComment } from '../selectors/comment'
import { selectDeviceSize, selectIsNavbarHidden } from '../selectors/gui'
import { selectIsOwnPost } from '../selectors/post'
import * as commentActions from '../actions/comments'
import { openModal, closeModal } from '../actions/modals'
import ConfirmDialog from '../components/dialogs/ConfirmDialog'
import FlagDialog from '../components/dialogs/FlagDialog'
import { getEditorId } from '../components/editor/Editor'
import { scrollToLastTextBlock } from '../lib/jello'
import { CommentTools } from '../components/comments/CommentTools'


export function mapStateToProps(state, props) {
  const { comment, post } = props
  const isOwnComment = selectIsOwnComment(state, props)
  const isOwnPost = selectIsOwnPost(state, props)
  let canDeleteComment = isOwnPost
  if (post.get('repostId')) {
    canDeleteComment = isOwnPost && comment.get('originalPostId') === post.get('id')
  }
  return {
    canDeleteComment,
    deviceSize: selectDeviceSize(state),
    isLoggedIn: selectIsLoggedIn(state),
    isNavbarHidden: selectIsNavbarHidden(state),
    isOwnComment,
  }
}

class CommentToolsContainer extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    deviceSize: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isNavbarHidden: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.state = {
      isMoreToolActive: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.comment, this.props.comment) ||
      !Immutable.is(nextProps.post, this.props.post) ||
      ['deviceSize'].some(prop => nextProps[prop] !== this.props[prop]) ||
      ['isMoreToolActive'].some(prop => nextState[prop] !== this.state[prop])
  }

  onClickMoreTool = () => {
    this.setState({ isMoreToolActive: !this.state.isMoreToolActive })
  }

  onClickReplyToComment = () => {
    const { author, dispatch, isNavbarHidden, post } = this.props
    const editorId = getEditorId(post, null, true, false)
    dispatch({
      type: ACTION_TYPES.EDITOR.APPEND_TEXT,
      payload: {
        editorId,
        text: `@${author.get('username')} `,
      },
    })
    scrollToLastTextBlock(editorId, isNavbarHidden)
  }

  onClickEditComment = () => {
    const { comment, dispatch } = this.props
    dispatch(commentActions.toggleEditing(comment, true))
    dispatch(commentActions.loadEditableComment(comment))
  }

  onClickFlagComment = () => {
    const { deviceSize, dispatch } = this.props
    dispatch(openModal(
      <FlagDialog
        deviceSize={deviceSize}
        onResponse={this.onCommentWasFlagged}
        onConfirm={this.onCloseModal}
      />))
  }

  onCommentWasFlagged = ({ flag }) => {
    const { dispatch, comment } = this.props
    dispatch(commentActions.flagComment(comment, flag))
  }

  onClickDeleteComment = () => {
    const { dispatch } = this.props
    dispatch(openModal(
      <ConfirmDialog
        title="Delete Comment?"
        onConfirm={this.onConfirmDeleteComment}
        onDismiss={this.onCloseModal}
      />))
  }

  onCloseModal = () => {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  onConfirmDeleteComment = () => {
    const { comment, dispatch } = this.props
    this.onCloseModal()
    dispatch(commentActions.deleteComment(comment))
  }

  render() {
    const toolProps = {
      ...this.props,
      isMoreToolActive: this.state.isMoreToolActive,
      onClickDeleteComment: this.onClickDeleteComment,
      onClickEditComment: this.onClickEditComment,
      onClickFlagComment: this.onClickFlagComment,
      onClickMoreTool: this.onClickMoreTool,
      onClickReplyToComment: this.onClickReplyToComment,
    }
    return <CommentTools {...toolProps} />
  }

}

export default connect(mapStateToProps)(CommentToolsContainer)

