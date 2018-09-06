#namespace("refund")

	#sql("list")
		select r.*,u.name as username,c.real_name,c.phone
			--from
		from @@refund@@ r left join @@user_account@@ u on r.operationid=u.userid left join @@customer@@ c on r.customerid=c.customerid
		where 1=1
		#if(toplevelcode)
			and (r.levelcode is null or r.levelcode like #p(toplevelcode))
		#end
		#if(levelcode)
			and r.levelcode like #p(levelcode)
		#end
		#if(real_name)
			and c.real_name like #p(real_name)
		#end
		#if(phone)
			and c.phone like #p(phone)
		#end
		#if(statue_0)
			and r.statue = 0 
		#end
		#if(statue)
			and r.statue = #p(statue) 
		#end
		#if(begin_time)
			and r.apply_time >= #p(begin_time)   
		#end
		#if(end_time)
			and r.apply_time <= #p(end_time)   
		#end
		-- orderby
		order by r.refundid desc 
		-- orderby
	#end
	
#end