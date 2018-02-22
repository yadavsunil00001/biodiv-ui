import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Config } from '../Config';
import {fetchLanguages} from '../actions/index';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';

var Csuggest = []
var Ssuggest = []


class Formsuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cvalue:'',
      Svalue:'',
      Csuggestions: [],
      Ssuggestions: [],
      login_modal:false,
      options:'',
      loading:false
    };
    // this.theme={
    //   input:{
    //     width:'100%'
    //    },
    // suggestionsContainerOpen:{
      //   padding:'2px',
      //   color:'black',
      //   border:'2px solid #D89922',
      //   height:'150px',
      //   overflowY:'scroll',
      //
      // },
      // suggestionHighlighted:{
      //   backgroundColor: '#D5D822'
      // }
    // }
  }

  suggestIdPost(e){

    e.preventDefault();
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var token=localStorage.getItem('token')
    var cName1="cName"+this.props.id2
    var cNameValue=this.refs[cName1].autowhatever.input.defaultValue
    var lang1="lang"+this.props.id2
    var langValue=this.refs[lang1].value
    var sName1="sName"+this.props.id2
    var sNameValue=this.refs[sName1].autowhatever.input.defaultValue
    var recId
    var suggestIdComment1="suggestIdComment"+this.props.id2
    var value1=this.refs[suggestIdComment1].value
    var obvId=this.props.id2

    var options={
      method:'POST',
      url :   Config.api.ROOT_URL+"/observation/addRecommendationVote",
      params:{
        commonName:cNameValue,
        languageName:langValue,
        recoName:sNameValue,

        recoComment:value1,
        obvId:obvId
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    if(cNameValue!=="" || sNameValue!=="")
    {
    axios(options)
        .then((response)=>{
          this.setState({
            loading:false
          })
          document.body.style.cursor = "default";
          if(response.status === 200){
              this.props.getReco(this.props.id2)
          }
        })
        .catch((error)=>{
          this.setState({
            loading:false
          })
          document.body.style.cursor = "default";
          if(error.response.status === 401){
            this.setState({
            login_modal:!(this.state.login_modal),
            options:options
          })
        }else{
          console.log("fofoofof")
        }
        })

    this.setState({
      Cvalue:'',
      Svalue:''
    })
    this.refs[lang1].defaultValue="English";
    this.refs[suggestIdComment1].value="";
  }
  }

 getC_Suggestions =(value,C_Callback) => {

        document.body.style.cursor = "wait";
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       //console.log("got")
       //console.log(inputValue)
        if(inputLength===0){
          C_Callback([])
        }else{
          var options={
            method:'GET',
            url: Config.api.ROOT_URL+"/recommendation/suggest",
            params:{
              term:inputValue,
              nameFilter:"commonNames"
            },
            json:'true'
          }
          axios(options)
              .then((response)=> {
                document.body.style.cursor = "default";
                if(response.status === 200){
                  Csuggest=response.data.model.instanceList
                  const new_suggest=Csuggest.filter(common =>
                  common.value.toLowerCase().slice(0, inputLength) === inputValue)
                     //console.log(new_suggest)
                   C_Callback(new_suggest);
                }
               })
        }
  };


   getS_Suggestions =(value,S_Callback) => {
        //console.log("got_s")
        document.body.style.cursor = "wait";
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if(inputLength===0){
          S_Callback([])
        }else{
          var options={
            method:'GET',
            url: Config.api.ROOT_URL+"/recommendation/suggest",
            params:{
              term:inputValue,
              nameFilter:"scientificNames"
            },
            json:'true'
          }
          axios(options)
              .then((response)=> {
                document.body.style.cursor = "default";
                if(response.status === 200){
                  Ssuggest=response.data.model.instanceList
                  const new1_suggest=Ssuggest.filter(sci =>
                     sci.value.toLowerCase().slice(0, inputLength) === inputValue)
                   S_Callback(new1_suggest);
                }
              })
        }
  };


   getSuggestionValue_C =(suggestion) => {
     if(suggestion.acceptedName !== null){
       this.setState({
         Svalue:suggestion.acceptedName
       })
     }
     return suggestion.value
   } ;

   renderSuggestion_c =(suggestion,{ query, isHighlighted }) => {
     return(
    <div className="row ">
        <div className="col-sm-2" style={{marginTop:'1%'}}>
          <img src={suggestion.icon } width="40" height="40"/>
        </div>
        <div className="col-sm-7 " style={{marginTop:'1%',marginLeft:'5%'}}>
            <div className="row ">
              {suggestion.value}
            </div>
            <div className="row ">
              {"["+suggestion.acceptedName+"]"}
            </div>
        </div>
    </div>
  )
  };

   getSuggestionValue_S =(suggestion) => {
     console.log("selected ^^^^^^^^^^^^^^^^^")
     return suggestion.value
   };

   renderSuggestion_s =(suggestion,{ query, isHighlighted })=> {
     return(
    <div className="row">
        <div className="col-sm-2" style={{marginTop:'1%'}}>
          <img src={suggestion.icon } width="40" height="40"/>
        </div>
        <div className="col-sm-10 " style={{marginTop:'1%'}}>
        {suggestion.value}
        </div>
    </div>
  )
  }


  onChange1 = (event, { newValue })=>  {
    var x=(event.target).getAttribute('id')
    this.setState({
      Cvalue: newValue,
    });
  };

  onChange2 = (event, { newValue })=>  {
    var x=(event.target).getAttribute('id')
    this.setState({
      Svalue: newValue,

    });
  };

  C_Callback = (suggestions)=> {
   this.setState({
     Csuggestions: suggestions

   });
  };

  S_Callback = (suggestions)=>{

   this.setState({
     Ssuggestions: suggestions

   });
   //console.log(this.state.Ssuggestions)
  };

  onSuggestionsFetchRequested_C= ({ value }) => {
   this.getC_Suggestions(value,this.C_Callback);
  };

  onSuggestionsFetchRequested_S =({ value }) => {
     this.getS_Suggestions(value,this.S_Callback);
    };


  onSuggestionsClearRequested =()  =>{
    this.setState({
      Csuggestions: [],
      Ssuggestions: [],
      currentChangedId:''
    });
  };

  render() {

    const  {Cvalue,Svalue,Csuggestions,Ssuggestions}=this.state;

    const inputPropsC = {
      id: "cInput",
      placeholder: 'Suggest a common name',
      value: Cvalue,
      onChange: this.onChange1,

    };

    const inputPropsS = {
      id: "sInput",
      placeholder: 'Suggest a scientific name',
      value:Svalue,
      onChange: this.onChange2
    };


    return (
      <div>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.props.getReco} id={this.props.id2}/>):null}
      <form  className="form-horizontal" onSubmit={this.suggestIdPost.bind(this)} >
          <div className="form-group row" style={{marginBottom:'0.3%'}}>
            <label className="control-label col-sm-2" htmlFor="email">Common name:</label>
            <div className="col-sm-8">
                <Autosuggest
                  id="cInput"
                  theme={this.theme}
                  ref={"cName"+this.props.id2}
                  suggestions={Csuggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested_C}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue_C}
                  renderSuggestion={this.renderSuggestion_c}
                  inputProps={inputPropsC}
                />
             </div>
             <div className="col-sm-2 ">
                   <input  type="text" list="browsers" defaultValue="English" ref={"lang"+this.props.id2} style={{width:'97%',borderRadius:'6px'}}/>
                   <datalist id="browsers" dir={"rtl"} style={{wordWrap:'break-word',maxWidth:'10px',fontSize:'5px'}}>
                   {
                         this.props.Languages?(
                         this.props.Languages.map((item,index)=>{
                           return(
                           <option key={index} value={item} style={{fontColor:'green'}}/>
                         )
                         }
                       )
                     ):null


                  }
                   </datalist>
             </div>
          </div>
          <div className="form-group row" style={{marginBottom:'0.3%'}}>
            <label className="control-label col-sm-2" htmlFor="email">Scientific name:</label>
            <div className="col-sm-8">
                  <Autosuggest
                    id="sInput"
                    theme={this.theme}
                    ref={"sName"+this.props.id2}
                    suggestions={Ssuggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested_S}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue_S}
                    renderSuggestion={this.renderSuggestion_s}
                    inputProps={inputPropsS}
                  />
            </div>
          </div>
          <div className="form-group row" style={{marginBottom:'0.1%'}}>
              <label className="control-label col-sm-2" htmlFor="comments">Comments:</label>
              <div className="col-sm-8">
                  <input type="text"  id="comments" placeholder="Write Comments on species call" ref={"suggestIdComment"+this.props.id2} style={{width:'100%',borderRadius:'6px'}}/>
              </div>
              <div className="col-sm-2">
                <input  type="submit" value="Add" className="btn btn-default btn-sm"  disabled={this.state.loading}/>
              </div>
          </div>
      </form>
      </div>
    );
  }
}

function mapStateToProps(state){
return {Languages:state.Languages,authenticated: state.auth.authenticated};
}

function mapDispatchToProps(dispatch){

return bindActionCreators({fetchLanguages},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(Formsuggest);
