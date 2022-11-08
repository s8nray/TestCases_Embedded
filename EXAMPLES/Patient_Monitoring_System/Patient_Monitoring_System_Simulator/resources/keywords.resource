*** Settings ***
Documentation     This is a resource file, that can contain variables and keywords.
...               Keywords defined here can be used where this Keywords.resource in loaded.
Library           fastpubsubLibrary
Library       Remote    http://${ADDRESS}:${PORT}


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
${ADDRESS}    127.0.0.1
${PORT}       12345

*** Keywords ***
 

