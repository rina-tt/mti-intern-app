<template>
    <v-snackbar
      v-if=true
      :timeout="timeout"
    >
      {{ text }}

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
</template>

<script>
export default {
  name: 'CommonSnackbar',
  computed: {
     
  },
  mounted() {
    console.log(this.isShow)  
  },
  props: {
   text: {
       type: String,
       default: "",
       required: true
   },
   isShow: {
       type: Boolean,
       default: "",
       required: true
   },
   hideSnackbar: {
       type: Function,
       default: "",
       required: true
   }
  },
  data() {
      return {
       timeout: 2000
      }
  },
  methods: {
     
  }
};
</script>

<style scoped >
   
</style>