import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import Input from '@material-ui/core/Input';

import logoSmilers from "../../assets/img/smilers_logo.png";
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      showWait: false,
      show: false,
      showMsg: "",
      cardAnimaton: "cardHidden",
      login: {
        "user": "",
        "password": ""
    },
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount(){
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

login = () => {
  //let user = this.refs.email.text;
  var user = document.getElementById('email').value
  console.log('--user ' + user);
  var password = document.getElementById('password').value
  console.log('--password ' + password);
  //Validaciones de obligatoriedad
  if (user == undefined || user == "") {
    this.setState({showMsg:"Debe ingresar el usuario"});
    this.showAlert();
    return;
  }

  if (password == undefined || password == "") {
    this.setState({showMsg:"Debe ingresar la clave"});
    this.showAlert();
    return;
  }


  this.showWaitAlert();
  const url = "http://192.168.1.1:8080/account/login";
  const userBody = {
    userName: user
    ,password: password
  };
  console.log("--url " + url);
  axios.post(url, userBody)
    .then(res => {
      console.log("--OK ");
      const accountData = res.data;
      localStorage["nameUser"] = accountData.name;
      localStorage["accountCode"] = accountData.account.code;

      console.log("--nameUser " + accountData.name);
      console.log("--accountCode " + accountData.account.code);
      this.props.history.push('/dashboard');
      //this.props.navigation.navigate('Dashboard')
      
    }).catch(error => {
      console.log("--Error: " + error);
      this.setState({showMsg:"Usuario o clave incorrecto"});
      this.showAlert();
    }).then(() => {
      // always executed
      console.log("--End request: ");
      this.hideWaitAlert();
    })

    

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

showWaitAlert = () => {
  this.setState({
    showWait: true
  });
}

hideWaitAlert = () => {
  this.setState({
    showWait: false
  });
}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
           
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="info">
                  <div className={classes.socialLine}>
                    <img src={logoSmilers} style={{width:140}}></img>
                  </div>

                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    ref="email"
                    name="user"
                    
                    formControlProps={{
                      fullWidth: true,
                      name:"user"
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />

                  <CustomInput
                    labelText="Password"
                    id="password"
                    ref="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>

                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="info" simple size="lg" block onClick={()=> this.login() }>
                    Ingresar
                  </Button>
                </CardFooter>
              </Card>
             
          </GridItem>
        </GridContainer>

        <SweetAlert
          custom
          show={this.state.showWait}
          
          title="Validando usuario..."
          customIcon = "/assets/wait.gif"
          onConfirm={() => this.hideWaitAlert()}
          showConfirm={false} >
        </SweetAlert>

        <SweetAlert
          show={this.state.show}
          style={{ display: "block", marginTop: "-100px" }}
          title={this.state.showMsg}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        />

      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default  withStyles(sweetAlertStyle)(LoginPage);
