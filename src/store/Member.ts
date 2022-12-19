import GraphClient from '@/graphql/GraphQlClient';
import Query from '@/graphql/Query';
import Mutation from '@/graphql/Mutation';
import { gql } from '@apollo/client';
import {
  LoginStateEnum, ReponseStatusEnum, RegisterStateEnum, MemberAuthorityEnum,
} from '@/enum/MainEnum';

const member = {
  state: {
    loginState: LoginStateEnum.notLogin,
    memberData: {},
    registerState: RegisterStateEnum.notRegister,
    registerDate: {},
    authority: MemberAuthorityEnum.visitor,
  },
  mutations: {
    setLoginToken(state: any, data: QueryResponse) {
      if (data.status === ReponseStatusEnum.Success) {
        localStorage.setItem('token', data.data);
        state.loginState = LoginStateEnum.alreadyLogin;
      } else {
        state.loginState = LoginStateEnum.loginFail;
      }
    },
    setMemberData(state: any, data: QueryResponse) {
      if (data.status === ReponseStatusEnum.Success) {
        state.memberData = data;
        state.authority = data.data.authority;
        state.loginState = LoginStateEnum.alreadyLogin;
      } else {
        state.loginState = LoginStateEnum.loginFail;
      }
    },
    setRegisterData(state: any, data: QueryResponse) {
      if (data.status === ReponseStatusEnum.Success) {
        state.registerDate = data;
        state.registerState = RegisterStateEnum.alreadyRegister;
      } else {
        state.registerState = RegisterStateEnum.registerFail;
      }
    },
  },
  actions: {
    async login({ commit }: any, data: Member) {
      const response: any = await GraphClient.query({
        query: gql`${Query.login}`,
        fetchPolicy: 'no-cache',
        variables: {
          data,
        },
      });
      console.log(response);
      commit('setLoginToken', response.data.login);
    },

    async register({ commit }: any, data: Member) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.register}`,
        variables: {
          data,
        },
      });
      commit('setRegisterData', response.data.register);
    },
    async verify({ commit }: any) {
      const response: any = await GraphClient.query({
        query: gql`${Query.verify}`,
        fetchPolicy: 'no-cache',
      });
      commit('setMemberData', response.data.verify);
    },
  },
  getters: {
    getLoginState(state: any) {
      return state.loginState;
    },
    getMemberData(state: any) {
      return state.memberData;
    },
    getRegisterState(state: any) {
      return state.registerState;
    },
    getRegisterData(state: any) {
      return state.registerData;
    },
    getAuthority(state: any) {
      const result = {
        visitor: state.authority >= MemberAuthorityEnum.visitor,
        normal: state.authority >= MemberAuthorityEnum.normal,
        admin: state.authority >= MemberAuthorityEnum.admin,
      };

      return result;
    },
  },
};

export default member;
