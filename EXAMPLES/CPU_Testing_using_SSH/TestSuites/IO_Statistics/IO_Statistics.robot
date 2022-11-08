*** Settings ***
Documentation     A test suite for cpu IO testing.

Resource			   ../../Resources/CPU_imports.resource 
Suite Setup            Open Connection And Log In
Suite Teardown         Close All Connections


*** Test Cases ***
TC_IOStatistics 
		[Documentation]        Record IO statistics
		[Tags]        EMB_REQ_9
		${output}=         Execute Command    iostat
		Log to Console		\n${output}