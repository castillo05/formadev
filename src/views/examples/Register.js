// @ts-nocheck
/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{ Component} from "react";
import {Link, Redirect} from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  FormFeedback,
  Tooltip,
  Alert
} from "reactstrap";

// Joi validation
// import Joi from '@hapi/joi';
import * as yup from 'yup';
// import { options } from "joi-browser";
// Axios
import axios from 'axios';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*+/\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

const schema = yup.object().shape({
  password: yup.string()
  .required('La contraseña es requerida')
  .min(6,'La contraseña debe tener 6 caracteres'),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password'), null], 'La Contraseña no coincide'),
  email: yup.string().required('El correo es obligatorio').email(),
  name: yup.string().required('El nombre de usuario es obligatorio')  
})

class Register extends Component {

  constructor(props) {
    super()
    this.state={
      urlBase:'https://localhost:44354/api/',
      form:{
        name:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        rolId:'3',
        socialId:null,
        url:'https://formadev.net/confirm/'
      },
      loading:false,
      enabled:true,
      alert:{
        status:false,
        type:'',
        text:''
      },
      check:false,
      messageError:[],
      labels:{
        name:'',
        email:'',
        password:''
      },
      feedback:false,
      levelPassword:{
        color:'',
        status:false,
        text:''
      },
      tooltipOpen:false,
      verPass:false,
      register:{
        status:false
      }
    }
  }

  toggle = (e) => !this.state.tooltipOpen ? this.setState({tooltipOpen:true}) : this.setState({tooltipOpen:false})
  
  levelPass=(e)=>{
    if(strongRegex.test(this.state.form.password)){
      
      this.setState({
        levelPassword:{
          state:true,
          color:'text-success',
          text:'Fuerte'
        }
      })
     
    }else if(mediumRegex.test(this.state.form.password)){
      this.setState({
        levelPassword:{
          state:true,
          color:'text-warning',
          text:'Media'
        }
      })
     
    }else{
      
      this.setState({
        levelPassword:{
          state:true,
          color:'text-danger',
          text:'Debil'
        }
      })
      
    }
  }

  // Validacion de campos
  setValidate=async(e)=>{
    await schema.validate(this.state.form).then(res=>{
      
      this.setState({
        register:true,
        form:{
          name:res.name,
          email:res.email,
          password:res.password,
          rolId:'3',
          socialId:null,
          url:`https://formadev.net/confirm/${res.email}`
        }
      })
      this.setState({
        alert:{
          status:false
        },
        feedback:false
      })
    }).catch((err)=>{
        
        this.setState({
          feedback:true,
          register:false,
          messageError:err,
        })
      })
  }


  handleChange=(e)=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    })
  
}
  handleKeyDown=e=>{
    this.levelPass()
    this.setValidate()
  }

  // Metodo para registro de usuarios
  postRegister=async()=>{
    try {
     
      const data= await axios.post(this.state.urlBase+'Auth/register',this.state.form,{
        // headers:{'accept-language': 'es,en;q=0.9'}

      });
     
      if(data.data.message){
          this.setState({
          alert:{
            type:'danger',
            status:true,
            text:data.data.message
          },
          loading:false
        })
      }else{
        this.props.history.push('/auth/login')
      }      
    } catch (error) {
      console.log(error)
    }
    
  }

  crearUsuario=async e=>{
    this.setValidate(e)
    this.setState({loading:true})
    if(this.state.register) {
      this.postRegister()
    }
    console.log(this.state.form)
  }
  // I agree Policy 
  igreePolicy=e=>{
 
    this.setState({
      check:e.target.checked
    })
    if(!e.target.checked){
      this.setState({
        enabled:true
      })
      this.setState({
        alert:{
          type:'warning',
          status:true,
          text:'Debe aceptar nuestras politicas de privacidad'
        }
      })
     
    }else{
      this.setState({
        enabled:false
      })
      this.setState({
        alert:{
          
          status:false
        }
      })
    }
  }
 
 
render(){

   
    return (
      <>
      
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                     invalid={this.state.feedback}
                     placeholder='Nombre del Usuario'
                     type='text'
                     name='name'
                     onChange={this.handleChange}
                     onKeyUp={this.handleKeyDown}
                     />
                     <FormFeedback>{this.state.messageError.path==='name'? this.state.messageError.message:''}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    invalid={this.state.feedback}
                    disabled={this.state.messageError.path==='email' ? false:null}
                     placeholder='example@example.com'
                     type='text'
                     name='email'
                     onChange={this.handleChange}
                     onKeyUp={this.handleKeyDown}
                    />
                    <FormFeedback>{this.state.messageError.path==='email'? this.state.messageError.message:''}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      invalid={this.state.feedback}
                      disabled={this.state.messageError.path==='password' ? false:null}
                      placeholder='Password'
                      type={this.state.verPass ? 'text' : 'password'}
                      name='password'
                      onChange={this.handleChange}
                      onKeyUp={this.handleKeyDown}
                    />
                     <InputGroupText>
                    <i onClick={() => { !this.state.verPass?this.setState({verPass:true}):this.setState({verPass:false})}} id='verPass' className={this.state.verPass ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                  </InputGroupText>
                  <InputGroupText>
                    <i id='DisabledAutoHideExample' className='ni ni-air-baloon' />
                  </InputGroupText>
                  <Tooltip placement='top' isOpen={this.state.tooltipOpen} autohide={false} target='DisabledAutoHideExample' toggle={this.toggle}>
                     !Este campo requiere entre 8 y 10 caracteres entre  letras mayúscula, minúsculas un número y almeno un carácter especial para mayor seguridad!
                  </Tooltip>
                    <FormFeedback>{this.state.messageError.path==='password'? this.state.messageError.message:''}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      invalid={this.state.feedback}
                      disabled={this.state.messageError.path==='passwordConfirmation' ? false:null}
                      placeholder='passwordConfirmation'
                      type={this.state.verPass ? 'text' : 'password'}
                      name='passwordConfirmation'
                      onChange={this.handleChange}
                      onKeyUp={this.handleKeyDown}
                    />
                     <InputGroupText>
                    <i onClick={() => { !this.state.verPass?this.setState({verPass:true}):this.setState({verPass:false})}} id='verPass' className={this.state.verPass ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                  </InputGroupText>
                  <InputGroupText>
                    <i id='DisabledAutoHideExample' className='ni ni-air-baloon' />
                  </InputGroupText>
                  <Tooltip placement='top' isOpen={this.state.tooltipOpen} autohide={false} target='DisabledAutoHideExample' toggle={this.toggle}>
                     !Este campo requiere entre 8 y 10 caracteres entre  letras mayúscula, minúsculas un número y almeno un carácter especial para mayor seguridad!
                  </Tooltip>
                    <FormFeedback>{this.state.messageError.path==='passwordConfirmation'? this.state.messageError.message:''}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                {(this.state.alert.status) &&
                <Alert color={this.state.alert.type}>
                  {this.state.alert.text}
                </Alert>}
                <div className="text-muted font-italic">
                  <small>
                    Seguridad de la contraseña:{" "}
                   
                      <span className={this.state.levelPassword.color}>{this.state.levelPassword.text}</span>
                   
                  </small>
                </div>
               
                <Row className="my-4">
               
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        name="policy"
                        onChange={this.igreePolicy}
                        checked={this.state.check}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button onClick={this.crearUsuario} className="mt-4" color="primary" type="button" disabled={this.state.enabled}>
                    {this.state.loading ? <div className='d-flex align-items-center justify-content-center'>
                    <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />{' '}
                    </div> :'Create account'}
                    
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
                }
  }


export default Register;
