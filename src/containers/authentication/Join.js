/* eslint-disable max-len */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { random } from 'lodash'
import { FORM_CONTROL_STATUS as STATUS } from '../../constants/gui_types'
import { AUTHENTICATION_PROMOTIONS } from '../../constants/promotions/authentication'
import { checkAvailability } from '../../actions/profile'
import { trackEvent } from '../../actions/tracking'
import Cover from '../../components/assets/Cover'
import Credits from '../../components/assets/Credits'
import Emoji from '../../components/assets/Emoji'
import EmailControl from '../../components/forms/EmailControl'
import FormButton from '../../components/forms/FormButton'
import PasswordControl from '../../components/forms/PasswordControl'
import UsernameControl from '../../components/forms/UsernameControl'
import {
  isFormValid,
  getUsernameStateFromClient,
  getUsernameStateFromServer,
  getEmailStateFromClient,
  getEmailStateFromServer,
  getPasswordState,
} from '../../components/forms/Validators'
import AppleStoreLink from '../../components/support/AppleStoreLink'

class Join extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const userlist = AUTHENTICATION_PROMOTIONS
    const index = random(0, userlist.length - 1)
    this.state = {
      featuredUser: userlist[index],
      emailState: { status: STATUS.INDETERMINATE, message: '' },
      passwordState: { status: STATUS.INDETERMINATE, message: '' },
      usernameState: { status: STATUS.INDETERMINATE, suggestions: null, message: '' },
    }
    this.emailValue = ''
    this.usernameValue = ''
    this.passwordValue = ''
    this.checkServerForAvailability = debounce(this.checkServerForAvailability, 300)
  }

  componentWillReceiveProps(nextProps) {
    const { availability } = nextProps
    if (!availability) {
      return
    }
    if (availability.hasOwnProperty('username')) {
      this.validateUsernameResponse(availability)
    }
    if (availability.hasOwnProperty('email')) {
      this.validateEmailResponse(availability)
    }
  }

  onChangeUsernameControl = ({ username }) => {
    this.usernameValue = username
    const { usernameState } = this.state
    const currentStatus = usernameState.status
    const currentMessage = usernameState.message
    const clientState = getUsernameStateFromClient({ value: username, currentStatus })

    if (clientState.status === STATUS.SUCCESS) {
      if (currentStatus !== STATUS.REQUEST) {
        this.setState({ usernameState: { status: STATUS.REQUEST, message: 'checking...' } })
      }
      // This will end up landing on `validateUsernameResponse` after fetching
      return this.checkServerForAvailability({ username })
    }
    if (clientState.status !== currentStatus && clientState.message !== currentMessage) {
      this.setState({ usernameState: clientState })
    }
  };

  onChangeEmailControl = ({ email }) => {
    this.emailValue = email
    const { emailState } = this.state
    const currentStatus = emailState.status
    const clientState = getEmailStateFromClient({ value: email, currentStatus })
    if (clientState.status === STATUS.SUCCESS) {
      if (currentStatus !== STATUS.REQUEST) {
        this.setState({ emailState: { status: STATUS.REQUEST, message: 'checking...' } })
      }
      // This will end up landing on `validateEmailResponse` after fetching
      return this.checkServerForAvailability({ email })
    }
    if (clientState.status !== currentStatus) {
      this.setState({ emailState: clientState })
    }
  };

  onChangePasswordControl = ({ password }) => {
    this.passwordValue = password
    const { passwordState } = this.state
    const currentStatus = passwordState.status
    const newState = getPasswordState({ value: password, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ passwordState: newState })
    }
  };

  // TODO: Still needs to be hooked up
  onSubmit = (e) => {
    e.preventDefault()
    // const { dispatch } = this.props
    // dispatch(someActionFunction(this.emailValue, this.usernameValue, this.passwordValue))
  };

  onClickTrackCredits = () => {
    const { dispatch } = this.props
    dispatch(trackEvent('authentication-credits-clicked'))
  };

  checkServerForAvailability(vo) {
    return this.props.dispatch(checkAvailability(vo))
  }

  validateUsernameResponse(availability) {
    const { usernameState } = this.state
    const currentStatus = usernameState.status
    const newState = getUsernameStateFromServer({ availability, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ usernameState: newState })
    }
  }

  validateEmailResponse(availability) {
    const { emailState } = this.state
    const currentStatus = emailState.status
    const newState = getEmailStateFromServer({ availability, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ emailState: newState })
    }
  }

  render() {
    const { emailState, usernameState, passwordState, featuredUser } = this.state
    const isValid = isFormValid([emailState, usernameState, passwordState])
    const boxControlClassNames = 'asBoxControl'
    return (
      <section className="Authentication Panel">
        <div className="AuthenticationFormDialog">
          <h1>
            <Emoji name="muscle" title="Welcome!" size={ 32 } />
            Be inspired.
          </h1>

          <form
            className="AuthenticationForm"
            id="RegistrationForm"
            noValidate="novalidate"
            onSubmit={ this.onSubmit }
            role="form"
          >
            <EmailControl
              classList={ boxControlClassNames }
              label={`Email ${emailState.message}`}
              onChange={ this.onChangeEmailControl }
              status={ emailState.status }
              tabIndex="1"
            />
            <UsernameControl
              classList={ boxControlClassNames }
              label={`Username ${usernameState.message}`}
              onChange={ this.onChangeUsernameControl }
              placeholder="Create your username"
              status={ usernameState.status }
              suggestions={ usernameState.suggestions }
              tabIndex="2"
            />
            <PasswordControl
              classList={ boxControlClassNames }
              label={`Password ${passwordState.message}`}
              onChange={ this.onChangePasswordControl }
              placeholder="Set your password"
              status={ passwordState.status }
              tabIndex="3"
            />
            <FormButton tabIndex="4" disabled={!isValid}>Create Account</FormButton>
          </form>
          <p className="AuthenticationTermsCopy">
            By clicking Create Account you are agreeing to our <a href="https://ello.co/wtf/post/policies">Terms</a>.
          </p>
        </div>
        <AppleStoreLink />
        <Credits onClick={ this.onClickTrackCredits } user={ featuredUser } />
        <Cover coverImage={ featuredUser.coverImage } modifiers="asFullScreen withOverlay" />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    availability: state.profile.availability,
  }
}

export default connect(mapStateToProps)(Join)

