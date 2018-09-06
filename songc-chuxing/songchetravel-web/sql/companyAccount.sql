#namespace("companyaccount")
	
	#sql("list")
		select *
			--from
		from @@company_account@@
		where 
		 status=#p(status)
		#if(name)
		 and name like #p(name)
		#end
		#if(phone)
		 and phone like #p(phone)
		#end
		#if(receive_name)
		 and receive_name like #p(receive_name)
		#end
		-- orderby
		order by id desc
		-- orderby
	#end
#end