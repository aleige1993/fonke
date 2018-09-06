#namespace("representation")

	#sql("list")
		select c.real_name,c.phone,r.*,u.username,u.name
			--from
		from @@representation@@ r left join @@customer@@ c on r.customerid=c.customerid left join @@user_account@@ u on r.operationid=u.userid
		where 1=1
		#if(keyWord)
			and (c.real_name like #p(keyWord) or c.phone like #p(keyWord))
		#end
		#if(theStatus)
			and r.status = #p(theStatus)
		#end
		#if(queryStatus)
			and r.status = 0
		#end
		-- orderby
		order by r.representationid desc 
		-- orderby
	#end
	#sql("detail")
		select * 
			--from 
		from @@order@@ o left join @@fee@@ f on o.feeid=f.feeid 
		where o.orderid=#p(orderid)
	#end
#end