*** Settings ***
Documentation     A test suite for memory testing.

Resource			   ../../Resources/CPU_imports.resource 
Suite Setup            Open Connection And Log In
Suite Teardown         Close All Connections


*** Test Cases ***
		
TC_RAMStatus
		[Documentation]        Record how much free RAM available
		[Tags]        EMB_REQ_10
		${output}=         Execute Command    free -h
		Log to Console		\n${output}
		
TC_CPU_GPUMemorySplit
		[Documentation]        Record how much memory allocated to CPU and GPU
		[Tags]        EMB_REQ_11
		${output}=         Execute Command    vcgencmd get_mem arm && vcgencmd get_mem gpu
		Log to Console		\n${output}
