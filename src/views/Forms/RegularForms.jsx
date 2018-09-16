import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import axios from 'axios';
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "../../components/Table/Table.jsx";
import {CSVLink, CSVDownload} from 'react-csv';

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

import { dataTable } from "../../variables/general.jsx";

import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

//const customImage = () => (<img src={loadImage} />);

class ReactTables extends React.Component {


  constructor(props) {
    super(props);
    let account_ = localStorage["accountCode"];
    this.state = {
      data: [],
      csvData:[],
      report: [],
      headquarterList:[],
      zoneList:[],
      campaignList:[],
      alert: null,
      show: false,
      filter: {account:account_
              ,startDate:0
              ,endDate:0
              ,headquarter:"0"
              ,zone:"0"
              ,campaign:"0"},
    };
  }


  showAlert = () => {
    this.setState({
      show: true
    });
  }

  hideAlert = () => {
    this.setState({
      show: false
    });
  }


  handleStartDate = time =>{
    console.log('--time ' + time);
    const date = new Date(time);

    var x = this.state.filter;
    x[["startDate"]] =  time;
    this.setState({
      filter: x,
    })
 };


 handleEndDate = time =>{
  console.log('--time ' + time);
  var x = this.state.filter;
  x[["endDate"]] =  time;
  this.setState({
    filter: x,
  })
};

  handleSimple = event => {
    console.log('--name ' + [event.target.name]);
    var x = this.state.filter;
    x[[event.target.name]] =  event.target.value;
    this.setState({
      filter: x,
    })
  };

  componentDidMount() {
    console.log("--componentDidMount");

//cargar las sedes 
const urlHe = "http://54.188.210.238:8080/parameter/headquarter?account="+this.state.filter.account;
axios.get(urlHe)
.then(res => {
  const dataResp = res.data;
  console.log("--OK ");
  
  var index = 0;
  const list = dataResp
  .map(object => {
      index++;
      console.log("--object " + object.name);
      return (
          <MenuItem
            classes={{
              root: this.props.classes.selectMenuItem,
              selected: this.props.classes.selectMenuItemSelected
            }}
            value={object.code}
          >
         {object.name}
         </MenuItem>
      );
  });

  this.setState({headquarterList: list});
  
}).catch(error => {
  console.log("--Error: " + error);
}).then(() => {
  // always executed
  console.log("--End request: ");
  
});


//cargar las zonas 
const urlZo = "http://54.188.210.238:8080/parameter/zone?account="+this.state.filter.account;
axios.get(urlZo)
.then(res => {
  const dataResp = res.data;
  console.log("--OK ");
  
  var index = 0;
  const list = dataResp
  .map(object => {
      index++;
      console.log("--object " + object.name);
      return (
          <MenuItem
            classes={{
              root: this.props.classes.selectMenuItem,
              selected: this.props.classes.selectMenuItemSelected
            }}
            value={object.code}
          >
         {object.name}
         </MenuItem>
      );
  });

  this.setState({zoneList: list});
  
}).catch(error => {
  console.log("--Error: " + error);
}).then(() => {
  // always executed
  console.log("--End request: ");
  
});

//cargar las campañas 
const urlCa = "http://54.188.210.238:8080/campaign?user="+this.state.filter.account;
axios.get(urlCa)
.then(res => {
  const dataResp = res.data;
  console.log("--OK ");
  
  var index = 0;
  const list = dataResp
  .map(object => {
      index++;
      console.log("--object " + object.name);
      return (
          <MenuItem
            classes={{
              root: this.props.classes.selectMenuItem,
              selected: this.props.classes.selectMenuItemSelected
            }}
            value={object.code}
          >
         {object.title}
         </MenuItem>
      );
  });

  this.setState({campaignList: list});
  
}).catch(error => {
  console.log("--Error: " + error);
}).then(() => {
  // always executed
  console.log("--End request: ");
  
});

    this.loadData();
  }

  search = () => {
    this.loadData();
  }

  loadData = () => {
    this.showAlert();
    //const url = "http://192.168.1.1:8080/reports/reportCampaign?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter +"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign;
    const url = "http://54.188.210.238:8080/reports/reportCampaign?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign;
   
    console.log("--url " + url);
    axios.get(url)
      .then(res => {
        const details = res.data;
        console.log("--OK " + details);
        var data = [];
        var csvData = [];
        let arrayHeader = ["Campaña", "Pregunta", "Total", "CSAT", "Excelente", "Bueno", "Regular", "Malo", "Deficiente"];
        csvData.push(arrayHeader);
        const list = details.map(object => {

          var array = [object.campaign_name, object.question_item_name, object.total, object.csat, object.total_excellent, object.total_good,object.total_moderate,object.total_bad,object.total_poor];
          data.push(array);
          csvData.push(array);

        });

        this.setState({data: data, csvData: csvData});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
        this.hideAlert();
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>

{//<!-- start- filter-->
}
         <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Today />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Filtros</h4>
              </CardHeader>
              <CardBody>

                <GridContainer>

                  <GridItem xs={12} sm={12} md={2}>
                          <legend>Fecha inicial</legend>
                          <FormControl fullWidth>
                            <Datetime
                            value={this.state.filter.startDate}
                            onChange={this.handleStartDate}
                              inputProps={{ placeholder: "Ingrese la fecha inicial...",
                              name: "startDate",
                              id: "filter-startDate" }}
                            />
                          </FormControl>
                        
                    </GridItem>

                    <GridItem xs={12} sm={12} md={2}>
                        <legend>Fecha final</legend>
                        <FormControl fullWidth>
                          <Datetime
                          value={this.state.filter.endDate}
                          onChange={this.handleEndDate}
                            inputProps={{ placeholder: "Ingrese la fecha final...",
                             name: "endDate",
                             id: "filter-endDate"}}
                          />
                        </FormControl>
  
                  </GridItem>

                   <GridItem xs={12} sm={12} md={2}>
                   <legend>Sede</legend>
                <FormControl fullWidth className={classes.selectFormControl}>

                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={this.state.filter.headquarter}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "headquarter",
                        id: "filter-headquarter"
                      }}>
                      <MenuItem
                        
                        classes={{
                          root: classes.selectMenuItem
                        }}
                        value="0">
                        Seleccione una sede...
                      </MenuItem>
                      {this.state.headquarterList}

                    </Select>
                  </FormControl>

                  
              
          </GridItem>

         <GridItem xs={12} sm={12} md={2}>
 <legend>Zona</legend>
       <FormControl fullWidth className={classes.selectFormControl}>
           <Select
             MenuProps={{
               className: classes.selectMenu
             }}
             classes={{
               select: classes.select
             }}
             value={this.state.filter.zone}
             onChange={this.handleSimple}
             inputProps={{
               name: "zone",
               id: "simple-zone"
             }}>
             <MenuItem
               
               classes={{
                 root: classes.selectMenuItem
               }}
               value="0">
               Seleccione una zona...
             </MenuItem>

             {this.state.zoneList}
            
           </Select>
         </FormControl>

 </GridItem>


 <GridItem xs={12} sm={12} md={2}>
 <legend>Campaña</legend>
 
       <FormControl fullWidth className={classes.selectFormControl}>
           <Select
             MenuProps={{
               className: classes.selectMenu
             }}
             classes={{
               select: classes.select
             }}
             value={this.state.filter.campaign}
             onChange={this.handleSimple}
             inputProps={{
               name: "campaign",
               id: "filter-campaign"
             }}>
             <MenuItem
               
               classes={{
                 root: classes.selectMenuItem
               }}
               value="0">
               Seleccione una campaña...
             </MenuItem>

            {this.state.campaignList}

           </Select>
         </FormControl>
     
 </GridItem>

        

            <GridItem xs={12} sm={12} md={2}>
              <Button color="primary" onClick={() => this.search()} >
                Buscar
              </Button>
            </GridItem>
                              

                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
     
{//<!-- end- filter-->
}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Campañas</h4>
                <CSVLink data={this.state.csvData} filename={"reporte_camp.csv"}>Exportar a excel</CSVLink>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Campaña", "Pregunta", "Total", "CSAT", "Excelente", "Bueno", "Regular", "Malo", "Deficiente"]}
                  tableData={this.state.data}
                />
              </CardBody>
            </Card>
          </GridItem>

          

          </GridContainer>

        <SweetAlert
          custom
          show={this.state.show}
          
          title="Buscando campañas..."
          customIcon = "/assets/wait.gif"
          onConfirm={() => this.hideAlert()}
          showConfirm={false} >
        </SweetAlert>

      </GridContainer>
    );
  }
}

export default withStyles(styles)(ReactTables);
