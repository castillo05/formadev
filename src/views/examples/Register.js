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
import React,{useState, isValidElement} from "react";

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
import Joi from 'joi-browser';
import utils from '../../utils'

const { useInput, validation } = utils


const Register=(props)=> {
  const [loading, setLoading] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [verPass, setVerPass] = useState(false)
  const [alert, setAlert] = useState({ status: false, type: '', text: '' })
  const toggle = () => setTooltipOpen(!tooltipOpen)
  const schema = Joi.object().keys({
    username:validation.schema.username,
    email:validation.schema.email,
    password:validation.schema.password
  })
  
  const [input, setInput, submit] = useInput(schema)

  const crearUsuario=async(e)=>{
    e.preventDefault()
    try {
      if(submit()){
        const newUser = {
          username: input.username,
          email: input.email,
          password: input.password
        }
        setLoading(true)
        setTimeout(()=>{
          console.log(newUser);
          setLoading(false)
          setAlert({
            status:true,
            type:'primary',
            text:'Bienvenido a formDev Inicia sesión para disfrutar de una nueva experiencia de aprendizaje'
          })
        },2000)
        
      }
    } catch (error) {
      console.log(error)
    }
  }
 
//   // Obteniendo datos del formulario actualiza el state
//  const handleChangeEvent=e=>{
//     // this.setState({
//     //   form:{
//     //     ...this.state.form,
//     //     [e.target.name]:e.target.value
//     //   }
//     // })
//   }

//   // Envio de datos
//   const handleSubmit=e=>{
//     // e.preventDefault();
//     // this.setState({
//     //   loading:true
//     // })

//     // const newUser = {
//     //   firstName: input.UserName,
//     //   lastName: input.UserlastName,
//     //   email: input.Email,
//     //   password: input.password
//     // }

//     // setTimeout(()=>{
//     //   this.setState({loading:false});
//     // },5000);
//     // console.log(this.state.form);
  // }

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
                     invalid={Boolean(input.errors.username)}
                     placeholder='Nombre del Usuario'
                     type='text'
                     name='username'
                     defaultValue={input.username}
                     onChange={setInput}
                     onKeyDown={submit}
                     />
                     <FormFeedback>{input.errors.username}</FormFeedback>
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
                     invalid={Boolean(input.errors.email)}
                     placeholder='example@example.com'
                     type='text'
                     name='email'
                     defaultValue={input.email}
                     onChange={setInput}
                     onKeyDown={submit}
                    />
                    <FormFeedback>{input.errors.email}</FormFeedback>
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
                      invalid={Boolean(input.errors.password)}
                      placeholder='Password'
                      type={(verPass) ? 'text' : 'password'}
                      name='password'
                      defaultValue={input.password}
                      onChange={setInput}
                      onKeyDown={submit}
                    />
                     <InputGroupText>
                    <i onClick={() => { setVerPass(!verPass) }} id='verPass' className={(verPass) ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                  </InputGroupText>
                  <InputGroupText>
                    <i id='DisabledAutoHideExample' className='ni ni-air-baloon' />
                  </InputGroupText>
                  <Tooltip placement='top' isOpen={tooltipOpen} autohide={false} target='DisabledAutoHideExample' toggle={toggle}>
                     !Este campo requiere 8 caracteres entre  letras mayúscula, minúsculas un número y almeno un carácter especial!
                  </Tooltip>
                    <FormFeedback>{input.errors.password}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                {(alert.status) &&
                <Alert color={alert.type}>
                  {alert.text}
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
                  <Button onClick={(e)=>crearUsuario(e)} className="mt-4" color="primary" type="button">
                    {loading ? <div className='d-flex align-items-center justify-content-center'>
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


export default Register;
