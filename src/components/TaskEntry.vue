<template>
    <div class="task row align-items-center">
        <div class="col-1">
            <input type="checkbox" v-model="Dcompleted" @click="onChecked">
        </div>
        <div class="col-4">
            <h6 class="mb-0"><span class="badge tag" v-bind:class="`tag-${tagColorIndex}`">#{{tag}}</span></h6>
            <h4 class="mb-0">{{taskName}}</h4>
        </div>
        <div class="col-1">
            <button class="col-1 btn" v-bind:class="starred ? 'bi-star-fill' : 'bi-star'" style="color: gold;
            font-size: 1.5rem;" @click="onStarred"/>
        </div>
        <div class="col-2">
            <h6 class="text-center mb-0">{{monthDue}}</h6>
            <h6 class="text-center mb-0">{{dayDue}}</h6>
        </div>
        <div class="col-2">
            <h5 class="text-center mb-0">{{timeElapsedString}}</h5>
        </div>
        <button class="col-1 btn" v-bind:class="running ? 'bi-pause' : 'bi-play'" style="font-size: 2rem"
         @click="onTimerClick()"/>
    </div>
</template>

<script>
    export default {
        name: "TaskEntry",
        props: {
            id: String,
            completed: Boolean,
            taskName: String,
            tag: String,
            starred: Boolean,
            dueDate: String,
            // stopwatchTime is in seconds
            stopwatchTime: Number,
            running: Boolean
        },
        data: function(){
            return {
            Dcompleted: this.completed,
            timerInterval: null
            }

        },
        computed: {
            tagColorIndex: function() {
                let tagColors = {
                    "EECS493": 0,
                    "EECS482": 1,
                    "CHEM483": 2,
                    "CHEM420": 3
                };
                return tagColors[this.tag];
            },
            timeElapsedString: function() {
                let seconds = this.stopwatchTime % 60;
                let minutes = Math.round(this.stopwatchTime / 60) % 60;
                let hours = Math.round(this.stopwatchTime / 3600);
                return `${hours < 10 ? `0${hours}` : `${hours}`}:` +
                    `${minutes < 10 ? `0${minutes}` : `${minutes}`}:` +
                    `${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
            },
            monthDue: function() {
                let MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
                    'OCTOBER', 'NOVEMBER', 'DECEMBER'];
                return MONTHS[Number(this.dueDate.substr(0,2)) - 1];
            },
            dayDue: function() {
                return Number(this.dueDate.substr(3,2));
            }
        },
        created (){
            this.$on('clearTimer', (data) => {
                if (this.id === data)
                {
                    clearInterval(this.timerInterval);
                }
            })
        },
        methods: {
            onTimerClick() {
                if (!this.running){ //start timer
                    this.timerInterval = setInterval(() => (this.$emit('increaseTimer', this.id)), 1000);
                }
                else //stop timer
                {
                    clearInterval(this.timerInterval);
                }
                this.$emit('changeTimer', this.id);
            },
            onStarred(){
                this.$emit('changeStarred', this.id);
            },
            onChecked(){
                this.$emit('changeChecked', this.id);
            }
        },
    }
</script>

<style scoped>

</style>
