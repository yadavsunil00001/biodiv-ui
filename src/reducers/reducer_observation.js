import {FETCH_OBSERVATION} from '../actions/index';
import {DELETE_OBSERVATION} from '../actions/index';

const DEFAULT_STATE={all:[],count:null}

export default function(state=DEFAULT_STATE,action){

  switch (action.type) {
    case FETCH_OBSERVATION:
     return{
       all:state.all.concat(action.payload.data.model.observationInstanceList),
       count:action.payload.data.model.observationCount
     }
    case DELETE_OBSERVATION:
    return DEFAULT_STATE;

    default:
    return state;

  }
  return DEFAULT_STATE;
}
