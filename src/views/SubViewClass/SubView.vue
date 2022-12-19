<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SubViewStateEnum, MemberEnum } from '@/enum/MainEnum';

@Component
export default class SubView extends Vue {
  @Getter('getAuthority') getAuthority!: CommonObject;

  public subViewState: SubViewStateEnum = SubViewStateEnum.loading;

  public MemberEnum = MemberEnum;

  public isAuthorityShow(member: MemberEnum) {
    return this.getAuthority[member];
  }

  public toSubViewFinish() {
    this.subViewState = SubViewStateEnum.finish;
  }

  public isLoading(): boolean {
    return this.subViewState === SubViewStateEnum.loading;
  }

  public isFinish(): boolean {
    return this.subViewState === SubViewStateEnum.finish;
  }
}
</script>
