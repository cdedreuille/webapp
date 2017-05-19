import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { selectOnboardingCategoriesFiltered } from 'ello-brains/dist/selectors/categories'
import OnboardingCategories from '../components/onboarding/OnboardingCategories'
import { ONBOARDING_VERSION } from '../constants/application_types'
import { getCategories } from '../actions/discover'
import { followCategories, saveProfile, splitFinish } from '../actions/profile'
import { selectUuid } from '../selectors/profile'

const CATEGORIES_NEEDED = 1

function mapStateToProps(state) {
  return {
    categories: selectOnboardingCategoriesFiltered(state),
    uuid: selectUuid(state),
  }
}

function hasSelectedCategoriesNeeded(state) {
  return state.categoryIds.length < CATEGORIES_NEEDED
}

class OnboardingCategoriesContainer extends PureComponent {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
  }

  static childContextTypes = {
    nextLabel: PropTypes.string,
    onNextClick: PropTypes.func.isRequired,
  }

  getChildContext() {
    const { categoryIds } = this.state
    let nextLabel = ''
    if (CATEGORIES_NEEDED > categoryIds.length) {
      nextLabel = `Pick ${CATEGORIES_NEEDED - categoryIds.length}`
    } else {
      nextLabel = 'Create Your Profile'
    }
    return {
      nextLabel,
      onNextClick: this.onNextClick,
    }
  }

  componentWillMount() {
    const { dispatch, uuid } = this.props
    dispatch(getCategories())
    this.state = { categoryIds: [] }
    // Finish the signup page split
    dispatch(splitFinish(uuid, 'signup_page_redesign'))
  }

  onCategoryClick = (id) => {
    const ids = [...this.state.categoryIds]
    const index = ids.indexOf(id)
    if (index === -1) {
      ids.push(id)
    } else {
      ids.splice(index, 1)
    }
    this.setState({ categoryIds: ids })
  }

  onNextClick = () => {
    const { dispatch } = this.props
    const categoryIds = this.state.categoryIds
    dispatch(saveProfile({ web_onboarding_version: ONBOARDING_VERSION }))
    dispatch(followCategories(categoryIds))
    dispatch(push('/onboarding/settings'))
  }

  render() {
    const { categories } = this.props
    const isNextDisabled = hasSelectedCategoriesNeeded(this.state)
    return (
      <OnboardingCategories
        categories={categories}
        isNextDisabled={isNextDisabled}
        onCategoryClick={this.onCategoryClick}
      />
    )
  }
}

export default connect(mapStateToProps)(OnboardingCategoriesContainer)

