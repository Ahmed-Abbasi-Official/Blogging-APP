import React from 'react'

const Button = ({value , containerClass}) => {
  return (
    <div className={`${containerClass}`}>{value}</div>
  )
}

export default Button