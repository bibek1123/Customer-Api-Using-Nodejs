const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// Load customer data from customers.json file
let customers = require('./customers.json');

// Helper function to save customers back to the JSON file
function saveCustomers() {
  fs.writeFileSync('customers.json', JSON.stringify(customers, null, 2));
}

// 1. List customers with search and pagination
app.get('/customers', (req, res) => {
  const { first_name, last_name, city, page = 1, limit = 10 } = req.query;

  // Filtering by first_name, last_name, and city
  let filteredCustomers = customers.filter((customer) => {
    return (
      (!first_name || customer.first_name.toLowerCase().includes(first_name.toLowerCase())) &&
      (!last_name || customer.last_name.toLowerCase().includes(last_name.toLowerCase())) &&
      (!city || customer.city.toLowerCase().includes(city.toLowerCase()))
    );
  });

  // Pagination logic
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedCustomers = filteredCustomers.slice(start, end);

  res.json({
    total: filteredCustomers.length,
    page: parseInt(page),
    limit: parseInt(limit),
    customers: paginatedCustomers,
  });
});

// 2. Get single customer by ID
app.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  const customer = customers.find((customer) => customer.id === parseInt(id));

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

// 3. Get all unique cities with the number of customers from each city
app.get('/cities', (req, res) => {
  const cityCount = {};

  customers.forEach((customer) => {
    if (cityCount[customer.city]) {
      cityCount[customer.city]++;
    } else {
      cityCount[customer.city] = 1;
    }
  });

  const result = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  res.json(result);
});

// 4. Add a customer with validations (city and company must already exist)
app.post('/customers', (req, res) => {
  const { first_name, last_name, city, company } = req.body;

  // Validation - All fields are required
  if (!first_name || !last_name || !city || !company) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validation - City and company should already exist
  const validCity = customers.some((customer) => customer.city === city);
  const validCompany = customers.some((customer) => customer.company === company);

  if (!validCity) {
    return res.status(400).json({ error: 'City does not exist' });
  }

  if (!validCompany) {
    return res.status(400).json({ error: 'Company does not exist' });
  }

  // Generate a new ID for the customer
  const newCustomer = {
    id: customers.length ? customers[customers.length - 1].id + 1 : 1,
    first_name,
    last_name,
    city,
    company,
  };

  // Add the new customer to the list
  customers.push(newCustomer);
  saveCustomers();

  res.status(201).json(newCustomer);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
