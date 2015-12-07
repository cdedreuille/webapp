import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import * as MAPPING_TYPES from '../../constants/mapping_types'
import { loadUserDetail } from '../../actions/user'
import StreamComponent from '../../components/streams/StreamComponent'

class UserDetail extends Component {
  static propTypes = {
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { params } = this.props
    return (
      <section className="UserDetail Panel">
        <Helmet title={`${params.username}`} />
        <StreamComponent
          ref="streamComponent"
          action={loadUserDetail(`~${params.username}`)}
          initModel={{ collection: MAPPING_TYPES.USERS, findObj: { username: params.username } }} />
      </section>
    )
  }
}

UserDetail.preRender = (store, routerState) => {
  return store.dispatch(loadUserDetail(`~${routerState.params.username}`))
}

export default UserDetail
