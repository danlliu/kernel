<template>
    <div class="w-100">
        <div class="topbar row justify-content-between m-0 p-3 position-fixed top-0 start-0 bg-light"
             style="height: 140px; opacity: 1; z-index: 64; width: 100vw;">
            <div class="col-3" id="logo">
                <img src="kernel_logo.png" alt="logo" width="280" height="56">
            </div>

            <div class="col-4 hideable" v-bind:class="isAdding && 'hidden'" id="addTaskDiv">
                <h3 class="text-center mt-3">add a task</h3>
                <button class="btn bi-plus-circle w-100 light-button" style="font-size: 1.5rem"
                        @click="isAdding=true" v-bind:disabled="isAdding"/>
            </div>

            <div class="col-3 hideable" v-bind:class="isAdding && 'hidden'" id="buttonDiv">
                <button class="btn btn-lg btn-primary w-100 m-1" v-bind:disabled="isAdding"
                    @click="startBreak">break time!</button>
                <button class="btn btn-lg btn-secondary w-100 m-1" v-bind:disabled="isAdding" @click="modals['finishDayModal'].show()">finish
                    today</button>
            </div>

        </div>

        <hr class="position-fixed w-100 m-0" style="left: 0; top: 140px;"/>

        <div class="d-flex justify-content-end w-100" style="margin-top: 140px;">
            <div class="body p-3" v-bind:class="isAdding || 'hidden'" id="newTaskFormSpace"/>
            <div class="body p-3" v-bind:class="isAdding && 'smaller'" id="dashboard">
<!--                <div class="row justify-content-between mb-4" id="task-table-header">-->
<!--                    <div class="col">-->
<!--                        <div class="btn-group">-->
<!--                            <button class="btn btn-outline-secondary bi-sort-up"/>-->
<!--                            <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"-->
<!--                                    data-bs-toggle="dropdown">Sort by Due-->
<!--                                Date </button>-->
<!--                            <div class="dropdown-menu">-->
<!--                                <a class="dropdown-item">Sort by Due Date</a>-->
<!--                                <a class="dropdown-item">Sort by Time Elapsed</a>-->
<!--                                <a class="dropdown-item">Sort by Tag</a>-->
<!--                                <a class="dropdown-item">Sort by Starred</a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col d-flex justify-content-end">-->
<!--                        <div class="btn-group">-->
<!--                            <button class="btn btn-outline-secondary bi-filter" disabled aria-disabled="true"/>-->
<!--                            <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"-->
<!--                                    data-bs-toggle="dropdown">Show <span class="badge bg-secondary">all tags</span></button>-->
<!--                            <div class="dropdown-menu" style="overflow-y: auto; max-height: 768%;">-->
<!--                                <a class="dropdown-item"><span class="badge bg-secondary">all tags</span></a>-->
<!--                                <a v-for="tag in tags" class="dropdown-item" :key="tag.tag">-->
<!--                                    <span class="badge tag" :class="'tag-'+tag.style">#{{tag.tag}}</span>-->
<!--                                </a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div id="tasks">
                    <transition-group name="tasklist" tag="div" class="w-100" v-if="tasks.length !== 1">
                        <div class="tasklist-item" id="header" :key="'header'">
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <h6 class="text-center mb-0">Done?</h6>
                                </div>
                                <div class="col-4">
                                    <h6 class="mb-0">Task</h6>
                                </div>
                                <div class="col-1">
                                    <h6 class="text-center mb-0">Starred</h6>
                                </div>
                                <div class="col-2">
                                    <h6 class="text-center mb-0">Due</h6>
                                </div>
                                <div class="col-2">
                                    <h6 class="text-center mb-0">Time Spent</h6>
                                </div>
                                <div class="col-1"/>
                            </div>
                            <hr/>
                        </div>
                        <div v-for="idx in shownIndices" class="tasklist-item" :key="tasks[idx].id">
                            <div class="w-100" v-if="tasks[idx].visible !== false">
                                <TaskEntry :id="tasks[idx].id" :completed="tasks[idx].completed" :task-name="tasks[idx].name"
                                        :tag="tasks[idx].tag" :due-date="tasks[idx].duedate" :tag-list="tags"
                                        :stopwatch-time="tasks[idx].timespent" :starred="tasks[idx].starred"
                                        :running="tasks[idx].id === runningId"

                                        @changeTimer="changeTimer"
                                        @increaseTimer="increaseTimer"
                                        @changeStarred="changeStarred"
                                        @changeChecked="changeChecked"

                                />
                                <hr class="w-100"/>
                            </div>
                        </div>
                    </transition-group>
                    <div class="text-center" v-else>
                        <h3>nothing to do!</h3>
                    </div>
                </div>
            </div>
        </div>

        <div id="newTaskForm" v-bind:class="isAdding || 'hidden'">
            <h3>add a task</h3>
            <button class="btn btn-close position-absolute" style="top: 16px; right: 16px;" @click="isAdding = false"/>
            <form @submit.prevent="addTask">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="tasknameInput" placeholder="Task name"
                           v-model="addingTask.name" autocomplete="off" required/>
                    <label for="tasknameInput">Task name</label>
                </div>
                <div class="input-group form-floating mb-0">
                    <span class="input-group-text">#</span>
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown">
                            <span v-if="addingTask.tag === ''" class="badge bg-secondary">no tag</span>
                            <span v-else class="badge tag" :class="'tag-'+addingTask.tagstyle">
                                    #{{addingTask.tag}}
                                </span>
                        </button>
                        <div class="dropdown-menu" style="overflow-y: auto; max-height: 768%;">
                            <a class="dropdown-item" @click="addingTask.tag = ''">
                                <span class="badge bg-secondary">no tag</span>
                            </a>
                            <a class="dropdown-item" v-for="tag in tags" :key="tag.tag"
                               @click="() => {addingTask.tag = tag.tag; addingTask.tagstyle = tag.style}">
                                <span class="badge tag" :class="'tag-'+tag.style">#{{tag.tag}}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="input-group mt-0">
                    <small class="form-label">or
                        <a class="link-primary" @click="modals['addTagModal'].show()">add a tag</a></small>
                </div>
                <div class="input-group form-floating mb-3">
                    <input type="date" class="form-control" id="dueDateInput" placeholder="2020-01-01"
                           v-model="addingTask.duedate"/>
                    <label for="dueDateInput">Due date</label>
                </div>
                <button type="submit" class="btn btn-primary">add task</button>
            </form>
        </div>

        <div class="modal fade" tabindex="-1" id="addTagModal" ref="addTagModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">add a new tag</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="newTag">
                            <div class="input-group mb-3">
                                <span class="input-group-text">#</span>
                                <input type="text" class="form-control" id="tagNameInput" placeholder="tag name"
                                       v-model="addingTag.name" autocomplete="off"/>
                            </div>
                            <h5>choose tag color:</h5>
                            <div>
                            <div class="form-check form-check-inline" v-for="style in ['0', '1', '2', '3', '4', '5', '6', '7',
                            '8',
                             '9', 'a', 'b', 'c', 'd', 'e', 'f']" :key="style">
                                <div class="d-flex align-items-center">
                                    <input class="form-check-input" type="radio" name="style" :id="'tag' + style"
                                           @click="addingTag.style=style">
                                    <label class="form-check-label ms-1" :for="'tag' + style">
                                        <span class="badge tag" :class="'tag-'+style">#tag</span>
                                    </label>
                                </div>
                            </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">create tag</button>
                        </form>
                    </div>
                </div>
            </div>
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
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="clearCompleted">yes!</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" id="breakModal" ref="breakModal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Taking a break!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div class="modal-body">
                        <div v-for="task in tasks" class="tasklist-item" :key="task.id">
                            <div v-if="task.tag === 'break'">
                                <h2> Time Spent Chilling: {{timeElapsedString(task.timespent)}} </h2>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="stopBreak">Back to Work</button>
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
    // import { bus } from '../main'
    export default {
        name: "Dashboard",
        components: {
            TaskEntry
        },
        data: function() { return {
            runningId: "",
            timerInterval: null,
            tags: [
            ],
            tasks: [
                {
                    id: "break",
                    name: "break",
                    tag: "break",
                    duedate: null,
                    timespent: 0,
                    starred: false,
                    completed: false,
                    visible: false
                }
            ],
            modals: {},
            isAdding: false,
            breakInterval: null,
            startingBreakTime: 0,

            // adding task
            addingTask: {
                name: "",
                tag: "",
                tagstyle: "0",
                duedate: "",
                visible: true
            },

            // adding tag
            addingTag: {
                name: "",
                style: "0"
            }

        } },
        methods: {

            changeTimer: function(data) {

                if (this.runningId !== data) { //something else is running, start running
                    this.$emit('clearTimer', this.runningId);
                    this.runningId = data;
                }
                else{ //find the one thats running and pause it
                    for (let i in this.tasks) {

                        if (this.tasks[i].id === data)
                        {
                            if(data === this.runningId) //stop timer.
                            {
                                this.$emit('clearTimer', this.runningId);
                                this.runningId = null;
                            }
                        }
                    }
                }
            },

            increaseTimer: function(data) {
                for (let i in this.tasks) {
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].timespent += 1;
                    }
                }
            },

            changeChecked: function(data) {
                for (let i in this.tasks) {
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].completed= !this.tasks[i].completed
                    }
                }
            },

            changeStarred: function(data) {
                for (let i in this.tasks) {
                    if (this.tasks[i].id === data)
                    {
                        this.tasks[i].starred= !this.tasks[i].starred
                    }
                }
            },

            addTask: function() {

                let fullname = this.addingTask.name;
                let name = fullname.split(' ')[0].toLowerCase();
                let tag = this.addingTask.tag;
                let due = this.addingTask.duedate;
                let num = 0;

                let allIds = new Set();
                for (let task of this.tasks) {
                    allIds.add(task.id);
                }

                while (allIds.has(name + '-' + tag + '-' + num)) { ++num; }

                this.tasks.push({
                    id: name + '-' + tag + '-' + num,
                    name: fullname,
                    tag,
                    duedate: due,
                    timespent: 0,
                    starred: false,
                    completed: false,
                    visible: true
                });

                this.addingTask = {
                    name: "",
                    tag: "",
                    tagstyle: "0",
                    duedate: "",
                    visible: true
                };

                this.isAdding = false;

            },

            newTag: function() {
                this.tags.push({tag: this.addingTag.name, style: this.addingTag.style});
                this.addingTag = {tag: "", style: 0};
                this.modals['addTagModal'].hide();
            },

            // Get data from local storage to initialize tasks
            getData: function() {
                if (localStorage.tasks) {
                    this.tasks = JSON.parse(localStorage.tasks);
                }
                if (localStorage.tags) {
                    this.tags = JSON.parse(localStorage.tags);
                }
            },

            // Store task data in local storage
            storeData: function() {
                localStorage.tasks = JSON.stringify(this.tasks);
                localStorage.tags = JSON.stringify(this.tags);
            },

            clearCompleted: function()
            {
                for (let i in this.tasks) {

                    if (this.tasks[i].completed)
                    {
                        this.tasks[i].visible = false;

                    }
                    console.log(this.tasks[i].visible)
                }
                //this.$forceUpdate()
                //this.storeData();
                window.location.pathname = '/stats'
            },
            timeElapsedString: function(time) {
                let displayTime = time - this.startingBreakTime;
                let seconds = displayTime % 60;
                let minutes = Math.floor(displayTime / 60) % 60;
                let hours = Math.floor(displayTime / 3600);
                return `${hours < 10 ? `0${hours}` : `${hours}`}:` +
                    `${minutes < 10 ? `0${minutes}` : `${minutes}`}:` +
                    `${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
            },
            startBreak: function()
            {

                for (let i in this.tasks) {

                    if (this.tasks[i].tag === 'break')
                    {
                        this.startingBreakTime = this.tasks[i].timespent;

                    }
                }
                this.modals['breakModal'].show();
                this.breakInterval = setInterval(() => (this.increaseTimer('break')), 1000);
            },
            stopBreak: function()
            {
                clearInterval(this.breakInterval);
            }

        },

        created() {
            this.getData();
        },

        mounted() {
            this.modals['finishDayModal'] = new Modal(this.$refs['finishDayModal']);
            this.modals['addTagModal'] = new Modal(this.$refs['addTagModal']);
            this.modals['breakModal'] = new Modal(this.$refs['breakModal'], {backdrop:'static', keyboard:false});
        },

        computed: {
            shownIndices() {
                let starred = [];
                let nonstarred = [];
                for (let i = 0; i < this.tasks.length; ++i) {
                    if (this.tasks[i].visible && this.tasks[i].starred) {
                        starred.push(i);
                    } else if (this.tasks[i].visible) {
                        nonstarred.push(i);
                    }
                }
                return starred.concat(nonstarred);
            }
        },

        watch: {
            // Update local storage with task updates
            tasks: {
                deep: true, // watches for changes anywhere in the tasks object
                handler() {
                    this.storeData();
                }
            },

            tags: {
                deep: true,
                handler() {
                    this.storeData();
                }
            }
        }
    }


</script>

<style scoped>

    #header h6 {
        font-size: 1.25rem;
    }

    #tasks div div div div:last-child hr {
        display: none;
    }

    #dashboard {
        width: 100%;
        transition: width 1.0s ease;
    }

    #dashboard > div {
        margin: 0 15%;
        transition: margin-left 0.75s ease, margin-right 0.75s ease;
    }

    #dashboard.smaller {
        width: 60%;
    }

    #dashboard.smaller > div {
        margin: 0;
    }

    #newTaskFormSpace {
        width: 30%;
        transition: width 1s ease, opacity 0.25s ease 0.25s, padding 0.25s ease 0.25s;
    }

    #newTaskFormSpace.hidden {
        width: 0;
        z-index: -64;
        opacity: 0;
        padding: 0 !important;
    }

    #newTaskForm {
        width: 40%;
        height: calc(100vh - 172px);
        padding: 16px;
        position: fixed;
        left: 0;
        top: 156px;
        transition: left 1s ease;
        border-right: 1px solid #888;
    }

    #newTaskForm.hidden {
        left: -60%;
        z-index: -64;
    }

    /* transition group */

    .tasklist-item {
        transition: all 1s, color 0.25s ease, background-color 0.5s ease;
        margin-bottom: 10px;
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
