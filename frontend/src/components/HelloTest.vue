<template>
  <section class="mt-30 mb-30">
    <div class="container relative">

      <h2 class="section-title font-alt mb-70 mb-sm-40">
        DOCUMENT TITLE
      </h2>

      <!--<div>{{overall}}</div>-->
      <!-- Row -->
        <div v-for="paragraph in overall" :key="paragraph.id">

          <div class="row" style="font-family: Dosis, arial, sans-serif; font-size: 24px;">
            <div class="col-sm-2">{{paragraph.owner}}</div>

            <div v-if="paragraph.lock" class="col-sm-9">
              <div class="mb-20 mb-md-10" style="background-color: lightgray; border-radius: 10px;">
                <p style="margin: 0 20px; color: gray">{{paragraph.content}}</p>
              </div>
            </div>

            <div v-else class="col-sm-9 ">
              <div class="mb-20 mb-md-10">
                <textarea @keyup="IamUsing(paragraph)" v-model="paragraph.content" class="input-md form-control" style="font-size: 24px;"></textarea>
              </div>
            </div>

            <div class="col-sm-1">
              <button @click="remParagraph(paragraph.id)" class="btn btn-mod btn-round" style="width: 100%; height: 100%; background-color: #55acee; font-size: 24px;">-</button>
            </div>

          </div>


            <!--<textarea @keyup="IamUsing(paragraph)" v-model="paragraph.content" :disabled="paragraph.lock"></textarea>-->
            <!--<button @click="editEnd(paragraph.id)" class="">exit</button>-->
          <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-9">
              <div class="mb-20 mb-md-10">
                <button @click="addParagraph(paragraph.id)" class="btn btn-mod btn-gray btn-round" style="width: 100%; opacity: 0.5; font-size: 24px;">+</button>
              </div>
            </div>


          </div>

        </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Document',
  data: function() {
    return {
      owner: null,
    }
  },
  created() {
    this.owner = this.makeOwner();
    this.$store.commit("initDocument");
  },
  computed: { //get variables
    overall() {
      return this.$store.getters.getOverall;
    },
    currentParagraph() {
      return this.$store.getters.getCurrentParagraph;
    }
  },
  methods: {
    IamUsing: function(paragraph, event){
      if(!paragraph.lock) this.$store.commit('nowUsing', { id : paragraph.id, owner : this.owner });
    },
    editEnd: function(index, event){
      this.$store.commit('editDone', { id : index });
      this.$store.commit("setCurrentParagraph", null);
    },
    addParagraph: function(index, event){
      this.$store.commit('addParagraph', { id : index });
    },
    remParagraph: function(index, event){
      this.$store.commit('remParagraph', { id : index });
    },
    makeOwner: function(){
      let text = '';
      let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(let i=0; i<6; i++)
      {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return text;
    },
    selectParagraph: function(paragraph) {
      console.log("click para");
      this.IamUsing(paragraph);
      this.$store.commit("setCurrentParagraph", paragraph.id);
    }

  },
}
</script>
