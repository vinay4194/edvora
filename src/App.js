import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Navbar from './components/navbar'
import Card from './components/card'
import './index.css'
import { getRidesData, getUserData } from './api'
import { AppContext } from './AppContext'

export default function App() {
  const [rides, setRides] = useState()
  const [ridesData, setRidesData] = useState()
  const [user, setUser] = useState()

  //This will return the shortest distance of a ride from the user's location 
  const getDistance = (user, ride) => {
    const closest = ride.reduce((a, b) => {
      return Math.abs(b - user) < Math.abs(a - user) ? b : a
    })
    return Math.abs(closest - user)
  }

  useEffect(() => {
    getUserData().then((userdata) => {
      setUser(userdata)
      
      getRidesData().then((data) => {
        //--This will add a distance element to the array representing the distance from the user's location--
        const rideDistance = data?.data?.map((obj) => ({ ...obj, distance: `${getDistance(userdata?.data?.station_code, obj?.station_path)}` }))
        const sortedRides = rideDistance?.sort((a, b) => {
          return a.distance - b.distance
        })
        // console.log(user.data.station_code)
        setRides(rideDistance)
        setRidesData(sortedRides)
      })
    })
  }, [setRidesData])

  return (
    <div className="container">
      <AppContext.Provider value={{ rides, setRides, setRidesData, user, getDistance }}>
        <Header />
        <Navbar />
        {ridesData?.map((ride, i) => (
          <Card key={i} rideData={ride} />
        ))}
      </AppContext.Provider>
    </div>
  )
}
