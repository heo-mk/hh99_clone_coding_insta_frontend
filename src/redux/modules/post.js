import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";

// import { actionCreators as imageActions } from "./image";
import _, { create } from "lodash";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";