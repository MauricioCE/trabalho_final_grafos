import { stage_0 } from "./stage_0";
import { stage_1 } from "./stage_1";
import { stage_2 } from "./stage_2";
import { stage_3 } from "./stage_3";

const stages = {
  stage_0: stage_0,
  stage_1: stage_1,
  stage_2: stage_2,
  stage_3: stage_3,
};

export function getStage(id: string) {
  const key = `stage_${id}`;

  if (key in stages) {
    return stages[key as keyof typeof stages];
  }

  return stage_1;
}
