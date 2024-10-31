"use client";

import { useContext } from 'react';
import { SelectedEvaluationContext } from '@/state/state';
import { Card, CardBody, CardHeader, Divider, User, Chip, ChipProps } from '@nextui-org/react';
import { Evaluation } from '@/types';

const statusColorMap: Record<string, ChipProps["color"]>= {
  complete: "success",
  pending: "danger",
  scheduled: "warning",
};



export default function EvaluationsCard(
    { evaluations } : 
    { evaluations: Evaluation[] }
) {
    const { selectedKeys } = useContext(SelectedEvaluationContext);
    let evaluationCardData = selectedKeys !== "all" && selectedKeys.size === 0 ? null : evaluations.filter((evals) => Array.from(selectedKeys)[0] === evals.id)[0];
    return (
             <Card className="grow  min-w-[300px]">
              <CardHeader className="flex gap-3">
              <User
              avatarProps={{radius: "lg", src: evaluationCardData?.primaryTeacherAvatar}}
              description={evaluationCardData?.primaryTeacherEmail}
              name={evaluationCardData?.primaryTeacherName}
            >
              {evaluationCardData?.primaryTeacherName}
            </User>
              </CardHeader>
              <Divider/>
              <CardBody className=" px-4 gap-2">
                      <div className="flex justify-between">
                        <p>Date</p>
                        <p>{evaluationCardData?.evaluationDate}</p>
                      </div>
                      <Divider/>
                      <div className="flex justify-between">
                        <p>Time</p>
                        <p>{evaluationCardData?.evaluationTime}</p>
                      </div>
                      <Divider/>
                      <div className="flex justify-between">
                        <p>Class</p>
                        <p>{evaluationCardData?.className}</p>
                      </div>
                      <Divider/>
                    <div className="flex justify-between">
                      <p>Evaluator</p>
                      <p>{evaluationCardData?.evaluatorName}</p>
                    </div>
                    <Divider/>
                      <div className="flex justify-between">
                        <p>Status</p>
                        <Chip className="capitalize" color={statusColorMap[evaluationCardData?.status ? evaluationCardData?.status : 1]} size="sm" variant="flat">
                          {evaluationCardData?.status}
                        </Chip>
                      </div>
                    <Divider/>
                    <div>
                      <div className="flex justify-center">
                        <p className="text-center">Notes</p>
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-[250px]">
                        <p className="text-start">{evaluationCardData?.evaluationNotes}</p>
                    </div>
              </CardBody>
         </Card>  
         );
}