import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import Timeline from "@material-ui/icons/Timeline";
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import axios from 'axios';
import SweetAlert from "react-bootstrap-sweetalert";
import Today from "@material-ui/icons/Today";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import priceImage1 from "../../assets/img/card-2.jpeg";
import priceImage2 from "../../assets/img/card-3.jpeg";
import priceImage3 from "../../assets/img/card-1.jpeg";

const us_flag = require("../../assets/img/flags/US.png");
const de_flag = require("../../assets/img/flags/DE.png");
const au_flag = require("../../assets/img/flags/AU.png");
const gb_flag = require("../../assets/img/flags/GB.png");
const ro_flag = require("../../assets/img/flags/RO.png");
const br_flag = require("../../assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

import {
  donutChart
  ,termometerChart
  ,simpleBarChart
  ,colouredLinesChart
} from "../../variables/charts.jsx";

import carita1 from "../../assets/img/caritas_1.png";
import carita2 from "../../assets/img/caritas_2.png";
import carita3 from "../../assets/img/caritas_3.png";
import carita4 from "../../assets/img/caritas_4.png";
import carita5 from "../../assets/img/caritas_5.png";

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  constructor(props) {
    super(props);
    let account_ = localStorage["accountCode"];
    this.state = {
      data: [],
      alert: null,
      show: false,
      filter: {account:account_
              ,startDate:0
              ,endDate:0
              ,headquarter:"0"
              ,zone:"0"
              ,campaign:"0"
              ,question:"0"},
      indicador1: {},
      indicador2: {},
      indicador3:[],
      indicador4: {},
      colouredLinesChart:{},
      simpleBarChart:{},
      donutChart:{},
      headquarterList:[],
      zoneList:[],
      campaignList:[],
      questionList:[],
      termometerChart:{}
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

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

    //cargar las preguntas 
    const urlPr = "http://54.188.210.238:8080/campaign/question?user="+this.state.filter.account;
    axios.get(urlPr)
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

      this.setState({questionList: list});
      
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
    const url1 = "http://54.188.210.238:8080/dashboard/generalCSATIndicator?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url1 " + url1);
    axios.get(url1)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        var donutChart = [];
        donutChart["series"] = [details.csat];
        this.setState({indicador1: details, donutChart: donutChart});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
        this.hideAlert();
      })


    const url2 = "http://54.188.210.238:8080/dashboard/generalExpectedCSATIndicator?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url2 " + url2);
    axios.get(url2)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        var termometerChart = [];
        var array1 = [details.csat];
        let cons = 5-details.csat;
        var array2 = [cons];
        termometerChart["series"] = [array1,array2];
        this.setState({indicador2: details, termometerChart: termometerChart});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
      })

      const url3 = "http://54.188.210.238:8080/dashboard/campaignRanking?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url3 " + url3);
    axios.get(url3)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        var index = 0;
        var indicador3 = [];
        const list = details
        .map(object => {
            index++;
            var array = [object.campaign_name, object.total, object.csat, object.total_excellent, object.total_good,object.total_moderate,object.total_bad,object.total_poor];
            indicador3.push(array);
        });
        this.setState({indicador3: indicador3});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
      })

      const url4 = "http://54.188.210.238:8080/dashboard/assessmentsDay?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
      //const url4 = "http://192.168.1.3:8080/dashboard/assessmentsDay?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url4 " + url4);
    axios.get(url4)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        var index = 0;
        var colouredLinesChart = {labels:[], series:[]};
        var array1 = [];
        var array2 = [];
        const list = details
        .map(object => {
            index++;
            colouredLinesChart["labels"].push(object.day_w);
            array1.push(object.csat);
            array2.push(object.min_csat);
            
        });
        colouredLinesChart["series"].push(array1);
        colouredLinesChart["series"].push(array2);
        this.setState({colouredLinesChart: colouredLinesChart});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
      })

      const url5 = "http://54.188.210.238:8080/dashboard/assessmentsHour?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url5 " + url5);
    axios.get(url5)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        var index = 0;
        var simpleBarChart = {labels:[], series:[]};
        var array1 = [];
        const list = details
        .map(object => {
            index++;
            simpleBarChart["labels"].push(object.registration_hour);
            array1.push(object.csat);
            
        });
        simpleBarChart["series"].push(array1);
        this.setState({simpleBarChart: simpleBarChart});
        
      }).catch(error => {
        console.log("--Error: " + error);
      }).then(() => {
        // always executed
        console.log("--End request: ");
      })

      const url6 = "http://54.188.210.238:8080/dashboard/generalRequestAssistanceIndicator?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
      console.log("--url6 " + url6);
      axios.get(url6)
        .then(res => {
          const object = res.data;
          console.log("--OK ");
          var indicador4 = {};
          indicador4["total_assistance"] =  object.total_assistance;
          this.setState({indicador4: indicador4});
          
        }).catch(error => {
          console.log("--Error: " + error);
        }).then(() => {
          // always executed
          console.log("--End request: ");
        })

  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>



{//<!-- start- filter-->
}
<GridItem xs={12} sm={12} md={12}>
   <Card>
     <CardHeader color="info" icon>
       <CardIcon color="info">
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
   <legend>Pregunta</legend>
       <FormControl fullWidth className={classes.selectFormControl}>
           
           <Select
             MenuProps={{
               className: classes.selectMenu
             }}
             classes={{
               select: classes.select
             }}
             value={this.state.filter.question}
             onChange={this.handleSimple}
             inputProps={{
               name: "question",
               id: "filter-question"
             }}>
             <MenuItem
               
               classes={{
                 root: classes.selectMenuItem
               }}
               value="0">
               Seleccione una pregunta...
             </MenuItem>

            {this.state.questionList}

             
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




          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>CSAT</h4>
              </CardHeader>
              <CardBody>
              <ChartistGraph
                  data={this.state.donutChart}
                  type="Pie"
                  options={donutChart.options}
                />
              </CardBody>
              

              <CardFooter>

                <GridContainer xs={15} sm={15} md={15} lg={15}>
                  <GridItem xs={3} sm={2} md={2} lg={2}>
                    <img src={carita1} alt="Excelente"  style={{width:50, height:50}}/>
                    <p style={{textAlign:"center", width:50}}>{this.state.indicador1.total_excellent}</p>
                  </GridItem>
                  <GridItem xs={3} sm={2} md={2} lg={2}>
                    <img src={carita2} alt="Bueno"  style={{width:50, height:50}}/>
                    <p style={{textAlign:"center", width:50}}>{this.state.indicador1.total_good}</p>
                  </GridItem>
                  <GridItem xs={3} sm={2} md={2} lg={2}>
                    <img src={carita3} alt="Regular"  style={{width:50, height:50}}/>
                    <p style={{textAlign:"center", width:50}}>{this.state.indicador1.total_moderate}</p>
                  </GridItem>
                  <GridItem xs={3} sm={2} md={2} lg={2}>
                    <img src={carita4} alt="Malo"  style={{width:50, height:50}}/>
                    <p style={{textAlign:"center", width:50}}>{this.state.indicador1.total_bad}</p>
                  </GridItem>
                  <GridItem xs={3} sm={2} md={2} lg={2}>
                    <img src={carita5} alt="Deficiente"  style={{width:50, height:50}}/>
                    <p style={{textAlign:"center", width:50}}>{this.state.indicador1.total_poor}</p>
                  </GridItem>

                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>CSAT Esperado</h4>
              </CardHeader>
              <CardBody>
              <GridContainer>
                <br />
                <br />
                  
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6} lg={6}>
                      <img src={carita1} alt="Excelente"  style={{width:80, height:80}}/>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6} lg={6}>
                      <h2>{this.state.indicador2.min_csat}</h2>
                    </GridItem>
                  </GridContainer>
                    
                  </GridItem> 

                <br />
                <br />
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <ChartistGraph
                        data={this.state.termometerChart}
                        type="Bar"
                        options={termometerChart.options}
                      />
                  </GridItem>
                </GridContainer>
              </CardBody>
            
            </Card>
          </GridItem>

          <GridItem xs={6} alignItems="stretch">
            <Card className="h-75 d-inline-block">
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Ranking campañas</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Campaña", "Total", "CSAT", "Excelente", "Bueno", "Regular", "Malo", "Deficiente"]}
                  tableData={this.state.indicador3}
                  
                />
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="warning" icon>
                  <CardIcon color="warning">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Evaluaciones por día
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={this.state.colouredLinesChart}
                    type="Line"
                    options={colouredLinesChart.options}
                    listener={colouredLinesChart.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Evaluaciones por hora
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={this.state.simpleBarChart}
                  type="Bar"
                  options={simpleBarChart.options}
                />
              </CardBody>
            </Card>
          </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Solicitudes de asistencia</h4>
              </CardHeader>
              <CardBody>
              <GridContainer>
                <br />
                <br />
                  
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6} lg={6}>
                      <img src={carita5} alt="Excelente"  style={{width:80, height:80}}/>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6} lg={6}>
                      <h2>{this.state.indicador4.total_assistance}</h2>
                    </GridItem>
                  </GridContainer>
                    
                  </GridItem> 

       
                </GridContainer>
              </CardBody>
            
            </Card>
          </GridItem>
        
        </GridContainer>

      <SweetAlert
          custom
          show={this.state.show}
          
          title="Cargando indicadores..."
          customIcon = "/assets/wait.gif"
          onConfirm={() => this.hideAlert()}
          showConfirm={false} >
        </SweetAlert>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
