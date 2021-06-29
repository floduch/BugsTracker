export interface Bug {
	id: string;
	title: string;
	description: string;
	status: BugStatusEnum;
}

export enum BugStatusEnum {
	Open = "open",
	InProgress = "in-progress",
	Fixed = "fixed"
}
