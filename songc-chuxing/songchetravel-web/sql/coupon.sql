#namespace("coupon")

	#sql("list")
		select c.*,u.name as username
			--from
		from @@coupon@@ c left join @@user_account@@ u on c.operationid=u.userid
		where c.levelcode like #p(levelcode)
		#if(name)
			and c.name like #p(name)
		#end
		#if(use_condition)
			and c.use_condition = #p(use_condition)
		#end
		#if(promotion_mode)
			and c.promotion_mode = #p(promotion_mode)
		#end
		#if(promotion_mode_0)
			and c.promotion_mode = 0
		#end
		#if(begin_time)
			and c.begin_time >= #p(begin_time)   
		#end
		#if(end_time)
			and c.end_time <= #p(end_time)   
		#end
		
	#end
	
	#sql("getCouponByMode")
		select * 
			--from
		from @@coupon@@ c 
		where ((c.begin_time < now() and c.end_time > now()) or (c.begin_time > now())) and c.levelcode=#p(levelcode)
		#if(promotion_mode)
			and c.promotion_mode = #p(promotion_mode)
		#end
		#if(promotion_mode_0)
			and c.promotion_mode = 0
		#end
		#if(extension_condition)
			and c.extension_condition = #p(extension_condition)
		#end
	#end
	
#end