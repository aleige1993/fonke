#namespace("monitor")

	#sql("findCars")
		SELECT
			v.*,
			
			vm.name vmname,
			vm.brandname,
			vm.serialname,
			
			o.name orgname
			--from
		FROM
			Vehicle v
		INNER JOIN @@vehiclemodel@@ vm ON v.vmid = vm.vmid
		INNER JOIN @@org@@ o ON v.levelcode = o.levelcode
		WHERE
			v.levelcode like #p(levelCode)
			#if(isContainsChild == '0')
				and v.LevelCode = #p(levelCode)
			#end
			#if(isContainsChild == '1')
				and ( v.LevelCode = #p(levelCode) or v.LevelCode like #p(levelCode)+'/%' )
			#end
			#if(vin)
				and v.vin like #p(vin)
			#end
			#if(mileage)
				and v.current_mile <= #p(mileage)
			#end
			#if(platenumber)
				and v.platenumber like CONCAT('%',#p(platenumber),'%')
			#end
			
			#if(vehicleIds)
				and v.VehicleID in(#(vehicleIds))
			#end
			
			#if(online)
				and v.online = #p(online)
			#end
			
	#end
	
	
#end