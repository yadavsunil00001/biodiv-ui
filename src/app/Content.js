import React, {Component} from 'react';
import LeftSidebar from './LeftSidebar';
import MobileLeftSideBar from './LeftSideFIlterPanel';

import ObservationListContainer from '../observation/ObservationListContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Config} from '../Config'
let Footer;
if(Config.api.DEPLOY==="ibp"){
    Footer = require('./footer/Footer').default;
}else{
    Footer = require('./footer/BbpFooter.js').default;
}

class Content extends Component {

    constructor(props){
        super();
        this.state={
          hideSideBar:false
        }
    }
    resize() {
    this.setState({hideSideBar: window.innerWidth <= 760});
}
    componentDidMount(){

      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
    }



    render(){
        return (
                <div>
                    <div className={`col-sm-3 ${this.state.hideSideBar?'hidden':''}`} id="leftSidebarWrapper">
                        <LeftSidebar />
                    </div>
                    <div  className={`${this.state.hideSideBar?'':'hidden'}`}>
                      <MobileLeftSideBar />
                    </div>
                    <div className="col-xs-12 col-sm-9 pull-right contentColumnWrapperBBP" id="contentColumnWrapper" style={{backgroundColor:'#EBEABD',paddingLeft:'0px',paddingRight:'0px',paddingTop:'14px'}}>
                        <div id="contentColumn">
                            <ObservationListContainer />
                            <div id="footerWrapper">
                                <Footer />
                            </div>
                        </div>
                </div>
              </div>
                )
    }
}
 export default Content;
