#namespace("role")
	
	#sql("list")
		select r.*, o.name orgname
			--from
		from @@role@@ r, @@org@@ o
		where 
		r.levelcode = o.levelcode
		and
		r.levelcode like #p(levelCode)
		#if(name)
			and r.name like #p(name)
		#end
		-- orderby
		order by roleid desc
		-- orderby
	#end
#end