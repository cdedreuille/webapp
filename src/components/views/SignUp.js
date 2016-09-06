import React, { PropTypes } from 'react'
import { MainView } from '../views/MainView'
import { AppleStore, GooglePlayStore } from '../assets/AppStores'
import RegistrationRequestForm from '../forms/RegistrationRequestForm'
import Cover from '../assets/Cover'
import Credits from '../assets/Credits'

export const SignUp = ({ coverDPI, coverOffset, onClickTrackCredits, promotion }) =>
  <MainView className="Authentication isSignUp">
    <div className="AuthenticationFormDialog">
      <RegistrationRequestForm />
    </div>
    <AppleStore />
    <GooglePlayStore />
    <Credits onClick={onClickTrackCredits} user={promotion} />
    <Cover
      coverDPI={coverDPI}
      coverImage={promotion ? promotion.coverImage : null}
      coverOffset={coverOffset}
      modifiers="isFullScreen hasOverlay"
    />
  </MainView>

SignUp.propTypes = {
  coverDPI: PropTypes.string.isRequired,
  coverOffset: PropTypes.number.isRequired,
  onClickTrackCredits: PropTypes.func.isRequired,
  promotion: PropTypes.object,
}

export default SignUp
