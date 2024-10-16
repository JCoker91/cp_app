import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithPassword = User & {
  password: string;
};

export type Class = {
  id: string;
  name: string;
  primaryTeacherId: string;
  secondaryTeacherIds: string[];
  grade: "PRE" | "K" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Evaluation = {
  id: string;
  primaryTeacherId: string;
  classId: string;
  evaluationNotes: string;
  evaluationDate: Date;
  evaluatorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Subject = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
