#namespace("urgentOrder")

	#sql("list")
		select uo.*,uo.update_time as urgent_order_time,uo.status as urgentStatus, o.*,c.real_name,c.phone,org.name as orgname
			--from
		from @@urgent_order@@ uo
		left join @@order@@ o on o.orderid=uo.orderid 
		left join @@customer@@ c on uo.customerid=c.customerid
		left join @@org@@ org on o.levelcode=org.levelcode
		where 
			uo.levelcode like #p(levelcode)
		#if(phone)
			and c.phone like #p(phone)
		#end
		#if(status_0)
			and uo.status =0
		#end
		#if(status_1)
			and uo.status =#p(status_1)
		#end
		#if(start_levelcode)
			and uo.start_levelcode like CONCAT(#p(start_levelcode),"%")
		#end
		-- orderby
		order by uo.urgent_id desc
		-- orderby
	#end
	
#end