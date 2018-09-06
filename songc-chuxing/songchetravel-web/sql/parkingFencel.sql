#namespace("parkingFence")
	
	#sql("list")
		select 
			*
		--from
		from 
			@@parking_fence@@
		where 
			1=1
		#if(name)
			and name like #p(name)
		#end
		#if(levelcode)
			and levelcode like CONCAT(#p(levelcode),"%")
		#end
		-- orderby
		order by id desc
		-- orderby
	#end
#end