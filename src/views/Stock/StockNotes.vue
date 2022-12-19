<template>
  <div>
     <v-row class="ma-0 pa-0"
      v-if="state.value === 'update' ||
      state.value === 'create' ||
      state.value === 'normal'"
      >
      <v-row class="ma-0 pa-0" v-if="state.value === 'normal'">
        <v-row class="ma-0 pa-0" >
          <v-col class="ma-0 pa-0" cols="8">
            <div class="content white pa-4" v-html="htmlContent">
            </div>
          </v-col>
          <v-col class="ma-0 pa-0" cols="2">
            <div class="ml-2 mb-2">
              <v-btn class="white" depressed width="64px" height="64px" @click="toUpdate">
                <v-icon>{{mdiPencil}}</v-icon>
              </v-btn>
            </div>
            <div class="ml-2">
              <v-btn class="white" depressed width="64px" height="64px">
                <v-icon>{{mdiDelete}}</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-row>

      <v-col class="pa-0" cols="8" v-if="state.value === 'update' || state.value === 'create'">

        <v-btn color="#F0F0F7"
        depressed ripple height="40px" width="40px"
        @click="updateBack" v-if="state.value === 'update'">
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
        <div class="text-h5 mb-4"> 內容 </div>
        <markdown-editor class="editor"
          toolbar="bold italic heading link numlist bullist code quote preview "
          v-model="content">
        </markdown-editor>

         <v-btn class="white--text text-body-1 mt-4" color="light-green"
          rounded depressed large @click="create" v-if="!isHasContent">
          儲存
        </v-btn>
        <v-btn class="white--text text-body-1 mt-4" color="light-blue"
          rounded depressed large @click="update" v-if="isHasContent">
          更新
        </v-btn>
         <v-btn class="white--text text-body-1 mt-4" color="red"
          rounded depressed large @click="deleteNoteById" v-if="isHasContent">
          移除
        </v-btn>
      </v-col>
    </v-row>
    <v-row  class="ma-0" v-else>
      <div class="text-h4">您尚未登入</div>
    </v-row>
  </div>
</template>

<style>
.editor
{
  height: 500px;
}
.editor .btn
{
  padding: 10px;
  padding-right: 15px;
}

.editor .CodeMirror-scroll
{
  padding:10px;
}
</style>
<style scoped>

.content
{
  width: 100%;
  min-height: 500px;
}

</style>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { mdiPencil, mdiDelete, mdiArrowLeft } from '@mdi/js';
import { useMachine } from 'xstate-vue2';
import { createMachine } from 'xstate';
import SubView from '@/views/SubViewClass/SubView.vue';
import marked from 'marked';

const fetchMachine = createMachine({
  id: 'note',
  initial: 'notLogin',
  context: {},
  states: {
    notLogin: {
      on: {
        PASS: 'loading',
      },
    },
    loading: {
      on: {
        NORMAL: 'normal',
        CREATE: 'create',
        UPDATE: 'update',
      },
    },
    normal: {
      on: {
        UPDATE: 'update',
      },
    },
    create: {
      on: {
        NORMAL: 'normal',
      },
    },
    update: {
      on: {
        NORMAL: 'normal',
      },
    },
  },
});

@Component({
  setup() {
    const { state, send } = useMachine(fetchMachine);
    return {
      mdiPencil,
      mdiDelete,
      mdiArrowLeft,
      state,
      send,
    };
  },
})
export default class StockNotes extends SubView {
  @Action('createNote') createNote!: ({ stockId, content }: any) => void;

  @Action('updateNote') updateNote!: (content: string) => void;

  @Action('deleteNote') deleteNote!: () => void;

  @Action('getNote') getNote!: (stockId: string) => void;

  @Getter('note') note!: Note;

  private content = '';

  private id = '';

  private edit = false;

  private htmlContent = '';

  send: any;

  state: any;

  private created() {
    this.checkLogin();
  }

  @Watch('note')
  private getContent() {
    this.id = this.note._id;
    this.content = this.note.content;
    this.htmlContent = marked(this.content);

    if (this.id !== '') {
      this.send('NORMAL');
    } else {
      this.send('CREATE');
    }
  }

  get isHasContent() {
    return this.id !== '';
  }

  @Watch('isAuthorityShow')
  private checkLogin() {
    if (this.isAuthorityShow(this.MemberEnum.normal)) {
      this.getNote(this.$route.params.id);
      this.send('PASS');
    }
  }

  private toUpdate() {
    this.send('UPDATE');
  }

  private create() {
    this.createNote({ stockId: this.$route.params.id, content: this.content });
  }

  private update() {
    this.updateNote(this.content);
  }

  private deleteNoteById() {
    this.deleteNote();
  }

  private updateBack() {
    this.send('NORMAL');
  }
}
</script>
