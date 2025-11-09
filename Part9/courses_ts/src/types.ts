export interface HeaderProps {
  name: string;
}

export interface CourseInfo {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: Array<CourseInfo>;
}

export interface TotalProps {
  totalExercises: number;
}
