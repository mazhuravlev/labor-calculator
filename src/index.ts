import Vue from "vue";
import CalcComponent from "./components/Calc.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <calc-component />
    </div>
    `,
    data: { },
    components: {
        CalcComponent
    }
});
