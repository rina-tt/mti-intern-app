<template>
    <div class="diary">
        <div class="header">
            <div class="popup-title">
                <div class="date">
                    {{formatDate}}
                </div>
                <div class="border"></div>
            </div>
            <div class="edit-button">
                <v-btn :color="color" @click="transitionEditScreen">
                    <v-icon class="icon">mdi-book-open-variant</v-icon>
                    <span class="button-text font-size20">日記を編集</span>
                </v-btn>
            </div>
        </div>
        <div class="sections">
                <div class="section">
                    <div class="section-title">失敗したこと</div>
                    <div class="content">
                        <div class="input-text" v-html="formatContent(text1)"></div>
                        <div class="image">
                            <img src="https://source.unsplash.com/random" />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title">感動したこと</div>
                    <div class="content">
                        <div class="input-text" v-html="formatContent(text2)"></div>
                        <div class="image">
                            <img src="https://source.unsplash.com/random" />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title">明日の目標</div>
                    <div class="content">
                        <div class="input-text" v-html="formatContent(text3)"></div>
                        <div class="image">
                            <img src="https://source.unsplash.com/random" />
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'Diary',
  
  computed: {
      formatDate() {
        const timestampInMilliseconds = this.timestamp; // ここにDate.now()で得られた値を代入する
        const dateObj = new Date(timestampInMilliseconds);
        const formattedDateTime = dateObj.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        return formattedDateTime;
      },
      color() {
        return "var(--main-color)"; // カスタム変数を返す
      },
  },
  props: {
   timestamp: {
       type: Number,
       default: "",
       required: true
    },
   text2: {
       type: String,
       default: "",
       required: true
   },
   text1: {
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
      }
  },
  methods: {
    formatContent(content) {
        return content.replace(/\n/g, '<br>');
      },
     transitionEditScreen() {
         window.localStorage.setItem('pageIndex', null);
         this.$router.push({path: '/update', query: {timestamp: this.timestamp}})
     }
  }
};
</script>

<style scoped >
   .diary {
       background-color: white;
       display: flex;
       flex-direction: column;
       padding: 1.5rem 0 1rem 0;
       row-gap: 2.5rem;
       height: 80%;
       overflow-y: scroll;
   }
   .sections {
       /*margin-left: 1rem;*/
       display: flex;
       flex-direction: column;
       row-gap: 3rem;
       padding: 0 .8rem;
   }
   .section {
       display: flex;
       flex-direction: column;
       row-gap: 1rem;
   }
   .content {
       display: flex;
       flex-direction: column;
       row-gap: 1rem;
   }
   .date {
       padding-left: .8rem;
       font-size: 1.7rem;
       font-weight: normal;
   }
   .border {
       height: 2px;
       width: 100%;
       background-color: #ccc;
   }
   .popup-title {
       display: flex;
       flex-direction: column;
       row-gap: .8rem;
   }
   .image {
       width: 100%;
   }
   
   .image img {
       width: 100%;
       height: 100%;
   }
   .section-title {
       font-size: 2rem;
       font-weight: bold;
       color: var(--main-color, #4dc4ff);
   }
   .header {
       display: flex;
       flex-direction: column;
       row-gap: 1rem;
   }
   .edit-button {
       width: 100%;
       display: flex;
       justify-content: flex-end;
       padding-right: 1rem;
   }
   .input-text {
       font-size: 1.5rem;
       color: grey;
       font-weight: 400;
   }
   .button-text {
       margin-left: .3rem;
       color: #fff;
   }
   .icon {
       font-size: 1.5rem;
       margin-top: -7px;
       color: #fff;
   }
   .font-size20{
    	font-size: 20px;
    }
</style>