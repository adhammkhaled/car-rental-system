-- Insert sample data into Office table
INSERT INTO Office (office_name, location) 
VALUES 
    ('Downtown Office', 'Cairo Downtown'),
    ('Alexandria Branch', 'Alexandria'),
    ('Garden City Office', 'Cairo Garden City'),
    ('Maadi Office', 'Cairo Maadi'),
    ('Zamalek Office', 'Cairo Zamalek');

-- Insert sample data into CarStatus table
INSERT INTO CarStatus (status_name) 
VALUES 
    ('active'),
    ('out of service'),
    ('rented'),
    ('maintenance');

-- Insert sample data into Customer table
INSERT INTO Customer (email, name, password) 
VALUES 
    ('john.doe@email.com', 'John Doe', 'password123'),
    ('jane.smith@email.com', 'Jane Smith', 'securepass'),
    ('michael.brown@email.com', 'Michael Brown', 'mikepass2023'),
    ('emily.jones@email.com', 'Emily Jones', 'emilypassword'),
    ('david.white@email.com', 'David White', 'david2024');

-- Insert sample data into Car table
INSERT INTO Car (plate_id, model, year, office_id, status_id, colour, price_per_hour, num_seats, speed, fuel_cons, image_url) 
VALUES 
    ('ABC123', 'Toyota Corolla', 2022, 1, 1, 'White', 30.00, 5, 180, 6.5, 'https://www.buyatoyota.com/sharpr/bat/assets/img/vehicle-info/Corolla_Hybrid/2022/hero_image_corollahybrid.png'),
    ('XYZ456', 'Honda Civic', 2021, 2, 1, 'Red', 35.00, 4, 160, 7.0, 'https://www.dealerfireblog.com/earnhardthonda/wp-content/uploads/sites/1207/2020/10/2021-Honda-Civic-Hatchback-Rallye-Red_o-1024x576.jpg'),
    ('LMN789', 'Ford Focus', 2020, 3, 2, 'Black', 25.00, 5, 170, 6.0, 'https://www.ford.co.nz/content/dam/Ford/website-assets/ap/nz/future-vehicle/focus-st/colorizer/agate%20black/agate-black.jpg.dam.full.high.jpg/1572419431893.jpg'),
    ('QRS101', 'BMW 320i', 2023, 4, 1, 'White', 50.00, 4, 200, 8.0, 'https://media.hatla2eestatic.com/uploads/ncarmodel/10373/big-up_b7599229d943d788ef666e9da27953ad.png'),
    ('DEF234', 'Mercedes Benz C-Class', 2021, 5, 3, 'Silver', 45.00, 4, 210, 7.5, 'https://ymimg1.b8cdn.com/resized/car_model/6391/logo/listing_main_11894_st1280_046.jpg');
