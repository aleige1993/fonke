#namespace("fence")
	
	#sql("list")
		select 
			*
		--from
		from 
			fence
		where 
			levelcode like #p(levelcode)
		#if(name)
			and name like #p(name)
		#end
		-- orderby
		order by fenceid desc
		-- orderby
	#end
#end