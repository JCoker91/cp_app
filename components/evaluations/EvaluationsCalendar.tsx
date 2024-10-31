'use client';

import { useState, useMemo } from 'react';
import type { DateValue } from "@react-types/calendar";
import { Calendar } from '@nextui-org/calendar';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image, Divider, Button } from '@nextui-org/react';
import { Evaluation } from '@/types';
import {getLocalTimeZone, today} from "@internationalized/date";

export default function EvaluationsCalendar({evaluations} : {evaluations: Evaluation[]}) {  
  const [selectedDate, setSelectedDate] = useState<DateValue>(today(getLocalTimeZone()));

    const scheduledEvaluations = useMemo(() => {
        let _filteredEvaluations = [...evaluations];
        let _selectedDate =  new Date(selectedDate == undefined ? 2024 :selectedDate.year, selectedDate == undefined ? 10 : selectedDate.month - 1, selectedDate?.day);      
        return  _filteredEvaluations.filter((evaluation) => _selectedDate.getMonth() == new Date(Date.parse(evaluation.evaluationDate)).getMonth() && _selectedDate.getFullYear() == new Date(Date.parse(evaluation.evaluationDate)).getFullYear() && _selectedDate.getFullYear() == new Date(Date.parse(evaluation.evaluationDate)).getFullYear() && _selectedDate.getDate() == new Date(Date.parse(evaluation.evaluationDate)).getDate()).reverse();
        }, [selectedDate]);

    return (
    <div className="container flex flex-col w-auto justify-between ">
    <Calendar 
      aria-label="Date (Controlled)"
      value={selectedDate}
      onChange={setSelectedDate}    

    />
    <Card className="max-w-[400px] grow">
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">October 17th</p>
        <p className="text-small text-default-500">scheduled evaluations</p>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody className="overflow-y-scroll text-small max-h-[125px]">
    {
      scheduledEvaluations.map((evaluation) => (
        <Button
          variant="light"
          className="flex justify-between"
          onDoubleClick={() => alert(evaluation.primaryTeacherName)}
          key={evaluation.id}>
            <p>{evaluation.primaryTeacherName}</p>
            <p>{(new Date(evaluation.evaluationDate + " " + evaluation.evaluationTime).getHours() % 12 == 0 ? 12 : new Date(evaluation.evaluationDate + " " + evaluation.evaluationTime).getHours() % 12) + ":" + new Date(evaluation.evaluationDate + " " + evaluation.evaluationTime).getMinutes().toString().padStart(2,"0")}</p>                    
        </Button>
        
      ))
    }
    </CardBody>
    <Divider/>
    <CardFooter 
      className="items-center justify-center"
    >
    <Button
      color="primary"
    >
      Schedule Evaluation
    </Button>
    </CardFooter>
  </Card>
</div>
);
}