<template>
    <!-- <div>
        <DatePicker @onChange="handleChange" />
        <DateViewer :list="dayList" @onClick="handleClick" />

        <h3>근무일 {{ workConfig.workDay }}</h3>
        <h3>공수 {{ workConfig.workMan }}</h3>
    </div> -->

    <DateChart />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import { DatePicker, DateViewer, DateChart } from "./components";

import { DateConfig, DayKor, DayElement } from "./types";

const weekDays: DayKor[] = ["일", "월", "화", "수", "목", "금", "토"];

const $date = reactive<DateConfig>({
    start: "",
    end: "",
});
const dayList = ref<DayElement[]>([]);

// 근무일 및 공수
const workConfig = computed(() => {
    let workNumber = 0;
    let allWorkNumber = 0;

    for (let i = 0; i < dayList.value.length; i++) {
        const { label, active } = dayList.value[i];

        if (active) {
            workNumber++;
        }

        if (!(label === "토" || label === "일")) {
            allWorkNumber++;
        }
    }

    const workMan = (workNumber / allWorkNumber).toFixed(2);

    return {
        workDay: workNumber,
        workMan: workMan === "NaN" ? "0.00" : workMan,
    };
});

function setDayList(start: string, end: string) {
    if (start === "" || end === "") {
        return;
    }

    const list: DayElement[] = [];

    const startDate = new Date(start);
    const endDate = new Date(end);

    while (startDate <= endDate) {
        const date = startDate.getDate();
        const label = weekDays[startDate.getDay()];

        list.push({
            date,
            label,
            active: !(label === "토" || label === "일"),
        });

        startDate.setDate(date + 1);
    }

    dayList.value = list;
}

function handleChange({ start, end }: DateConfig) {
    $date.start = start;
    $date.end = end;

    setDayList(start, end);
}

function handleClick(index: number) {
    const { active } = dayList.value[index];

    dayList.value[index].active = !active;
}
</script>

<style></style>
