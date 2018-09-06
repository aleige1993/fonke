#namespace("series")
	
	#sql("countByName")
		select count(*) count from @@series@@ where name=#p(name)
	#end
#end