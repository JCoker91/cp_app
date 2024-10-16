/* eslint-disable prettier/prettier */
export const users = [
  {
    id: "b618f2c0-0db8-4df4-87bf-30c7255ce9fc",
    firstName: "Logan",
    lastName: "Howlett",
    email: "logan.howlett@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/logan.howlett.png",
    active: true,
  },
  {
    id: "e9d7ac0a-fb7a-4ebf-95d7-3f7a71911b51",
    firstName: "Wade",
    lastName: "Wilson",
    email: "wade.wilson@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/wade.wilson.png",
    active: true,
  },
  {
    id: "b824ede1-1812-4e91-a650-78fa852656e7",
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve.rogers@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/steve.rogers.png",
    active: true,
  },
  {
    id: "fc656350-9dc8-4eef-a3a8-9da41c837a83",
    firstName: "Peter",
    lastName: "Parker",
    email: "peter.parker@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/peter.parker.png",
    active: true,
  },
  {
    id: "76a37f42-9add-4bdd-b536-f5a8ba0e9f56",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony.stark@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/tony.stark.png",
    active: true,
  },
  {
    id: "8a4fecb8-4052-45e5-bab9-42754a0cf622",
    firstName: "Wanda",
    lastName: "Maximoff",
    email: "wanda.maximoff@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/wanda.maximoff.png",
    active: true,
  },
  {
    id: "70f3f9df-0878-42d7-8d97-b5b9df26c007",
    firstName: "Natasha",
    lastName: "Romanoff",
    email: "natasha.romanoff@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/natasha.romanoff.png",
    active: true,
  },
  {
    id: "65e3df26-6ae9-4dd5-b66c-e361091c21c8",
    firstName: "Carol",
    lastName: "Danvers",
    email: "carol.danvers@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/carol.danvers.png",
    active: true,
  },
  {
    id: "9ee5cfc1-44e9-497d-9a39-7560ad23e6d5",
    firstName: "Jennifer",
    lastName: "Walters",
    email: "jennifer.walters@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/jennifer.walters.png",
    active: true,
  },
  {
    id: "77d7ea29-abd2-4552-922c-13ae15707298",
    firstName: "Kate",
    lastName: "Bishop",
    email: "kate.bishop@mail.com",
    password: "password",
    role: "user",
    avatar: "/avatars/kate.bishop.png",
    active: true,
  },
  {
    id: "37cd3120-4183-4a54-8451-e4fa66fc47e4",
    firstName: "Nick",
    lastName: "Fury",
    email: "nick.fury@mail.com",
    password: "password",
    role: "admin",
    avatar: "/avatars/nick.fury.png",
    active: true,
  },
];

export const subjects = [
  {
    id: "e2bb0585-3729-4197-b093-ad58e54aa72f",
    name: "Mathematics",    
  },
  {
    id: "d52f0268-072c-404a-a107-f87d47fc9cfd",
    name: "Science",
  },
  {
    id: "5878b2d0-5af6-4141-80e3-795f73b95f5b",
    name: "History",
  },
  {
    id: "c0a1b630-87aa-4dbe-8bbc-d0e5c2465686",
    name: "Literature",
  },
  {
    id: "b8a92d63-bdf2-4b87-a68e-64b5bdb3b79c",
    name: "Physical Education",
  },
  {

    id: "e83b404e-dfd4-42c6-b5d9-87f1f4c8014f",
    name: "Art",
  },
  {
    id: "6d2bd909-6eb5-49bb-9c1e-82d96d5fc6de",
    name: "Music",
  },
  {
    id: "fce0e184-89ac-434e-ab81-0b919d01d1a8",
    name: "Computer Science",
  },
  {
    id: "bd2acde2-ad50-4725-875a-eb4a0500d26c",
    name: "Geography",
  },
  {
    id: "bcdb8716-d8e9-422f-b548-8542074e24fd",
    name: "Foreign Languages",
  }
];

export const classes = [
  {
    id: "befde926-7566-49e8-b3ec-1aacac953a91",
    name: "Mathematics 101",
    primaryTeacherId: users[0].id,
    secondaryTeacherIds: [
      users[6].id,
    ],
    grade: "7",
    subjectId: subjects[0].id,
  },
  {
    id: "6e29aa97-ba0a-40d5-b633-11ce4ee75d31",
    name: "First Grade Science",
    primaryTeacherId: users[7].id,
    secondaryTeacherIds: [],
    grade: "1",
    subjectId: subjects[1].id,
  },
  {
    id: "64fe2fbe-7db2-4d51-804d-1e469683e8dd",
    name: "Preschool Music",
    primaryTeacherId: users[8].id,
    secondaryTeacherIds: [
      users[2].id,
      users[3].id,
    ],
    grade: "PRE",
    subjectId: subjects[6].id,
  }
];

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

export const evaluations = [
  {
    primaryTeacherId: classes[0].primaryTeacherId,
    classId: classes[0].id,
    evaluationNotes: "Good job!",
    evaluationDate: new Date(),
    evaluatorId: users[users.length - 1].id,
  },
  {
    primaryTeacherId: classes[1].primaryTeacherId,
    classId: classes[1].id,
    evaluationNotes: "Needs work....",
    evaluationDate: new Date(),
    evaluatorId: users[users.length - 1].id,
  },
  {
    primaryTeacherId: classes[2].primaryTeacherId,
    classId: classes[2].id,
    evaluationNotes: "Beautiful!",
    evaluationDate: new Date(),
    evaluatorId: users[users.length - 1].id,
  },
];