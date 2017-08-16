<template>
    <div>
        <p>
            <label>
                Площадь м<sup>2</sup>
                <input v-model="area">
            </label>
        </p>
        <p>
            <label>
                Срок месяцы
                <input v-model="months">
            </label>
        </p>
        <p>
            <label>
                Средняя выработка м<sup>2</sup> / чел * год
                <input v-model="perf">
            </label>
        </p>
        <p>Количество сотрудников {{neededPeople}}</p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: [],
        data() {
            return {
                area: 100000,
                months: 10,
                perf: 9500
            }
        },
        methods: {},
        computed: {
            neededPeople(): number {
                return Math.ceil(this.area / (this.perf / 12) / this.months);
            }
        }
    });
</script>

<style>

</style>
