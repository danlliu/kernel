<template>
    <div class="container-fluid">
        <canvas ref="chart" class="w-100"/>
    </div>
</template>

<script>

    import Chart from 'chart.js/auto';
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.enabled = true;

    let tag0 = "#e3170aff";
    let tag1 = "#5e8c61ff";
    let tag2 = "#407076ff";
    let tag3 = "#f7b32bff";
    let tag4 = "#2bd9feff";
    let tag5 = "#7353baff";
    let tag6 = "#04f06aff";
    let tag7 = "#e1bc29ff";
    let tag8 = "#be3e82ff";
    let tag9 = "#623ceaff";
    let taga = "#e15554ff";
    let tagb = "#b2b1cfff";
    let tagc = "#84c318ff";
    let tagd = "#e6beaeff";
    let tage = "#b98ea7ff";
    let tagf = "#17bebbff";

    export default {
        name: "PieChart",
        props: {
            titles: Array,
            data: Array
        },
        data() {
            return {
                chart: {}
            }
        },
        mounted() {
            this.chart = new Chart(this.$refs['chart'], {
                type: "doughnut",
                data: {
                    labels: this.titles,
                    datasets: [{
                        label: 'doughnut yum',
                        data: this.data,
                        backgroundColor: [
                            tag0,
                            tag1,
                            tag2,
                            tag3,
                            tag4,
                            tag5,
                            tag6,
                            tag7,
                            tag8,
                            tag9,
                            taga,
                            tagb,
                            tagc,
                            tagd,
                            tage,
                            tagf
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    tooltips: {
                        mode: 'label',
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var indice = tooltipItem.index;
                                return  data.labels[indice] +' '+data.datasets[0].data[indice] + '';
                            }
                        }
                    }
                }
            })
        }
    }

</script>

<style scoped>

</style>
