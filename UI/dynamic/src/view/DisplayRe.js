import React from 'react'
import {Component} from 'react'
import Button from '@mui/material/Button';
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
  import "../App.css";


class DisplayRe extends Component{

    state={
        fetchedData:[],getTestChart:false,finalList:[]
    }


    startProgress = async() => {
        (fetch("http://127.0.0.1:5000/outputxml")
            .then((res) => res.json())
            .then((json) => {
                console.log(json.report)
                const dataFetched = json.report
                
                {for (let eachRobot of dataFetched){
                    this.setState(prevState => ({
                    fetchedData : [...prevState.fetchedData,eachRobot.robot.statistics.suite.stat]
                //["@pass"]
                }))
                    
                }}
               
                
            }))
        this.setState(prevState => ({getTestChart:!prevState.getTestChart}))
        
    }

    render(){
        const {fetchedData,getTestChart} = this.state 
        
        console.log(fetchedData)
        return(
        <div>
            <Button  variant="contained" onClick={this.startProgress} style={{textAlign:"center"}}>Get Report and Chart Data </Button>
            {getTestChart && (
                <div className='display-chart'>
                <BarChart
                      width={650}
                      height={300}
                      data={fetchedData}
                      margin={{
                        top: 45,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        dataKey="@name"
                        scale="point"
                        padding={{ left: 5, right: 5 }}
                      />
                      <YAxis  />
                      <Tooltip />
                      <Legend
                        wrapperStyle={{
                          paddingTop: 10,
                          textAlign: "center",
                          fontSize: 12,
                          fontFamily: "Roboto"
                        }}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar dataKey="@pass" fill="#82ca9d" name="Pass" />
                      <Bar dataKey="@fail" fill="#fc0373" name="Fail"/>
                    </BarChart>
                    <ul className="list-style-chart">
                          {fetchedData.map(eachResult=>(
                             <li className='display-list'>
                                <span className='style-span'>{eachResult["#text"]} :</span> {eachResult["@pass"]}  passed , {eachResult["@fail"]}  failed , {eachResult["@skip"]}  skipped
                             </li>
                           ))}
                        </ul>
                        
        <LineChart width={850} height={250} data={fetchedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="#text" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="@pass" stroke="#82ca9d" />
          <Line type="monotone" dataKey="@fail" stroke="#fc0373" />
        </LineChart>
        <AreaChart width={850} height={150} data={fetchedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fc0373" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="#text" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="@pass" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="@fail" stroke="#fc0373" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
                        
                        </div>
            )}
        </div>)
    }
    

}

export default DisplayRe 
//8884d8 82ca9d fc0373