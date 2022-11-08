*** Settings ***
Library				   String
Library                SSHLibrary

*** Variables ***
${HOST}                192.168.0.18
${USERNAME}            shekhar
${PASSWORD}            admin123

*** Keywords ***
Open Connection And Log In
   Open Connection     ${HOST}
   Login               ${USERNAME}        ${PASSWORD}