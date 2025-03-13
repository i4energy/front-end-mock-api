
# Front End - Mock API Project

This project generates mock data for real-time MQTT values, periodic data, alarms, and events. It is designed to assist the front-end team by providing mock data for development purposes, enabling testing and integration of functionalities related to different types of data.

## Getting Started

### Server Setup

1. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8004` by default.

### Client Setup

To use the mock API from the front end, add the following environment variables to your .env files depending on the required functionality:

1. To include mock topics in the Topics Tree on the front end, add:
   ```bash
   VITE_USE_MOCK_TOPICS=true
   ```
2. To include mock periodic data in charts, tables on the front end, add:
   ```bash
   VITE_USE_MOCK_PERIOD_DATA=true
   ```
3. To include mock periodic alarm/event data in tables on the front end, add:
   ```bash
   VITE_USE_MOCK_ALERTER_DATA=true
   ```


