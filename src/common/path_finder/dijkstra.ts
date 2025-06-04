import { getNeighbors } from "../../utils/generalUtils";
import { GameMap, TileData, Vector2 } from "../types";

class MinHeap<T> {
  private heap: { value: T; priority: number }[] = [];

  insert(value: T, priority: number) {
    this.heap.push({ value, priority });
    this.bubbleUp();
  }

  extractMin(): { value: T; priority: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const minNode = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return minNode;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * move o ultimo elemento inserido para cima na heap até que a propriedade da heap seja restaurada
   * compara a prioridade do elemento com a prioridade do seu pai e troca eles
   * se a prioridade do elemento for menor. Repete esse processo até que o elemento
   * esteja na posição correta ou se torne a raiz.
   */
  private bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.priority >= parent.priority) break;
      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  /**
   * comparar o valor atual com seus filhos
   * ver qual dos dois filhos tem o menor priority
   * se o menor filho for menor que o atual → troca de lugar
   * faz isso ate que a ordem seja restaurada
   */
  private sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = idx;

      if (
        leftIdx < length &&
        this.heap[leftIdx].priority < this.heap[swap].priority
      ) {
        swap = leftIdx;
      }
      if (
        rightIdx < length &&
        this.heap[rightIdx].priority < this.heap[swap].priority
      ) {
        swap = rightIdx;
      }
      if (swap === idx) break;
      [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
      idx = swap;
    }
  }
}

export function djkstra(
  botCoord: Vector2,
  pointsCoords: Vector2[],
  map: GameMap
): Vector2[] {
  if (!botCoord || map.length === 0 || pointsCoords.length === 0) return [];

  const startKey = `${botCoord.x},${botCoord.y}`;
  const dist: Record<string, number> = { [startKey]: 0 };
  const prev: Record<string, string> = {};
  const heap = new MinHeap<{ coord: Vector2 }>();

  heap.insert({ coord: botCoord }, 0);

  while (!heap.isEmpty()) {
    const node = heap.extractMin()!;
    const { coord } = node.value;
    const costSoFar = node.priority;
    const key = `${coord.x},${coord.y}`;

    //se o custo atual é maior que o menor custo já registrado para essa coordenada em (key), então ignora esse caminho.
    if (costSoFar > (dist[key] ?? Infinity)) continue;

    // se chegou em um dos pontos de destino, reconstrói o caminho
    if (pointsCoords.some((p) => p.x === coord.x && p.y === coord.y)) {
      const path: Vector2[] = [];
      let curKey: string | undefined = key;
      while (curKey && curKey !== startKey) {
        const [x, y] = curKey.split(",").map(Number);
        path.push({ x, y });
        curKey = prev[curKey];
      }
      return path.reverse();
    }

    // explora vizinhos validos
    for (const nb of getNeighbors(coord, map)) {
      if (nb.type === "tree") continue;

      const nbKey = `${nb.coord.x},${nb.coord.y}`;
      const alt = costSoFar + getTileCost(nb);

      // só atualiza se encontrou custo menor
      if (alt < (dist[nbKey] ?? Infinity)) {
        dist[nbKey] = alt;
        prev[nbKey] = key;
        heap.insert({ coord: nb.coord }, alt);
      }
    }
  }

  return [];
}

function getTileCost(tile: TileData): number {
  return tile.type === "tree" ? Infinity : tile.speed;
}
