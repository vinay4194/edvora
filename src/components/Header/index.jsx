import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import { AppContext } from '../../AppContext'

const Home = () => {
  const { user } = useContext(AppContext)
  return (
    <div className="header">
      <h1>Edvora</h1>
      <div className="login_info">
        <p>{user?.data?.name}</p>
        <img src={user?.data?.url} alt="" />
      </div>
    </div>
  )
}

export default Home
