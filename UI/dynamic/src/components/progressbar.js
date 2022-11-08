import { bgcolor, color } from '@mui/system'
import React from 'react'
import {Component} from 'react'
import Button from '@mui/material/Button';
import RestServices from '../service/restServices'
import ShowTestCases from './ShowTestCases';
import axios from 'axios';

class Progress_bar extends Component{
  state={progressBarWidth:0,progressEnded:false, items: [],selectedTestCaseList:[],selectedTestDict:[],
    DataisLoaded: false}

  incrementInPercentage = () =>{
    const {progressBarWidth,progressEnded} = this.state
    if(progressBarWidth == 100 ){
      clearInterval(this.intervalId)
      this.setState({progressEnded:true})
    }else{
    this.setState(prevState=>({progressBarWidth:prevState.progressBarWidth+100}))
    }
  }


  startProgress = async() =>{
    const restServices = new RestServices();
    const {progressEnded} = this.state
   
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({items:json.data,DataisLoaded:true})
      })
    
   
    
    if(progressEnded == false){
    // for(var i = 0 ; i <= 99 ; i ++){
    //   this.setState(prevState=>({progressBarWidth:prevState.progressBarWidth+1}))
      this.intervalId = setInterval(this.incrementInPercentage,1000)
    }
  
    this.setState({progressEnded:true})
  }

  selectedTestCase = (value,fileName) => {
       this.setState(prevState => ({
         selectedTestDict : [...prevState.selectedTestDict,{"FileName":fileName,"TestName":value}]}))
    
}

  startExecution = () => {
    const {selectedTestCaseList,selectedTestDict} = this.state
    return(
      axios.post(`http://localhost:5000/triggerTestCase/${selectedTestDict}`, JSON.stringify({selectedTestDict}))
      .then((data) => {
          console.log(data)
      })
      .catch((err) => {
          console.log(err)
      } )

      //
 
      )
  }

  render(){
    const {progressBarWidth, selectedTestCaseList,selectedTestDict, items} = this.state
  
   
    return(
      <div>
      <Button  variant="contained" onClick={this.startProgress} >Get TestCases</Button>
      <Button variant='contained' onClick={this.startExecution} style={{marginLeft:10}}>Execute TestCases</Button>
      
      <div className="title">Test Case Progess:</div>
      <div  style={{ backgroundColor: "whitesmoke", width: '30%', borderRadius:'10%',margin:50, height: '30%'}}> 
        <div  style={{ background: '#66b86a', width:`${progressBarWidth}%`, height: '100%' , textAlign:'center'}}>
          <span style={{padding:'10' , color : 'black' , fontWeight : 900 ,textAlign:'center'}}>{`${progressBarWidth}%`}</span>
        </div>
      </div>
      
      <ul>
        {items.map(eachI => (
          <ShowTestCases fileName={eachI.fileName} testCase={eachI.testName} selectedTestCase={this.selectedTestCase}/>
        ))}
      </ul>
      
      </div>
    )
  }
}
export default Progress_bar;
 


// import React from 'react'
  
// const Progress_bar = ({bgcolor,progress,height}) => {
     
//     const Parentdiv = {
//         height: height,
//         width: '30%',
//         backgroundColor: 'whitesmoke',
//         borderRadius: 40,
//         margin: 50
//       }
      
//       const Childdiv = {
//         height: '100%',
//         width: `${progress}%`,
//         backgroundColor: bgcolor,
//        borderRadius:40,
//         textAlign: 'right'
//       }
      
//       const progresstext = {
//         padding: 10,
//         color: 'black',
//         fontWeight: 900
//       }
        
//     return (
//     <div style={Parentdiv}>
//       <div style={Childdiv}>
//         <span style={progresstext}>{`${progress}%`}</span>
//       </div>
//     </div>
//     )
// }
  
// export default Progress_bar;
