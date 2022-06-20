var express = require('express');
var router = express.Router();
const { body } = require('express-validator');

const driverController = require('../controllers/driver');

/**
 * @swagger
 *   /api/updateLocation/{id}:
 *     post:
 *       summary: registers the driver's location 
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *       responses:
 *          200:
 *            description: driver location is registered successfully 
 *            content:
 *              application/json:
 *                schema:
 *                  type: array   
 */

/**
 * @swagger
 *   /api/register:
 *     post:
 *       summary: new driver is registered 
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *       responses:
 *          200:
 *            description: new driver is registered successfully 
 *            content:
 *              application/json:
 *                schema:
 *                  type: array   
 */

/**
 * @swagger
 *   /api/switchAvailability/{id}:
 *     get:
 *       summary: api used to switch the drivers availability
 *       responses:
 *          200:
 *            description: switch driver availability
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: string
 *     
 */ 

/**
 * @swagger
 *   /api/getAllDrivers:
 *     get:
 *       summary: retrives all the driver details
 *       responses:
 *          200:
 *            description: driver details is successfully retrieved
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: string
 *     
 */ 

//route for registring the drivers location
router.post('/updateLocation/:id', [
    body('latitude').trim().notEmpty(),
    body('latitude').trim().isNumeric(),
    body('longitude').trim().notEmpty(),
    body('longitude').trim().isNumeric(),
],
    driverController.shareDriverLocation);

//route to switch drivers availability
router.get('/switchAvailability/:id', driverController.switchAvailability);

//route to get all the available drivers
router.get('/getAllDrivers', driverController.getAllDrivers);

//router for registring the driver
router.post('/register', [
    body('email').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('phoneNumber').trim().notEmpty(),
    body('phoneNumber').trim().isNumeric(),
    body('phoneNumber').trim().isLength(10),
    body('name').trim().notEmpty(),
    body('name').trim().isString(),
    body('licenseNumber').trim().notEmpty(),
    body('licenseNumber').trim().isString(),
    body('carNumber').trim().notEmpty(),
    body('carNumber').trim().isString()
],
    driverController.registerDriver);

module.exports = router;