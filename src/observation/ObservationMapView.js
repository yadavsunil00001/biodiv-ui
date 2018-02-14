import React,{Component} from 'react';
import Naksha from 'naksha-react-ui';
import { Config } from '../Config';

class ObservationMapView extends Component{

  constructor() {
    super();
    this.state={
      flag:false
    }
  }

  componentDidMount() {
    this.setState({
      flag:true
    })
  }

  map() {
    let url = Config.api.PAMBA_API_ROOT_URL + "/naksha" +this.props.filterUrl;
    return (
      <Naksha.MapHolder url={url}
           location_field="location"
           map_container="map2"
           restrict_to_bounds={[[68, 5.75], [98, 37.5]]}
           url_response_geohash_field="geohashAggregation"
           url_response_filtered_geohash_field="viewFilteredGeohashAggregation"
           color_scheme="YlOrBr"
           no_legend_stops="6"
           is_legend_stops_data_driven={true}
      />
    )
  }

  render(){
    return(
      <div>
        {this.state.flag ? this.map() : null}
        <div id="map2" style={{height:"450px"}}>
        </div>
      </div>
    )
  }
}

export default ObservationMapView;
