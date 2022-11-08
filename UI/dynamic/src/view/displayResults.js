import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,Component
} from "react";

import Header from '../components/header';

 import "../App.css";


import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,LineChart,Line,AreaChart,Area
} from "recharts";

// const DisplayResults = () => {

//   const [first,firstValue] = useState([])


//   (fetch("http://127.0.0.1:5000/outputxml")
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json.robot.statistics.tag.stat)
//         // firstValue(json.robot.statistics.tag.stat)
//       }))
  
  


//   const data = [
//     { name: "Passed", testcase: 4 },
//     { name: "total", testcase: 6 },
//     { name: "Failed", testcase: 2 },

    
//   ];

//   const dataLine = [
//     {
//       "name": "Failed",
//       "Project 1": 20,
//       "Project 2": 2,
      
//     },
//     {
//       "name": "Errors",
//       "Project 1": 30,
//       "Project 2": 18,
      
//     },
//     {
//       "name": "Passed",
//       "Project 1": 40,
//       "Project 2": 60,
      
//     },
    
//   ]

//   return(
//     <div>
//       <p>gopal</p>
//     </div>
//   )

// }





  // return (
    // <>    
    // <Header/>
    //  <div style={{ textAlign: "center" }}>
    //   <h1>Test Case Details</h1>
    //   <div className='display-style'>
        
    //     <BarChart
    //       width={300}
    //       height={200}
    //       data={data}
    //       margin={{
    //         top: 5,
    //         right: 30,
    //         left: 80,
    //         bottom: 5,
    //       }}
    //       barSize={20}
    //     >
    //       <XAxis
    //         dataKey="name"
    //         scale="point"
    //         padding={{ left: 10, right: 10 }}
    //       />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <Bar dataKey="testcase" fill="#8884d8" background={{ fill: "#eee" }} />
    //     </BarChart>
    //     <ul className='display-list'>
    //       {data.map(eachResult=>(
    //         <li className='display-list'>
    //           {eachResult.name} : {eachResult.testcase}%
    //         </li>
    //       ))}
    //     </ul>
    //     <PieChart width={400} height={500}>
    //       <Pie
    //         dataKey="testcase"
    //         isAnimationActive={false}
    //         data={data}
    //         cx={200}
    //         cy={200}
    //         outerRadius={80}
    //         fill="#8884d8"
    //         label
    //       />
    //       <Tooltip />
    //     </PieChart>                                   
    //     <LineChart width={400} height={250} data={dataLine}
    //       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <XAxis dataKey="name" />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       <Line type="monotone" dataKey="Project 1" stroke="#8884d8" />
    //       <Line type="monotone" dataKey="Project 2" stroke="#82ca9d" />
    //     </LineChart>
    //     <AreaChart width={730} height={150} data={dataLine}
    //       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    //       <defs>
    //         <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
    //           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
    //           <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    //         </linearGradient>
    //         <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
    //           <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
    //           <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    //         </linearGradient>
    //       </defs>
    //       <XAxis dataKey="name" />
    //       <YAxis />
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <Tooltip />
    //       <Area type="monotone" dataKey="Project 1" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    //       <Area type="monotone" dataKey="Project 2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    //     </AreaChart>

    //   </div>
    // </div> 
    // </>
      
  // );
