<template>
  <div class="diary-list">
      
     <DiaryListItem  v-for="(diary, index) in diarys" :key="index" :text1=diary.text1 :text2=diary.text2 :text3=diary.text3 :timestamp=diary.timestamp />
 </div>
</template>

<script>
import DiaryListItem from "../components/diaryListItem.vue";
export default {
  name: 'DialyList',
  components: {
      DiaryListItem
  },
  computed: {
     
  },
  props: {
   diarys: {
        type: Array,
        required: true,
        default: []
   }
  },
  data() {
      return {
      
      }
  },
  created() {
    console.log("diarys: ", this.diarys);
  },
  methods: {
     
  }
};
</script>

<style scoped >
     .diary-list {
         display: flex;
         flex-direction: column;
         row-gap: 1rem;
         margin-bottom: 1.5rem;
     }
</style>