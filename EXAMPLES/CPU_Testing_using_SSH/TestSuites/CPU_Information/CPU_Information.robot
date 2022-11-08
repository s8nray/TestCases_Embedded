*** Settings ***

Documentation     A test suite for cpu parameters testing.


Resource			   ../../Resources/CPU_imports.resource 
Suite Setup            Open Connection And Log In
Suite Teardown         Close All Connections

*** Variables ***
${safetempvalue}    80
${safevltgvalue}	1.35
*** Test Cases ***

TC_VerifyLinuxversion
		[Documentation]        Verifying linux version of embedded device
		[Tags]        EMB_REQ_1
		${output}=         Execute Command     egrep '^(NAME)=' /etc/os-release
		${name} =	Remove String	${output}	NAME="	And 	"
		${output}=         Execute Command     egrep '^(VERSION)=' /etc/os-release
		${version} =	Remove String	${output}	VERSION="	And 	"
		IF    '${name}' != 'Raspbian GNU/Linux' or '${version}' != '11 (bullseye)'
			Log to Console		Expected Raspbian GNU/Linux 11 (bullseye) OS but found ${name} ${version}
			Log		Expected Raspbian GNU/Linux 11 (bullseye) OS but found ${name} ${version}
			fail
		END
		Log to Console		\n${name} ${version}
		Log		\n${name} ${version}

TC_VerifyProcessor
		[Documentation]        Verifying processor version of embedded device
		[Tags]        EMB_REQ_2
		${output}=         Execute Command     cat /proc/cpuinfo | grep Hardware
		${procname} =	Remove String	${output}	Hardware	And 	:
		IF    '${procname.strip()}' != 'BCM2711'  
			Log to Console		Expected BCM2711 processor
			Log		Expected BCM2711 processor
			fail
		END		 
		Log to Console		\n${procname.strip()} 

TC_VerifyArchitecture
		[Documentation]        Verifying processor architecture of embedded device
		[Tags]        EMB_REQ_3
		${output}=         Execute Command     lscpu | grep Architecture
		${archname} =	Remove String	${output}	Architecture	And 	:
		IF    '${archname.strip()}' != 'armv7l'  
			Log to Console		Expected armv71 architecture
			Log		Expected armv71 architecture
			fail
		END		 
		Log to Console		\n${archname.strip()} 

TC_VerifyByteOrder
		[Documentation]        Verifying processor byte order of embedded device
		[Tags]        EMB_REQ_4
		${output}=         Execute Command     lscpu | grep 'Byte Order'
		${byteorder} =	Remove String	${output}	Byte Order	And 	:
		IF    '${byteorder.strip()}' != 'Little Endian'  
			Log to Console		Expected little endian byte order
			Log		Expected little endian byte order
			fail
		END		 
		Log to Console		\n${byteorder.strip()} 

TC_VerifyNumberofcores
		[Documentation]         Verifying Number of cores in processor of embedded device
		[Tags]        EMB_REQ_5
		${noOfCores}=         Execute Command     cat /proc/cpuinfo | grep processor | wc -l
		IF    '${noOfCores}' != '4'  
			Log to Console		Expected 4 cores
			Log		Expected 4 cores
			fail
		END		 
		Log to Console		\nNo of cores = ${noOfCores} 
	 

TC_VerifyCpuTemperature
		[Documentation]        Checking cpu temperature of embedded device
		[Tags]        EMB_REQ_6
		${response}=         Execute Command    vcgencmd measure_temp
		${tempvalue} =	Remove String	${response}	temp=	And 	'C
		IF    ${tempvalue} > ${safetempvalue}
			Log to Console		CPU temperature is very high!
			Log		CPU temperature is very high!
			fail
		END
		Log to Console		\n${response}
		Log		\n${response}

TC_VerifyCpuCoreVoltage
		[Documentation]        Checking cpu voltage of embedded device
		[Tags]        EMB_REQ_7
		${response}=         Execute Command    vcgencmd measure_volts core
		${vltgvalue} =	Remove String	${response}	volt=	And 	V
		IF    ${vltgvalue} > ${safevltgvalue}
			Log to Console		CPU voltage is very high!
			Log		CPU voltage is very high!
			fail
		END
		Log to Console		\n${response}
		Log		\n${response}	

TC_CPUProfiling 
		[Documentation]        Record cpu profiling data
		[Tags]        EMB_REQ_8
		${output}=         Execute Command    mpstat
		Log to Console		\n${output}
		Log		\n${output}
				

