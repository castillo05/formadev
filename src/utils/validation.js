import Joi from '@hapi/joi';

const handleError=(error)=>{
    return error.map((error)=>{
        const {type, flags:{label},context:{name}}=error
      
        switch (type){
            case 'any.required':
                return { message: `El campo ${label} es requerido` }
              case 'any.allowOnly':
                return { message: `El campo ${label} debe de ser igual al campo contraseña` }
                case 'string.regex.base':
                  return { message: `El campo ${label} debe cumplir los requisitos minimos` }
                  
              case 'any.empty':
                return { message: `El campo ${label} no puede estar vacio` }
              default:
                return error
        }
    })
}

export default {
    schema:{
        username:Joi.string().required().label('username').error((e)=> handleError(e)),
        email:Joi.string().required().label('Email').error((e)=> handleError(e)),
        password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).options({
         
        }).label('password').error(new Error()),
        passwordLogin:Joi.string().required().label('Contraseña').error((e)=> handleError(e))
    },
    createSchema: (args) => {
      return Joi.object().keys({
        ...args
      })
    }
}
