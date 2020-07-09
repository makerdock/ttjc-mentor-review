export interface Node2 {
  description: string;
  name: string;
}

export interface Edge {
  node: Node2;
}

export interface Labels {
  edges: Edge[];
}

export interface Author {
  name: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
}

export interface Node {
  labels: Labels;
  id: string;
  url: string;
  title: string;
  number: number;
  createdAt: Date;
  body: string;
  author: Author;
}

export interface AllProject {
  cursor: string;
  node: Node;
}

export interface AllUser {
  name: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
  totalProjects: number;
  projects: any[];
  isFinalist: boolean;
}

export interface Node4 {
  description: string;
  name: string;
}

export interface Edge2 {
  node: Node4;
}

export interface Labels2 {
  edges: Edge2[];
}

export interface Author2 {
  name: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
}

export interface Node3 {
  labels: Labels2;
  id: string;
  url: string;
  title: string;
  number: number;
  createdAt: Date;
  body: string;
  author: Author2;
}

export interface AllReviewedProject {
  cursor: string;
  node: Node3;
}

export interface Node6 {
  description: string;
  name: string;
}

export interface Edge3 {
  node: Node6;
}

export interface Labels3 {
  edges: Edge3[];
}

export interface Author3 {
  name: string;
  avatarUrl: string;
  login: string;
  id: string;
  url: string;
}

export interface Node5 {
  labels: Labels3;
  id: string;
  url: string;
  title: string;
  number: number;
  createdAt: Date;
  body: string;
  author: Author3;
}

export interface AllNotReviewedProject {
  cursor: string;
  node: Node5;
}

export interface RootObject {
  allProjects: AllProject[];
  allUsers: AllUser[];
  allReviewedProjects: AllReviewedProject[];
  allNotReviewedProjects: AllNotReviewedProject[];
}
