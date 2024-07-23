<script setup lang="ts" name="PersonInfo">
// create person to be used in the template
import {
    ref,
    reactive,
    computed,
    watch,
    watchEffect,
    defineProps,
    withDefaults,
    onMounted
} from 'vue'
import { faker } from '@faker-js/faker'
import { type IPerson, type Persons } from '@/types'
import axios from 'axios'
import useSum from '@/hooks/useSum'
import usePerson from '@/hooks/usePerson'
const { sum, increment } = useSum()
const { person, randomPerson } = usePerson()
</script>

<template>
    <div class="person">
        <h2>Person Info</h2>
        <p>{{ sum }}</p>
        <div>
            <img :src="person?.picture.medium" />
        </div>
        <button @click="increment">handle</button>
        <button @click="randomPerson">handle</button>
    </div>
</template>

<style scoped>
img {
    width: 150px;
    border-radius: 50%;
}
.person {
    padding: 10px;
    margin: 10px;
    maxheight: 200px;
}
</style>
