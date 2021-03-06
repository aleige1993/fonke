#namespace("statistic")

	#sql("incomeByStore")
		select o.*,c.real_name,c.phone,org.name as orgname
			--from
		from @@order@@ o left join @@customer@@ c on o.customerid=c.customerid left join @@org@@ org on o.levelcode=org.levelcode
		where o.levelcode like #p(levelcode)
		#if(queryLevelcode)
			and o.levelcode like #p(queryLevelcode)
		#end
		#if(platenumber)
			and o.platenumber like #p(platenumber)
		#end
		#if(customername)
			and c.real_name like #p(customername)
		#end
		#if(phone)
			and c.phone like #p(phone)
		#end
		#if(begin_fetch_time)
			and o.fetch_time >=  #p(begin_fetch_time)   
		#end
		#if(end_fetch_time)
			and o.fetch_time <= #p(end_fetch_time)   
		#end
		#if(begin_return_time)
			and o.return_time >= #p(begin_return_time)   
		#end
		#if(end_return_time)
			and o.return_time <= #p(end_return_time)   
		#end
		#if(min_price_total)
			and o.price_pay >= #p(min_price_total)
		#end
		#if(max_price_total)
			and o.price_pay <= #p(max_price_total)
		#end
		#if(pay_status)
			and o.pay_status = #p(pay_status)
		#end
		#if(status)
			and o.status = #p(status)
		#end
		#if(customerid)
			and o.customerid = #p(customerid)
		#end
		-- orderby
		order by o.orderid desc
		-- orderby
	#end
	#sql("detail")
		select o.*,f.name,f.universal_price 
			--from 
		from @@order@@ o left join @@fee@@ f on o.feeid=f.feeid 
		where o.orderid=#p(orderid)
	#end
	

	
#end