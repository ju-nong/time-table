<template>
    <div>
        <DatePicker @onChange="handleChange" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { DatePicker } from "./components";

type DateConfig = {
    start: string;
    end: string;
};

const $date = reactive<DateConfig>({
    start: "",
    end: "",
});

function handleChange({ start, end }: DateConfig) {
    $date.start = start;
    $date.end = end;
}
</script>

<style></style>
