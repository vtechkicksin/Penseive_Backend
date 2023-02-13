const express = require("express");
const authController = require('../controllers/auth');
const Authentication = require('../middleware/auth');

const router = express.Router();





router.post(
'/auth/register',
authController.register);

router.post(
'/login',
authController.login);

router.get(
'/gpsData',
Authentication.checkToken,
authController.data);

router.get(
    '/pageData',
    Authentication.checkToken,
    authController.page);

router.get(
    '/searchData',
    Authentication.checkToken,
    authController.searchApi
);

module.exports = router;