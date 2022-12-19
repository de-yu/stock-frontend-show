<template>
  <div class="header-item">
    <div class="name">{{ name }}</div>
    <div class="value mr-2">{{ value }}</div>
    <div class="unit"> {{ unit }}</div>
  </div>
</template>

<style scoped>

.header-item
{
  display: flex;
  flex-wrap: wrap;
}
.name
{
  margin-right: 20px;
}

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HeaderItem extends Vue {
  @Prop({ default: '' }) name!: string;

  @Prop({ default: '' }) value!: string | number;

  @Prop({ default: '' }) unit!: string;
}
</script>
