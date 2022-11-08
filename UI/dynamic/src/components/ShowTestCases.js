
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,Component
} from "react";

import "../App.css";


const ShowTestCases = props => {
  const {fileName,testCase,selectedTestCase} = props
  const [noRender,renderTest] = useState(false)
  const [value,selectedValue] = useState("")
  
  

  const changeStatus = () => {
    renderTest(!noRender);
  }

  const selectedTestCaseInput = (event) => {
  
     
    if(event.target.checked){
      selectedTestCase(event.target.value,fileName)
    }
    
  }

  return(
    <div>
          <button type="button" onClick={changeStatus} className="but">{fileName}</button>
          {noRender && (<ul className='display-list-testcase'>
            {testCase.map(eachTestcase => (
              <li className="list-style" >
                  <input  type="checkbox" className='input-style'  id={eachTestcase} value={eachTestcase} onClick={selectedTestCaseInput}/>
                  <label htmlFor={eachTestcase}>{eachTestcase}</label></li>

            ))}
          </ul>)}
          
          </div>
  )
}


export default ShowTestCases