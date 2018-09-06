#namespace("appOrder")
	
	#sql("list")
		select 
			o.*
		from 
			@@order@@ o
		where 
		1=1
		#if(maxOrderID > 0)
			and
			o.orderid < #p(maxOrderID)
		#end
		#if(invoice_statue)
			and
			o.invoice_statue = #p(invoice_statue)
		#end
		#if(invoice_statue_0)
			and
			o.invoice_statue = 0
		#end
			and
		customerid = #p(customerID) and status=4
		-- orderby
		order by orderid desc
		-- orderby
		limit #p(size)
	#end
	
	#sql("detailByCustomerID")
		select 
			o.*,
			vm.name vmname
			-- from
		from 
			@@order@@ o, 
			vehicle v,
			@@vehiclemodel@@ vm
		where 
			o.vehicleid = v.vehicleid
		and
			v.vmid = vm.vmid
		and
			o.customerid = #p(customerid)
		-- orderby
		order by orderid desc
		-- orderby
	#end
	
		#sql("currentOrderByCustomerId")
		select 
			o.*,
			vm.name vmname
			-- from
		from 
			@@order_current@@ o, 
			vehicle v,
			@@vehiclemodel@@ vm
		where 
			o.vehicleid = v.vehicleid
		and
			v.vmid = vm.vmid
		and
			o.customerid = #p(customerid)
		and 
			o.status in(1,2,3)
		-- orderby
		order by orderid desc
		-- orderby
	#end
		#sql("findByID")
		select 
			o.*,
			vm.name vmname
			-- from
		from 
			@@order@@ o, 
			vehicle v,
			@@vehiclemodel@@ vm
		where 
			o.vehicleid = v.vehicleid
		and
			v.vmid = vm.vmid
		and
			o.orderid = #p(orderid)
		-- orderby
		order by orderid desc
		-- orderby
	#end
	
	#sql("findFineshByID")
		select 
			o.*,
			vm.name vmname
			-- from
		from 
			@@order@@ o, 
			vehicle v,
			@@vehiclemodel@@ vm
		where 
		    o.status=4
		and
			o.vehicleid = v.vehicleid
		and
			v.vmid = vm.vmid
		and
			o.orderid = #p(orderid)
		-- orderby
		order by orderid desc
		-- orderby
	#end
	
	#sql("getActivitityForOrder")
	SELECT * from @@activitity@@
	WHERE  
	begin_time<=#p(order_time)    
	and 
	end_time>=#p(order_time)   	
	#end
	
#end