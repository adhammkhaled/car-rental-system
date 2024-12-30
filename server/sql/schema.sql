CREATE DATABASE CAR_RENTAL_TEST;
USE CAR_RENTAL_TEST;

-- Create Office table
CREATE TABLE Office(
    office_id INT AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create CarStatus table
CREATE TABLE CarStatus(
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name ENUM('active', 'out of service', 'rented', 'maintenance') NOT NULL
);

-- Create Customer table
CREATE TABLE Customer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL, 
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Create Car table
CREATE TABLE Car(
    plate_id VARCHAR(15) PRIMARY KEY, 
    model VARCHAR(50) NOT NULL,
    year YEAR NOT NULL,
    office_id INT NOT NULL,       
    status_id INT NOT NULL,        
    colour VARCHAR(20),
    price_per_hour DECIMAL(10, 2) NOT NULL,
    num_seats INTEGER,
    speed FLOAT,
    fuel_cons FLOAT,
    image_url VARCHAR(255),  -- Store path or URL to image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (office_id) REFERENCES Office(office_id),
    FOREIGN KEY (status_id) REFERENCES CarStatus(status_id),
    INDEX idx_status (status_id),
    INDEX idx_office (office_id)
);

-- Add triggers for Car table checks
DELIMITER //
CREATE TRIGGER car_insert_check BEFORE INSERT ON Car
FOR EACH ROW
BEGIN
    IF NEW.num_seats <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Number of seats must be greater than 0';
    END IF;
    IF NEW.speed < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Speed must be non-negative';
    END IF;
    IF NEW.fuel_cons < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Fuel consumption must be non-negative';
    END IF;
END//
DELIMITER ;

-- Create Reserve table
CREATE TABLE Reserve(
    order_no INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    plate_id VARCHAR(15) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    charge DECIMAL(10, 2),
    reservation_status ENUM('pending', 'active', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cust_id) REFERENCES Customer(id),
    FOREIGN KEY (plate_id) REFERENCES Car(plate_id),
    INDEX idx_customer (cust_id),
    INDEX idx_car (plate_id)
);

-- Add trigger for Reserve date check
DELIMITER //
CREATE TRIGGER reserve_date_check BEFORE INSERT ON Reserve
FOR EACH ROW
BEGIN
    IF NEW.end_date < NEW.start_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'End date must be after or equal to start date';
    END IF;
END//
DELIMITER ;

-- Create Pickup table
CREATE TABLE Pickup(
    order_no INT PRIMARY KEY,
    pickup_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_no) REFERENCES Reserve(order_no)
);

-- Create Payment table
CREATE TABLE Payment(
    order_no INT PRIMARY KEY,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    additional_charge DECIMAL(10, 2) DEFAULT 0,
    total_charge DECIMAL(10, 2),
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_no) REFERENCES Reserve(order_no)
);

-- Create Admin table
CREATE TABLE Admin(
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Return`(
    order_no INT PRIMARY KEY,
    return_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_no) REFERENCES Reserve(order_no)
);

-- Create trigger to calculate charge in Reserve table
DELIMITER //
CREATE TRIGGER calculate_charge_before_insert 
BEFORE INSERT ON Reserve
FOR EACH ROW
BEGIN
    SET NEW.charge = (
        SELECT DATEDIFF(NEW.end_date, NEW.start_date) * price_per_hour * 24
        FROM Car 
        WHERE plate_id = NEW.plate_id
    );
END//
DELIMITER ;

-- Create trigger to calculate total_charge in Payment table
DELIMITER //
CREATE TRIGGER calculate_total_charge_before_insert 
BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
    SET NEW.total_charge = (
        SELECT charge + NEW.additional_charge
        FROM Reserve 
        WHERE order_no = NEW.order_no
    );
END//
DELIMITER ;

-- Create trigger to update car status when reserved
DELIMITER //
CREATE TRIGGER update_car_status_after_reserve
AFTER INSERT ON Reserve
FOR EACH ROW
BEGIN
    UPDATE Car 
    SET status_id = (SELECT status_id FROM CarStatus WHERE status_name = 'rented')
    WHERE plate_id = NEW.plate_id;
END//
DELIMITER ;

-- Create trigger to update car status when reservation ends
DELIMITER //
CREATE TRIGGER update_car_status_after_payment
AFTER UPDATE ON Payment
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'completed' THEN
        UPDATE Car c
        JOIN Reserve r ON c.plate_id = r.plate_id
        SET c.status_id = (SELECT status_id FROM CarStatus WHERE status_name = 'active')
        WHERE r.order_no = NEW.order_no;
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER record_car_status_change
AFTER UPDATE ON Car
FOR EACH ROW
BEGIN
    IF NEW.status_id <> OLD.status_id THEN
        INSERT INTO CarStatusHistory (plate_id, status_id, status_change_date)
        VALUES (NEW.plate_id, NEW.status_id, NOW());
    END IF;
END//
DELIMITER ;