<template>
  <div id="search-box" v-if="isVisible">
    <b-container fluid="sm">
      <b-row>
        <!-- <b-col md="8">
          <b-input-group class="mb-2">
            <b-form-input placeholder="Sofa, Dress, Phone" aria-label="Text input with checkbox"></b-form-input>
            <div id="">
            </div>
          </b-input-group>
        </b-col> -->
        <b-col md="12">
          <b-input-group class="mb-2">
            <b-form-input
              class="rounded-0 shadow-none"
              v-model="locationSearch"
              @focus="isFocused = true"
              placeholder="CDMX"
              aria-label="Text input with checkbox"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                class="rounded-0 shadow-none"
                text="Go"
                variant="success"
              >
                Go
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-input-group class="outer-search-box position-absolute">
            <div
              class="location-search-results bg-light p-0"
              v-for="(search, index) in adsBySearch"
              :key="index"
            >
              <div
                @click="
                  isSelected = true;
                  getLocation(search.location);
                "
                class="p-2 truncate"
              >
                {{ search.location }}
              </div>
            </div>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import _debounce from "lodash/debounce";

export default {
  name: "SearchBox",
  data() {
    return {
      isFocused: false,
      isSelected: false,
      locationSearch: null,
    };
  },
  computed: {
    adsBySearch() {
      return this.$store.getters["ad/getAdsBySearch"];
    },
  },
  props: {
    isVisible: {
      required: true,
    },
  },
  watch: {
    locationSearch(newValue) {
      if (newValue.length > 1 && !this.isSelected) {
        this.goSearch(newValue);
      } else if (newValue.length < 2) {
        this.$store.dispatch("ad/clearAdsBySearch");
        this.isSelected = false;
      }
    },
    isFocused(newValue) {
      if (!newValue) {
        this.$store.dispatch("ad/clearAdsBySearch");
      }
    },
  },
  methods: {
    goSearch: _debounce(function (value) {
      this.$store.dispatch("ad/fetchAdsBySearch", {
        location: value,
      });
    }, 200),

    getLocation(value) {
      this.locationSearch = value;
      this.isFocused = false;
    },
  },
};
</script>

<style lang="scss">
#search-box {
  background: $dark-blue !important;
  padding: 13px 0 5px 0;
  .outer-search-box {
    margin-top: -5px;
    overflow: hidden;
  }
  .location-search-results {
    z-index: 10000 !important;
    display: table;
    width: calc(100% - 30px);
  }
  .truncate {
    display: table-cell;
    max-width: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    border-bottom: 1px solid gray;
  }
}
</style>
