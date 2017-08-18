<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body">
                <p>
                    <label>
                        Площадь (м<sup>2</sup>)
                        <input v-model="area">
                    </label>
                </p>
                <p>
                    <label>
                        Срок (месяцы)
                        <input v-model="months">
                    </label>
                </p>
                <p>
                    <label>
                        Средняя выработка (м<sup>2</sup> / чел * год)
                        <input v-model="perf">
                    </label>
                </p>
                <p v-if="false">
                    <label>
                        Рабочих часов в году
                        <input v-model="workHoursInYear">
                    </label>
                </p>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <h4>Соотношение стадий</h4>
                <div>
                    <h5>По времени</h5>
                    <small class="err" v-if="!isValidPercent([akTimePercent, pTimePercent, rTimePercent])">сумма не 100%
                    </small>
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
                    <h5>По трудозатратам</h5>
                    <small class="err" v-if="!isValidPercent([akWorkPercent, pWorkPercent, rWorkPercent])">сумма не 100%
                    </small>
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
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Общие трудозатраты</div>
            <div class="panel-body">
                <p>АК: {{akTime.toFixed(1)}} мес, {{akWork.toFixed(1)}} чел * мес</p>
                <p>П: {{pTime.toFixed(1)}} мес, {{pWork.toFixed(1)}} чел * мес</p>
                <p>Р: {{rTime.toFixed(1)}} мес, {{rWork.toFixed(1)}} чел * мес</p>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Соотношение специализаций по стадиям</div>
            <table class="input-table panel-body">
                <thead>
                <tr>
                    <th>Стадия</th>
                    <th>АР</th>
                    <th>КР</th>
                    <th>Е</th>
                    <th>ошибка</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="spec in specs">
                    <td><b>{{spec.name}}</b></td>
                    <td><label><input v-model="spec.arPart"></label></td>
                    <td><label><input v-model="spec.krPart"></label></td>
                    <td><label><input v-model="spec.ePart"></label></td>
                    <td>
                        <small class="err" v-if="!isValidPercent([spec.arPart, spec.krPart, spec.ePart])">
                            не 100%
                        </small>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Необходимо сотрудников по специализациям</div>
            <table class="mytable panel-body">
                <thead>
                <tr>
                    <th>Стадия</th>
                    <th>АР  чел</th>
                    <th>КР  чел</th>
                    <th>Е  чел</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="specTime in specTimes">
                    <td><b>{{specTime.name}}</b></td>
                    <td>{{specTime.ar.toFixed(1)}}</td>
                    <td>{{specTime.kr.toFixed(1)}}</td>
                    <td>{{specTime.e.toFixed(1)}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <p class="footer"></p>
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
        methods: {
            isValidPercent(parts: number[]): boolean{
                return Math.abs(parts.reduce((a, c) => a + Number(c), 0) - 100) < 0.1;
            }
        },
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
    .err {
        background-color: indianred;
        color: whitesmoke;
        padding: 1px;
        border-radius: 2px;
    }

    .mytable {
        border-spacing: 0;
    }

    .mytable td, .mytable th {
        padding: 2px;
        border: 1px solid black;
    }

    label {
        font-weight: normal;
    }

    .input-table input {
        width: 50px;
    }
</style>
