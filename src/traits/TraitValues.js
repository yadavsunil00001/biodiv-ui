import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import 'rc-checkbox/assets/index.css';

import {getTraitValues} from './TraitsApiCall';
import SingleMultiple from './SingleMultiple';
import Range from './Range';
import ColorTrait from './ColorTrait';
import DateTrait from './DateTrait';

class TraitValue extends Component{


showFilter(traitId,traitType,traitDataType){

  if(traitType=='SINGLE_CATEGORICAL' || traitType=='MULTIPLE_CATEGORICAL'){
    if(traitType=='MULTIPLE_CATEGORICAL' && traitDataType=='COLOR'){
      return <ColorTrait passToTraitValues={this.props.passToTraitValues} traitId={traitId} />
    }
    else{
      return <SingleMultiple  passToTraitValues={this.props.passToTraitValues} traitId={traitId} traitStat={this.props.traitStat} />
    }
  }
  else{
    if(traitType=='RANGE' && traitDataType=='NUMERIC'){
    return  <Range passToTraitValues={this.props.passToTraitValues} traitId={traitId} />
        }
    else{
      return <DateTrait passToTraitValues={this.props.passToTraitValues} traitId={traitId} />
    }
  }
}
  render(){
    let {traitId,traitType,traitDataType,traitName}=this.props;
    return(
      <div>
      {this.showFilter(traitId,traitType,traitDataType)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Locale:state.Locale
  }
}
export default withRouter(connect(mapStateToProps,null)(TraitValue ));
