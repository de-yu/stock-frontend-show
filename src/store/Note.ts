import GraphClient from '@/graphql/GraphQlClient';
import Query from '@/graphql/Query';
import Mutation from '@/graphql/Mutation';
import { gql } from '@apollo/client';

const noteStore = {
  state: {
    note: {
      _id: '',
      content: '',
    },

  },
  mutations: {
    setNote(state: any, data: Note) {
      state.note = data;
    },
  },
  actions: {
    async createNote({ commit }: any, { stockId, content }: any) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.insertNote}`,
        variables: {
          stockId,
          content,
        },
      });
    },
    async updateNote({ commit, state }: any, content: string) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.updateNote}`,
        variables: {
          noteId: state.note._id,
          content,
        },
      });
      console.log(response);
    },
    async deleteNote({ commit, state }: any) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.updateNote}`,
        variables: {
          noteId: state.note._id,
        },
      });
      console.log(response);
    },
    async getNote({ commit }: any, stockId: string) {
      const response: any = await GraphClient.query({
        query: gql`${Query.getNote}`,
        fetchPolicy: 'no-cache',
        variables: {
          stockId,
        },
      });
      commit('setNote', response.data.getNote);
    },
  },
  getters: {
    note(state: any): Note {
      return state.note;
    },
  },
};

export default noteStore;
