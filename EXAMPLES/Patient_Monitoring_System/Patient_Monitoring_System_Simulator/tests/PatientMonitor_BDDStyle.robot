*** Settings ***
Documentation     A test suite for patient monitor.
...
...               Keywords are imported from the remote library. Scripting style is BDD


Resource        ../resources/fastkeywords.resource


*** Variables ***
${ADDRESS}    127.0.0.1
${PORT}       12345

*** Variables ***
${widgetid}                    2
${event}                    6617
${event}                    5399
${response}
${widget}                radio_button_arc
${screen}                Shapes_Screen
${resdata}
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
${widget_val}                    120
*** Test Cases ***
Test_VERIFY_BLOOD_PRESSURE_KDD
    [Documentation]        Verify Blood pressure
    [Tags]    FUN_REQ_1
    Given The GUIX Is Running
    ${response}=       Then Set the GUIX Widget Data    ${widget}    ${SysBloodPressureID}        180
    Sleep   2
    ${response}=       Then Get the GUIX Widget Data    ${widget}    ${SysBloodPressureID}
    Sleep   1
    SHOULD BE EQUAL    ${response}        Text is : 180
    ${response}=       Then Set the GUIX Widget Data    ${widget}    ${DiaBloodPressureID}        85
    SLEEP    1
    ${response}=       Then Get the GUIX Widget Data    ${widget}    ${DiaBloodPressureID}
    SLEEP    1
    SHOULD BE EQUAL    ${response}        Text is : 85
    Sleep   2

*** Test Cases ***
TC_GET_PATIENT_NAME_KDD
    [Documentation]        Get Patien Name
    [Tags]        FUN_REQ_5
    ${response}=       Then Get the GUIX Widget Data    ${widget}    ${PatientNameID}
    LOG TO CONSOLE   ${response}
    Sleep   1

*** Test Cases ***
TC_VERIFY_TEMPERATURE_KDD
    [Documentation]        Verify Temperature
    [Tags]    FUN_REQ_3
    ${response}=       Then Set the GUIX Widget Data    ${widget}    ${TemperatureID}        55
    SLEEP        1
    ${response}=       Then Get the GUIX Widget Data    ${widget}    ${TemperatureID}
    Sleep   1
    SHOULD BE EQUAL    ${response}        Text is : 55
    Sleep   2


*** Test Cases ***
TC_CHECK_SCHEDULE_DOSE_KDD
    [Documentation]        Navigation to dose screen
    [Tags]    UI_REQ_1
    ${response}=   Then GUIX clicks on    ${widget}    ${ScheduleScreenID}
    Log     ${response}
    Sleep   1
*** Test Cases ***
TC_CHECK_PATIENT_KDD
    [Documentation]        Navigate to patient list screen
    [Tags]    UI_REQ_2
    ${response}=   Then GUIX clicks on    ${widget}    ${PatientScreenID}
    Log     ${response}
    Sleep   1
    ${response}=   Then GUIX clicks on    ${widget}    ${VitalScreenID}
    Log     ${response}
    Sleep   1
    
   
   
   
   
   
   
   
   
   
   
   
   
    
    
    



