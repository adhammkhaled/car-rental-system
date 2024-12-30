const CustomerModel = require('../models/user');


    exports.getCustomerName= async (req, res) => {
        try {
            const { id } = req.params;
            const name = await CustomerModel.getCustomerName(id);
            res.json({ name });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    exports.getCustomerInfo = async (req, res) => {
        try {
          const { id } = req.params;
          const customer = await customerModel.getCustomerInfo(id);
          res.status(200).json(customer);
        } catch (error) {
          console.error('Error fetching customer info:', error);
          res.status(500).json({ message: 'Server error' });
        }
      };
      
      exports.getReadyToPickupCars = async (req, res) => {
        try {
          const { id } = req.params;
          const cars = await customerModel.getReadyToPickupCars(id);
          res.status(200).json(cars);
        } catch (error) {
          console.error('Error fetching ready to pickup cars:', error);
          res.status(500).json({ message: 'Server error' });
        }
      };
      
      exports.getRentedCars = async (req, res) => {
        try {
          const { id } = req.params;
          const cars = await customerModel.getRentedCars(id);
          res.status(200).json(cars);
        } catch (error) {
          console.error('Error fetching rented cars:', error);
          res.status(500).json({ message: 'Server error' });
        }
      };
   
