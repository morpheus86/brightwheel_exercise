# Run the Application

- npm install to install all dependencies
- npm start to run application which is running on localhost:3000

  - To make a post request:
    You can use either use postman or the terminal

  # Application organization

  - point of entry of app.js where most of the config has been done with a logger, headers and wiring of the routes
  - Application has been split into different files to make it leaner and more modular
  - The main functions that makes the post call and the get calls are in data/index.js which is imported in the routes file to be executed
  - routes file contain all the restful call
  - we also have an utils file which contains the validation rules
  - I use postman to make the post request by sending a JSON data consisting of
    an id and a list of readings which contains a timestamp and count.
    You can send this JSON data to http://localhost:3000/api/new_readings
    ex: {
    "id": "36d5658a-6908-479e-887e-a949ec199273",
    "readings": [
    {
    "timestamp": "2021-09-29T16:08:15+01:00",
    "count": 2
    },
    {
    "timestamp": "2021-09-29T16:09:15+01:00",
    "count": 15
    }
    ]
    }
  - The application have some basic validation to make sure we are receiving a reading with the data above.
  - Data and functions that changes data are organized in a class to make sure we have continuous and up to date data access
  - We have a singleton that allow us to not reset the main list
    **_API_**

    - GET request to "localhost:3000/api/:deviceId" to get a specific device list of reading

    * We use the deviceId which we can get from request.params
    * Then we pass that id to the function getReadingForDevice which is coming from our main class DeviceReadings where all the data of the application are stored

    - POST request to "localhost:3000/api/new_readings" to post a new reading from a device

    * we get the data from request.body and before going through any operation we validate the data by passing it to our validation function. If everything checks out we get into our try and catch function to add the data to the list of reading. The function that take care of this operation is also coming from our main class DeviceReadings.It is called addReadingToList and take the data being sent

  # Suggestion to improve the application

  - We can write a more robust validation check for the data in order to check if the UUID is a valid UUID, in the readings list instead of just completely disregard the list if any of the element in the list is invalid or dont pass the basic check we can just grab the element that are valid and add them to the previous list. We can also assign the invalid element in the list some starting state just so we can keep the rest of the data and not loose any data from the device. This can help determine which device is working properly and which one is not etc...And depending on the volume of request being sent we can dockerize the application to get it to accommodate
  - We can implement some Auth that every device would have in order to authenticate whenever a post request is made to the main server. We can create a middleware which will validate the authorization before the callback function get called.

  # Testing

  - I use Jest to run my test
  - We can implement more robust unit test to make sure endpoint are working correctly and the data are being addded accordingly. But also test the validation that are being run before adding a reading to a device reading
