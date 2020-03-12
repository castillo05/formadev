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
import React,{useState} from "react";

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
  FormFeedback,
  Spinner,
  Progress
} from "reactstrap";

// Utils
import Utils from '../../utils';
// Joi validation
import Joi from 'joi-browser';

const {useInput, validation} = Utils;





const Login =(props)=> {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress]=useState(5)

  const schema = validation.createSchema({
    email:validation.schema.email,
    password:validation.schema.passwordLogin
  })
  
  const [input,setInput,submit]=useInput(schema);

  const loginUser=async(e)=>{
    e.preventDefault()
  
    if(submit()){
      const login={
        email:input.email,
        password:input.password
      }
      if(login.email==='test@test.com' && login.password==='test'){
        setLoading(true)
        for (let i = 0; i <= 100; i++) {
          
          setTimeout(()=>{
            setProgress(i)
          },200)
          
        }
        setTimeout(()=>{
          setLoading(false)
          setProgress(0)
        },3000)
         console.log(login);
      }
     
    }
  }
 
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
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
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={Boolean(input.errors.email)}
                      placeholder='example@example.com'
                      type='email'
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
                      placeholder='******'
                      type='password'
                      name='password'
                      defaultValue={input.password}
                      onChange={setInput}
                      onKeyDown={submit}
                    />
                    <FormFeedback>{input.errors.password}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button onClick={(e)=>loginUser(e)} className="my-4" color="primary" disabled={loading} type="button">
                    
                    Sing In
                  </Button>
                  {loading ? <Progress striped color="success" value={progress} /> : null}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }


export default Login;
