<template>
    <div class="timer" :class="{ 'timer--expired': isExpired }">
        <span v-if="!hideDays">{{ displayDays }}D</span>
        <span v-if="!hideHours">{{ displayHours }}H</span>
        <span v-if="!hideMinutes">{{ displayMinutes }}M</span>
        <span>{{ displaySeconds }}S</span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Timer',
    props: {
        target: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            intervalId: null,
        };
    },
    computed: {
        targetDate(): Date {
            return new Date(this.target);
        },
        secondDivisor(): number {
            return 1000;
        },
        minuteDivisor(): number {
            return this.secondDivisor * 60;
        },
        hourDivisor(): number {
            return this.minuteDivisor * 60;
        },
        dayDivisor(): number {
            return this.hourDivisor * 60;
        },
        isExpired(): boolean {
            return this.targetDate.getTime() - new Date().getTime() <= 0;
        },
        displayDays(): string {
            return this.formatDigit(this.days);
        },
        displayHours(): string {
            return this.formatDigit(this.hours);
        },
        displayMinutes(): string {
            return this.formatDigit(this.minutes);
        },
        displaySeconds(): string {
            return this.formatDigit(this.seconds);
        },
        hideDays(): boolean {
            return !this.isExpired && this.days === 0;
        },
        hideHours(): boolean {
            return !this.isExpired && this.hideDays && this.hours === 0
        },
        hideMinutes(): boolean {
            return !this.isExpired && this.hideHours && this.minutes === 0;
        },
    },
    mounted() {
        this.start();
    },
    beforeUnmount() {
        this.stop();
    },
    methods: {
        start(): void {
            this.intervalId = setInterval(this.showRemaining, 1000);
            this.showRemaining();
        },
        stop(): void {
            clearInterval(this.intervalId);
        },
        showRemaining(): void {
            const now = new Date();

            const diff = this.targetDate.getTime() - now.getTime();

            if (diff < 0) {
                this.stop();
                return;
            }

            this.days = Math.floor(diff / this.dayDivisor);
            this.hours = Math.floor((diff % this.dayDivisor) / this.hourDivisor);
            this.minutes = Math.floor((diff % this.hourDivisor) / this.minuteDivisor);
            this.seconds = Math.floor((diff % this.minuteDivisor) / this.secondDivisor);
        },
        formatDigit(digit: number): string {
            if (digit < 10) {
                return `0${digit}`;
            }

            return digit.toString();
        },
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
