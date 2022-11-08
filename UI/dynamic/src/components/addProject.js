import React from 'react';
import { Modal, Button } from "react-bootstrap";
import MyHomePublic from "../components/MyHomePublic"

import "../index.css"




class AddProject extends React.Component {

    constructor(props) {
        super(props)
      
        
    }

     

    state = {
        isOpen: true,
        submitBtn: false,
        projectName:'',
        selectedFile:'',
        displayHome:false,
        selectedFolder:null,
      };

    
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });

      onchangeTextInput = event => {

        this.setState({projectName:event.target.value})

      }

      onselectedFile = event => {
        this.setState({selectedFile:event.target.value})
        
      }
      
      
      

      nextPrev(type) {
        const {projectName,submitBtn,selectedFile} = this.state
        if(type === "next" && projectName !== "") {
          this.setState({submitBtn:true,})
          
          
          
          
        } else {
          this.setState({
            submitBtn: false
          })
        } 
      }

       
      displayHomePage = () =>{
        this.setState(prevState=>({displayHome:!prevState.displayHome}))
      }

    
      render() {
        const {displayHome,projectName,selectedFile,selectedFolder} = this.state
        
      
          if (displayHome ){
            return(
              
            <MyHomePublic projectNameFile={projectName} selectedNameFile={selectedFile}  />)
          
          }else{
            return(
          <>
              <div style={{ background: "#b4b4b4", width: '80%', margin: '5%',marginBottom:'5%', height:"60vh"}} show={this.state.isOpen} onHide={this.closeModal} >
                      <div className="button-close">
                        <Button variant="secondary"  onClick={this.closeModal}>
                          Close
                      </Button>
                      </div>

                      <div className='main-container'>
                        <div className="fast-text-container">
                          
                          <div>
                            <p className='fast-text'>FAST</p>
                            <p className='fast-text-10'>Framework Automation of Software Testing</p>
                          </div>
                          
                        </div>
                       

                        <div className="input-text-container">
                          
                        {this.state.submitBtn === false &&
                          <div >
                            <div>
                              <label >Project Name :    </label>
                              <br/>
                              <input type="text" placeholder="project name"  className="dotted-text-box" onChange={this.onchangeTextInput}/>
                            </div>
                            <div>
                                <label htmlFor="login-field">Test Scripts Path :    </label>
                                <br/>
                                <input  placeholder="scripts" onChange={this.onselectedFile}  className="dotted-text-box"  />
                            </div>
                          </div>
                          }

                          {this.state.submitBtn === true &&
                          <div >
                            <div>
                              <label>Version :    </label>
                              <br/>
                              <input type="text" placeholder="version details"  className="dotted-text-box"  />
                            </div>
                            <div>
                                <label htmlFor="login-field">Extra Plugins :    </label>
                                <br/>
                                <input type="text" placeholder="plugin details"  className="dotted-text-box"/>               
                            </div>
                          </div>
                          }
                        

                        <div className="button-text-container">
                        {this.state.submitBtn === false &&
                              <Button variant="secondary"   onClick={() => this.nextPrev("next")}>
                                Next
                              </Button>
                            }
                            {this.state.submitBtn === true &&
                              <div>
                                <Button variant="secondary" onClick={() => this.nextPrev("prev")}>
                                  Prev
                                </Button>
                                <Button variant="secondary"   onClick={this.displayHomePage} >
                                  Submit
                                </Button>
                              </div>
                            }
                        </div>
                        </div>
                      </div>
                      
              </div>



            {/* <div class="w3-modal">
              <Modal style={{ background: "#b4b4b4", width: '80%', margin: '5%', height:"50%"}} show={this.state.isOpen} onHide={this.closeModal}>
                <Modal.Header>
                  <div>
                    
                  </div>
                  
                </Modal.Header> */}
                


               
{/* 
                    <div className="input-group-get-started">
                      <Button variant="secondary" className="close-about-me" onClick={this.closeModal}>
                          Close
                      </Button>

                      <div class="article-container">

                        <div class="article">
                            <div className="add-popup-fast-text">
                                <p className=""><strong>FAST</strong></p>
                            </div>
                        </div>

                        <div class="article">
                          
                          {this.state.submitBtn === false &&
                          <div class="add-popup-content">
                            <div>
                              <label >Project Name :    </label>
                              <input type="text" placeholder="project name"  className="dotted-text-box" />
                            </div>
                            <div>
                                <label htmlFor="login-field">Test Scripts Path :    </label>
                                <input type="text" placeholder="scripts"  className="dotted-text-box"/>
                                <button className="open-about-me">browse</button>
                            </div>
                          </div>
                          }

                          {this.state.submitBtn === true &&
                          <div class="add-popup-content">
                            <div>
                              <label>Version :    </label>
                              <input type="text" placeholder="version details"  className="dotted-text-box" />
                            </div>
                            <div>
                                <label htmlFor="login-field">Extra Plugins :    </label>
                                <input type="text" placeholder="plugin details"  className="dotted-text-box"/>
                                <button className="open-about-me">browse</button>
                            </div>
                          </div>
                          }
                      
                          <div>
                            {this.state.submitBtn === false &&
                              <Button variant="secondary" className="next-about-me" onClick={() => this.nextPrev("next")}>
                                Next
                              </Button>
                            }
                            {this.state.submitBtn === true &&
                              <div>
                                <Button variant="secondary" className="back-about-me" onClick={() => this.nextPrev("prev")}>
                                  Prev
                                </Button>
                                <Button variant="secondary" className="next-about-me" onClick={event =>  window.location.href='/homePage'}>
                                  Submit
                                </Button>
                              </div>
                            }
                          </div>

                        </div>

                      </div>
                      
                    </div>  */}
                      
                 
{/*                   
              </Modal>
            </div>
            
             */}
            {/* <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "10vh" }}
            >

              
              
              
            </div> */}

            
          </>)}
        ;
      }
}

export default AddProject;

