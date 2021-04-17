<template>
    <div class="d-flex justify-content-center">
        <canvas ref="chart"/>
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
                        label: "doughnut yum",
                        data: this.data,
                        backgroundColor: this.backgroundColor,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0]['label'];
                                },
                                label: function(context) {

                                    let value = context['raw'];
                                    let label = "";

                                    if (value !== null) {
                                        let totalTime = value;
                                        let seconds = Math.floor(totalTime % 60);
                                        let minutes = Math.floor(totalTime / 60) % 60;
                                        let hours = Math.floor(totalTime / 3600);
                                        let hourString = (hours === 0) ? "" : (hours < 10 ? `0${hours}` : `${hours}`) +
                                            ":";
                                        let minuteString = (minutes === 0) ? "0:" : (minutes < 10 ? `0${minutes}` :
                                            `${minutes}`) + ":";
                                        let secondString = (seconds < 10 ? `0${seconds}` : `${seconds}`);
                                        label = `${hourString}${minuteString}${secondString}`;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
                // options: {
                //     tooltips: {
                //         mode: 'label',
                //         callbacks: {
                //             label: function(tooltipItem, data) {
                //                 var indice = tooltipItem.index;
                //                 return  data.labels[indice] +' '+data.datasets[0].data[indice] + '';
                //             }
                //         }
                //     }
                // }
            })
        }
    }

</script>

<style scoped>

</style>
