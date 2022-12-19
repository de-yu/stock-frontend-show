<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

 enum UIStateEnum {
   Loading = 0,
   Finish = 1,
 }

@Component
export default class InfoBlock extends Vue {
 public UIStateEnum = UIStateEnum;

 public UIState = this.UIStateEnum.Loading;

 public toFinish() {
   this.UIState = this.UIStateEnum.Finish;
 }
}
</script>
