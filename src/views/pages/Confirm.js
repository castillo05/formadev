// @ts-nocheck

import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';


const Confirm = (props) => {
   
    // console.log(props.match.params.email)
    const email=props.match.params.email;
    const form={email:email}
    const [url, setUrl] = useState('https://localhost:44354/api/Auth/register/confirm');
    const [alert,setAlert]=useState({status:false,text:'',description:'',type:''})

    const postConfirm=async()=>{
        
        try {
            
            const req=await axios.post(url,JSON.parse(JSON.stringify(form)),{
                headers:{'Content-Type':'application/json'}
            });
            if(req.data.message){
                return setAlert({status:true,text:'Error!',description:req.data.message,type:'danger'})
            }
            props.history.push('/auth/login')
            console.log(req)
        } catch (error) {
            setAlert({status:true,text:'Error!',description:'Disculpa al parecer a ocurrido un error al confirmar tu correo electronico, por favor ponte en contacto con nosotros lo antes posible Gracias...!',type:'danger'})
            console.log(error)
        }
       
    }

    useEffect(() => {
       
        postConfirm();
       
    }, []);
    return (
        <>
        {(alert.status) && 
             <Alert color={alert.type}>
        <h4 className="alert-heading">{alert.text}</h4>
        <p>
         {alert.description}
        </p>
        <hr />
        <p className="mb-0">
          https://forma.dev/
        </p>
      </Alert>
        }
       </>
    );
};

export default Confirm;