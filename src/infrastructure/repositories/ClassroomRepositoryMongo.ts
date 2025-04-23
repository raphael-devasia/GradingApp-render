import mongoose from "mongoose";
import { IClassroomRepository } from "../../domain/repositories/classroomRepository";

import { IUser } from "../../domain/models/user.interface";
import { IClassroom } from "../../domain/models/classroom.model";
import ClassroomModel from '../db/models/classRoom.model'
import UserModel from '../db/models/user.model'


export class ClassroomRepositoryMongo implements IClassroomRepository {
  async findClassrooms(teacherId: string): Promise<IClassroom[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        throw new Error("Invalid teacher ID format");
      }
      const classrooms = await ClassroomModel.find({
        $or: [{ teacherId }, { coTeacherIds: teacherId }],
      }).exec();
      return classrooms.map((classroom) => classroom.toJSON() as IClassroom);
    } catch (error: any) {
      throw new Error(`Failed to fetch classrooms: ${error.message}`);
    }
  }

  async addStudent(classroomId: string, student: Partial<IUser>): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(classroomId)) {
        throw new Error("Invalid classroom ID format");
      }
      // Create or find student
      let user = await UserModel.findOne({ email: student.email });
      if (!user) {
        user = new UserModel({ ...student, role: "student", status: "active" });
        await user.save();
      } else if (user.role !== "student") {
        throw new Error("User is not a student");
      }
      // Add student to classroom
      const classroom = await ClassroomModel.findById(classroomId);
      if (!classroom) {
        throw new Error("Classroom not found");
      }
      if (!classroom.studentIds.includes(user._id)) {
        classroom.studentIds.push(user._id);
        await classroom.save();
      }
      return user.toJSON() as IUser;
    } catch (error: any) {
      throw new Error(`Failed to add student: ${error.message}`);
    }
  }

  async addCoTeacher(classroomId: string, coTeacher: Partial<IUser>): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(classroomId)) {
        throw new Error("Invalid classroom ID format");
      }
      // Create or find co-teacher
      let user = await UserModel.findOne({ email: coTeacher.email });
      if (!user) {
        user = new UserModel({ ...coTeacher, role: "teacher", status: "pending" });
        await user.save();
      } else if (user.role !== "teacher") {
        throw new Error("User is not a teacher");
      }
      // Add co-teacher to classroom
      const classroom = await ClassroomModel.findById(classroomId);
      if (!classroom) {
        throw new Error("Classroom not found");
      }
      if (!classroom.coTeacherIds.includes(user._id)) {
        classroom.coTeacherIds.push(user._id);
        await classroom.save();
      }
      return user.toJSON() as IUser;
    } catch (error: any) {
      throw new Error(`Failed to add co-teacher: ${error.message}`);
    }
  }

  async getStudents(classroomId: string): Promise<IUser[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(classroomId)) {
        throw new Error("Invalid classroom ID format");
      }
      const classroom = await ClassroomModel.findById(classroomId)
        .populate("studentIds", "name email role status")
        .exec();
      if (!classroom) {
        throw new Error("Classroom not found");
      }
      return (classroom.studentIds as any[]).map((user) => user.toJSON() as IUser);
    } catch (error: any) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  }

  async getCoTeachers(classroomId: string): Promise<IUser[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(classroomId)) {
        throw new Error("Invalid classroom ID format");
      }
      const classroom = await ClassroomModel.findById(classroomId)
        .populate("coTeacherIds", "name email role status")
        .exec();
      if (!classroom) {
        throw new Error("Classroom not found");
      }
      return (classroom.coTeacherIds as any[]).map((user) => user.toJSON() as IUser);
    } catch (error: any) {
      throw new Error(`Failed to fetch co-teachers: ${error.message}`);
    }
  }
}