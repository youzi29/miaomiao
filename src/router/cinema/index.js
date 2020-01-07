export default{
	path:'/cinema',
	component:()=>import('@/views/Cinema'),
	children:[
		{
			path:'cilist',
			component:()=>import('@/components/CiList')
		},
		{
			path:'cimark',
			component:()=>import('@/components/CiMark')
		},
		{
			path:'cifeature',
			component:()=>import('@/components/CiFeature')
		},
		{
			path:'/cinema',
			redirect:'/cinema/cilist'
		}
	]
	
}