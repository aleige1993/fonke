#namespace("customer")

	#sql("list")
		select c.customerid,c.phone,c.audit_status,c.reject_reason,c.pledge_paied,c.pledge_amount,c.register_date,
		c.on_blacklist,c.license_number,c.license_type,c.id_number,c.real_name,c.license_front_pic,c.license_rear_pic,
		c.id_front_pic,c.id_rear_pic,c.id_inhand_pic,c.memo,c.head_pic,c.sex,c.birthday,c.audit_time,u.name as username,
		c.audit_man
			--from
		from @@customer@@ c left join @@user_account@@ u on c.audit_man = u.userid
		where 1=1
		#if(keyWord)
			and (c.real_name like #p(keyWord) or c.phone like #p(keyWord) or c.id_number like #p(keyWord))
		#end
		#if(audit_status)
			and c.audit_status = #p(audit_status)
		#end
		#if(audit_status_0)
			and c.audit_status = 0
		#end
		-- 审核中的数据
		#if(audit_status_audit)
			and (c.audit_status = 0 or c.audit_status = 1 or c.audit_status = 3) 
		#end
		#if(on_blackList)
			and c.on_blackList = #p(on_blackList)
		#end
		#if(on_blackList_0)
			and c.on_blackList = 0
		#end
		#if(customer_status)
			and c.audit_status in(0,1,3)
		#end
		-- orderby
		order by c.audit_status desc 
		-- orderby
	#end
	
	#sql("couponDetail")
		select * 
		--from
		from @@coupon@@ c left join @@coupon_customer@@ cc on c.couponid=cc.couponid where
		cc.customerid=#p(customerid)
		-- orderby
		order by cc.create_time desc 
		-- orderby
	#end
#end