<template>
  <div>
  <v-simple-table dense>
    <template v-slot:default>
      <thead class="blue-grey lighten-3">
        <tr class="table-cell">
          <th class="text-center white--text text-body-1"
            v-for="header in headers" :key="header.name">
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-cell" v-for="item in data" :key="item[headers[0].objectName]">
          <td class="text-center text-body-1"
            v-for="header in headers" :key="header.name">
            {{ item[header.objectName] }}
            {{ header.unit }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<style scoped>

.table-cell
{
  height: 40px;
}

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class StatisticsTable extends Vue {
  @Prop({ default: [] }) headers!: TableHeader[];

  @Prop({ default: [] }) data!: CommonObject[];
}
</script>
