*** Settings ***
Documentation     A test suite for patient monitor.
...
...               Keywords are imported from the remote library

Library       Remote    http://${ADDRESS}:${PORT}
Suite Setup  Start_application_setup
# Suite Teardown  Close_application

*** Variables ***
${ADDRESS}    127.0.0.1
${PORT}       12345

*** Variables ***
${response}
${widget}                radio_button_arc
${SysBloodPressureID}            9
${DiaBloodPressureID}            10
${PatientNameID}                 11
${TemperatureID}                 12
${InsulineID}                    6
${EKGID}                         7
${PlsID}                         8
${VitalScreenID}                 16
${ScheduleScreenID}              17
${PatientScreenID}               18

*** Test Cases ***
TC_VERIFY_BLOOD_PRESSURE
    [Documentation]        Verify Blood pressure
    [Tags]    FUN_REQ_1
     ${response}=       SETWIDGETDATA    ${widget}    ${SysBloodPressureID}        150
    Sleep   1
    ${response}=       GETWIDGETDATA    ${widget}    ${SysBloodPressureID}
    SHOULD BE EQUAL    ${response}    Text is : 150
    Sleep   1
    ${response}=       SETWIDGETDATA    ${widget}    ${DiaBloodPressureID}         90
    Sleep   2
    ${response}=       GETWIDGETDATA    ${widget}    ${DiaBloodPressureID}
    SHOULD BE EQUAL    ${response}        Text is : 90
    Sleep   1

    
*** Test Cases ***
 
TC_GET_PATIENT_NAME
    [Documentation]        Get Patien Name
    [Tags]        FUN_REQ_5
    ${response}=       GETWIDGETDATA    ${widget}    ${PatientNameID}
    LOG TO CONSOLE   ${response}
    Sleep   1

*** Test Cases *** 
TC_VERIFY_TEMPERATURE
    [Documentation]        Verify Temperature
    [Tags]    FUN_REQ_3
    ${response}=       SETWIDGETDATA    ${widget}    ${TemperatureID}        35
    Sleep    1
    ${response}=       GETWIDGETDATA    ${widget}    ${TemperatureID}
    SHOULD BE EQUAL    ${response}            Text is : 35
    Sleep   2

  
*** Test Cases ***
TC_CHECK_SCHEDULE_DOSE
    [Documentation]        Navigation to dose screen
    [Tags]    UI_REQ_1
    ${response}=   CLICK    ${widget}    ${ScheduleScreenID}
    Log     ${response}
    Sleep   4
    
*** Test Cases ***
TC_CHECK_PATIENT
    [Documentation]        Navigate to patient list screen
    [Tags]    UI_REQ_2
    ${response}=   CLICK    ${widget}    ${PatientScreenID}
    Log     ${response}
    Sleep   4
    ${response}=   CLICK    ${widget}    ${VitalScreenID}
    Log     ${response}
    Sleep   2
    
   
   
*** Keywords *** 
   
Start application setup
    # cmd run     D:\\project\\demo_guix_medical.exe
    Sleep    5
    CONNECT        SOCKET

# Close application  
    
   
   
   
   
   
   