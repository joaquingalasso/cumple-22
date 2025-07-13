
export enum Attendance {
    YES = "Sí",
    NO = "No",
    MAYBE = "Capaz"
}

export enum Schedule {
    SNACKS = "Merienda",
    DINNER = "Cena",
    ALL_DAY = "Todo el día"
}

export enum Sleepover {
    YES = "Sí",
    NO = "No"
}


export interface RsvpData {
    name: string;
    attendance: Attendance;
    schedule: Schedule;
    sleepover: Sleepover;
    contribution: string;
    songSuggestion: string;
    message: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}
