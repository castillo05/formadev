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
import React,{useState,useEffect, Component} from "react";

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
  FormText,
  Tooltip,
  Alert
} from "reactstrap";

// Joi validation
import Joi from '@hapi/joi';
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base':'Invalid Type',
    'string.empty':'El campo Nombre de usuario no puede estar vacio',
    'string.min':'El campo Nombre de Usuario debe tener minimo {#limit} caracteres de longitud',
    'string.max':'El campo Nombre de Usuario debe tener maximo {#limit} caracteres de longitud',
    'any.required':'Este campo es obligatorio'
  }).default(null),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ).messages({
    'string.base':'Invalid Type',
    'string.empty':'El campo Correo de usuario no puede estar vacio',
    'any.required':'Este campo es obligatorio'
  }).default(null),
  password: Joi.string().required().min(6)
  .regex(/(?:.*?[a-z])/,'debil').regex(/(?=.*?[A-Z])/,'media').regex(/(?=.*?[.#?!@$%^&*-])/,'fuerte')
  .messages({
    'string.base':'Invalid Type',
    'string.empty':'El campo Contraseña de usuario no puede estar vacio',
    'string.min':'El campo Contraseña de Usuario debe tener minimo {#limit} caracteres de longitud',
    'string.pattern.debil':'Debil',
    'any.required':'Este campo es obligatorio'
  })
})

class Register extends Component {

  constructor(props) {
    super()
    this.state={
      form:{
        username:'',
        email:'',
        password:''
      },
      loading:false,
      enabled:false,
      alert:{
        status:false,
        type:'',
        text:''
      },
      check:false,
      messageError:[],
      labels:{
        username:'',
        email:'',
        password:''
      }
    }
  }

  componentDidMount(){
    
  }

  // Validacion de campos
  setValidate=async(e)=>{
   
    console.log(this.state.form);
    const valid=await schema.validate(this.state.form)
    console.log(valid);
    if(valid.error){
      this.setState({
        messageError:valid.error
      })
       this.setState({
      alert:{
        type:'warning',
        status:true,
        text:this.state.messageError.message
      }
    })

    if(this.state.messageError.details[0].context.label==='username'){
      this.setState({
        labels:{
          username:this.state.messageError.details[0].message,
          email:'',
          password:''
        }
      })
      console.log(this.state.labels.username);
    }else if(this.state.messageError.details[0].context.label==='email' ){
      this.setState({
        labels:{
          username:'',
          email:this.state.messageError.details[0].message,
          password:''
        }
      })
    }else if(this.state.messageError.details[0].context.label==='password' ){
      this.setState({
        labels:{
          username:'',
          email:'',
          password:this.state.messageError.details[0].message
        }
      })
    }else{
      return
    }
    
    }else{
     
       this.setState({
      alert:{
        
        status:false,
        
      }
    })
    console.log(valid);
    }
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
   
    this.setValidate(e)
  }

  crearUsuario=async e=>{
    this.setValidate(e)   
  }
  // I agree Policy 
  igreePolicy=e=>{
  console.log('hola');
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
                     invalid={true}
                     placeholder='Nombre del Usuario'
                     type='text'
                     name='username'
                     onChange={this.handleChange}
                     onKeyUp={this.handleKeyDown}
                     />
                     <FormFeedback>{this.state.labels.username}</FormFeedback>
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
                    invalid={true}
                     placeholder='example@example.com'
                     type='text'
                     name='email'
                     onChange={this.handleChange}
                     onKeyUp={this.handleKeyDown}
                    />
                    <FormFeedback>{this.state.labels.email}</FormFeedback>
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
                      invalid={true}
                      placeholder='Password'
                      type="password"
                      name='password'
                      onChange={this.handleChange}
                      onKeyUp={this.handleKeyDown}
                    />
                     <InputGroupText>
                    {/* <i onClick={() => { setVerPass(!verPass) }} id='verPass' className={(verPass) ? 'fas fa-eye-slash' : 'fas fa-eye'} /> */}
                  </InputGroupText>
                  <InputGroupText>
                    <i id='DisabledAutoHideExample' className='ni ni-air-baloon' />
                  </InputGroupText>
                  {/* <Tooltip placement='top' isOpen={tooltipOpen} autohide={false} target='DisabledAutoHideExample' toggle={toggle}>
                     !Este campo requiere 8 caracteres entre  letras mayúscula, minúsculas un número y almeno un carácter especial!
                  </Tooltip> */}
                    <FormFeedback>{this.state.labels.password}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                {(this.state.alert.status) &&
                <Alert color={this.state.alert.type}>
                  {this.state.alert.text}
                </Alert>}
                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
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
