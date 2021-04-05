<template>
    <div>
        <div class="topbar row justify-content-between p-3 position-fixed top-0 start-0 w-100 bg-light" style="height: 140px">
            <div class="col-3" id="logo">
                <h1>kernel</h1>
            </div>

            <div class="col-4" id="addTaskDiv">
                <h3 class="text-center mt-3">add a task</h3>
                <button class="btn bi-plus-circle w-100" style="font-size: 1.5rem"/>
            </div>

            <div class="col-3" id="buttonDiv">
                <button class="btn btn-lg btn-primary w-100 m-1">break time!</button>
                <button class="btn btn-lg btn-secondary w-100 m-1" @click="modals['finishDayModal'].show()">finish
                    today</button>
            </div>

        </div>

        <hr style="margin-top: 140px"/>

        <div class="body p-3" id="dashboard">
            <div class="row justify-content-between mb-3" id="task-table-header">
                <div class="col">
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary bi-sort-up"/>
                        <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown">Sort by Due
                            Date </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">Sort by Due Date</a>
                            <a class="dropdown-item">Sort by Time Elapsed</a>
                            <a class="dropdown-item">Sort by Tag</a>
                            <a class="dropdown-item">Sort by Starred</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary bi-filter" disabled aria-disabled="true"/>
                        <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown">Show <span class="badge bg-secondary">all tags</span></button>
                        <div class="dropdown-menu" style="overflow-y: auto; max-height: 768%;">
                            <a class="dropdown-item"><span class="badge bg-secondary">all tags</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-0">#EECS400</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-1">#EECS401</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-2">#EECS402</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-3">#EECS403</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-4">#EECS404</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-5">#EECS405</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-6">#EECS406</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-7">#EECS407</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-8">#EECS408</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-9">#EECS409</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-a">#EECS40a</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-b">#EECS40b</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-c">#EECS40c</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-d">#EECS40d</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-e">#EECS40e</span></a>
                            <a class="dropdown-item"><span class="badge tag tag-f">#EECS40f</span></a>
                        </div>
                    </div>
                </div>
                    <div class="row align-items-center">
                        <div class="col-1">
                            <h6 class="text-center mb-0">Completed</h6>
                        </div>
                        <div class="col-4">
                            <h6 class="mb-0">Task Name</h6>
                        </div>
                        <div class="col-1">
                            <h6 class="text-center mb-0">Starred</h6>
                        </div>
                        <div class="col-2">
                            <h6 class="text-center mb-0">Due Date</h6>
                        </div>
                        <div class="col-2">
                            <h6 class="text-center mb-0">Time Spent</h6>
                        </div>
                        <hr/>
                        
                    </div>
            </div>

            <div class="m-3" id="tasks">
                 
                <transition-group name="tasklist" tag="div" class="w-100">

                    <div v-for="task in tasks" class="tasklist-item" :key="task.id">
                        <TaskEntry :id="task.id" :completed="task.completed" :task-name="task.name" :tag="task.tag" :due-date="task.duedate"
                                   :stopwatch-time="task.timespent" :starred="task.starred" :running="task.id === runningId" />
                        <hr/>
                    </div>
                </transition-group>
            </div>

        </div>

        <div class="body body-hidden p-3" id="newTaskForm">
            <h1>hi 2</h1>
        </div>

        <div class="modal fade" tabindex="-1" id="finishDayModal" ref="finishDayModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">finish today?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div class="modal-body">
                        <p>Congrats on making it through the day! Do you wish to finish for today? This will hide
                            all tasks you've marked as finished in your task list. You'll always be able to go back
                            and work on more tasks later, but the ones currently marked as finished won't be
                            available.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">no, still
                            working.</button>
                        <button type="button" class="btn btn-primary">yes!</button>
                    </div>
                </div>
            </div>
        </div>

        <router-link class="btn badge rounded-pill bg-info bi-graph-up hover-button"
                     style="font-size: 1.5rem; position: fixed; right: 32px; bottom: 32px;" to="/stats">
            <span class="hover-button-text">stats</span>
        </router-link>

    </div>
</template>

<script>

    import TaskEntry from "../components/TaskEntry";
    import Modal from "bootstrap/js/src/modal";
    import { bus } from '../main'
    export default {
        name: "Dashboard",
        components: {
            TaskEntry
        },
        data: function() { return {
            runningId: "functional-eecs493",
            timerInterval: null,
            tasks: [
                {
                    id: "storyboards-eecs493",
                    name: "Storyboards",
                    tag: "EECS493",
                    duedate: "03-29",
                    timespent: 493,
                    starred: true,
                    completed: false
                },
                {
                    id: "problem-chem420",
                    name: "Problem Set 7",
                    tag: "CHEM420",
                    duedate: "04-06",
                    timespent: 420,
                    starred: false,
                    completed: false
                },
                {
                    id: "intro-chem483",
                    name: "Intro Report",
                    tag: "CHEM483",
                    duedate: "04-08",
                    timespent: 483,
                    starred: true,
                    completed: false
                },
                {
                    id: "functional-eecs493",
                    name: "Functional Prototype",
                    tag: "EECS493",
                    duedate: "04-09",
                    timespent: 370,
                    starred: false,
                    completed: false
                },
                {
                    id: "project4-eecs482",
                    name: "Project 4",
                    tag: "EECS482",
                    duedate: "04-21",
                    timespent: 482,
                    starred: false,
                    completed: false
                }
            ],
            modals: {}
        } },
        mounted() {
            this.modals['finishDayModal'] = new Modal(this.$refs['finishDayModal']);
        },
        created (){
            bus.$on('changeStarred', (data) => {
                var i;
                for (i in this.tasks) {
                    
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].starred= !this.tasks[i].starred
                    }
                }
            })
            bus.$on('changeChecked', (data) => {
                var i;
                for (i in this.tasks) {
                    
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].completed= !this.tasks[i].completed
                    }
                }
            })
            bus.$on('increaseTimer', (data) => {
                var i;
                for (i in this.tasks) {
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].timespent += 1;
                    }
                }
            })
            bus.$on('changeTimer', (data) => {
                if (this.runningId != data) { //something else is running, start running
                    bus.$emit('clearTimer', this.runningId)
                    this.runningId = data;
                    
                }
                else{ //find the one thats running and pause it

                    var i;
                    for (i in this.tasks) {
                        
                        if (this.tasks[i].id === data)
                        {
                            if(data === this.runningId) //stop timer. 
                            {
                                this.runningId = null;
                            }
                        }
                    }
                }
            })
        }
    }

</script>

<style scoped>
    #tasks div div:last-child hr {
        display: none;
    }

    /* transition group */

    .tasklist-item {
        transition: all 1s, color 0.25s ease, background-color 0.5s ease;
        margin-bottom: 10px;
        width: 70vw;
    }

    .tasklist-enter, .tasklist-leave-to {
        opacity: 0;
    }

    .tasklist-enter-active, .tasklist-leave-active {
        transition: all 1s, color 0.25s ease, background-color 0.5s ease;
    }

    .tasklist-move {
        transition: all 1s, color 0.25s ease, background-color 0.5s ease;
    }

    .tasklist-leave-active {
        position: absolute;
        width: 70% !important;
    }

</style>
