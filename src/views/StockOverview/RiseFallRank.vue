<template>
  <div class="white risefall-rank-block">
    <v-row>
      <v-col cols="12">
        <span>各類股漲幅排行</span>
      </v-col>
      <v-col cols="12">
        <div id="rankChart"></div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.risefall-rank-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}

#rankChart
{
  width:100%;
  height:600px;
}

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RiseFallRank extends Vue {

}
</script>
