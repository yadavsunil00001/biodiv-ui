import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Config} from '../../Config';
import createHistory from 'history/createBrowserHistory';
import style from './style.css';

export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            resource:[]
        };
    }
    getUrl(thumbnail,speciesGroup){

      let group=speciesGroup.toLowerCase();
      let groupIcon=null;
      if(group=="bird"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/birds_th1.png';
      }
      if(group=="fish"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/fish_th1.png';
      }
      if(group=="fungi"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/fungi_th1.png';
      }
      if(group=="mammals"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/mammals_th1.png';
      }
      if(group=="all"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/all_th1.png';
      }
      if(group=="amphibians"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/amphibians_th1.png';
      }
      if(group=="reptiles"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/reptiles_th1.png';
      }
      if(group=="molluscs"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/molluscs_th1.png';
      }
      if(group=="arthropods"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/arthropods_th1.png';
      }
      if(group=="plants"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/plants_th1.png';
      }
      if(group=="others"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/others_th1.png';
      }
      if(group=="birds"){
        groupIcon='http://indiabiodiversity.org/biodiv/group_icons/speciesGroups/birds_th1.png';
      }

      let res = thumbnail?thumbnail.split("."):groupIcon;
      if(res){
        if(thumbnail!="v"){
          if(res[1]=="mp3" || res[1]=="wav"){
            return `http://indiabiodiversity.org/biodiv/assets/all/audioicon.png`;
          }else{
            return `http://indiabiodiversity.org/biodiv/observations/`+res[0]+"_th1.jpg"
          }
        }
        else{
          //for youtube video thumbnail
              if(res=="v"){
                    let url = this.props.videos[0];
                    let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    if(videoid != null) {
                      let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
                      return imageUrl
                    }

              }
        }
      }
      else {
        return null
      }
    }
    render() {
      let images=[];
      this.props.images?this.props.images.map((data)=>{
        if(data=='v'){
        }
        else if(data.split(".")[1]==="mp3" || data.split(".")[1]==="wav" ){
          images.push("http://indiabiodiversity.org/biodiv/assets/all/audioicon.png")
        }
        else{
          data="http://indiabiodiversity.org/biodiv/observations/"+data;
           images.push(data);
        }

      }):null;
      this.props.videos?this.props.videos.map((data)=>{
          let url = data;
          let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          if(videoid != null) {
            let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
            images.push(imageUrl);

          } 
      }):null;
      const {photoIndex,isOpen} = this.state;
        return (
            <div>

              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                        <NavLink to={`show/${this.props.objs.id}`} >
                    <img src={this.getUrl(this.props.thumbnail,this.props.speciesgroupname)} style={{height:'200px',width:'200px',borderRadius: '5px'}} className="media-object img-responsive img-rounded" />
                     </NavLink>
                    <div className="carousel-caption" >
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                         {"           "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofaudio}  <i className="fa fa-file-audio-o" aria-hidden="true"></i></strong>
                         {"        "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofvideos}  <i className="fa fa-video-camera" aria-hidden="true"></i></strong>
                    </div>
                    {isOpen &&
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}
                        />
                    }
                  </div>
                </div>
              </div>

            </div>
        );
    }
}
