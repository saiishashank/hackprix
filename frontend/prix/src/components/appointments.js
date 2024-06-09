import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import classes from '../css/appointments.module.css'
import axios from 'axios'

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]); // Array to store doctors

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    }
    axios.get('http://localhost:8000/api/doctor/',config)
     .then(data =>  {
       
         // Access the "allUser" array from the response
         const doctors = data.data.allUser;
         console.log(doctors)
         setAppointments(doctors); // Update appointments state
      })
      .catch(error => console.error(error)); // Handle errors
  }, []);

  const [datee,setdate] = useState('');

  const handledate = (e)=>{
    setdate(e.target.value)
  }

  const handleaddDate = ()=>{
    axios.patch(`http://localhost:8000/api/doctor/update/6664c09b7a3dea96eeee2c93`, {
      // Extra data to send with the request
        date:datee
    }, {
      // Config object with JWT token and other settings
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Replace with your JWT token
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => console.error(error));
    console.log(datee);
  }

  return (
    <div className="container">
      <h1 className="text-center"> Make Appointment</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Doctor Name</th>
            <th scope="col" className="text-center">Contact Number</th>
            <th scope="col" className="text-center">Enter Date</th>
            <th scope="col" className="text-center">Get Appointment</th>
          </tr>
        </thead>
        {appointments.length > 0 ? (
          <tbody>
            {appointments.map((doctor, index) => (
              <tr key={doctor._id}>
                <td className="text-center">{doctor.name}</td>
                <td className="text-center">{doctor.contactnumber}</td>
                <td className="text-center">
                  <input type="date" onChange={handledate} className="form-control" />
                </td>
                <td className="text-center">
                  <button className="btn btn-success" data-id={doctor._id} onClick={handleaddDate}>Get Appointments</button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="text-center">No appointments found</p>
        )}
      </table>
    </div>
  );
};

export default Appointments;