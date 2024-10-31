import { Evaluation } from "@/types";
import * as data from "../../../evaluations.json";
import { SelectedEvaluationProvider } from "@/state/state";
import EvaluationsTable from "@/components/evaluations/EvaluationsTable";
import EvaluationsCalendar from "@/components/evaluations/EvaluationsCalendar";
import EvaluationsCard from "@/components/evaluations/EvaluationsCard";

const listCount = 1000;
const evaluations: Evaluation[] = Object.keys(data).slice(0,listCount).map((k:any) => data[k] as Evaluation).sort((a: Evaluation,b: Evaluation) => {return new Date(`${a.evaluationDate} ${a.evaluationTime}`) < new Date(`${b.evaluationDate} ${b.evaluationTime}`) ? 1 : -1;});

export default function EvaluationsPage() { 
    return (
      <div className="container flex justify-between gap-6">
         <EvaluationsCalendar evaluations={evaluations}/>
         <SelectedEvaluationProvider>
            <EvaluationsTable evaluations={evaluations}/>
            <EvaluationsCard evaluations={evaluations}/>
          </SelectedEvaluationProvider>
        </div>
    );
}