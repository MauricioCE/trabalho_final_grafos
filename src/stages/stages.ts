import { createStage } from "./createStage";

const stage_test = createStage("Fase teste", "2", "djkstra");
const stage_tutorial = createStage("Fase tutorial", "2", "djkstra");

const stage_1 = createStage("Fase 1 - DFS", "2", "dfs");
const stage_2 = createStage("Fase 2 - BFS", "3", "bfs");
const stage_3 = createStage("Fase 3 - Djkstra", "4", "djkstra");
const stage_4 = createStage("Fase 4 - Salesman", "", "salesman");

const stages = {
  stage_test: stage_test,
  stage_tutorial: stage_tutorial,
  stage_1: stage_1,
  stage_2: stage_2,
  stage_3: stage_3,
  stage_4: stage_4,
};

export function getStage(id: string) {
  const key = `stage_${id}`;

  console.log(id);

  if (key in stages) {
    return stages[key as keyof typeof stages];
  }

  return stage_1;
}
