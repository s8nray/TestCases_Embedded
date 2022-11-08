
import React,{Component} from 'react'
import Header from './header';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneExtremeRight,
  SplitPaneTop,
  // SplitPaneRTop,
  SplitPaneRBottom,
} from "./splitPane";



import "../App.css";

class MyHomePublic extends Component {
  

  showSplitPane= ()=>{
    const {projectNameFile,selectedNameFile,selectedFolder} = this.props
    console.log(projectNameFile)
    return(
      <>
      <SplitPane className="split-pane-row">
              <SplitPaneLeft>
                <SplitPane className="split-pane-col">
                  <SplitPaneTop  sendProps={projectNameFile}/>
                  <Divider className="separator-row" />
                  <SplitPaneBottom />
                </SplitPane>
              </SplitPaneLeft>
              <Divider className="separator-col" />
              <SplitPaneRight sendTestCase={selectedNameFile} />
              <Divider className="separator-col" />
              <SplitPaneExtremeRight >
                <SplitPane className="split-pane-col">
                    
                    <Divider className="separator-row" />
                    <SplitPaneRBottom />
                  </SplitPane>
              </SplitPaneExtremeRight>
            </SplitPane></>
      
    )
  }
  

  render() {
      const {projectNameFile} = this.props
      console.log(projectNameFile)
    return (
      <>
        {/* <Header /> */}

        {/* <div className="App"> */}
        {this.showSplitPane()}
            
        {/* </div> */}
      </>
    );
  }
}

export default MyHomePublic;