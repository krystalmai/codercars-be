const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};
const {sendResponse, AppError} = require("../helpers/utils")

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		if (!req.body) throw new AppError(402, "Bad Request", "No request body")
		const created = await Car.create(req.body)
		sendResponse(res,200,true,{data:created},null,"Create Car Success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.getCars = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const page = req.query.page || 1
		// pagination
		let offset = 20 * (page -1)
		const { ...queryFilters } = req.query
		queryFilters.isDeleted = false
		const listOfCars = await Car.find(queryFilters)
		let result = listOfCars.slice(offset, offset + 20)
		let data = { cars: result, total: Math.ceil(listOfCars.length / 20) }
		sendResponse(res, 200,true, data, null, "Found list of cars success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.editCar = async (req, res, next) => {
	
	try {
		if (!req.body || !req.params.id) throw new AppError(402, "Bad Request", "No request body or no car id");

		const { id } = req.params;
		const updateInfo = req.body;
		const options = { new: true };

		const updated = await Car.findByIdAndUpdate(id, updateInfo, options);
		sendResponse(res, 200, true, {data: updated}, null, "Update car success")


		// YOUR CODE HERE
		
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		if (!req.params.id) throw new AppError(402, "Bad Request", "No car id");

		const { id } = req.params;
		const options = { new: true };

		const updated = await Car.findByIdAndUpdate(id, { isDeleted: true }, options) //soft delete
		sendResponse(res, 200, true, {data: updated}, null, "Delete car success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

module.exports = carController;
