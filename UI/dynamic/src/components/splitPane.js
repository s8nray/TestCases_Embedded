import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,Component
} from "react";
import SplitPaneContext from "./splitPaneContext";
import Button from '@mui/material/Button';
import Progressbar from '../components/progressbar';
import CheckboxTree from 'react-checkbox-tree';
import reactDom from "react-dom";
import reactRouterDom from "react-router-dom";
import { ConstructionRounded } from "@mui/icons-material";
import { render } from "@testing-library/react";
import { padding } from "@mui/system";



const SplitPane = ({ children, ...props }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};




export const SplitPaneTop = (props) => {
  const {sendProps} = props
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const projectList = [sendProps]
  
  

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  return (
    
    <div {...props} className="split-pane-top" ref={topRef}>
      <h1>Projects:</h1>
      
      <ul>
        {projectList.map((el, i) => {
          return (
            <li key={i}>
              <a href="#" onClick={() => el}>
                {el}
              </a>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

// export const SplitPaneRTop = (props) => {
 
//     const topRef = createRef();
//     const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
//     const projectList = ["Project1", "Project2", "Project3"]
  
//     useEffect(() => {
//       if (!clientHeight) {
//         setClientHeight(topRef.current.clientHeight);
//         return;
//       }
  
//       topRef.current.style.minHeight = clientHeight + "px";
//       topRef.current.style.maxHeight = clientHeight + "px";
//     }, [clientHeight]);
  
//     return (
//       <div {...props} className="split-pane-top" ref={topRef}>
//         <h1>Automation Details:</h1>
//         <ul>
//           {projectList.map((el, i) => {
//             return (
//                 <div> Automation Details </div>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   };



export const SplitPaneBottom = (props) => {

  return (
    <div {...props} className="split-pane-bottom">
        <b>Project Details : </b>
         <div> Project1 Details </div>
    </div>
  );
};


export const SplitPaneRBottom = (props) => {

    return (
      <div {...props} className="split-pane-bottom" >
          {/* <Button variant="contained" onClick={() => this.nextPrev("next")}>
            Run
          </Button>

            <div className="title">Test Case Progess:</div> */}
            <Progressbar />
            <Button variant="contained" onClick={event =>  window.location.href='/dashboard'}>
            Go to Results Dashboard
          </Button>
      </div>
      
    );
  };

export const SplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }
    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};




export const SplitPaneRight = (props) => {

 
  const {sendTestCase} = props
  const [checked, setChecked] = useState([]);
  const [noRender,renderTest] = useState(false)
 
  const checkList = [sendTestCase , ];
  
  
  const handleCheck = (event) => {
    var updatedList = [...checked];
    
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    renderTest(!noRender);
    
    
  };

  const testItems = () => (
    <div style={{marginLeft:"150px"}}>
    <input type="checkbox" style={{marginRight:"6px"}}/>
    <label  >testcase1 </label>
    <br/>
    <input type="checkbox"  style={{marginRight:"6px"}}/>
    <label >testcase2 </label>
    <br/>
    <input type="checkbox"  style={{marginRight:"6px"}}/>
    <label>testcase3 </label>
    <br/>
    <input type="checkbox"  style={{marginRight:"6px"}}/>
    <label >testcase4 </label>
    
    
    </div>
    
  )


  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
         return (total + ", " + item);
       
      })
    : "";

 

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div {...props} className="split-pane-right">
        <div className="checkList">
            <div className="title">Test Cases:</div>
                <div className="list-container">
                {checkList.map((item, index) => (
                    <div key={index}>
                    <input value={item} type="checkbox" onChange={handleCheck} id="testcase" />
                    <label className={isChecked(item)}  htmlFor="testcase">{item}</label>
                    </div>
                ))}
                </div>
            </div>
        <div>
            {`Selected Test Cases : ${checkedItems}`}
            
            <br/>
           
            {/* {noRender.toString() === "true" ? testItems() : '' } */}
            {noRender === true ? testItems() : ""}
        </div>
      
    </div>
  );
};





export const SplitPaneExtremeRight = (props) => {

    return (
      <div {...props} className="split-pane-exright">
   
      </div>
    );
  };

export default SplitPane;
