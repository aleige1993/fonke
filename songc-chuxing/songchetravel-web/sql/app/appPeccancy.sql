#namespace("appPeccancy")
	
	#sql("list")
		select 
			* 
			-- from
		from 
			@@peccancy@@ p
		where 
		p.customerid = #p(customerid)
		
		#if(statue_0)
			and
			p.statue = 0
		#end
		#if(statue)
			and
			p.statue = #p(statue)
		#end
	#end
	
#end