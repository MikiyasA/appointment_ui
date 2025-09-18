export interface Answer {
    id: string;
    text: string;
    questionId: string;
    isArchived: boolean;
}

export interface Question {
    id: string;
    text: string;
    multiAnswer?: boolean;
    categoryId: string;
    answer?: Answer[];
    isArchived: boolean;
    otherAllowed?: boolean;
}

export interface Category {
    id: string;
    title: string;
    description?: string;
    question?: Question[];
    isArchived: boolean;
}

export interface Appointment {
    id: string;
    agentId: string;
    clientId: string;
    startTime: string;
    endTime: string;
    status: string;
    meetingLink: string;
    questionnaireId: string;
    client?: Client;
    agent?: Agent;
    questionnaire?: Questionnaire;
    comments: string
    uniqueId: string
    guests: string[]

}
export interface Staff {
    id: string;
    firstName: string,
    lastName: string,
    idNo: string,
    email: string,
    status: string,
    role: string[]
}
export interface Agent {
    id: string;
    staffId: string;
    status: string;
    priority: number | null;
    staff: Staff;
    firstName: string,
    lastName: string
}
export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    role: string[];

}
export interface Questionnaire {
    id: string;
    clientId: string;
    questionnaireSnapshot?: QuestionnaireSnapshotItem[];
};


export interface QuestionnaireSnapshotItem {
    questionId: string;
    multiAnswer: boolean;
    questionText: string;
    otherText?: string;
    selectedOptions: SelectedOption[];
}

export interface SelectedOption {
    optionId: string;
    optionText: string;
}

export interface Schedule {
    id: string;
    agentId: string,
    startTime: string,
    endTime: string,
    type: string,
    isActive: string,
    status: string,
    timezone: string,
    agent: Agent,

    firstName?: string,
    lastName?: string,
}
export interface BullScheduleCreate {
    yearMonth: string,
    month: string,
    dateNumbers: number[],
    agents: string[],
    sTime: string,
    eTime: string,
    status: string,
}
export interface MultiDateScheduleCreate {
    listOfDays: string[],
    dateNumbers: number[],
    agents: string[],
    sTime: string,
    eTime: string,
    status: string,
}
export interface ScheduleItem {
    id: string;
    agentId: string,
    startTime: string,
    endTime: string,
    type: string,
    isActive: string,
    status: string,
    timezone: string,

    staffId: string,
    firstName: string,
    lastName: string,
    email: string,
    idNo: string,
}

export interface Dashboard {
    totalAppointments: number,
    openAppointments: number,
    closedAppointments: number,
    totalAgents: number,
    totalStaff: number,
    totalClients: number
}

export interface Homepage {
    id: string;
    homePicture: string;
}

export interface OurService {
    id: string;
    icon: string;
    title: string;
    description?: string;
    detail?: string;
}

export interface DetailService {
    id: string;
    image: string;
    title: string;
    description: string;
}

export interface SocialMedeaDetail {
    id: string;
    name: string;
    icon: string;
    link: string;
    aboutId?: string | null;
    position?: "ContactUS" | "Footer" | null;
}

export interface About {
    id: string;
    name: string;
    description: string;
    picture: string;
    socialMediaDetails?: SocialMedeaDetail[];
}

export interface ContactUs {
    id: string;
    icon: string;
    title: string;
    description?: string;
}
