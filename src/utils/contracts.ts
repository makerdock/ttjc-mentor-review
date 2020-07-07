export interface RootObject {
  allProjects: AllProject[];
  allUsers: AllUser[];
  allReviewedProjects: AllReviewedProject[];
  allNotReviewedProjects: AllProject[];
}

export interface AllReviewedProject {
  labels: Labels2;
  id: string;
  url: string;
  title: string;
  number: number;
  createdAt: string;
  body: string;
  author: Author;
}

export interface Labels2 {
  edges: Edge[];
}

export interface AllUser {
  name?: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
  totalProjects: number;
  projects: string[];
}

export interface AllProject {
  labels: Labels;
  id: string;
  url: string;
  title: string;
  number: number;
  createdAt: string;
  body: string;
  author: Author;
}

export interface Author {
  name?: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
}

export interface Labels {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  description: string;
  name: string;
}
