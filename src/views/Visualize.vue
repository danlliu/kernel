<template>
    <div class="m-3">
        <h1>kernel: visualize</h1>
        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item">
                <a class="nav-link" v-bind:class="tab === 0 && 'active'" @click="tab = 0">today</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="tab === 1 && 'active'" @click="tab = 1">this week</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="tab === 2 && 'active'" @click="tab = 2">all time</a>
            </li>
        </ul>
        <div v-if="tab === 0" class="infobox container-fluid">
            <h2>today's statistics</h2>
            <div class="row m-3">
                <div class="col card vis-card">
                    <div class="card-body">
                        <h5 class="card-title">today's tasks</h5>
                        <PieChart :titles="['EECS493', 'EECS482', 'CHEM483', 'CHEM420']" :data="[3,5,4,2]" />
                    </div>
                </div>
                <div class="col card vis-card">
                    <div class="card-body">
                        <h5 class="card-title">time spent per tag</h5>
                    </div>
                </div>
                <div class="col card vis-card">
                    <div class="card-body">
                        <h5 class="card-title">tasks completed today</h5>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tab === 1" class="infobox container-fluid">
            <h2>this week's statistics</h2>
        </div>
        <div v-if="tab === 2" class="infobox container-fluid">
            <h2>all time statistics</h2>
        </div>
        <router-link class="btn badge rounded-pill bg-info bi-list-ul hover-button"
                     style="font-size: 1.5rem; position: fixed; right: 32px; bottom: 32px;" to="/">
            <span class="hover-button-text">task list</span>
        </router-link>
    </div>
</template>

<script>
    import PieChart from "../components/PieChart";

    export default {
        name: "Visualize",
        components: {
            PieChart
        },
        data: () => {return {
            tab: 0
        }; }
    }
</script>

<style scoped>
    .infobox {
        border-bottom-left-radius: .25rem;
        border-bottom-right-radius: .25rem;
        border: 1px solid #dee2e6;
        border-top: 0;
    }

    .vis-card {
        margin: 0.5rem;
    }
</style>
