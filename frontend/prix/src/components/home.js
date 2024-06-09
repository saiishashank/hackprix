import React,{useEffect,useState} from 'react'
import classes from '../css/home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import img1 from '../images/logoo.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {PieChart,Pie} from 'recharts';
function Home() {
  
    const navigate = useNavigate();
    let user = useSelector(state => state.doc);

    let userName = '';
    if (user && user.length > 0) {
       userName = user[0].name
       }
     
    const [bpLevel, setBpLevel] = useState('');
    const [sugarLevel, setSugarLevel] = useState('');
  
    const handleBpLevelChange = (e) => {
      setBpLevel(e.target.value);
    };
  
    const handleSugarLevelChange = (e) => {
      setSugarLevel(e.target.value);
    };
    const handleAddBpLevel = async () => {
      axios.patch('http://localhost:8000/api/user/Bp', {
        // Extra data to send with the request
          bp:bpLevel
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
 
     
        console.log(`BP Level: ${bpLevel}`);
      };
    
      const handleAddSugarLevel = () => {
        axios.patch('http://localhost:8000/api/user/Sugar', {
          // Extra data to send with the request
            sugar:sugarLevel
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
      
        console.log(`Sugar Level: ${sugarLevel}`);
      };
    
        const [date, setDate] = useState(new Date());
      
        const onChange = (newDate) => {
          setDate(newDate);
        };
        const data02 = [
          { name: 'Shasank', Svalue: 200 },
          { name: 'charan', Svalue: 150 },
          { name: 'varshit', Svalue: 100 },
          { name: 'manoj', Svalue: 160 },
        ];
         const data01 = [
           { name: 'shasank', bvalue: 120/90 },
           { name: 'charan', bvalue: 180/80 },
           { name: 'varshit', bvalue: 100/80 },
           { name: 'manoj', bvalue: 160 }
         ];
  return (

    <div className={`${classes.container}`}>
      <nav className={`${classes.nav}`}>
        <div >
   <img src={img1} alt="" className={`${classes.logo}`}/>
        </div>
     <button onClick={()=>navigate("/login1")} className={`${classes.logout}`} >Logout</button>
  
</nav>
<div className={`${classes.outer}`}>

<div className={`${classes.username}`}>  {userName}</div>
<div className={`${classes.inner}`} >
<Calendar
        onChange={onChange}
        value={date}
        className={`${classes.cal}`}/>
      
<i>Mediflex platform which helps the users to make ease in taking appointments from home  </i>
</div>
</div>

<div className={`${classes.graphs}`}>
    <div className={`${classes.level}`}>
    <div>know your health tracks</div>
    <div className={`${classes.inputs}`}>

    <label className={`${classes.labels}`} id={`${classes.label1}`}>Add Your BP Level : </label>

        <input type='number' value={bpLevel} onChange={handleBpLevelChange} className={`${classes.label1}`} />
        <button className={`btn btn-success ${classes.btnlevel}`} onClick={handleAddBpLevel} >add</button>
    </div>
    
  <div className={`${classes.inputs}`}>

    <label className={`${classes.labels}`}>Add Your Sugar Level : </label>
    
        <input type='number'  value={sugarLevel} onChange={handleSugarLevelChange}/>
        <button className={`btn btn-success ${classes.btnlevel}`} onClick={handleAddSugarLevel}>add</button>
  </div>
    </div>
    <div className={`${classes.pie}`} ><label>Analysis of BP/SUGAR</label> <PieChart className={`${classes.piechart}`} width={400} height={400}>
            <Pie data={data01} dataKey="bvalue" isAnimationActive={true} cx="50%" cy="50%" outerRadius={60} fill="#FFFFF" />  
           <Pie data={data02} dataKey="Svalue" isAnimationActive={true} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#FFA500" label /> 
        </PieChart></div>
        
</div>

<div className={`${classes.appointment}`}>
     <div>
        get a qiuck appointment with the best doctors
     </div>
     <div className={` ${classes.aptbttn}`}>
        <button className={`btn btn-success ${classes.aptbtn} `}onClick={()=>{navigate("/appointments")}} >Get Appointment</button>
     </div>
</div>
   <Outlet />
    </div>
  )
}

export default Home
