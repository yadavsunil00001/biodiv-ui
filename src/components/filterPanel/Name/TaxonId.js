import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import 'rc-checkbox/assets/index.css';

class TaxonIdsFilter extends React.Component {
  constructor(){
    super();
    this.state={
      TaxonId:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.taxonId) {
       data= newparams.taxonId.split(",");
    }else{
      data=[];
    }
    this.setState({
      TaxonId:data
    })
  }
  componentDidMount(){
    this.setParameter();
  }
  handleCheckboxes(event){
    let TaxonId=this.state.TaxonId;
    if(event.target.checked){
      TaxonId.push(event.target.value);
      let set=new Set(TaxonId);
      TaxonId=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(TaxonId);
      set.delete(event.target.value);
      TaxonId=Array.from(set);
      set.clear();
    }
    this.setState({
      TaxonId
    })

       let events = new CustomEvent("taxonId-filter",{ "detail":{
           taxonId:TaxonId
       }
       });
       document.dispatchEvent(events);
         event.preventDefault();
  }

  render() {
    return (
      <div>
        {this.props.stat && <><div>
            <Checkbox
                checked={ this.state.TaxonId.includes("1")?true:false }
                value={"1"}
                onChange={this.handleCheckboxes.bind(this)}
            /> {this.props.LocaleData['filter.name.taxonId.hasTaxonId']} <span className="filter--counter">{this.props.stat["available"]}</span>
        </div>
        <div>
            <Checkbox
                checked={ this.state.TaxonId.includes("0")?true:false }
                value={"0"}
                onChange={this.handleCheckboxes.bind(this)}
            /> {this.props.LocaleData['filter.name.taxonId.noTaxonId']} <span className="filter--counter">{this.props.stat["missing"]}</span>
        </div></>}
      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    stat: state.Observation.stats
      ? state.Observation.stats.groupTaxonIDExists
      : null,
    LocaleData:state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(TaxonIdsFilter));
