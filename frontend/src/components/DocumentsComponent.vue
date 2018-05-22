<template>
  <div class="documents">
    <!--<div>{{allDocuments}}</div>-->
    <!--<div>{{newDocumentName}}</div>-->
    <div v-for="doc in allDocuments" :key="doc.name">
      {{doc.name}}
    </div>
    <div id="newDocument">
      <input v-model="newDocumentName" placeholder="new document name">
      <button @click="createDocument">create</button>
    </div>
    <button @click="getAllDocuments">refresh</button>
      <!--<div v-for="doc in allDocuments" :key="doc.id">
        <textarea v-bind:id='paragraph.index' @click="IamUsing" @keyup="editEnd" v-model="paragraph.content"></textarea>
        <button v-bind:id='paragraph.index' @click="editEnd">exit</button>
      </div>-->

  </div>
</template>

<script>
export default {
  name: 'Documents',
  created() {
    this.getAllDocuments();
  },data: function() {
    return {
      allDocuments: "nothing yet",
      newDocumentName: null,
    }
  },
  computed: {
    
  },
  methods: {
    getAllDocuments: function() {
      this.$http.get('http://localhost:3000/api/documents').then((response) => {
      this.allDocuments = response.body;
    }).catch((msg)=> {
      this.allDocuments = msg;
    });
    },
    createDocument: function() {
      this.$http.post('http://localhost:3000/api/document',{name: this.newDocumentName}).then((response)=> {
        this.getAllDocuments();
      }).catch((msg) => {

      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
