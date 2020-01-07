<template>
	 <div>
		<Loading v-if="isLoading" />
		<Header title="我的喵喵"></Header>
		<Login></Login>
		<!-- <Pagination :purl="url" :pageSize="pageSize"></Pagination> 
	    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
	       <p>刷新次数: {{ count }}</p> 
	   <<div class="movie" v-for="(item,index) in movie " :key="index">
		  <div class="movie-hide">
		   <div class="movie-img">
			   <a :href=" item.links | delete('') ">
			    <img :src="item.zimg" :onerror="defaultImg" style="width: 6rem;height: 6.5rem;" /> 
			   </a>
		   </div>
		   </div>
		   <div class="movie-detail">
			 <a :href=" item.links | delete('') ">
			   <h3>{{item.name}}</h3>
			   <h4>{{item.id}}</h4>
			    <p>{{item.links | delete("")}}</p>
			</a>
		   </div>   
	   </div> -->
	   
	  <!-- <div id="wrapper" ref="wrapper">
		   
	   </div> -->
	   
	   </van-pull-refresh>
	 <TabBar></TabBar> 
	</div> 
	
</template>

<script>
	import Header from '@/components/Header/index.vue'
	import TabBar from '@/components/TabBar/index.vue'
	import Login from '@/components/Login/index.vue'
	import Pagination from '@/components/Pagination/index.vue'
	
	
	import Chimee from 'chimee';
	import flv from 'chimee-kernel-flv';
	import hls from 'chimee-kernel-hls';
	
	export default{
	  name:'Mine',
	  components:{
	  		  Header,
	  		  TabBar,
			  Login,
			  Pagination
	    }, 
	  data() {
	        return {
	            pageSize: 4, // 每页显示数量
				url:'/api/cityList',
				movie:[],
				isLoading1: true,
				count: 0,
				isLoading: false,
				defaultImg: 'this.src="'+require('../../assets/img/fail.jpg')+'"',
				player: null,
				message: 'hello axios',
				source: null
				
	        };
	    },
	  methods: {
	    onRefresh() { 
	      setTimeout(() => {
	        this.$toast('刷新成功');
	        this.isLoading = false;
			this.count++;
		    this.postData(this.count); 
	      }, 500);
		},
		
		postData(count){
			
			 var postdata  = {
				 page: count,//传过去的值
				 num: 2//每页显示的条数
			 }
			this.axios({
				 method:'post',
				 timeout: 500,
				 url:'http://180.76.117.134:8002/api/list', //'http://180.76.117.134:8003/api/list',
				 data: this.qs.stringify(postdata),
				
				}).then((res)=>{
					var err_code = res.data.err_code;
					if(err_code == 1){
						 this.isLoading1 = false;
						 this.movie = res.data.data;
						 console.log(res.data.data[0].title);
					}else{
						
					}	
				}).catch((err)=>{
					this.isLoading1 = false;
					console.log("加载失败")
				}) 
		},
		
	  }, 
	   mounted() {
		this.postData(0);
		console.log(this.$refs.wrapper)
		/* let options = {
		      controls: true, // 是否显示底部控制栏
		      preload: "auto", // 加载<video>标签后是否加载视频
		      autoplay: "muted", // 静音播放
		      playbackRates: [0.5, 1, 1.5, 2],// 倍速播放
		      width: "640",
		      height: "247",
		      controlBar: {
		        // 自定义按钮的位置
		        children: [
		          {
		            name: "playToggle"
		          },
		          {
		            name: "progressControl"
		          },
		          {
		            name: "currentTimeDisplay"
		          },
		          {
		            name: "timeDivider"
		          },
		          {
		            name: "durationDisplay"
		          },
		
		          {
		            name: "volumePanel", // 音量调整方式横线条变为竖线条
		            inline: false
		          },
		          {
		            name: "pictureInPictureToggle" //画中画播放模式
		          },
		          {
		            name: "fullscreenToggle"
		          }
		        ]
		      }
		    };
		    this.player = this.$video(this.$refs.videoPlayer, options,function onPlayerReady() {
		      console.log('onPlayerReady', this);
		    });
		  },
		  beforeDestroy() {
		    if (this.player) {
		      this.player.dispose()
		    }*/
			
			
			const chimee = new Chimee({
			  wrapper: this.$refs.wrapper,
			  src: "../../assets/img/demo.mp4",
			  controls: true,
			  autoplay: true,
			  kernels: {
			    flv,
			    hls
			  }
			});
			chimee.play();
		  }, 
		
	}
</script>

<style scoped>
	.movie{
		
		width: 95%;
		height: 8rem;
		border-bottom: #CCCCCC solid .01rem;
		margin-left: .5rem;
	  }
	  .movie-hide{
		  width: 30%;
		  height: 6.5rem;
		  overflow: hidden;
		  display: inline-block;
	  }
	 .movie-img{
		 width: 30%;
		 height: 6.5rem;
		/* border: #000000 solid 1px; */
		 float: left;
		 
		 margin-top: .5rem;
		 transition: 1s;
		 
	 }
	 .movie-img:hover{
		transform: scale(1.1);
	 }
	 .movie-detail{
		 width: 63%;
		 height: 6rem;
		/* border: #007AFF solid 1px; */
		 float: right;
		 display: inline-block;
		 margin-top: 1rem;
		 margin-right: .5rem;
	 }
	  .video-js {
	    width: 90%;
	    height: 430px;
		margin: 0 auto;
	  }
	a{
		text-decoration: none;
		color: #000000;
	}
</style>
