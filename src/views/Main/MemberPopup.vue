<template>
  <div class="px-6 white">
    <div class="member-detail" v-if="loginState.value === LoginStateEnum.alreadyLogin">
      <v-row>
        <v-col cols="12">
          <div class="d-table mx-auto pt-10">
            <v-icon size="64px">{{ mdiAccount }}</v-icon>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-table mx-auto">
          {{ name }}
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-table mx-auto">
            <v-btn class="white--text" color="blue" depressed @click="logout">登出</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="member-popup" v-else>
      <v-tabs grow v-model="loginModel">
        <v-tab>
          登入
        </v-tab>
        <v-tab>
          註冊
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="loginModel">
        <v-tab-item>
          <v-form class="py-8">
            <v-text-field
              label="帳號"
              outlined
              v-model="account"
            ></v-text-field>
            <v-text-field
              label="密碼"
              outlined
              type="password"
              v-model="password"
            ></v-text-field>
            <v-btn class="white--text" :color="loginColor()" depressed @click="actionLogin"
            :loading="loginState.value === LoginStateEnum.loading">

            <span v-if="loginState.value === LoginStateEnum.notLogin">登入</span>
            <v-icon v-if="loginState.value === LoginStateEnum.alreadyLogin">
              {{ mdiCheckCircle }}
            </v-icon>
            <v-icon v-if="loginState.value === LoginStateEnum.loginFail">
              {{ mdiWindowClose  }}
              </v-icon>
            </v-btn>
          </v-form>
        </v-tab-item>
        <v-tab-item class="py-8">
            <v-text-field
              label="帳號"
              outlined
              v-model="registerAccount"
            ></v-text-field>
            <v-text-field
              label="密碼"
              outlined
              type="password"
              v-model="registerPassword"
            ></v-text-field>
            <v-btn class="white--text" :color="registerColor()" depressed disabled
            :loading="registerState.value === RegisterStateEnum.loading">

            <span v-if="registerState.value === RegisterStateEnum.notRegister">註冊</span>
            <v-icon v-if="registerState.value === RegisterStateEnum.alreadyRegister">
              {{ mdiCheckCircle }}
            </v-icon>
            <v-icon v-if="registerState.value === RegisterStateEnum.registerFail">
              {{ mdiWindowClose  }}
              </v-icon>
            </v-btn>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<style scoped>

.member-popup
{
  width: 240px;
}

.member-detail
{
  width: 240px;
  height: 250px;
}
</style>

<script lang="ts">
import {
  Vue, Component, Watch,
} from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { useMachine } from 'xstate-vue2';
import { createMachine } from 'xstate';
import { mdiCheckCircle, mdiWindowClose, mdiAccount } from '@mdi/js';
import { LoginStateEnum, RegisterStateEnum } from '@/enum/MainEnum';
import { encryptoPassword } from '@/utility/utility';

const fetchMachine = createMachine({
  id: 'login',
  initial: 'notLogin',
  context: {
    retries: 0,
  },
  states: {
    notLogin: {
      on: {
        ACTION: 'loading',
        CONFIRM: 'alreadyLogin',
      },
    },
    loading: {
      on: {
        RESOLVE: 'alreadyLogin',
        REJECT: 'loginFail',
      },
    },
    alreadyLogin: {
      on: {
        LOGOUT: 'notLogin',
      },
    },
    loginFail: {
      on: {
        ACTION: 'loading',
      },
    },
  },
});

const registerMachine = createMachine({
  id: 'register',
  initial: 'notRegister',
  context: {
    retries: 0,
  },
  states: {
    notRegister: {
      on: {
        ACTION: 'loading',
      },
    },
    loading: {
      on: {
        RESOLVE: 'alreadyRegister',
        REJECT: 'registerFail',
      },
    },
    alreadyRegister: {
    },
    registerFail: {
      on: {
        ACTION: 'loading',
      },
    },
  },
});

@Component({
  setup() {
    const { state, send } = useMachine(fetchMachine);
    const register = useMachine(registerMachine);

    return {
      loginState: state,
      send,
      mdiCheckCircle,
      mdiWindowClose,
      mdiAccount,
      LoginStateEnum,
      RegisterStateEnum,
      encryptoPassword,
      registerState: register.state,
      registerSend: register.send,
    };
  },
})
export default class MemberPopup extends Vue {
  @Action('login') login !: (data: Member) => Promise<any>;

  @Action('register') register !: (data: Member) => void

  @Action('verify') verify !: () => Promise<any>;

  @Getter('getLoginState') getLoginState!: LoginStateEnum;

  @Getter('getMemberData') getMemberData!: QueryResponse;

  @Getter('getRegisterState') getRegisterState!: RegisterStateEnum;

  @Getter('getRegisterData') getRegisterData!: QueryResponse;

  mdiCheckCircle: string;

  mdiAccount: string;

  mdiWindowClose: string;

  LoginStateEnum: LoginStateEnum;

  RegisterStateEnum: RegisterStateEnum;

  encryptoPassword: (text: string) => string;

  loginState: any;

  send: any;

  registerState: any;

  registerSend: any;

  private loginModel = 0;

  private account = '';

  private password = '';

  private registerAccount = '';

  private registerPassword = '';

  private name = '';

  private created() {
    this.verify();
  }

  private async actionLogin() {
    this.send('ACTION');
    await this.login({
      account: this.account,
      password: this.encryptoPassword(this.password),
    });

    if (this.getLoginState === LoginStateEnum.alreadyLogin) {
      this.send('RESOLVE');
    } else {
      this.send('REJECT');
    }

    this.account = '';
    this.password = '';

    await this.verify();
  }

  private async actionRegister() {
    this.registerSend('ACTION');
    await this.register({
      account: this.registerAccount,
      password: this.encryptoPassword(this.registerPassword),
    });

    if (this.getRegisterState === RegisterStateEnum.alreadyRegister) {
      this.registerSend('RESOLVE');
      this.loginModel = 0;
    } else {
      this.registerSend('REJECT');
    }

    this.registerAccount = '';
    this.registerPassword = '';
  }

  @Watch('loginState')
  private loginColor() {
    if (this.loginState.value === LoginStateEnum.loginFail) {
      return 'red';
    }
    return 'green';
  }

  @Watch('registerState')
  private registerColor() {
    if (this.registerState.value === RegisterStateEnum.registerFail) {
      return 'red';
    }
    return 'green';
  }

  @Watch('getMemberData')
  private memberData() {
    if (this.getLoginState === LoginStateEnum.alreadyLogin) {
      this.send('CONFIRM');
      this.name = this.getMemberData.data.account;
    }
  }

  @Watch('getRegisterData')
  private registerData() {
    if (this.getRegisterState === RegisterStateEnum.alreadyRegister) {
      this.registerSend('RESOLVE');
    }
  }

  private logout() {
    this.send('LOGOUT');
    localStorage.removeItem('token');
    window.location.reload();
  }
}
</script>
