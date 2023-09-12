<script setup lang="ts">
import _ from 'lodash';
import { nanoid } from 'nanoid';

const cards = _.range(8).map(() => ({ id: nanoid() }));
</script>

<template>
    <main class="bg-indigo-400 min-h-screen">
        <LoadingCard
            v-for="(card, idx) in cards"
            :key="card.id"
            class="fixed left-1/2 top-1/2"
            :style="{
                transform: `translate(-50%, -50%) rotate(${
                    idx * 45
                }deg) translateY(175%)`,
            }"
        />
    </main>
</template>

<!-- translate(${Math.sin(idx)  * 100}px, ${Math.cos(idx) * 100}px) -->
