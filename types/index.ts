import { SVGProps } from "react";
import fs from "fs";
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

export type Teacher =  {
  name: string;
  email: string;
  avatar: string;
  classes: string[];
}

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
  primaryTeacherName: string;
  primaryTeacherEmail: string;
  primaryTeacherAvatar: string;
  className: string;
  evaluationNotes: string;
  evaluationDate: string;
  evaluationTime: string;
  evaluatorName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Subject = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};


export function writeEvaluationToJson(evaluation: Evaluation) {
  return JSON.stringify(evaluation, null, 2);
}

export function readEvaluationFromJson(json: string): Evaluation {
  return JSON.parse(json) as Evaluation;
}

export function writeEvaluationToFile(evaluation: Evaluation, path: string) {
  fs.writeFile(path, writeEvaluationToJson(evaluation), (err) => {
    if (err) {
      console.error(err);
    }
  });
} 

export function writeEvaluationListToFile(evaluations: Evaluation[], path: string) {
  fs.writeFile(path, JSON.stringify(evaluations, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  }); 
}

export function readEvaluationsFromFile(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8")) as Evaluation[];  
}


export const generatedEvaluationList : Evaluation[] = readEvaluationsFromFile("./evaluations.json");