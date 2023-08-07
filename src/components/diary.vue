<template>
    <div class="diary">
        <div class="date">
            {{date}}
        </div>
        <v-btn>aaa</v-btn>
        <div class="sections">
                <div class="section">
                    <h4 class="section-title">失敗したこと</h4>
                    <div class="content">
                        <p class="input-text"> {{failureText}}</p>
                        <div class="image">
                            <img src="https://source.unsplash.com/random" />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h4 class="section-title">感動したこと</h4>
                    <div class="content">
                        <p class="input-text"> {{impressedText}}</p>
                        <div class="image">
                            <img src="https://source.unsplash.com/random" />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h4 class="section-title">明日の目標</h4>
                    <div class="content">
                        <p class="input-text"> {{goalText}}</p>
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
     
  },
  props: {
   
  },
  data() {
      return {
        impressedText: "aaaaaaaaaaaaaaaaaaaaa",
        failureText: "bbbbbbbbbbbbbbbbbbb",
        goalText: "ccccccccccccccccccc",
        date: "2023/5/24"
      }
  },
  methods: {
     
  }
};
</script>

<style scoped >
   .diary {
       /*width: 90%;*/
       /*max-width: 560px;*/
       /*margin: 0 auto;*/
       margin-top: 5rem;
       display: flex;
       flex-direction: column;
       padding: .8rem;
       row-gap: 1rem;
   }
   .sections {
       /*margin-left: 1rem;*/
       display: flex;
       flex-direction: column;
       row-gap: 1.5rem;
   }
   .content {
       /*display: flex;*/
       /*flex-direction: column;*/
       /*row-gap: .3rem;*/
   }
   .date {
       padding-bottom: 1rem;
       border-bottom: 3px solid #ccc;
       font-size: 2.6rem;
       font-weight: normal;
   }
   .image {
       width: 100%;
   }
   
   .image img {
       width: 100%;
       height: 100%;
   }
   .section-title {
       font-size: 2.4rem;
   }
   .input-text {
       font-size: 1.5rem;
       color: #ccc;
   }
</style>