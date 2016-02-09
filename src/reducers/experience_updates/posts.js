/* eslint-disable no-param-reassign */
import * as ACTION_TYPES from '../../constants/action_types'
import * as MAPPING_TYPES from '../../constants/mapping_types'
// import * as RELATIONSHIP_PRIORITY from '../../constants/relationship_types'
import { methods as jsonMethods } from '../json'

const methods = {}

function updatePostLoves(state, newState, action) {
  const { method, model } = action.payload
  let delta = 0
  let loved = false
  switch (action.type) {
    case ACTION_TYPES.POST.LOVE_REQUEST:
      if (method === 'DELETE') {
        delta = -1
        loved = false
      } else {
        delta = 1
        loved = true
      }
      break
    case ACTION_TYPES.POST.LOVE_FAILURE:
      if (method === 'POST') {
        delta = -1
        loved = false
      } else {
        delta = 1
        loved = true
      }
      break
    default:
      return state
  }
  jsonMethods.mergeModel(
    newState,
    MAPPING_TYPES.POSTS,
    {
      id: model.id,
      lovesCount: Number(model.lovesCount) + delta,
      loved,
    }
  )
  return newState
}
methods.updatePostLoves = (state, newState, action) =>
  updatePostLoves(state, newState, action)


function addNewPost(newState, action) {
  const { response } = action.payload
  newState[MAPPING_TYPES.POSTS][response.id] = response
  if (newState.pages['/following']) {
    newState.pages['/following'].ids.unshift(response.id)
  }
  // TODO: hook this up once following/followers/loves is merged
  // for (const user of newState[MAPPING_TYPES.USERS]) {
  //   if (user.relationshipPriority === RELATIONSHIP_PRIORITY.SELF &&
  //       newState.pages[`/${user.username}`]) {
  //     newState.pages[`/${user.username}`].unshift(response.id)
  //   }
  // }
  return newState
}
methods.addNewPost = (newState, action) =>
  addNewPost(newState, action)

export default methods

