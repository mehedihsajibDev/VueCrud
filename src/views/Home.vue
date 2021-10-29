<template>
  <div >
   <div class="container">
<hr>
<div class="row">
<div class="col-md-3" v-for="view in views" :key="view.id">
	<figure class="card card-product">
		<div class="img-wrap"> 
			<img  :src="'http://127.0.0.1:8000/productImage/'+view.image" width="100%" height="200px" />
		
		</div>
		<figcaption class="info-wrap">
			<h6 class="title text-dots">{{view.productName}}</h6>
			<div class="action-wrap">
				<a href="#" class="btn btn-primary btn-sm float-right"  data-bs-toggle="modal" :data-bs-target="'#p'+view.id"> Details </a>
        <!-- Modal -->
<div class="modal fade" :id="'p'+view.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
	<img  :src="'http://127.0.0.1:8000/productImage/'+view.image" width="100%" height="200px"/>
		
        {{ view.details }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
				<div class="price-wrap h5">
				
				</div> <!-- price-wrap.// -->
			</div> <!-- action-wrap -->
		</figcaption>
	</figure> <!-- card // -->
</div> <!-- col // -->



</div> <!-- row.// -->

   </div>

   
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
export default {
  data () {
    return {
    
        views:''
    }
  },
    mounted () {
   this.view();
  },
methods:{
   view(){
               axios.get('http://127.0.0.1:8000/api/productVue').then(res=>{
                 this.views=res.data.view;
               });
           },
        
}
  
}
</script>
