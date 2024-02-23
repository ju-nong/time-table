<template>
    <div class="container">
        <div
            v-for="({ date, label, active }, index) in list"
            :key="date"
            :class="{
                active: active,
                blue: label === '토',
                red: label === '일',
            }"
            @click="handleClick(index)"
        >
            <div>{{ date }}</div>
            <div></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { DayElement } from "../types";

const emits = defineEmits(["onClick"]);

const props = defineProps<{
    list: DayElement[];
}>();

const { list } = toRefs(props);

function handleClick(index: number) {
    const { label } = list.value[index];

    if (!(label === "토" || label === "일")) {
        emits("onClick", index);
    }
}
</script>

<style scoped>
.container {
    margin: 50px 0px 0px 50px;
    /* width: 1054px; */
    overflow-y: scroll;
    border: 1px solid #000;
    display: flex;

    > div {
        width: 33px;
        display: inline-block;

        &.active {
            > div:nth-child(2) {
                background-color: green;
            }
        }

        &.blue {
            > div:nth-child(1) {
                color: blue;
            }
        }

        &.red {
            > div:nth-child(1) {
                color: red;
            }
        }

        > div:nth-child(1) {
            text-align: center;
            line-height: 20px;
            background-color: #fdfdfd;
        }

        > div:nth-child(2) {
            height: 40px;
        }
    }
}
</style>
