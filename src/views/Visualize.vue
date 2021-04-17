<template>
  <div class="m-3">
    <div
      class="topbar row justify-content-between m-0 p-3 position-fixed top-0 start-0 bg-light"
      style="height: 140px; opacity: 1; z-index: 64; width: 100vw"
    >
      <div class="col-3" style="display: flex; align-items: center" id="logo">
        <img src="kernel_logo.png" alt="logo" width="280" height="56" />
      </div>

      <div
        class="col-3"
        style="display: flex; align-items: center"
        id="buttonDiv"
      >
        <button
          class="btn btn-lg btn-danger w-100 m-1"
          @click="modals['resetTasksModal'].show()"
        >
          reset tasks
        </button>
      </div>
    </div>
    <hr class="position-fixed w-100 m-0" style="left: 0; top: 140px" />

    <div class="justify-content-end w-100" style="margin-top: 180px">
      <div v-if="tab === 0" class="container-fluid">
        <h2>today's statistics</h2>
        <div class="row m-3">
          <div class="col card vis-card">
            <div class="card-body">
              <h5 class="card-title">time spent per tag</h5>
              <PieChart :key="JSON.stringify(this.tags)"
                :titles="keys"
                :data="values"
                :backgroundColor="colors" :mode="'time'"
              />
            </div>
          </div>
          <div class="col card vis-card">
            <div class="card-body">
              <h5 class="card-title">all tasks completed this session</h5>
              <ul class="list-group">
                <li v-for="task of completed_tasks" :key="task.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                  <div class="ms-2 me-auto">
                    <span class="badge tag" :class="'tag-'+tagToStyle[task.tag]">{{task.tag}}</span>
                    <h6>{{task.name}}</h6>
                  </div>
                  <span>{{formatTime(task.timespent)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      tabindex="-1"
      id="resetTasksModal"
      ref="resetTasksModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">reset tasks?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <p>
              Would you like to reset your tasks? This will clear out all tasks,
              tags, and statistics.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              no, keep my tasks.
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="clearAll"
            >
              yes, wipe em out!
            </button>
          </div>
        </div>
      </div>
    </div>

    <router-link
      class="btn badge rounded-pill bg-info bi-list-ul hover-button"
      style="
        font-size: 1.5rem;
        position: fixed;
        right: 32px;
        bottom: 32px;
        color: white;
      "
      to="/"
    >
      <span class="hover-button-text">task list</span>
    </router-link>
  </div>
</template>

<script>
import PieChart from "../components/PieChart";
import Modal from "bootstrap/js/src/modal";

export default {
  name: "Visualize",
  components: {
    PieChart,
  },
  data: () => {
    return {
      modals: {},
      tab: 0,
      tasks: [],
      completed_tasks: [],
      tags: {},
      tagToStyle: {},
      colors: [],
      color_keys: {},
      keys: [],
      values: [],
      comp_keys: [],
      comp_values: []
    };
  },
  methods: {
    clearAll: function () {
      localStorage.clear();
    },
    formatTime: function (value) {
      let totalTime = value;
      let seconds = Math.floor(totalTime % 60);
      let minutes = Math.floor(totalTime / 60) % 60;
      let hours = Math.floor(totalTime / 3600);
      let hourString = (hours === 0) ? "" : (hours < 10 ? `0${hours}` : `${hours}`) +
              ":";
      let minuteString = (minutes === 0) ? "0:" : (minutes < 10 ? `0${minutes}` :
              `${minutes}`) + ":";
      let secondString = (seconds < 10 ? `0${seconds}` : `${seconds}`);
      return `${hourString}${minuteString}${secondString}`;
    },
    makeColorMap: function() {
      this.color_keys['0'] = "#e3170aff";
      this.color_keys['1'] = "#5e8c61ff";
      this.color_keys['2'] = "#407076ff";
      this.color_keys['3'] = "#f7b32bff";
      this.color_keys['4'] = "#2bd9feff";
      this.color_keys['5'] = "#7353baff";
      this.color_keys['6'] = "#04f06aff";
      this.color_keys['7'] = "#e1bc29ff";
      this.color_keys['8'] = "#be3e82ff";
      this.color_keys['9'] = "#623ceaff";
      this.color_keys['a'] = "#e15554ff";
      this.color_keys['b'] = "#b2b1cfff";
      this.color_keys['c'] = "#84c318ff";
      this.color_keys['d'] = "#e6beaeff";
      this.color_keys['e'] = "#b98ea7ff";
      this.color_keys['f'] = "#17bebbff";
      this.color_keys['Br'] = "#0d6efd";
      this.color_keys['No'] = "#6c757d";
    }
  },
  // computed: {
  //   keys() {
  //     console.log(Object.keys(this.tags));
  //     return Object.keys(this.tags);
  //   },
  //   values() {
  //     console.log(Object.values(this.tags));
  //     return Object.values(this.tags);
  //   }
  // },
  mounted() {
    this.makeColorMap();
    this.modals["resetTasksModal"] = new Modal(this.$refs["resetTasksModal"]);
    let local_tasks = JSON.parse(localStorage.tasks)
    let local_tags = JSON.parse(localStorage.tags)
    console.log(local_tasks)
    console.log(local_tags)
    for(let i in local_tags) {
        this.tagToStyle[local_tags[i].tag] = local_tags[i].style;
        this.tags[local_tags[i].tag] = 0
        this.completed_tasks[local_tags[i].tag] = 0
    }
    console.log(this.completed_tasks);
    this.tags['break'] = 0;
    this.tags[''] = 0;
    for(let i in local_tasks) {
        if (local_tasks[i].completed) {
          console.log(local_tasks[i]);
          this.completed_tasks.push(local_tasks[i]);
        }
        if (this.tags[local_tasks[i].tag] !== undefined) {
          this.tags[local_tasks[i].tag] += (local_tasks[i].timespent)
        }
        // else {
        //   console.log(local_tasks[i])
        //   this.tags["no tag"] += local_tasks[i].timespent
        // }
    }
    let my_keys = Object.keys(this.tags)
    for(let i in my_keys){
      //this.colors.push(this.color_keys[this.tagToStlye[my_keys[i]])
      if(my_keys[i] == ""){
        this.colors.push(this.color_keys['No'])
      }
      else if(my_keys[i] == "break"){
        this.colors.push(this.color_keys['Br'])
      }
      else{
        this.colors.push(this.color_keys[local_tags[i].style])
      }
    }
    console.log(this.colors)
    console.log(this.completed_tasks)
    this.keys = Object.keys(this.tags);
    for (let i in this.keys) {
      if (this.keys[i] === '') this.keys[i] = 'no tag';
    }
    this.values = Object.values(this.tags);
    this.comp_keys = Object.keys(this.completed_tasks)
    this.comp_values = Object.values(this.completed_tasks)
  },
};
</script>

<style scoped>

.vis-card {
  margin: 0.5rem;
  min-width: 350px;
}
</style>
