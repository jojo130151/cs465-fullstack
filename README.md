# cs465-fullstack
CS-465 Full Stack Development with MEAN


# ARCHITECTURE

## Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

Because of the use in Express in the MEAN stack, we could connect Node.js to our database in MongoDB. Because of this, we could connect out HTML files and handlebars templates directly with our data to render the application. It achieves this through REST APIs; it creates APIs as well as HTTP requests. JavaScript is a programming language that can be used across all of the software layers of a full stack development. JavaScript helped bring the application to life by easily allowing interactive elements like buttons and embedded images to our web pages. 


## Why did the backend use a NoSQL MongoDB database?

A NoSQL database uses databases, collections, and documents. In the documents of a collection, they don’t have to use the same schema, which is great for varying information stored to a collection. There are various trips that can be displayed on a travel website, and some may have information needed that others do not need. This brings a lot of flexibility in that you don’t have to restrict your information into a specific format. Also, relational queries are not needed, as all the information can be stored within the collection we need. This works out for this travel website application because we mostly read the travel data and only need to alter the data for the trips occasionally, so the benefits outweigh the disadvantages of duplicate data that occurs due to this non-relational database. We want to read the trip information easily and quickly from the one collection so that way the user experience is enhanced. 


# FUNCTIONALITY

## How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?

JSON is short for JavaScript Object Notation, and it is a format for data that is separate from specific programming languages.  JavaScript is an actual scripting language that does not compile but runs ins a web page or application. JavaScript was created to help the internet by being able to bring to life interactive elements and animations. It is great for storing data, such as we stored the trip data for this application and transporting that data around the application to where it is needed. It is JSON format and objects that are transported and delivered from the server side to the front end to display to the user. 


## Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

When we started the process of getting the application together, we started from HTML static files and gradually moved away from those. For the travel page of the main, customer-facing, page we moved to using JSON objects to store the trips and iterating through that list to display onto the web page. For the admin page, we used many functions within our code to reuse created functionality. For example, in our trip-data-service.ts file, we have the makeAuthApiCall() function that is used by two other functions in the file for the user logging and registering. Also, in the trip-data-service.ts file, there are functions to add and update a trip in the database and those functions are used in the necessary components such as add trip and edit trip.


# TESTING

## Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

There are four API methods that we utilize in this application: POST, GET, PUT, and DELETE. These assigned methods are what tells the application what to do on a page when the method is called and where to redirect the user. The endpoints are each side of where the API gets the request and response desired. The authorization that we incorporated into the application was middleware that we added to the API and verified the user as the request was being sent. 


# REFLECTION

## How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This class has walked the students through web application creation from setting up the html and handlebars to render the customer-facing view to setting up the MongoDB database with our trip information to creating components of a Single Page Application, something I had never worked with before, to creating the security and RESTful API necessary to run an admin-only page. This work, which will be continued in the part 2 course, was all real-life pertaining skills that will help me break into the software industry.
