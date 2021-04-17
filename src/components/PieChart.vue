<template>
    <div class="container-fluid">
        <canvas ref="chart" class="w-100"/>
    </div>
</template>

<script>

    import Chart from 'chart.js/auto';
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.enabled = true;

    export default {
        name: "PieChart",
        props: {
            titles: Array,
            data: Array,
            backgroundColor: Array
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
                        backgroundColor: this.backgroundColor,
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
