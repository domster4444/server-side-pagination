import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

const {
  addTask,
  getAllTask,
  getTaskPagination,
} = require('../controllers/taskController');

router.route('/create').post(addTask);
router.route('/get').get(getAllTask);
router.route('/pagination').get(getTaskPagination);

module.exports = router;
