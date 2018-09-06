#namespace("org")
	
	#sql("list")
		select *
			--from
		from @@org@@ 
		where levelcode like #p(levelcode)
		#if(name)
			and name like #p(name)
		#end
		-- orderby
		order by orgid desc
		-- orderby
	#end
	
	#sql("findByLevelCode")
		select * from @@org@@ where levelcode=#p(levelcode)
	#end
#end