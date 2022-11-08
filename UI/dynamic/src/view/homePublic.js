
import React from 'react'
import Header from '../components/header';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneExtremeRight,
  SplitPaneTop,
  // SplitPaneRTop,
  SplitPaneRBottom,
} from "../components/splitPane";



import "../App.css";

class HomePublic extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Header />

        {/* <div className="App"> */}
            <SplitPane className="split-pane-row">
              <SplitPaneLeft>
                <SplitPane className="split-pane-col">
                  <SplitPaneTop />
                  <Divider className="separator-row" />
                  <SplitPaneBottom />
                </SplitPane>
              </SplitPaneLeft>
              <Divider className="separator-col" />
              <SplitPaneRight/>
              <Divider className="separator-col" />
              <SplitPaneExtremeRight >
                <SplitPane className="split-pane-col">
                    {/* <SplitPaneRTop/> */}
                    <Divider className="separator-row" />
                    <SplitPaneRBottom />
                  </SplitPane>
              </SplitPaneExtremeRight>
            </SplitPane>
        {/* </div> */}
      </>
    );
  }
}

export default HomePublic;