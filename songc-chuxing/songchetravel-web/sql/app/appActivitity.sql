#namespace("appActivitity")
	
	#sql("list")
		select 
			* 
			-- from
		from 
			@@activitity@@ a
		where 
		a.end_time >=  #p(end_time)   
		-- orderby
		order by activitityid desc
		-- orderby
	#end
	
	#sql("activitityCoupon")
		select 
			* 
			-- from
		from 
			@@activitity_coupon@@ ac left join @@coupon@@ c on ac.couponid=c.couponid 
		where 
		ac.activitityid =  #p(activitityid)
	#end
	
#end