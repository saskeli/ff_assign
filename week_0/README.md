# Sequence diagrams

## /notes

Note that the sequence diagram doesn't properly convey the asyncronous nature of the transaction. In actuality the entirety of the html file for example is received only after the requests for the .css and the .js files are sent. This convays only the dependance of the action sequence

Events for user submitting the note "Kuha läpäisee tentit":

![sequence_1](Kuha.png)
<!--
title Kuha

User->Browser: enters "Kuha läpäisee tentit"
User->Browser: submits form
Browser->Backend: POSTs request to /notes
note right of Browser: Data is stored by the backend
Backend->Browser: 302 status with redirect to /notes
Browser->Backend: GET request for /nodes
Backend->Browser: 304 not changed status
Browser->Backend: GET request for css
Browser->Backend: GET request for js
Backend->Browser: 304 not changed status (css)
Backend->Browser: 304 not changed status (js)
Browser->Backend: GET request for json
Backend->Browser: 200 status and new json
Browser->User: serves website
-->

## /spa

Events for user navigating to /spa

![sequence_3](Spa_1.png)

## /spa 2

Events for user submitting the note "Ei tartte voimaa lukee"

![sequence_4](Spa_2.png)
