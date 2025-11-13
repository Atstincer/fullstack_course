interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface HeaderProps {
  name: string;
}

/*export interface CourseInfo {
  name: string;
  exerciseCount: number;
}*/

export interface ContentProps {
  courseParts: Array<CoursePart>;
}

export interface TotalProps {
  totalExercises: number;
}

export interface PartProps {
  part: CoursePart;
  key: number;
}
