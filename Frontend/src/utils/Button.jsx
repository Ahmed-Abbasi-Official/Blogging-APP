import React from 'react'
import {Link} from 'react-router-dom'
const Button = ({value , containerClass,to}) => {
  return (
    <Link to={to} className={`${containerClass}`}>{value}</Link>
  )
}

export default Button