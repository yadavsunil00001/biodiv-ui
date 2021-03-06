import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import 'rc-checkbox/assets/index.css';
import StatCounter from '../counter';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      speciesName:[]
    }
  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.speciesName) {
      data = newparams.speciesName.split(",");
    }
    else{
      data=[];
    }
    this.setState({
      speciesName:data
    })
  }
  componentDidMount(){
    this.setParameter();

  }

handleCheckboxes(event){
  let speciesName=this.state.speciesName;
  if(event.target.checked){
    speciesName.push(event.target.value);
    let set=new Set(speciesName);
    speciesName=Array.from(set);
    set.clear();
  }
  else{
    let set =new Set(speciesName);
    set.delete(event.target.value);
    speciesName=Array.from(set);
    set.clear();
  }
  this.setState({
    speciesName
  })

     let events = new CustomEvent("speciesName-filter",{ "detail":{
         SpeciesName:speciesName
     }
     });
     document.dispatchEvent(events);
       event.preventDefault();
  }

  render(){
    return(
      <div>
        {this.props.stat && <>
          <div>
              <Checkbox
                  value={"UNIDENTIFED"}
                  checked={ this.state.speciesName.includes("UNIDENTIFED")?true:false }
                  onChange={this.handleCheckboxes.bind(this)}
              />{this.props.LocaleData['filter.dataQuality.identification.unIdentified']} <StatCounter stat={this.props.stat} keyName="missing" />
          </div>
          <div>
              <Checkbox
                  value={"IDENTIFED"}
                  checked={ this.state.speciesName.includes("IDENTIFED")?true:false }
                  onChange={this.handleCheckboxes.bind(this)}
              />{this.props.LocaleData['filter.dataQuality.identification.identified']} <StatCounter stat={this.props.stat} keyName="available" />
          </div>
        </>}
      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    stat: state.Observation.stats
      ? state.Observation.stats.groupIdentificationNameExists
      : null,
    LocaleData:state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(SpeciesNameFilter));
