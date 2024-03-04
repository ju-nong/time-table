<template>
    <input type="date" @change="handleChangeStartDate" /><br />
    <input type="date" /><br /><br />

    <div>
        <div v-for="({ year, month, weeks }, index) in dateList" :key="index">
            {{ year }}년 | {{ month + 1 }}월 |

            <span v-for="week in weeks" :key="week"> {{ week }}주, </span>
            <br />
            <br />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import { WeekToMonthConfig } from "../types";

// 2024-09-01
// 2024-09-30

const startDate = ref(new Date("2020-09-01"));
const startYear = computed(() => startDate.value.getFullYear());
const startMonth = computed(() => startDate.value.getMonth());

const firstDate = computed(() => new Date(startYear.value, startMonth.value));

const endDate = ref(new Date("2024-09-30"));
const endMonth = computed(() => endDate.value.getMonth());

const dateList = ref<WeekToMonthConfig[]>([]);

function beforeSetDateList() {
    // 시작일의 해당하는 월의 1일
    const firstDay = firstDate.value.getDay();

    // 시작일의 해당하는 월의 1일이 월 ~ 목일 때
    if (firstDay > 0 && firstDay < 5) {
        setDateList();
    } else {
        // 전월 가져와야 됨
        let year = startYear.value;
        let month = startMonth.value - 1;

        // 1월일 때, 전년도 가져와야 됨
        if (startMonth.value === 0) {
            year--;
            month = 11;
        }

        dateList.value.push({
            year,
            month,
            weeks: [],
        });

        const prevDate = new Date(year, month);
        let week = 1;

        while (prevDate.getMonth() === month) {
            const date = prevDate.getDate();
            const day = prevDate.getDay();

            if (day === 4) {
                dateList.value[0].weeks.push(week);
                week++;
            }

            prevDate.setDate(date + 1);
        }

        setDateList();
    }
}

function setDateList() {
    let year = startYear.value;
    let month = startMonth.value;
    let weeks = 1;

    dateList.value.push({
        year,
        month,
        weeks: [],
    });

    const cloneFirstDate = firstDate.value;

    while (
        cloneFirstDate <= endDate.value ||
        (cloneFirstDate.getMonth() == endMonth.value &&
            cloneFirstDate >= endDate.value)
    ) {
        const _month = cloneFirstDate.getMonth();
        const date = cloneFirstDate.getDate();
        const day = cloneFirstDate.getDay();

        if (month !== _month) {
            month = month === 11 ? 0 : month + 1;
            weeks = 1;

            if (year !== cloneFirstDate.getFullYear()) {
                year++;
            }

            dateList.value.push({
                year,
                month,
                weeks: [],
            });
        }

        if (day === 4) {
            dateList.value.at(-1)?.weeks.push(weeks);

            weeks++;
        }

        cloneFirstDate.setDate(date + 1);
    }
}

function handleChangeStartDate(event: Event) {
    // startDate.value = new Date( event.target as HTMLInputElement).value)
}

onBeforeMount(() => {
    beforeSetDateList();
});
</script>

<style lang="scss"></style>
