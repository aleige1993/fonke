#namespace("vehicleModel")
	
	#sql("list")
		select 
			vm.*,
			--f.mile_price,
			f.universal_price time_price
			--from
		from 
			@@vehiclemodel@@ vm
		left join @@vehiclemodel_attr@@ vma
			on vm.vmid = vma.vmid
		left join @@fee@@ f
			on vma.feeid = f.feeid
		where 
			vma.levelcode = #p(levelcode)
		#if(type && type == 1)
			and brandname like #p(bname)
		#end
		#if(type && type == 2)
			and serialname like #p(bname)
		#end
		#if(name)
			and name like #p(name)
		#end
		-- orderby
		order by vmid desc
		-- orderby
	#end
	
	#sql("newList")
		select 
			vm.*
			
			--from
		from 
			@@vehiclemodel@@ vm
		where 
			1=1
		#if(type && type == 1)
			and vm.brandname like #p(bname)
		#end
		#if(type && type == 2)
			and vm.serialname like #p(bname)
		#end
		#if(name)
			and vm.name like #p(name)
		#end
		-- orderby
		order by vmid desc
		-- orderby
	#end
#end