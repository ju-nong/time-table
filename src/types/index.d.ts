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

export type { DateConfig, DayKor, DayElement };
