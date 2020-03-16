import Joi from 'joi-browser';

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
        password:Joi.string().required().regex(/^(?=.*?[a-z]).{,6}$/,'debil').regex(/^(?=.*?[A-Z]).{,8}$/,'media').regex(/^(?=.*?[#?!@$%^&*-]).{,10}$/,'fuerte').options({
          language: {
            string: {
              regex: {
                
                debil: 'debil',
                media: 'media',
                fuerte: 'fuerte'
              }
            }
          }
        }).label('password').error((e)=> {
         
          e.forEach(err => {
            console.log(err);
            switch (err.context.name) {
              case 'debil':
                err.message='Debil' 
                break;
              case 'media':
                err.message='Media' 
                break;
              case 'fuerte':
                 err.message='Fuerte'
                 break; 
              default:
                err.message='Bien hecho'
                break;
            }
                           
          });
          return handleError(e)
        }),
        passwordLogin:Joi.string().required().label('Contraseña').error((e)=> handleError(e))
    },
    createSchema: (args) => {
      return Joi.object().keys({
        ...args
      })
    }
}
