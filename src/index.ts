import Vue from "vue";
import CalcComponent from "./components/Calc.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div class="container">
        <h1>Рассчет трудозатрат</h1>
        <calc-component />
    </div>
    `,
    data: { },
    components: {
        CalcComponent
    }
});
