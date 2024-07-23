import { ref, watchEffect } from 'vue'

export default function () {
    const sum = ref(0)

    function increment() {
        sum.value += 1
    }

    return { sum, increment }
}
