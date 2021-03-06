import "./right_sidebar.css";

import queryString from "query-string";
import React, { Component } from "react";
import Collapsible from "react-collapsible";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FlaggedFilter from "../components/filterPanel/flag/Flag";
import Media from "../components/filterPanel/media/Media";
import Month_Filter from "../components/filterPanel/month/Month";
import RecoName from "../components/filterPanel/Name/RecoName";
import Status from "../components/filterPanel/Name/Status";
import TaxonId from "../components/filterPanel/Name/TaxonId";
import SpeciesGroup from "../components/filterPanel/speciesGroup/SpeciesGroup";
import Validate_Filter from "../components/filterPanel/validate/Validate";
import { Config } from "../Config";
import CustomFields from "../customFields/CustomFields";
import LoadingComponent from "../loadingComponent";
import SearchBar from "../taxonBrowser/SearchBar";
import Traits_Filter from "../traits/Traits";
import UserFilter from "../user/User";

const CreatedOn = Loadable({
  loader: () => import("../components/filterPanel/createdOn/CreatedOn"),
  loading: LoadingComponent,
});

const ObservedOn = Loadable({
  loader: () => import("../components/filterPanel/observedOn/ObservedOn"),
  loading: LoadingComponent,
});

const UserGroup = Loadable({
  loader: () => import("../userGroup/UserGroup"),
  loading: LoadingComponent,
});

const ScientificNameFilter = Loadable({
  loader: () => import("../components/filterPanel/scientificName/ScientificName"),
  loading: LoadingComponent,
});

const TaxonBrowser = Loadable({
  loader: () => import("../taxonBrowser/TaxonBrowser"),
  loading: LoadingComponent,
});

const Location = Loadable({
  loader: () => import("../components/filterPanel/location/Location"),
  loading: LoadingComponent,
});

class Right extends Component {
  constructor() {
    super();
    this.state = {
      sGroupOpen: true,
      userGroupOpen: false,
      userOpen: false,
      taxonOpen: false,
      mediaOpen: false,
      flagOpen: false,
      monthOpen: false,
      speciesOpen: false,
      validateOpen: false,
      traitsOpen: false,
      customFieldsOpen: false,
      length: null,
      dataCheckOpen: false,
      creadtedOnOpen: false,
      fromDateOpen: false,
      dateTabOpen: false,
      nameOpen: false,
      statusOpen: false,
      taxonIdOpen: false,
      recoNameOpen: false,
      locationOpen: false
    };
    this.openFilter = this.openFilter.bind(this);
  }

  openFilter() {
    if (this.props.PublicUrl) {
      this.refs.hide.style.display = "none";
    }
    let fullUrl = window.location.host;
    let parts = fullUrl.split(".");
    if (parts.length >= 3) {
      if (parts[0] === "assambiodiversity") {
        if (this.refs.hide) {
          this.refs.hide.style.display = "none";
        }
      }
      if (parts[0] === "treesindia") {
        if (this.refs.hide) {
          this.refs.hide.style.display = "none";
        }
      }
      if (parts[0] === "thewesternghats") {
        if (this.refs.hide) {
          this.refs.hide.style.display = "none";
        }
      }
    }
    const newparams = queryString.parse(document.location.search);

    let sGroupOpen = this.state.sGroupOpen;
    let userGroupOpen = this.state.userGroupOpen;
    let userOpen = this.state.userOpen;
    let taxonOpen = this.state.taxonOpen;
    let mediaOpen = this.state.mediaOpen;
    let flagOpen = this.state.flagOpen;
    let monthOpen = this.state.monthOpen;
    let speciesOpen = this.state.speciesOpen;
    let validateOpen = this.state.validateOpen;
    let traitsOpen = this.state.traitsOpen;
    let dataCheckOpen = this.state.dataCheckOpen;
    let customFieldsOpen = this.state.customFieldsOpen;
    let creadtedOnOpen = this.state.creadtedOnOpen;
    let fromDateOpen = this.state.fromDateOpen;
    let dateTabOpen = this.state.dateTabOpen;
    let nameOpen = this.state.nameOpen;
    let statusOpen = this.state.statusOpen;
    let taxonIdOpen = this.state.taxonIdOpen;
    let recoNameOpen = this.state.recoNameOpen;
    let locationOpen = this.state.locationOpen;
    if (newparams.taxon) {
      taxonOpen = true;
    }
    if (newparams.sGroup) {
      sGroupOpen = true;
    }
    if (newparams.userGroupList) {
      userGroupOpen = true;
    }
    if (newparams.user) {
      userOpen = true;
    }
    if (newparams.mediaFilter) {
      mediaOpen = true;
    }
    if (newparams.isFlagged || newparams.speciesName || newparams.validate) {
      dataCheckOpen = true;
    }
    if (newparams.isFlagged) {
      flagOpen = true;
    }

    if (newparams.months) {
      monthOpen = true;
    }
    if (newparams.speciesName) {
      speciesOpen = true;
    }
    if (newparams.validate) {
      validateOpen = true;
    }

    if (newparams.createdOnMaxDate || newparams.createdOnMinDate) {
      creadtedOnOpen = true;
    }
    if (newparams.maxDate || newparams.minDate) {
      fromDateOpen = true;
    }
    if (
      newparams.createdOnMaxDate ||
      newparams.createdOnMinDate ||
      newparams.maxDate ||
      newparams.minDate
    ) {
      dateTabOpen = true;
    }
    if (newparams.status || newparams.taxonId || newparams.recoName) {
      nameOpen = true;
      if (newparams.status) {
        statusOpen = true;
      }
      if (newparams.taxonId) {
        taxonIdOpen = true;
      }
      if (newparams.recoName) {
        recoNameOpen = true;
      }
    }
    if (newparams.location) {
      locationOpen = true;
    }

    Object.keys(newparams).forEach(key => {
      if (key.includes("custom")) {
        customFieldsOpen = true;
      }
    });

    Object.keys(newparams).forEach(key => {
      if (key.includes("trait")) {
        traitsOpen = true;
      }
    });

    this.setState({
      sGroupOpen,
      userGroupOpen,
      userOpen,
      taxonOpen,
      mediaOpen,
      flagOpen,
      monthOpen,
      speciesOpen,
      validateOpen,
      traitsOpen,
      dataCheckOpen,
      customFieldsOpen,
      creadtedOnOpen,
      dateTabOpen,
      fromDateOpen,
      nameOpen,
      statusOpen,
      taxonIdOpen,
      recoNameOpen,
      locationOpen
    });
  }
  componentDidMount() {
    this.openFilter();
  }

  render() {
    let FilterCount = this.props.FilterCount.countUrl
      ? this.props.FilterCount.countUrl.split("?")[1]
      : null;
    let urlObject = queryString.parse(FilterCount);
    // let taxonElement = <div><span>Taxon Browser</span> <span className="badge badge-light">{urlObject.taxon?urlObject.taxon.split(",").length:null}</span></div>;

    this.length = 0;
    if (urlObject) {
      if (urlObject.taxon) {
        this.length++;
      }
      if (urlObject.sGroup) {
        this.length++;
      }
      if (urlObject.userGroupList) {
        let fullUrl = window.location.host;
        let parts = fullUrl.split(".");
        if (parts.length >= 3) {
          if (parts[0] === "assambiodiversity") {
            this.refs.hide.style.display = "none";
          }
          if (parts[0] === "treesindia") {
            this.refs.hide.style.display = "none";
          }
          if (parts[0] === "thewesternghats") {
            this.refs.hide.style.display = "none";
          }
        } else {
          if (!this.props.PublicUrl) {
            this.length++;
          }
        }
      }
      if (urlObject.user) {
        this.length++;
      }
      if (urlObject.isFlagged || urlObject.validate || urlObject.speciesName) {
        this.length++;
      }

      if (urlObject.mediaFilter) {
        this.length++;
      }
      if (
        urlObject.createdOnMaxDate ||
        urlObject.createdOnMinDate ||
        urlObject.minDate ||
        urlObject.maxDate
      ) {
        this.length++;
      }
      if (urlObject.months) {
        this.length++;
      }
      if (urlObject.status || urlObject.taxonId || urlObject.recoName) {
        this.length++;
      }
      if (urlObject.location) {
        this.length++;
      }

      let increaseTraits = true;
      Object.keys(urlObject).forEach(key => {
        if (key.includes("trait")) {
          if (increaseTraits) {
            this.length++;
            increaseTraits = false;
          }
        }
      });
      let increaseCustom = true;
      Object.keys(urlObject).forEach(key => {
        if (key.includes("custom")) {
          if (increaseCustom) {
            this.length++;
            increaseCustom = false;
          }
        }
      });
    }

    return (
      <div id="leftSidebar" className="panel panel-success">
        <div
          className="panel-heading vertical-align panelHeadingBBP"
          style={{
            height: "35px",
            backgroundColor: "#EBEABD",
            backgroundImage: "none"
          }}
        >
          <span
            className="glyphicon glyphicon-filter"
            title="Filters"
            style={{ color: "#000" }}
          >
            {this.props.LocaleData["filter.key"]}{" "}
          </span>
          <a
            href={`${this.props.location.pathname}`}
            className="glyphicon glyphicon-trash"
          >
            <span style={{ marginTop: "-9px" }} className="badge badge-danger">
              {this.length}
            </span>
          </a>
        </div>

        <div
          className="panel-body panelBodyBBP"
          style={{ backgroundColor: "#EBEABD", padding: "6px" }}
        >
          {Config.DEPLOY !== "wiktrop" && (
            <Collapsible
              open={this.state.sGroupOpen}
              trigger={`Species Groups`}
            >
              <SpeciesGroup />
            </Collapsible>
          )}

          <Collapsible
            open={this.state.taxonOpen}
            trigger={this.props.LocaleData["filter.taxon_browser"]}
          >
            <div>
              <TaxonBrowser />
              <SearchBar />
            </div>
          </Collapsible>

          <Collapsible
            lazyRender={true}
            open={this.state.nameOpen}
            trigger={this.props.LocaleData["filter.Name"]}
          >
            <Collapsible
              lazyRender={true}
              open={this.state.recoNameOpen}
              trigger={this.props.LocaleData["filter.name.reconame"]}
            >
              <RecoName />
            </Collapsible>
            <Collapsible
              lazyRender={true}
              open={this.state.statusOpen}
              trigger={this.props.LocaleData["filter.name.status"]}
            >
              <Status />
            </Collapsible>
            <Collapsible
              lazyRender={true}
              open={this.state.taxonIdOpen}
              trigger={this.props.LocaleData["filter.name.taxonId"]}
            >
              <TaxonId />
            </Collapsible>
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.locationOpen}
            trigger={this.props.LocaleData["filter.location"]}
          >
            <Location />
          </Collapsible>

          <div ref="hide" style={{ display: "block" }}>
            <Collapsible
              lazyRender={true}
              open={this.state.userGroupOpen}
              trigger={this.props.LocaleData["filter.usergroup"]}
            >
              <UserGroup />
            </Collapsible>
          </div>
          <Collapsible
            lazyRender={true}
            open={this.state.dataCheckOpen}
            trigger={this.props.LocaleData["filter.dataQuality"]}
          >
            <Collapsible
              lazyRender={true}
              open={this.state.speciesOpen}
              trigger={this.props.LocaleData["filter.indentification"]}
            >
              <ScientificNameFilter />
            </Collapsible>

            <Collapsible
              lazyRender={true}
              open={this.state.flagOpen}
              trigger={this.props.LocaleData["filter.flag"]}
            >
              <FlaggedFilter />
            </Collapsible>

            <Collapsible
              lazyRender={true}
              open={this.state.validateOpen}
              trigger={this.props.LocaleData["filter.validation"]}
            >
              <Validate_Filter />
            </Collapsible>
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.userOpen}
            trigger={this.props.LocaleData["filter.user"]}
          >
            <UserFilter />
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.mediaOpen}
            trigger={this.props.LocaleData["filter.mediaType"]}
          >
            <Media />
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.dateTabOpen}
            trigger={this.props.LocaleData["filter.date"]}
          >
            <Collapsible
              lazyRender={true}
              open={this.state.fromDateOpen}
              trigger={this.props.LocaleData["filter.date.observedOn"]}
            >
              <ObservedOn />
            </Collapsible>
            <Collapsible
              lazyRender={true}
              open={this.state.creadtedOnOpen}
              trigger={this.props.LocaleData["filter.date.createdOn"]}
            >
              <CreatedOn />
            </Collapsible>
          </Collapsible>

          <Collapsible
            lazyRender={true}
            open={this.state.monthOpen}
            trigger={this.props.LocaleData["filter.seasonal"]}
          >
            <Month_Filter />
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.customFieldsOpen}
            trigger={this.props.LocaleData["filter.customFields"]}
          >
            <CustomFields />
          </Collapsible>
          <Collapsible
            lazyRender={true}
            open={this.state.traitsOpen}
            trigger={this.props.LocaleData["filter.traits"]}
          >
            <Traits_Filter />
          </Collapsible>
          <div style={{ height: "250px" }} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    PublicUrl: state.PublicUrl.url,
    groupName: state.PublicUrl.groupName,
    FilterCount: state.FilterCount,
    LocaleData: state.LocaleData
  };
}

export default withRouter(connect(mapStateToProps)(Right));
