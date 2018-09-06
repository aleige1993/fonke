#namespace("peccancy")

	#sql("list")
		select p.*,c.phone,c.real_name,u.name as username
			--from
		from @@peccancy@@ p left join @@customer@@ c on p.customerid=c.customerid left join @@user_account@@ u on p.operationid=u.userid
		where p.levelcode like #p(levelcode)
		#if(platenumber)
			and p.platenumber like #p(platenumber)
		#end
		#if(customername)
			and c.real_name like #p(customername)
		#end
		#if(phone)
			and c.phone like #p(phone)
		#end
		#if(statue)
			and p.statue = #p(statue)
		#end
		#if(statue_0)
			and p.statue = 0
		#end
	#end
	
#end