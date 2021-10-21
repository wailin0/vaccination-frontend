import React, {useEffect, useState} from "react";
import { LineChart, Line, CartesianGrid, XAxis } from 'recharts';
import vaccinatedUserService from "../services/vaccinatedUser";

const Dashboard = () => {
  
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    vaccinatedUserService.countUsers()
      .then(result => {
        setCounts(result)
      })
  }, [])

  const data = [
    {name: '', value: 0}, {name: '', value: 120}, {name: '', value: 50}, {name: '', value: 90}, {name: '', value: 20},
    {name: '', value: 30}, {name: '', value: 0}
  ]

  if(!counts) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
      <div className="dashboard-container">
        <div className="shotcut-container">
          <div className="shotcut">
            <p>{counts.calcuatedScannedCount}</p>
            <p>Total QR Scan Count</p>
          </div>
          <div className="shotcut">
            <p>{counts.totalVaccinated}</p>
            <p>Total Vaccinated</p>
          </div>
          <div className="shotcut">
            <p>{counts.fristVaccinatedCount}</p>
            <p>Total Vaccination Step 1</p>
          </div>
          <div className="shotcut">
            <p>{counts.secondVaccinatedCount}</p>
            <p>Total Vaccination Complate</p>
          </div>
        </div>
        <div className="chart-container">
          <LineChart width={1000} height={300} data={data}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
            </LineChart>
        </div>
      </div>
  )
}

export default Dashboard