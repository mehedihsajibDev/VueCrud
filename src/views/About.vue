<template>
  <div class="about" >
   <div class="container-fluid" >
   <div class="row mt-5">
   <div class="col-6 col-md-2 col-xs-6"></div>
   <div class="col-6  col-md-8 col-xs-6 p-5 mt-5"  style="background:#fff" >
   <form @submit.prevent="add()">
  <div class="row">
  <div class="col-4 col-md-3 col-xs-6">  <div class="form-group">
            
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
                @change="changeImage($event)"
                name="image"
              />
              <img
                :src="OurPhoto()"
                 name="image"
                class="img-responsive"
                height="70"
                width="90"
                style="margin-left: -90px; margin-top:10px;"
              />
              
              </div>
  </div>
  <div class="col-4 col-md-3 col-xs-6"> <div class="mb-3">
      
      <input type="text" id="disabledTextInput" class="form-control" v-model="productName" placeholder="Product Name">
    </div></div>
  <div class="col-4 col-md-3 col-xs-6"><div class="mb-3">
      
      <input type="text" id="disabledTextInput" class="form-control" v-model="details" placeholder="Details"/>
    </div></div>
  <div class="col-4 col-md-3 col-xs-6"><button type="submit" class="btn btn-warning">Add</button></div>
  </div>
  
</form>
   </div>
   <div class="col-6 col-md-2 col-xs-6"></div>
   </div>
   <div class="row">
   
       <div class="col-6 col-md-2 col-xs-6"></div>
       <div class="col-6 col-md-8 col-xs-6" style="background:#fff">
       <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Details</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="view,index in views" :key="view.id">
      <th scope="row" >{{index+1}}</th>
      <td><img  :src="'http://127.0.0.1:8000/productImage/'+view.image" width="100%" height="200px"/></td>
      <td>{{view.productName}}</td>
      <td>{{view.details}}</td>
      <td><button class="btn btn-danger" @click.prevent="dt(view.id)"><i class="fas fa-trash-alt"></i></button>
     
        <router-link :to="`/productEdit${view.id}`"  class="btn btn-primary" type="button"
                  ><i class="fa fa-edit"></i></router-link></td>
    </tr>
   
   
  </tbody>
</table>
       
       </div>
       <div class="col-6 col-md-2 col-xs-6"></div>
   </div>
   </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
     
        details: "",
        productName: "",
       
        image: "",
        
        views:''
      
   
    };
  },
  mounted() {
    this.view();
    
  },
  methods: {
     playSound() {
      var audioFile = new Audio(
        "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3"
      );
      audioFile.play();
    },
      view(){
               axios.get('http://127.0.0.1:8000/api/productVue').then(res=>{
                 this.views=res.data.view;
               });
           },
        

    
    add() {
      axios.post('http://127.0.0.1:8000/api/productVue',{productName:this.productName,details:this.details,image:this.image}).then(res=>{     
         this.$router.push('/');
      res.data
         this.playSound();
      });
    },
        dt(id){
             alert('are you sure delete this item??')
              axios.delete('http://127.0.0.1:8000/api/productVue/'+id).then(res=>{
                  
               this.view();
                
               res.data
              })
              
           },
   
    
  
    OurPhoto(){
       if(this.image!== null){
         let photo1 = this.image;
         if (photo1.length >100 ){
              return this.image;
         }
         else{
           return `productImage/${this.image}`
         }
         }
       },
       changeImage(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
        console.log(event.target.result);
      };
      reader.readAsDataURL(file);

    },
    
  },
};
</script>
