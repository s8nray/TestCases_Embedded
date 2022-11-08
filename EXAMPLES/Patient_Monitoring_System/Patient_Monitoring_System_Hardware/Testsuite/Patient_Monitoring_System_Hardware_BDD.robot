*** Settings ***
Resource    ../Steps/Patient_Monitoring_System_Step.resource
 
Suite Setup  Start application setup
Suite Teardown

*** Test Cases ***
Input Average Vital Parameter Value
    [Documentation]    In this scenario, we are verifying that the average vital value can be entered
    [Tags]    SRS.UI.002, SRS.FUN.011, data_entry_tests
	Given A Vitals Screen appears
	When The user entered the value 150 to average vital parameter
	Then The average vital parameter shows a value of 150
   
Input Minimum Vital Parameter Value
    [Documentation]    In this scenario, we are verifying that the minimum vital value can be entered
    [Tags]    SRS.UI.002, SRS.FUN.012, data_entry_tests
	Given A Vitals Screen appears
	When The user entered the value 60 to minimum vital parameter
	Then The minimum vital parameter shows a value of 60   
   
Input Maximum Vital Parameter Value
    [Documentation]    In this scenario, we are verifying that the maximum vital value can be entered
    [Tags]    SRS.UI.002, SRS.FUN.013, data_entry_tests
	Given A Vitals Screen appears
	When The user entered the value 350 to maximum vital parameter
	Then The maximum vital parameter shows a value of 300   
  
Query Patient Name From Vitals Screen
    [Documentation]    In this scenario, we are verifying that the Patient Name can be logged
    [Tags]    SRS.UI.002, SRS.FUN.014, data_query_tests
	Given A Vitals Screen appears
	Then Patient name is written to the log
	
Input Saline Value on Medications Screen
    [Documentation]    In this scenario, we are verifying that the Saline value can be entered
    [Tags]    SRS.UI.002, SRS.FUN.015, data_entry_tests
    Given A Medications Screen appears
	When The user entered the value 100 to Saline  
	Then The Saline shows a value of 100 
	
Query Number of Admitted Patients From Patient List Screen
    [Documentation]    In this scenario, we are verifying that the Patient Name can be logged
    [Tags]    SRS.UI.002, SRS.FUN.016, data_query_tests
	Given A Patient List Screen appears	
	Then Number of total admitted patients is written to the log