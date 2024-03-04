type DateConfig = {
    start: string;
    end: string;
};

type DayKor = "일" | "월" | "화" | "수" | "목" | "금" | "토";

type DayElement = {
    date: number;
    label: DayKor;
    active: boolean;
};

type WeekToMonthConfig = {
    year: number;
    month: number;
    weeks: number[];
};

type WeekToMonthConfig2 = {
    year: number;
    month: number;
    weeks: WeekConfig[];
};

type WeekConfig = {
    week: number;
    list: AllDateConfig[];
};

type AllDateConfig = {
    year: number;
    month: number;
    date: number;
};

export type {
    DateConfig,
    DayKor,
    DayElement,
    WeekToMonthConfig,
    WeekToMonthConfig2,
    WeekConfig,
    AllDateConfig,
};
