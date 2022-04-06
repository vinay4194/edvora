import React from 'react'
import './style.css'

const Card = ({ rideData }) => {
  // console.log(rideData)
  return (
    <div className="card_container">
      <div className="img_container">
        <img src={rideData?.map_url} alt="" />
      </div>
      <div className="card_content">
        <ul>
          <li>Ride id:{rideData?.id}</li>
          <li>Origin station:{rideData?.origin_station_code}</li>
          <li>Station path:{rideData?.station_path.toString()}</li>
          <li>Date: {rideData?.date}</li>
          <li>Distance: {rideData?.distance}</li>
        </ul>

        <div className="more_info">
          <p className="chip">{rideData?.city}</p>
          <p className="chip">{rideData?.state}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
