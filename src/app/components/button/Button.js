import React from 'react'

const Button = ({text, icon,  ...btnInfo}) => {
  return (
    <>
      <button
      {...btnInfo}
      >
        {icon} {text}
      </button>
    </>
  )
}

export default Button