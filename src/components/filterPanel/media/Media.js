import React from "react";
import Checkbox from "rc-checkbox";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "rc-checkbox/assets/index.css";

class MediaFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      mediaFilter: []
    };
  }
  setParameter() {
    const newparams = queryString.parse(document.location.search);
    let data = [];
    if (newparams.mediaFilter) {
      data = newparams.mediaFilter.split(",");
    } else {
      data = [];
    }
    this.setState({
      mediaFilter: data
    });
  }
  componentDidMount() {
    this.setParameter();
  }
  handleCheckboxes(event) {
    let mediaFilter = this.state.mediaFilter;
    if (event.target.checked) {
      mediaFilter.push(event.target.value);
      let set = new Set(mediaFilter);
      mediaFilter = Array.from(set);
      set.clear();
    } else {
      let set = new Set(mediaFilter);
      set.delete(event.target.value);
      mediaFilter = Array.from(set);
      set.clear();
    }
    this.setState({
      mediaFilter
    });

    let events = new CustomEvent("media-filter", {
      detail: {
        MediaFilter: mediaFilter
      }
    });
    document.dispatchEvent(events);
    event.preventDefault();
  }

  render() {
    return (
      this.props.stat && (
        <div>
          <div>
            <Checkbox
              value={"noofaudio"}
              checked={
                this.state.mediaFilter.includes("noofaudio") ? true : false
              }
              onChange={this.handleCheckboxes.bind(this)}
            />{" "}
            {this.props.LocaleData["filter.mediaType.audio"]} <span className="filter--counter">
            {this.props.stat.groupAudio}</span>
          </div>
          <div>
            <Checkbox
              checked={
                this.state.mediaFilter.includes("noofvideos") ? true : false
              }
              value={"noofvideos"}
              onChange={this.handleCheckboxes.bind(this)}
            />{" "}
            {this.props.LocaleData["filter.mediaType.video"]} <span className="filter--counter">
            {this.props.stat.groupVideo}</span>
          </div>
          <div>
            <Checkbox
              checked={
                this.state.mediaFilter.includes("noofimages") ? true : false
              }
              value={"noofimages"}
              onChange={this.handleCheckboxes.bind(this)}
            />{" "}
            {this.props.LocaleData["filter.mediaType.images"]} <span className="filter--counter">
            {this.props.stat.groupImages}</span>
          </div>
          <div>
            <Checkbox
              checked={
                this.state.mediaFilter.includes("nomedia") ? true : false
              }
              value={"nomedia"}
              onChange={this.handleCheckboxes.bind(this)}
            />{" "}
            {this.props.LocaleData["filter.mediaType.noMedia"]} <span className="filter--counter">
            {this.props.stat.groupNoMedia}</span>
          </div>
        </div>
      )
    );
  }
}
function mapStateToProps(state) {
  return {
    stat: state.Observation.stats ? state.Observation.stats : null,
    LocaleData: state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(MediaFilter));
