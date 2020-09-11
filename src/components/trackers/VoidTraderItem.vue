<template>
    <div class="void-trader-item flex border-t px-2 py-1">
        <div class="w-2/3">
            {{ name }}
        </div>

        <div class="w-1/3">
            <div class="flex justify-end">
                {{ displayCredits }} <img class="icon icon--credits" :src="icons.credits" alt="C">
            </div>

            <div class="flex justify-end items-center">
                {{ displayDucats }} <img class="icon icon--ducats" :src="icons.ducats" alt="D">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import creditsIcon from '../../assets/credits.png';
import ducatsIcon from '../../assets/ducats.png';

export default {
    name: 'VoidTraderItem',
    props: {
        name: {
            type: String,
            required: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        ducats: {
            type: Number,
            required: true,
        },
    },
    computed: {
        icons() {
            return {
                credits: creditsIcon,
                ducats: ducatsIcon,
            };
        },
        displayCredits(): string {
            return new Intl.NumberFormat().format(this.credits);
        },
        displayDucats(): string {
            return new Intl.NumberFormat().format(this.ducats);
        },
    },
}
</script>

<style scoped>
    .icon {
        max-height: 20px;
    }
</style>
