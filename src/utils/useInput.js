// @ts-nocheck
import { useState } from 'react'
import Joi from '@hapi/joi'

export default (schema, submit) => {
  const [state, setState] = useState({ errors: {} })

  const validate = () => {
    if (schema) {
      const validationState = Object.entries(state).reduce((x, u) => {
        if (u[0] !== 'errors') { x[u[0]] = u[1] }
        return x
      }, {})
      const { error } = Joi.validate(validationState, schema, { abortEarly: false })
      if (error) {
        setInputs()
        return false
      }
      return true
    }
    throw new Error('Validate function is only available when a schema is provided')
  }

  const setInputs = (e) => {
    // Prevent default
    // if (e) { e.preventDefault() }
    // set default values
    let value = ''
    let name = ''
    // assign new values
    if (e) {
      value = e.target.value
      name = e.target.name
    }
    // declare new state
    let newState
    if (!name) {
      newState = { ...state }
    } else { newState = { ...state, [name]: value } }

    if (schema) {
      const { error: { details } } = Joi.validate(newState, schema, { abortEarly: false })
      const error = details.reduce((x, u) => { x[u.path] = u.message; return x }, {})
      // delete the errors subkey
      delete error.errors
      setState({ ...newState, errors: error })
    } else {
      setState({ ...newState })
    }
  }

  return [state, setInputs, validate]
}
