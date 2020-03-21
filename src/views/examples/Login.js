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
  Progress,
  Alert,
  Tooltip
} from "reactstrap";

// Joi validation
import * as yup from 'yup';


const Login =(props)=> {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress]=useState(5)
  const [form,setForm] = useState({email:'',password:''})
  const [errorMessage,setError]=useState([])
  const [feedback,setFeedBack]=useState(false)
  const [alert,setAlert]=useState({status:false,text:'',type:''})
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [showTooltip,setShowToolip]= useState({status:false,text:'',type:''})
  const [showTooltip2,setShowToolip2]= useState({status:false,text:'',type:''})

  const toggle = () => setShowToolip(!showTooltip);
  const toggle2 = () => setShowToolip2(!showTooltip2);

  const schema = yup.object().shape({
    email: yup.string().required('El correo es obligatorio').email('El correo debe contener un correo valido'),
    password: yup.string().required('La contraseña es requerida')
  })

  const handleChange=(e)=>{
    setForm(
      {
       ...form,
       [e.target.name]:e.target.value
    }
    )
  }

  const loginUser=async(e)=>{
    
    e.preventDefault()
    schema.validate(form).then(res=>{
      setFeedBack(false)
      if(form.email==='test@test.com' && form.password==='test'){
        setLoading(true)
          setTimeout(()=>{
            for (let i = 1; i <= 100; i++) {
            setProgress(i)
            }
          },500)
          
       
        setTimeout(()=>{
          setLoading(false)
          setProgress(0)
        },3000)
        setAlert({status:false})
         setShowToolip({status:false})
         setShowToolip2({status:false})
      }else{
        if(form.email!=='test@test.com'){
          setShowToolip({
            status:true,
            text:'Parece que escribiste mal tu correo. Verificalo!',
            type:'email'
          })
          setShowToolip2({
            status:false
          })
          
        }else if(form.password!=='test'){
          setShowToolip2({
            status:true,
            text:'Parece que escribiste mal tu contraseña. Verificala!',
            type:'password'
          })
          setShowToolip({
            status:false
          })
        }
        
        setAlert(
          {
            status:true,
            text:'Error. email o contraseña incorrecta!',
            type:'danger'
          }
        )
      }
     
    }).catch((err)=>{
     
      setError(err)
      setFeedBack(true)
    })
  
   
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
              <div className=" text-muted mb-1">
                <span className="text-primary">Correo: test@test.com</span>
              </div>
              <div className=" text-muted mb-1">
                <span className="text-primary">Contraseña: test</span>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i id='email' className="ni ni-email-83" />
                      </InputGroupText>
                      <Tooltip placement='left' isOpen={showTooltip.status} autohide={true} target='email' toggle={toggle}>
                        {showTooltip.text}
                      </Tooltip>
                    </InputGroupAddon>
                    <Input
                      invalid={feedback}
                      placeholder='example@example.com'
                      type='email'
                      name='email'
                      // defaultValue={input.email}
                      onChange={(e)=>handleChange(e)}
                      // onKeyDown={submit}
                    />
                    <FormFeedback>{errorMessage.path!=='password'? errorMessage.message:''}</FormFeedback>
                  
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i id="password" className="ni ni-lock-circle-open" />
                      </InputGroupText>
                      <Tooltip placement='left' isOpen={showTooltip2.status} autohide={true} target='password' toggle={toggle2}>
                        {showTooltip2.text}
                      </Tooltip>
                    </InputGroupAddon>
                    <Input
                       invalid={feedback}
                      placeholder='******'
                      type='password'
                      name='password'
                      // defaultValue={input.password}
                      onChange={(e)=>handleChange(e)}
                      // onKeyDown={submit}
                    />
                    <FormFeedback>{errorMessage.path==='password'? errorMessage.message:''}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                {(alert.status) &&
                <Alert color={alert.type}>
                  {alert.text}
                </Alert>}
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
                  {loading ? <Progress striped color="success" value={progress} >{progress} %</Progress> : null}
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
