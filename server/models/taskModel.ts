//? types
import { Model, Schema, Document } from 'mongoose';

const mongoose = require('mongoose');

interface taskSchemaInterface extends Document {
  taskId: string;
  taskName: string;
  taskDescription: string;
}

const taskSchema: Schema = new Schema<taskSchemaInterface>(
  {
    taskId: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      maxlength: [5, 'taskId cannot be more than 50'],
    },
    taskName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      maxlength: [50, 'taskName cannot be more than 50'],
    },
    taskDescription: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      maxlength: [50, 'taskDescription cannot be more than 50'],
    },
  },
  {
    timestamps: true,
  }
);

const Task: Model<taskSchemaInterface> = mongoose.model('Task', taskSchema);

module.exports = Task;
