<template>
    <div class="platform ml-2 cursor-pointer" :class="{ 'platform--active': active }">
        {{ text }}
    </div>
</template>

<script lang="ts">
import {Platform} from '../../enum/Platform';

export default {
    name: 'Platform',
    props: {
        platform: {
            type: String,
            required: true,
            validator(value: string): boolean {
                return Object.keys(Platform).map(key => Platform[key]).indexOf(value) > -1;
            },
        },
        active: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        text(): string {
            if (this.platform === Platform.SWITCH) {
                return 'Switch';
            }

            return this.platform.toUpperCase();
        }
    }
}
</script>

<style scoped>
    .platform {
        user-select: none;
    }

    .platform--active {
        @apply text-blue-900;

        text-decoration: underline;
    }
</style>
