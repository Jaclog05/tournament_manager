import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";

function QuickStatCard({amount, label}) {
  return (
    <div
      className="card d-flex justify-content-center align-items-center"
      style={{width: '180px'}}
    >
      {amount ? <h1>{amount}</h1> : <FaCirclePlus style={{fontSize: '2rem'}}/>}
      {label}
    </div>
  )
}

export default QuickStatCard