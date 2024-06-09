import React from 'react'
import {PieChart,Pie} from 'recharts';



function Abc() {
   const data01 = [
     { name: 'Group A', value: 4000 },
     { name: 'Group B', value: 300 },
     { name: 'Group C', value: 300 },
     { name: 'Group D', value: 200 },
   ];
    const data02 = [
      { name: 'A1', value: 100 },
      { name: 'A2', value: 300 },
      { name: 'B1', value: 100 },
      { name: 'B2', value: 80 }
    ];
  return (
    <div>
      <h2>Social media users</h2>
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" isAnimationActive={true} cx="50%" cy="50%" outerRadius={60} fill="#FFFFF" />
           <Pie data={data02} dataKey="value" isAnimationActive={true} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#FFA500" label /> 
        </PieChart> 
       
    </div>
  )
}

export default Abc