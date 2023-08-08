<template>
  <div class="diary-list-item" @click.prevent="open">
      <div class="date text">{{formatDate}}</div>
      <div class="failure-text text">{{text1}}</div>
      <div class="impressed-text text">{{text2}}</div>
      <div class="goal-text text">{{text3}}</div>
      <v-dialog @click="a" maxWidth="800"  v-model="isOpen">
        <Diary :timestamp="timestamp" :text1="text1" :text2="text2" :text3="text3" :userId="userId" />
      </v-dialog>
  </div>
</template>

<script>
import Diary from "../components/diary.vue";

export default {
  name: 'DialyListItem',
   components: {
   // 読み込んだコンポーネント名をここに記述する
    Diary,
  },
  computed: {
      formatDate() {
        const timestampInMilliseconds = this.timestamp; // ここにDate.now()で得られた値を代入する
        const dateObj = new Date(timestampInMilliseconds);
        const formattedDateTime = dateObj.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        return formattedDateTime;
      }
     
  },
  props: {
       timestamp: {
           type: Number,
           default: "",
           required: true
       },
       text1: {
           type: String,
           default: "",
           required: true
       },
       text2: {
           type: String,
           default: "",
           required: true
       },
       text3: {
           type: String,
           default: "",
           required: true
       },
       userId: {
           type: String,
           default: "",
           required: true
       },
  },
  data() {
      return {
        isOpen: false
      }
  },
  methods: {
     open() {
         console.log("open")
         this.isOpen=true;
     },
     a() {
         console.log("aaa")
     }
  }
};
</script>

<style scoped >
 .diary-list-item {
     width: 100%;
     padding: .9rem;
     border: 2px solid skyblue;
     border-radius: 10px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     row-gap: .7rem;
     font-size: 1.5rem;
     font-weight: 500;
     cursor: pointer;
     transition: all .3s;
     white-space: nowrap;
 }
  .diary-list-item:hover {
      border-color: #ccc;
  }
  
  .text {
      width: 100%;
      height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
  }
</style>