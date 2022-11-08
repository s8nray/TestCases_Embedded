*** Settings ***
Documentation     A test suite for network testing.

Resource			   ../../Resources/CPU_imports.resource 
Suite Setup            Open Connection And Log In
Suite Teardown         Close All Connections


*** Test Cases ***
TC_NetworkStatistics
		[Documentation]        Record network statistics
		[Tags]        EMB_REQ_12
		${output}=         Execute Command    netstat
        Log to Console		\n${output}