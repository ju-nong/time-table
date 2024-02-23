<template>
    <div class="container">
        <div>
            <h3>시작 일</h3>
            <input
                type="date"
                v-model="config.start"
                @change="emits('onChange', config)"
            />
        </div>
        <div>
            <h3>종료 일</h3>
            <input
                type="date"
                v-model="config.end"
                @change="emits('onChange', config)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const emits = defineEmits(["onChange"]);

const config = reactive({
    start: "",
    end: "",
});
</script>

<style></style>
