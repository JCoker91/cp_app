/* eslint-disable prettier/prettier */
import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { writeEvaluationsToJsonFile } from "../../util/write_mock_to_file";
import { users, subjects, classes, evaluations } from "../../types/seed-data";
import { Evaluation } from "@/types";

const client = await db.connect();

async function seedUsers() {
  await client.sql`DROP TABLE IF EXISTS users`;
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      avatar TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return client.sql`
        INSERT INTO users (id, first_name, last_name, email, password, avatar, is_admin)
        VALUES (${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword}, ${user.avatar}, ${user.role === "admin"})
        RETURNING id, email;
      `;
    }),
  );

  return insertedUsers;
}


async function seedSubjects() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE IF EXISTS subjects`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedSubjects = await Promise.all(
    subjects.map(
      (subject) => client.sql`
        INSERT INTO subjects (id, name)
        VALUES (${subject.id}, ${subject.name})
        RETURNING id, name;
      `,
    ),
  );
  return insertedSubjects;
}

async function seedClasses() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE IF EXISTS classes`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS classes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      primary_teacher_id UUID NOT NULL,
      secondary_teacher_ids UUID[] NULL,
      grade VARCHAR(255) NOT NULL,
      subject_id UUID NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedClasses = await Promise.all(
    classes.map(
      (classData) => client.sql`
        INSERT INTO classes (id, name, primary_teacher_id, secondary_teacher_ids,grade, subject_id)
        VALUES (${classData.id}, ${classData.name}, ${classData.primaryTeacherId}, ${"{" + classes[0].secondaryTeacherIds.join(',')  + "}"}, ${classData.grade}, ${classData.subjectId})
        RETURNING id, name;
      `,
    ),
  );

  return insertedClasses;
}

async function seedEvaluations() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE IF EXISTS evaluations`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS evaluations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      primary_teacher_id UUID NOT NULL,
      class_id UUID NOT NULL,
      evaluation_notes TEXT NOT NULL,
      evaluation_date TIMESTAMP WITH TIME ZONE NOT NULL,
      evaluator_id UUID NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  const insertedEvaluations = await Promise.all(
    evaluations.map(
      (evaluation) => client.sql`
        INSERT INTO evaluations (primary_teacher_id, class_id, evaluation_notes, evaluation_date, evaluator_id)
        VALUES (${evaluation.primaryTeacherId}, ${evaluation.classId}, ${evaluation.evaluationNotes}, ${evaluation.evaluationDate.toISOString()}, ${evaluation.evaluatorId})
        RETURNING id, evaluation_notes;
      `,
    ),
  );

  return insertedEvaluations;
}

// export function loadEvaluationsFromFile() : Evaluation[] {
//   const evaluations: Evaluation[] = require("../../evaluations.json");
//   evaluations.forEach((element) => {
//     console.log(element);
//   });
//   return evaluations;
// } 
export async function GET() {
  writeEvaluationsToJsonFile();
  // loadEvaluationsFromFile();
  try {
    await client.sql`BEGIN`;
    let createdUsers = await seedUsers();
    let createdSubjects = await seedSubjects();
    let createdClasses = await seedClasses();
    let createdEvaluations = await seedEvaluations();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return NextResponse.json({ 
        message: "Successfully Seeded Database", 
        created_users : createdUsers.map(user => user.rows[0]),
        created_subjects: createdSubjects.map(subject => subject.rows[0]),
        created_classes: createdClasses.map(classData => classData.rows[0]),
        created_evaluations: createdEvaluations.map(evaluation => evaluation.rows[0])
     });
  } catch (error) {
    await client.sql`ROLLBACK`;

    return NextResponse.json({ error }, { status: 500 });
  }

}
