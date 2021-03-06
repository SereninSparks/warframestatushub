<template>
    <div class="timer" :class="{ 'timer--expired': isExpired }">
        <span v-if="!hideDays">{{ days }}D</span>
        <span v-if="!hideHours">{{ hours }}H</span>
        <span v-if="!hideMinutes">{{ minutes }}M</span>
        <span>{{ seconds }}S</span>
    </div>
</template>

<script lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';

interface Props {
    target: string;
}

export default {
    name: 'Timer',
    props: ['target'],
    setup(props: Props, context) {
        function updateDiffRefs() {
            diff.value = targetDate.getTime() - new Date().getTime();

            daysDiff.value = Math.floor(diff.value / dayDivisor);
            hoursDiff.value = Math.floor((diff.value % dayDivisor) / hourDivisor);
            minutesDiff.value = Math.floor((diff.value % hourDivisor) / minuteDivisor);
            secondsDiff.value = Math.floor((diff.value % minuteDivisor) / secondDivisor);

            hideDays.value = !isExpired.value && daysDiff.value === 0;
            hideHours.value = !isExpired.value && hoursDiff.value === 0;
            hideMinutes.value = !isExpired.value && minutesDiff.value === 0;
        }

        function formatDigit(digit: number): string {
            return `0${Math.max(0, digit)}`.substr(-2);
        }

        function stop(): void {
            clearInterval(intervalId);
        }

        const oneSecond = 1000;
        const targetDate = new Date(props.target);
        const secondDivisor = oneSecond;
        const minuteDivisor = secondDivisor * 60;
        const hourDivisor = minuteDivisor * 60;
        const dayDivisor = hourDivisor * 24;

        const diff = ref<number>(targetDate.getTime() - new Date().getTime());
        const isExpired = computed<boolean>(() => diff.value <= oneSecond);

        const daysDiff = ref<number>(0);
        const hoursDiff = ref<number>(0);
        const minutesDiff = ref<number>(0);
        const secondsDiff = ref<number>(0);

        const days = computed<string>(() => formatDigit(daysDiff.value));
        const hours = computed<string>(() => formatDigit(hoursDiff.value));
        const minutes = computed<string>(() => formatDigit(minutesDiff.value));
        const seconds = computed<string>(() => formatDigit(secondsDiff.value));

        const hideDays = ref<boolean>(false);
        const hideHours = ref<boolean>(false);
        const hideMinutes = ref<boolean>(false);

        let intervalId!: NodeJS.Timeout;

        watch(diff, diff => {
            // If below 1000ms, it has been floored thus it's 0 seconds
            if (diff <= oneSecond) {
                stop();
                context.emit('expired');
            }
        });

        onMounted(() => {
            intervalId = setInterval(updateDiffRefs, 1000);
            updateDiffRefs();
        });

        onBeforeUnmount(stop);

        return {
            isExpired,
            days,
            hours,
            minutes,
            seconds,
            hideDays,
            hideHours,
            hideMinutes,
        }
    },
}
</script>

<style scoped>
    .timer {
        @apply border border-green-600 rounded bg-green-600 text-white px-2 inline-block;
        font-family: 'Ubuntu Mono';
    }

    .timer--expired {
        @apply border-red-600 bg-red-600;
    }

    .timer span:not(:last-child) {
        @apply inline-block mr-1;

        font-variant-numeric: tabular-nums;
    }
</style>
