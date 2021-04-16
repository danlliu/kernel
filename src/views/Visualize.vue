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
      <h1>kernel: visualize</h1>
      <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="tab === 0 && 'active'"
            @click="tab = 0"
            >today</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="tab === 1 && 'active'"
            @click="tab = 1"
            >this week</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="tab === 2 && 'active'"
            @click="tab = 2"
            >all time</a
          >
        </li>
      </ul>
      <div v-if="tab === 0" class="infobox container-fluid">
        <h2>today's statistics</h2>
        <div class="row m-3">
          <div class="col card vis-card">
            <div class="card-body">
              <h5 class="card-title">today's tasks</h5>
              <PieChart
                :titles="['EECS493', 'EECS482', 'CHEM483', 'CHEM420']"
                :data="[3, 5, 4, 2]"
              />
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
    };
  },
  methods: {
    clearAll: function () {
      localStorage.clear();
    },
  },
  mounted() {
    this.modals["resetTasksModal"] = new Modal(this.$refs["resetTasksModal"]);
  },
};
</script>

<style scoped>
.infobox {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border: 1px solid #dee2e6;
  border-top: 0;
}

.vis-card {
  margin: 0.5rem;
}
</style>
