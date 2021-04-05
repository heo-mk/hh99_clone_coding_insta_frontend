import {createAction, handleActions} from "redux-actions";
import produce from "immer"


const SET_PREVIEW = "SET_PREVIEW";
const PROFILE_PREVIEW = "PROFILE_PREVIEW"

const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}))
const profilePreview = createAction(PROFILE_PREVIEW, (profile_preview) => ({profile_preview}))

const initialState = {
  preview: null,
  profile_preview: null,
}

export default handleActions({
  [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
    console.log(action.payload.preview)
    draft.preview = action.payload.preview;
  }),
  [PROFILE_PREVIEW]: (state, action) => produce(state, (draft) => {
    draft.profile_preview = action.payload.profile_preview;
  }),

}, initialState);

const actionCreators = {
  setPreview,
  profilePreview,
}

export {actionCreators}


