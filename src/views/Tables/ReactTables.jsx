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

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

import { dataTable } from "../../variables/general.jsx";
import {CSVLink, CSVDownload} from 'react-csv';

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
    this.state = {
      data: [],
      alert: null,
      show: false,
      filter: {account:"exito_1"
              ,startDate:0
              ,endDate:0
              ,headquarter:"0"
              ,zone:"0"
              ,campaign:"0"
              ,question:"0"},
      csvData:[]
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
    this.loadData();
  }

  search = () => {
    this.loadData();
  }

  loadData = () => {
    this.showAlert();
    //const url = "http://192.168.1.1:8080/reports/reportDetailAnswers?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
    const url = "http://54.188.210.238:8080/reports/reportDetailAnswers?account="+this.state.filter.account+"&startDate="+this.state.filter.startDate+"&endDate="+this.state.filter.endDate+"&headquarter="+this.state.filter.headquarter+"&zone="+this.state.filter.zone+"&campaign="+this.state.filter.campaign+"&question="+this.state.filter.question;
   
    console.log("--url " + url);
    axios.get(url)
      .then(res => {
        const details = res.data;
        console.log("--OK ");
        

        var csvData = [];
        let arrayHeader = ["Fecha", "Hora", "Indicador", "Ciudad", "Sede", "Zona", "Campaña", "Pregunta", "Calificación"];
        csvData.push(arrayHeader);
        details.map(object => {

          var array = [object.registration_date, object.registration_time, object.indicador, object.city_name,object.headquarter_name,object.zone_name,object.campaign_name,object.question_item_name,object.eval];
          csvData.push(array);

        });
        this.setState({data: details, csvData: csvData});

        
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
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="1001"
                      >
                        Éxito Colina
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="1002"
                      >
                        Éxito Poblado
                      </MenuItem>
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
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1001001"
             >
               Éxito Colina - Carnes
             </MenuItem>
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1001002"
             >
               Éxito Colina - Servicio al Cliente Electrodigital
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1001003"
             >
               Éxito Colina - Centro de Información
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1002001"
             >
               Éxito Poblado - Comidas Preparadas
             </MenuItem>
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1002002"
             >
               Éxito Poblado - Tokio piso 2
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1002003"
             >
               Éxito Poblado - Telefonía
             </MenuItem>

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
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="10001"
                      >
                        Carnes
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="10002"
                      >
                        Electrodigital
                      </MenuItem>

                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="10003"
                      >
                        Servicio a cliente
                      </MenuItem>

                      

            <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="10004"
             >
               Baños
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="10005"
             >
               Comidas Preparadas / restaurante
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="10006"
             >
               Cajas
             </MenuItem>

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
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="1"
             >
               Variedad y frescura de las carnes y cortes
             </MenuItem>
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="2"
             >
               Agilidad del despacho del pedido
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="4"
             >
               Limpieza y orden de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="6"
             >
               Amabilidad y cortesía del personal de la sección
             </MenuItem>
             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="7"
             >
               Respuesta oportuna y clara
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="8"
             >
               Conocimiento del personal
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="9"
             >
               Amabilidad y cortesía del personal de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="10"
             >
               Presentación personal de los empleados de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="11"
             >
               Personal disponible para la asesoría
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="12"
             >
               Conocimiento del producto y su funcionalidad
             </MenuItem>

               <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="13"
             >
               Variedad en productos
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="14"
             >
               Amabilidad y cortesía del personal de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="15"
             >
               Agilidad en el registro, pago y empaque de sus productos
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="16"
             >
               Tiempo de espera en la fila de la caja
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="17"
             >
               Cantidad de cajas que estaban abiertas al momento de su pago
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="18"
             >
               Amabilidad y cortesía del personal de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="19"
             >
               Aseo y limpieza de la sección
             </MenuItem>

             <MenuItem
               classes={{
                 root: classes.selectMenuItem,
                 selected: classes.selectMenuItemSelected
               }}
               value="20"
             >
               Amabilidad y cortesía del personal de la sección
             </MenuItem>

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
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Detalle preguntas</h4>
              <CSVLink data={this.state.csvData} filename={"detalles_camp.csv"}>Exportar a excel</CSVLink>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: "Fecha",
                    accessor: "registration_date"
                  }, {
                    Header: "Hora",
                    accessor: "registration_time"
                  },{
                    Header: "Indicador",
                    accessor: "indicador"
                  },
                  {
                    Header: "Ciudad",
                    accessor: "city_name"
                  },
                  {
                    Header: "Sede",
                    accessor: "headquarter_name"
                  },
                  {
                    Header: "Zona",
                    accessor: "zone_name"
                  },
                  {
                    Header: "Campaña",
                    accessor: "campaign_name"
                  },
                  {
                    Header: "Pregunta",
                    accessor: "question_item_name"
                  },
                  {
                    Header: "Calificación",
                    accessor: "eval"
                  }
                  
                  
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>

        <SweetAlert
          custom
          show={this.state.show}
          
          title="Buscando detalle..."
          customIcon = "/assets/wait.gif"
          onConfirm={() => this.hideAlert()}
          showConfirm={false} >
        </SweetAlert>

      </GridContainer>
    );
  }
}

export default withStyles(styles)(ReactTables);
