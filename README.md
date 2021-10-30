# Calender-Application

This is a web application which lets you create, edit and delete events in your calendar.

It has two parts:

calendar-frontend : Developed in ReactJs
calendar-backend : Developed in Spring Boot.
Calendar- backend
Consists of four APIs namely:

1) Get All Events (GET API)
API: http://localhost:8080/events

{ "eventId" : <event_id>, "starttime": <start_time>,"endtime": <end_time>,"startDate": <start_date>, "endDate": <end_date> , "eventDesc": <event_description>}

2) Create an Event (POST API)
API: http://localhost:8080/events

Request Body { "starttime": <start_time>,"endtime": <end_time>,"startdate": <start_date>, "enddate": <end_date> , "description": <event_description>}

3) Edit an Event (PUT API)
API: http://localhost:8080/events/{event_id}

Request Body { "starttime": <start_time>,"endtime": <end_time>,"startdate": <start_date>, "enddate": <end_date> , "description": <event_description>}

4) Delete an Event (DELETE API)
API: http://localhost:8080/events/{event_id}

Database
Create a database with fields Id, startdate, enddate, starttime, endtime, description.

Steps for running it on localhost:
git clone https://github.com/happycoder1/Calender-Application

go to calendar-backend directory

run mvn clean install

if you are using Eclipse IDE, then you can directly run the "Application.java" file from the eclipse. It will start the server on http://localhost:8080 . You might need to accordingly change the username,password and url of the database in "application.properties" file.

Go to calendar-frontend directory

run npm install

run npm start

The client will start running on http://localhost:3000 and you can create , edit and delete events in your calendar.
