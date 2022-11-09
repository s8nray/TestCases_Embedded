*** Settings ***

Library       Remote    http://${ADDRESS}:${PORT}
  
*** Variables ***
${ADDRESS}    192.168.100.4
${PORT}       12345

*** Variables ***
${response}
${widget}                radio_button_arc
${AverageValueID}               13
${MinimumValueID}               14
${PatientNameID}                6
${MaximumValueID}               15
${VitalScreenID}                23
${MedicationScreenID}           22
${PatientScreenID}              21
${PatientsAdmittedID}           18
${SalineValueID}                8

*** Keywords ***
A Vitals Screen appears
	${response}=   CLICK    ${widget}    ${VitalScreenID}
	

The user entered the value ${Value} to average vital parameter
	${response}=       SETWIDGETDATA    ${widget}    ${AverageValueID}        ${Value}
	LOG             ${response}
	Sleep   1
	
The average vital parameter shows a value of ${verifyvalue}
	${response}=       GETWIDGETDATA    ${widget}    ${AverageValueID}
    LOG             ${response}
    SHOULD BE EQUAL    ${response}    Text is : ${verifyvalue}

The user entered the value ${Value} to minimum vital parameter
	${response}=       SETWIDGETDATA    ${widget}    ${MinimumValueID}        ${Value}
	LOG             ${response}
	Sleep   1
	
The minimum vital parameter shows a value of ${verifyvalue}
	${response}=       GETWIDGETDATA    ${widget}    ${MinimumValueID}
    LOG             ${response}
    SHOULD BE EQUAL    ${response}    Text is : ${verifyvalue}


The user entered the value ${Value} to maximum vital parameter
	${response}=       SETWIDGETDATA    ${widget}    ${MaximumValueID}        ${Value}
	LOG             ${response}
	Sleep   1
	
The maximum vital parameter shows a value of ${verifyvalue}
	${response}=       GETWIDGETDATA    ${widget}    ${MaximumValueID}
    LOG             ${response}
    SHOULD BE EQUAL    ${response}    Text is : ${verifyvalue}	

A Medications Screen appears
	${response}=   CLICK    ${widget}    ${MedicationScreenID}
	Sleep   2 

The user entered the value ${Value} to Saline	
	${response}=       SETWIDGETDATA    ${widget}    ${SalineValueID}        ${Value}
	LOG             ${response}
	Sleep   1

The Saline shows a value of ${verifyvalue}
	${response}=       GETWIDGETDATA    ${widget}    ${SalineValueID}
    LOG             ${response}
    SHOULD BE EQUAL    ${response}    Text is : ${verifyvalue}	
	
A Patient List Screen appears
	${response}=   CLICK    ${widget}    ${PatientScreenID}
	Sleep   1
    Log     ${response}


	
Patient name is written to the log
	${response}=       GETWIDGETDATA    ${widget}    ${PatientNameID}
    LOG             ${response}
	
Number of total admitted patients is written to the log
    ${response}=       GETWIDGETDATA    ${widget}    ${PatientsAdmittedID}
    Log             ${response}
	
Start application setup
    CONNECT        SOCKET
