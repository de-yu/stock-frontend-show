<template>
  <v-app>
    <v-navigation-drawer v-model="showMenu" app color="#43425D">
      <v-list class="pt-0">
        <v-list-item class="header-background">
          <v-list-item-content class="ml-4">
            <v-list-item-title class="text-h4 white--text">
              STOCK
            </v-list-item-title>
          </v-list-item-content>
          </v-list-item>
          <v-list>
            <div v-for="item in barHeader" :key="item.name">
              <v-list-group
              :ripple="false"
              no-action
              v-if="item.hasOwnProperty('options')"
              >
              <template v-slot:activator>
                <div class="d-flex ml-4 white--text">
                  <v-list-item-icon>
                    <v-icon color="white">{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content class="white--text">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </div>
              </template>
              <template v-slot:appendIcon>
                <v-icon  class="white--text">mdi-chevron-down</v-icon>
              </template>
              <template v-for="(option, i) in item.options">
                <router-link class="transparent--text" :to="option.route" :key="i">
                  <v-list-item class="ml-12">
                    <v-list-item-content class="ml-12">
                      <v-list-item-title class="white--text">{{ option.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>
              </template>
              </v-list-group>
              <template v-else>
                <router-link class="transparent--text" :to="item.route">
                  <v-list-item>

                    <div class="d-flex ml-4">
                      <v-list-item-icon>
                        <v-icon color="white">{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title class="white--text">{{ item.name }}</v-list-item-title>
                      </v-list-item-content>
                    </div>

                  </v-list-item>
                </router-link>
              </template>
            </div>
          </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main class="mb-0 pt-0">
      <div class="main-bakcground">
        <ChatHelper :script="script" :chatBoxOptions="chatBoxOptions" firstStep="menu"></ChatHelper>
        <div class="main-topbar">
          <v-row class="ma-0 pa-0">
            <v-btn depressed color="#F0F0F7" ripple height="64px" width="64px" @click="menuChange">
              <v-icon>{{ mdiMenu }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y left :close-on-content-click="false" eager>
              <template v-slot:activator="{ on }">
                <v-btn class="mr-6" depressed color="#F0F0F7"
                  ripple height="64px" width="64px" v-on="on">
                  <v-icon>{{ mdiAccount }}</v-icon>
                </v-btn>
              </template>
              <MemberPopup></MemberPopup>
            </v-menu>
          </v-row>
        </div>
        <div class="main-view">
          <transition :name="transitionName" mode="out-in">
            <router-view class="mb-6"></router-view>
          </transition>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>

.header-background
{
  background: #353448;
}

.main-bakcground
{
  background: #F0F0F7;
  height: 100%
}

.main-topbar
{
  height: 64px;
}

.main-view
{
  width: calc(100% - 48px);
  margin: 0 auto;
}

</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiChartAreaspline, mdiChartBox, mdiFileChart,
  mdiViewDashboardVariant, mdiMenu, mdiAccount,
} from '@mdi/js';
import head from '@/assets/head.png';
import MemberPopup from '@/views/Main/MemberPopup.vue';

Vue.component('MemberPopup', MemberPopup);

@Component({
  setup() {
    return {
      mdiMenu,
      mdiAccount,
    };
  },
})
export default class App extends Vue {
  mdiMenu: string;

  mdiAccount: string;

  private showMenu = true;

  private transitionName = 'cutin';

  private barHeader: NavigationHeader[] = [
    {
      icon: mdiChartAreaspline,
      name: '??????',
      route: '/marketing',
    },
    {
      icon: mdiChartAreaspline,
      name: '????????????',
      route: '',
      options: [
        {
          name: '???????????????',
          route: '/StockOverview/TransactionRank',
        },
        {
          name: '?????????????????????',
          route: '/StockOverview/InvestmentMechanismSummary',
        },
      ],
    },
    {
      icon: mdiChartBox,
      name: '???????????????',
      route: '/MarketStockList',
    },
    {
      icon: mdiViewDashboardVariant,
      name: '????????????',
      route: '/TracingStock',
    },
    {
      icon: mdiViewDashboardVariant,
      name: '??????',
      route: '/Classification',
    },
    {
      icon: mdiViewDashboardVariant,
      name: '????????????',
      route: '/StockRecord',
    },
    {
      icon: mdiViewDashboardVariant,
      name: '?????????',
      route: '/StockPoint',
    },
  ];

  private script = {
    menu: {
      title: '?????????????????????????????? ? ',
      type: 'question',
      option: [{
        text: '???????????????????????????',
        next: 'target',
      }, {
        text: '??????????????????',
        next: 'knowledge',
      }],
    },
    target: {
      title: '?????????????????????????????????',
      type: 'answer',
      next: 'menu',
    },
    knowledge: {
      title: '??????????????????',
      type: 'answer',
      next: 'menu',
    },
  };

  private chatBoxOptions = {
    name: '??????',
    headImg: head,
  }

  @Watch('$route')
  private adjustTransition(to: any, from: any) {

  }

  private menuChange() {
    this.showMenu = !this.showMenu;
  }
}
</script>
