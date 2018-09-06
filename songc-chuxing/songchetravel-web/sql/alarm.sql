#namespace("alarm")

	#sql("historyList")
		select a.*,v.otu_imei,vm.name as vmname,o.name as orgname
			-- from
		from @@alarm@@ a left join vehicle v on a.vehicleid=v.vehicleid left join @@org@@ o on v.levelcode=o.levelcode
		left join @@vehiclemodel@@ vm on v.vmid=vm.vmid
		where o.levelcode like #p(levelcode)
		#if(vin)
			and a.vin like #p(vin)
		#end
		#if(platenumber)
			and a.platenumber like #p(platenumber)
		#end
		#if(queryLevelCode)
			and o.levelcode like #p(queryLevelCode)
		#end
	#end
	
	#sql("vehicleList")
		select status.*,v.otu_imei,vm.name as vmname,o.name as orgname
			-- from
		from @@alarm_status@@ status left join vehicle v on status.vehicleid=v.vehicleid left join @@org@@ o on v.levelcode=o.levelcode
		left join @@vehiclemodel@@ vm on v.vmid=vm.vmid
		where o.levelcode like #p(levelcode)
		#if(vin)
			and v.vin like #p(vin)
		#end
		#if(platenumber)
			and v.platenumber like #p(platenumber)
		#end
		#if(queryLevelCode)
			and o.levelcode like #p(queryLevelCode)
		#end
	#end
	
#end