# Customer REST API

This is a simple REST API built using Node.js and Express that provides data about customers. It supports listing customers with search and pagination, retrieving a single customer's data by ID, listing unique cities with customer counts, and adding a new customer with validations.

## Features

- **List customers** with search filters for `first_name`, `last_name`, and `city`, along with pagination.
- **Retrieve customer by ID**.
- **List unique cities** along with the number of customers from each city.
- **Add new customer** with validation (city and company must already exist).

## Technologies Used

- **Node.js**
- **Express.js**
- **File System (for storing customer data in `customers.json`)**

## Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

## Getting Started

Follow the instructions below to set up and run the project.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/customers-api.git
cd customers-api


### 2. Install Dependencies

```bash
npm install


### 3. Create customers.json:

```bash
[
  {
    "id": 1,
    "first_name": "Aman",
    "last_name": "Gupta",
    "city": "Ahmedabad",
    "company": "SublimeDataSystems"
  },
  {
    "id": 2,
    "first_name": "John",
    "last_name": "Doe",
    "city": "New York",
    "company": "TechCorp"
  },
  {
    "id": 3,
    "first_name": "Jane",
    "last_name": "Doe",
    "city": "Surat",
    "company": "KnovatorTechnology"
  },
  {
    "id": 4,
    "first_name": "Bibek",
    "last_name": "Bhagat",
    "city": "Surat",
    "company": "KnovatorTechnology"
  }
]


### 4. Run the Server
nodemon server.js