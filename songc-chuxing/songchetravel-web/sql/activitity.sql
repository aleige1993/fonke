#namespace("activitity")

	#sql("list")
		select a.*,u.name as username
			--from
		from @@activitity@@ a left join @@user_account@@ u on a.operationid=u.userid
		where a.levelcode like #p(levelcode)
		#if(name)
			and a.name like #p(name)
		#end
		#if(statue_0)
			and a.begin_time >= #p(statue_0)   
		#end
		#if(statue_1)
			and a.begin_time < #p(statue_1)   and a.end_time > #p(statue_1)   
		#end
		#if(statue_2)
			and a.end_time < #p(statue_2)   
		#end
		#if(begin_time)
			and a.begin_time >= #p(begin_time)   
		#end
		#if(end_time)
			and a.end_time <= #p(end_time)   
		#end
		
	#end
	
#end