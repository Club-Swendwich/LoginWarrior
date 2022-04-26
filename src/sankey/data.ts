import { csv } from "d3-fetch";

export interface SankeyDataLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyDataNode {
  name: string;
  category: string;
}

export interface SankeyData {
  nodes: SankeyDataNode[];
  links: SankeyDataLink[];
}

export const getData = async (): Promise<SankeyData> => {
  var nodes = [
    { name: "Alice", category: "1" },
    { name: "Gianna", category: "1" },
    { name: "Carola", category: "1" },
    { name: "Damiano", category: "1" }
  ];
  
  var links = [
    { source: "Alice", target: "Gianna", value: 2 },
    { source: "Gianna", target: "Carola", value: 3 },
    { source: "Damiano", target: "Gianna", value: 1 }
  ];

  return { nodes, links };
};
