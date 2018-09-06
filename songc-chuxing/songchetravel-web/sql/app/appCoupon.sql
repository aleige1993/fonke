#namespace("appCoupon")
	
	#sql("myTickets")
		select 
			*
			-- from
		from 
			@@coupon_customer@@ cc left join 
			@@coupon@@ c on cc.couponid=c.couponid
		where 
		cc.customerid=#p(customerid) and cc.statue=0
		
		#if(levelcode)
			and
			c.levelcode = #p(levelcode)
		#end
		#if(status_1)
			and ((c.begin_time < #p(status_1)   and c.end_time > #p(status_1)  ) or (c.begin_time > #p(status_1)  ))
		#end
		#if(status_2)
			and c.end_time < #p(status_2)   
		#end
	#end
	
	#sql("myTicketCount")
		select 
			count(coupon_customer_id) as c
			-- from
		from 
			@@coupon_customer@@ cc left join 
			@@coupon@@ c on cc.couponid=c.couponid
		where 
		cc.customerid=#p(customerid) and cc.statue=0
		and ((c.begin_time < now() and c.end_time > now()) or (c.begin_time > now()))
	#end
	
		#sql("getMyTicket")
		select 
		*
			-- from
		from 
			@@coupon_customer@@ cc left join 
			@@coupon@@ c on cc.couponid=c.couponid
		where 
		cc.customerid=#p(customerid) and cc.statue=0
		and ((c.begin_time < now() and c.end_time > now()) or (c.begin_time > now()))
	#end

	#end