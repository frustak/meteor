<script setup lang="ts">
import gsap from 'gsap'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { onMounted } from 'vue'

const main = ref<HTMLDivElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
    if (!main.value) return
    ctx = gsap.context(() => {
        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power1.out' },
        })
        tl.to('#ring-cards', { autoAlpha: 1 })
        tl.fromTo('#ring-cards > div', { scale: 0 }, { scale: 0.75, stagger: 0.1 })
        tl.to('#ring-cards > div:not(:last-child)', { scale: 0, stagger: 0.1 })
        tl.to('#ring-cards > div:last-child', { y: '-100%' }, '-=0.75')
        tl.to(
            '#ring-cards > div:last-child',
            { scale: 1, rotateY: '180deg', ease: 'back.in(1.7)' },
            '-=1.75',
        )
        tl.set('#splash-cards', { autoAlpha: 1 }, '-=1')
        tl.from(
            '#splash-cards > div:nth-child(1)',
            { scale: 0, x: '50vw', rotate: '-180deg', y: '-50%' },
            '-=0.75',
        )
        tl.from(
            '#splash-cards > div:nth-child(2)',
            { scale: 0, x: '20vw', rotate: '-90deg', y: '-50%' },
            '-=1',
        )
        tl.from(
            '#splash-cards > div:nth-child(4)',
            { scale: 0, x: '-20vw', rotate: '90deg', y: '-50%' },
            '-=1',
        )
        tl.from(
            '#splash-cards > div:nth-child(5)',
            { scale: 0, x: '-40vw', rotate: '180deg', y: '-50%' },
            '-=1',
        )
    }, main.value)
})

onUnmounted(() => {
    ctx?.revert()
})
</script>

<template>
    <div class="flex flex-col" ref="main">
        <div class="invisible" id="ring-cards">
            <TheCard
                v-for="(card, idx) in _.range(8).map(() => ({ id: nanoid() }))"
                :key="card.id"
                class="fixed left-1/2 top-1/2 ring-card"
                :style="{
                    transform: `
                        translate(-50%, -50%)
                        rotate(${(idx + 1) * 45}deg)
                        translateY(-140%)
                        `,
                }"
            >
                <!-- Backside -->
                <div class="bg-neutral-700 w-full h-full card-back"></div>
            </TheCard>
        </div>
        <div id="splash-cards" class="flex justify-between items-center grow px-6 invisible">
            <TheCard
                class="-translate-y-1/2"
                v-for="(card, idx) in _.range(5).map(() => ({ id: nanoid() }))"
                :key="card.id"
                :class="{ invisible: idx === 2 }"
            >
                <div class="bg-neutral-700 w-full h-full"></div>
            </TheCard>
        </div>
    </div>
</template>

<style>
.ring-card {
    perspective: 100vw;
    transform-style: preserve-3d;
}

.card-back {
    backface-visibility: hidden;
    transform: rotateY(180deg);
}
</style>
