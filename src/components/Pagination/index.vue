<template>
	<div>
	<div class="content">
		  <div class="city" v-for="(item , index) in currentPageData" >{{item.nm}}</div>
	</div>
	 <footer>
	   <button @click="prevPage()">
	       上一页
	   </button>
	   <span>第{{currentPage}}页/共{{totalPage}}页</span>
	   <button @click="nextPage()">
	       下一页
	   </button>
	 </footer>
	 </div>
</template>

<script>
	export default{
		props:{
			//接收父组件传过来的地址
			purl:{
				type: String,
				required: true
			},
			//需要的分页数
			pageSize:{
				type: Number,
				default:6
			}
		},
		data() {
		       return {
		           productList:[] ,//所有数据
		           totalPage: 1, // 统共页数，默认为1
		           currentPage: 1, //当前页数 ，默认为1
		           currentPageData: [] ,//当前页显示内容 
		       };
		   },
		mounted() {
		   this.axios.get(this.purl).then((res)=>{
			var msg = res.data.msg;
			if( msg == 'ok'){
				this.productList = res.data.data.cities;
				var num = this.productList.length;   //分页的总长度
				// 计算一共有几页
				this.totalPage = Math.ceil(this.productList.length / this.pageSize);
				// 计算得0时设置为1
				this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
				this.getCurrentPageData();
			}
		   })
		},
	methods: {
	    // 设置当前页面数据，对数组操作的截取规则为[0~9],[10~20]...,
	    // 当currentPage为1时，我们显示(0*pageSize+1)-1*pageSize，当currentPage为2时，我们显示(1*pageSize+1)-2*pageSize...
	    getCurrentPageData() {
	        let begin = (this.currentPage - 1) * this.pageSize;
	        let end = this.currentPage * this.pageSize;
	        this.currentPageData = this.productList.slice(
	            begin,
	             end
	        );
	    },
	    //上一页
	    prevPage() {
	        
	        if (this.currentPage == 1) {
	            return false;
	        } else {
	            this.currentPage--;
	            this.getCurrentPageData();
	        }
	    },
	    // 下一页
	    nextPage() {
	        if (this.currentPage == this.totalPage) {
	            return false;
	        } else {
	            this.currentPage++;
	            this.getCurrentPageData();
	        }
	    }
	}		
	}
</script>

<style scoped>
	.content{
		width: 100%;
	    display: flex; 
		flex-wrap: wrap;
		flex-basis: 80%;
		text-align: center;
		
	}
	.city{
		width: 9.95rem;
		height: 1.5rem;
		flex: auto;
		border: darkgreen solid .01rem;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		margin: .4rem;
	}
	footer{
		text-align: center;
		
	}
	button{
		background: darkgreen;
		border: none;
		border-radius: 0.45rem;
		width: 4rem;
		height: 1.2rem;
		color: white;
		margin: .5rem;
	}
	span{
		font-size: 1rem
	}
</style>
