import { Request, Response } from 'express';

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Task = require('../models/taskModel');

exports.addTask = catchAsyncErrors(
  async (req: Request, res: Response, next: any) => {
    const { taskId, taskName, taskDescription } = req.body;

    //*============================================================ If user dont exist,
    const newTask = new Task({ taskId, taskName, taskDescription }); //? Create User Object based on User-Schema
    await newTask.save((err: any, success: any) => {
      if (err) {
        return next(
          new ErrorHandler('Error occured while saving  task to db', 500)
        );
      }
      return res.status(201).json({
        success: true,
        message: 'task created successfully',
        data: success,
      });
    }); //? Save User to DB
  }
);

exports.getAllTask = catchAsyncErrors(
  async (req: Request, res: Response, next: any) => {
    await Task.find({}).exec((err: any, success: any) => {
      if (err) {
        next(new ErrorHandler('Error occured while getting all tasks', 400));
      }
      res.status(200).json({
        success: true,
        message: 'All tasks fetched successfully',
        data: success,
      });
    });
  }
);

exports.getTaskPagination = catchAsyncErrors(
  async (req: Request, res: Response, next: any) => {
    // http://localhost:5000/api/v1/task/pagination?pageSize=3&page=1
    // controller will be for route /task/pagination
    const { pageSize, page } = req.query;
    const pageSizeInt = Number(pageSize);
    // if -1 is not added then, 1st page data will be shown for page = 0 ,
    // so to avoid providing value 0 for getting page 1 result, so, after putting -1 ,
    // the user need to put Page = 1 as later it will be subtracted by -1 and becomes 0 ,
    //  which provides page 1 result
    const pageInt = Number(page) - 1;

    await Task.find({})
      .limit(pageSizeInt)
      .skip(pageSizeInt * pageInt)
      .exec((err: any, success: any) => {
        if (err) {
          return next(
            new ErrorHandler('Error occured while getting all tasks', 400)
          );
        }
        res.status(200).json({
          success: true,
          message: 'All tasks fetched successfully',
          data: success,
        });
      });
  }
);
