<template>
  <div class="about" >
   <div class="container-fluid" >
   <div class="row mt-5">
   <div class="col-6 col-md-2 col-xs-6"></div>
   <div class="col-6  col-md-8 col-xs-6 p-5 mt-5"  style="background:#fff" >
   <form @submit.prevent="update()">
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
  <div class="col-4 col-md-3 col-xs-6"><button type="submit" class="btn btn-warning">Update</button></div>
  </div>
  
</form>
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
    this.OurPhoto();
    // this.editImage();
  },
  methods: {
     playSound() {
      var audioFile = new Audio(
        "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3"
      );
      audioFile.play();
    },
      view(){
                  axios.get(`http://127.0.0.1:8000/api/productVue/${this.$route.params.id}`).then((res) => {
        this.image=res.data.edit.image
        this.productName=res.data.edit.productName
        this.details=res.data.edit.details
      });
           },
        

    //  editImage() {
    //   axios.get(`catImage/${this.$route.params.id}`).then((res) => {
    //     this.form.fill(res.data);
    //   });
    // },
    update() {

        
      axios.put('http://127.0.0.1:8000/api/productVue/'+this.$route.params.id,{productName:this.productName,details:this.details,image:this.image}).then(res=>{     
         this.$router.push('/about');
      res.data
         this.playSound();
      });
    },
    // add() {
    //   this.form
    //     .post("catImage", {
    //       method: "post",
         
    //     })
    //     .then((response) => {
    //       this.form.reset();
       
    //      response.data
    //       this.playSound();
    //     })
    //     .catch((err) => console.log(err));
    // },
    
  
    OurPhoto(){
       if(this.image!== null){
         let photo1 = this.image;
         if (photo1.length >100 ){
              return this.image;
         }
         else{
           return `http://127.0.0.1:8000/productImage/${this.image}`
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
