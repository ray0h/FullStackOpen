
export interface HeaderProps {
    name: string;
  }
  
interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartWithDescriptions extends CoursePartBase {
	description: string;
}

interface CoursePartOne extends CoursePartWithDescriptions {
	name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
	name: "Using props to pass data";
	groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescriptions {
	name: "Deeper type usage";
	exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescriptions {
	name: "Just in time";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour

export interface SinglePart {
	part: CoursePart;
}

export interface Parts {
	courseParts: CoursePart[];
} 