import { Evaluation, Teacher } from "../types";
import { LoremIpsum } from "lorem-ipsum";

function randomDate(start: Date, end: Date) : Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateListOfRandomEvaluations(count: number) : Evaluation[] {
    const evaluations: Evaluation[] = [];
    const statuses = ["complete", "scheduled", "pending"];
    const teachers: Teacher[] = [
        {
            name: "Wade Wilson",
            email: "wade.wilson@mail.com",
            avatar: "/avatars/wade.wilson.png",
            classes: [
                "Biology 101",
                "Chemistry 101",
                "Physics 101"
            ]
        },
        {
            name: "Peter Parker",
            email: "peter.parker@mail.com",
            avatar: "/avatars/peter.parker.png",
            classes: [
                "Math 101",
                "Math 102",
                "Math 103"
            ]
        },
        {
            name: "Tony Stark",
            email: "tony.stark@mail.com",
            avatar: "/avatars/tony.stark.png",
            classes: [
                "Business 101",
                "English 102",
                "Business 103"
            ]
        },
        {
            name: "Logan Howlett",
            email: "logan.howlett@mail.com",
            avatar: "/avatars/logan.howlett.png",
            classes: [
                "PE",
                "World History",
                "Weightlifting"
            ]
        },
        {
            name: "Steve Rogers",
            email: "steve.rogers@mail.com",
            avatar: "/avatars/steve.rogers.png",
            classes: [
                "Ethics",
                "US History",
                "Speech 102"
            ]
        },
        {
            name: "Wanda Maximoff",
            email: "wanda.maximoff@mail.com",
            avatar: "/avatars/wanda.maximoff.png",
            classes: [
                "Biology 101",
                "Philosophy 101",
                "Writing 101"
            ]
        },
        {
            name: "Kate Bishop",
            email: "kate.bishop@mail.com",
            avatar: "/avatars/kate.bishop.png",
            classes: [
                "Archery 101",
                "Spanish 101",
                "French 101"
            ]
        },
        {
            name: "Natasha Romanoff",
            email: "natasha.romanoff@mail.com",
            avatar: "/avatars/natasha.romanoff.png",
            classes: [
                "Espionage 101",
                "Russian 101",
                "Martial Arts 101"
            ]
        },
        {
            name: "Jennifer Walters",
            email: "jennifer.walters@mail.com",
            avatar: "/avatars/jennifer.walters.png",
            classes: [
                "Debate 101",
                "Law 101",
                "Law 102"
            ]
        },
        {
            name: "Carol Danvers",
            email: "carol.danvers@mail.com",
            avatar: "/avatars/carol.danvers.png",
            classes: [
                "Astronomy 101",
                "Physics 101",
                "Chemistry 101"
            ]
        },

    ];
    for (let i = 0; i < count; i++) {
        const teacher = teachers[Math.floor(Math.random() * teachers.length)];
        const lorem = new LoremIpsum();
        const evaluation: Evaluation = {
            id: Math.random().toString(36).substring(7),
            primaryTeacherName: teacher.name,
            primaryTeacherEmail: teacher.email,
            primaryTeacherAvatar: teacher.avatar,
            className: teacher.classes[Math.floor(Math.random() * teacher.classes.length)],
            evaluationNotes: lorem.generateSentences(Math.floor(Math.random() * 5) + 2),
            evaluationDate: randomDate(new Date(2023, 0, 1), new Date()).toLocaleDateString(),
            evaluatorName: "Nick Fury",
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        evaluations.push(evaluation);
    }

    return evaluations;
}