<template>
  <router-view/>
  <div class="container">
    <div class="search-container">
      <div class="select-container">
       <select v-model="year" class="select">
         <option  v-for="(year, index) in yearsData" :key="index" :value=year.value >{{year.label}}</option>
       </select>
       <select v-model="month" class="select">
         <option  v-for="(month, index) in monthsData" :key="index" :value=month.value >{{month.label}}</option>
       </select>
      </div>
      <v-btn block @click.prevent="search">
         <v-icon>mdi-magnify</v-icon>
        <span>検索</span>
      </v-btn>
    </div>
    <DiaryList v-if="isLoading === false" :diarys=diarys />
    <v-snackbar
      v-model="isShow"
      :timeout="2000"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="hideSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div  v-if="isLoading === true" class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
   
</template>

<script>
import {baseUrl} from '@/assets/config.js';
import DiaryList from "../components/diaryList.vue";
import {years} from "../const.js";
import {months} from "../const.js";

export default {
  name: 'Home',

  components: {
    DiaryList,
  },

  data() {
    return {
      yearsData: years,
      monthsData: months,
      snackbarText: "",
      diarys: [
      ],
      isOpen: false,
      year: null,
      month: null,
      isShow: false,
      // userId: window.localStorage.getItem("userId"),
      // token: window.localStorage.getItem("token"),
      userId: "user1",
      token: "mtiToken",
      isLoading: false
    };
  },
  created() {
    this.search()
  },
  computed: {
  },


  methods: {
    showSnackbar(text) {
      this.snackbarText = text;
      this.isShow = true;
    },
    hideSnackbar() {
      this.isShow = false;
    },
    async search() {
      if((this.year && !this.month) || (!this.year && this.month)) {
        this.showSnackbar("年と月の両方を選択してください。");
        return;
      }
      
      const headers = {'Authorization': "mtiToken"};
      let url = "";
      if(this.year && this.month) {
        const selectedDate = new Date(`${this.year}-${this.month}`);
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 0, 0, 0);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59);
        const startDateNumber = startDate.getTime();
        const endDateNumber = endDate.getTime();
        url = `${baseUrl}/articles?userId=${this.userId}&start=${startDateNumber}&end=${endDateNumber}`
      }else {
        url = `${baseUrl}/articles?userId=${this.userId}`
      }
      
      try {
        const res = await fetch(url,  {
          method: 'GET',
          headers
        });
        
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        if(jsonData.message) {
          this.showSnackbar(jsonData.message)
          return;
        }
        if(jsonData.articles.length === 0) {
          this.showSnackbar("日記がありません。");
          this.diarys = [];
          return;
        }

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        this.diarys = jsonData.articles;
      } catch (e) {
        // エラー時の処理
        console.log("e: ", e)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    width: 90%;
    max-width: 560px;
    margin: 0 auto;
    padding-top: 1.5rem;
  }
  
  .search-container {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .select-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1.5rem;
  }
  
  .select {
  -moz-appearance: menulist;
  -webkit-appearance: menulist;
    padding: .1rem .6rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1.6rem;
  }
</style>
