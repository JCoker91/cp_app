import { generateListOfRandomEvaluations } from "./mock_data";
import { writeEvaluationListToFile } from "@/types";


export function writeEvaluationsToJsonFile() {
    const evaluations = generateListOfRandomEvaluations(2000);

    writeEvaluationListToFile(evaluations, "./evaluations.json");
}

