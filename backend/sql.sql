-- USERS TABLE 

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL UNIQUE,
  last_name VARCHAR(255),
  email VARCHAR(255) unique,
  password text NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  phone_number varchar (255),
  create_date DATETIME DEFAULT now(),
  is_deleted boolean DEFAULT false
);

-- PRODUCT TABLES
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT DEFAULT 0,
  create_date TIMESTAMP DEFAULT now()
);

-- TRANSACTION TABLE
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount INT NOT NULL,
  timestamp TIMESTAMP DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- many to many relationship 
-- many user can have many transaction and products

CREATE TABLE product_transaction (
  product_id INT,
  transaction_id INT,
  PRIMARY KEY (product_id, transaction_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);