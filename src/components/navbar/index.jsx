import React, { useState, useContext, useEffect } from 'react'
import './style.css'
import { AppContext } from '../../AppContext'

const Navbar = () => {
  const { rides, setRidesData, user, getDistance } = useContext(AppContext)
  const [selection, setSelection] = useState('Nearest')
  const [filterActive, setFilterActive] = useState(false)
  const [cityList, setCityList] = useState()

  const ridesData = rides
  let userStation = user?.data?.station_code

  const statesList = [...new Set(rides?.map((item) => item?.state))]
  const citiesList = [...new Set(rides?.map((item) => item?.city))]

  useEffect(() => {
    setCityList(citiesList)
  }, [])

  const nearestRides = () => {
    const rideDistance = rides?.map((obj) => ({ ...obj, distance: `${getDistance(userStation, obj?.station_path)}` }))
    const sortedRides = rideDistance?.sort((a, b) => {
      return a.distance - b.distance
    })
    // console.log('SR=>', sortedRides)
    setSelection('Nearest')
    setRidesData(sortedRides)
  }

  const upcomingRides = () => {
    const upcomingRides = ridesData?.filter((ride) => {
      var today = new Date()
      var rideDate = new Date(ride.date)
      return rideDate > today
    })
    setRidesData(upcomingRides)
    setSelection('Upcoming')
  }
  const pastRides = () => {
    const pastRidesData = ridesData?.filter((ride) => {
      var today = new Date()
      var rideDate = new Date(ride.date)
      return rideDate < today
    })
    const pastRides = pastRidesData?.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    setRidesData(pastRides)
    setSelection('Past')
  }

  // ----Filters----
  const toggleFilter = () => {
    setFilterActive(!filterActive)
    setSelection('Filters')
  }
  // --state filter--
  const handleStateChange = (e) => {
    //--Get all rides by state
    const ridesByState = rides?.filter((ride) => {
      return ride.state === e.target.value
    })
    setRidesData(ridesByState)
    //--Get all rides from the state that is selected
    const cities = ridesData?.filter((ride) => {
      return ride.state === e.target.value
    })
    //Get all the cities from the selected state
    const cityListByState = [...new Set(cities?.map((item) => item?.city))]
    setCityList(cityListByState)
  }
  // --city filter--
  const handleCityChange = (e) => {
    const ridesByCity = ridesData?.filter((ride) => {
      return ride.city === e.target.value
    })
    setRidesData(ridesByCity)
  }

  // console.log(rides)
  return (
    <div className="containerr">
      <div className="btn-container">
        <button onClick={nearestRides} className={`btn ${selection === 'Nearest' && 'active'}`}>
          Nearest Rides
        </button>
        <button onClick={upcomingRides} className={`btn ${selection === 'Upcoming' && 'active'}`}>
          Upcoming Rides
        </button>
        <button onClick={pastRides} className={`btn ${selection === 'Past' && 'active'}`}>
          Past Rides
        </button>
      </div>
      <div className="filter_container">
        <button onClick={toggleFilter} className={`btn filters ${selection === 'Filters' && 'active'}`}>
          Filters
        </button>
        {filterActive && (
          <div className="filters_modal">
            <div className="border">Filters</div>
            <select onChange={handleStateChange} defaultValue={'State'} className="select" name="state" id="">
              <option disabled>State</option>
              {statesList.map((state, i) => {
                return (
                  <option key={i} value={state}>
                    {state}
                  </option>
                )
              })}
            </select>
            <select onChange={handleCityChange} defaultValue={'City'} className="select" name="city" id="">
              <option disabled>City</option>
              {cityList?.map((city, i) => {
                return (
                  <option key={i} value={city}>
                    {city}
                  </option>
                )
              })}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
