<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll';//滑屏插件
	export default{
		name : 'Srcoll',
		props:{
			handleToScroll : {
				type : Function,
				default : function (){}
			},
			handleTouchEnd : {
				type : Function,
				default : function (){}
			}
		},
		mounted() {
			var scroll = new BScroll(this.$refs.wrapper , {
				tap:true,//开启better-scroll的点击事件
				probeType: 1 ,//触发scroll事件
			});
			this.scroll = scroll;
			scroll.on('scroll',(pos)=>{
				this.handleToScroll(pos);
			});
			scroll.on('touchEnd',(pos)=>{
				this.handleTouchEnd(pos);
			});
		},
		methods:{
			toScrollTop(y){
				this.scroll.scrollTo(0,y);
			}
		}
	}
</script>

<style scoped>
	.wrapper{ height: 100%;}
</style>
