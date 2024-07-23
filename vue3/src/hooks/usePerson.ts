import { ref, onMounted } from 'vue'
import { type IPerson } from '@/types'

export default function () {
    const api = 'https://randomuser.me/api/'
    const person = ref<IPerson>()
    // init person
    const randomPerson = async () => {
        const response = await fetch(api)
        const data = await response.json()
        person.value = data.results[0]
    }
    onMounted(() => {
        randomPerson()
    })

    return { person, randomPerson }
}
