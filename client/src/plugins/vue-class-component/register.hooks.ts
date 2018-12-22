import Component from 'vue-class-component';

const router = ['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'];

Component.registerHooks(router);
