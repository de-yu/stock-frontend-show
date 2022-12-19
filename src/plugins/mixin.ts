import Vue from 'vue';

Vue.mixin({
  methods: {
    varyColor(num: number) {
      if (num >= 0) {
        return 'red--text';
      }
      return 'green--text';
    },
  },
});
