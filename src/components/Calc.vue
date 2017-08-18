<template>
    <div>
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
            <p>
                <label>
                    Рабочих часов в году
                    <input v-model="workHoursInYear">
                </label>
            </p>
        </div>
        <div>
            Соотношение стадий
            <div>
                По времени
                <p>
                    <label>
                        АК
                        <input v-model="akTimePercent">
                    </label>
                </p>
                <p>
                    <label>
                        П
                        <input v-model="pTimePercent">
                    </label>
                </p>
                <p>
                    <label>
                        Р
                        <input v-model="rTimePercent">
                    </label>
                </p>
            </div>
            <div>
                По трудозатратам
                <p>
                    <label>
                        АК
                        <input v-model="akWorkPercent">
                    </label>
                </p>
                <p>
                    <label>
                        П
                        <input v-model="pWorkPercent">
                    </label>
                </p>
                <p>
                    <label>
                        Р
                        <input v-model="rWorkPercent">
                    </label>
                </p>
            </div>
        </div>
        <div>
            <p>АК: {{akTime.toFixed(1)}} мес, {{akWork.toFixed(1)}} чел * мес</p>
            <p>П: {{pTime.toFixed(1)}} мес, {{pWork.toFixed(1)}} чел * мес</p>
            <p>Р: {{rTime.toFixed(1)}} мес, {{rWork.toFixed(1)}} чел * мес</p>
        </div>
        <div>
            Соотношение специализаций по стадиям
            <div v-for="spec in specs">
                АК
                <p><label>АР <input v-model="spec.arPart"></label></p>
                <p><label>КР <input v-model="spec.krPart"></label></p>
                <p><label>Е <input v-model="spec.ePart"></label></p>
            </div>
        </div>
        <div>
            Необходимо сотрудников по специализациям
            <div v-for="specTime in specTimes">
                <p><b>{{specTime.name}}</b></p>
                <p>АР {{specTime.ar.toFixed(1)}} чел</p>
                <p>КР {{specTime.kr.toFixed(1)}} чел</p>
                <p>Е {{specTime.e.toFixed(1)}} чел</p>
            </div>
        </div>
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
                perf: 9500,
                akTimePercent: 10,
                pTimePercent: 30,
                rTimePercent: 60,
                akWorkPercent: 10,
                pWorkPercent: 30,
                rWorkPercent: 60,
                workHoursInYear: 2000,
                specs: [
                    {
                        name: 'АК',
                        arPart: 100,
                        krPart: 0,
                        ePart: 0
                    },
                    {
                        name: 'П',
                        arPart: 40,
                        krPart: 50,
                        ePart: 10
                    },
                    {
                        name: 'Р',
                        arPart: 33,
                        krPart: 33,
                        ePart: 33
                    }
                ]
            }
        },
        methods: {},
        computed: {
            neededWork(): number {
                return this.area / this.perf * 12;
            },
            neededPeople(): number {
                return this.area / (this.perf / 12) / this.months;
            },
            akWork(): number {
                return this.neededWork * (this.akWorkPercent / 100);
            },
            pWork(): number {
                return this.neededWork * (this.pWorkPercent / 100);
            },
            rWork(): number {
                return this.neededWork * (this.rWorkPercent / 100);
            },
            akTime(): number {
                return this.months * (this.akTimePercent / 100);
            },
            pTime(): number {
                return this.months * (this.rTimePercent / 100);
            },
            rTime(): number {
                return this.months * (this.rTimePercent / 100);
            },
            specTimes(): {}[] {
                return [
                    {
                        name: 'АК',
                        ar: this.akWork * this.specs[0].arPart / 100 / this.akTime,
                        kr: this.akWork * this.specs[0].krPart / 100 / this.akTime,
                        e: this.akWork * this.specs[0].ePart / 100 / this.akTime
                    },
                    {
                        name: 'П',
                        ar: this.pWork * this.specs[1].arPart / 100 / this.pTime,
                        kr: this.pWork * this.specs[1].krPart / 100 / this.pTime,
                        e: this.pWork * this.specs[1].ePart / 100 / this.pTime
                    },
                    {
                        name: 'Р',
                        ar: this.rWork * this.specs[2].arPart / 100 / this.rTime,
                        kr: this.rWork * this.specs[2].krPart / 100 / this.rTime,
                        e: this.rWork * this.specs[2].ePart / 100 / this.rTime
                    }
                ];
            }
        }
    });
</script>

<style>

</style>
