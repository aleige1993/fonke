#namespace("vehicle")

	#sql("listAvaiCarsByCoordinate")
		SELECT
			v.*,
			ROUND(
        6378.138 * 2 * ASIN(
            SQRT(
                POW(
                    SIN(
                        (
                            #(lat) * PI() / 180 - v.lat * PI() / 180) / 2 ),2
                ) + COS(#(lat) * PI() / 180) * COS(v.lat * PI() / 180) * POW(
                    SIN(
                        (
                            #(lng) * PI() / 180 - v.lng * PI() / 180
                        ) / 2
                    ),
                    2
                )
            )
        ) * 1000
    ) AS distance,
		 vm.electric
		 -- from
		FROM
			vehicle v,
			@@vehiclemodel@@ vm
		WHERE
			v.vmid = vm.vmid
		AND published = 1
		AND under_maintain = 0
		AND available = 1
		AND current_order = 0
		AND lng IS NOT NULL
		AND lng IS NOT NULL
		AND v.levelcode LIKE CONCAT(#p(levelcode), '%')
		-- orderby
		ORDER BY
			distance ASC
		-- orderby
		
		limit #p(startRow),#p(endRow)
	#end
	
	#sql("list")
		select 
			v.vehicleid,
			v.vmid,
			vin,
		  	v.platenumber,
		  	v.oil_type,
		  	color,
		  	available,
		 	buy_date,
		 	annual_date,
		 	insurance_date,
		  	v.levelcode,
		  	v.published,
		  	v.current_order,
		  	v.otu_id,
		  	v.otu_imei,
		  	v.ble_mac,
		  	under_maintain,
		
		  	o.name orgname,
		  	
		  	vm.brandname,
		  	vm.serialname
		  	
		  	,FORMAT(current_mile,2) current_mile
		  	,FORMAT(voltage,2) voltage
		  	,FORMAT(left_oil,2) left_oil
		  	,FORMAT(left_oil_percent,2) left_oil_percent
		  	
			--from
		from 
			vehicle v
		inner join @@vehiclemodel@@ vm on v.vmid = vm.vmid
		left join @@org@@ o on v.levelcode = o.levelcode
		left join @@order@@ od on od.orderid = v.current_order
		where 
		v.levelcode like #p(levelCode)
		#if(vin)
			and v.vin like #p(vin)
		#end
		#if(platenumber)
			and v.platenumber like #p(platenumber)
		#end
		#if(available==1)
		 AND  v.available=1  AND v.published=1  AND under_maintain=0 AND (od.status is NULL OR od.status=0 OR od.status>=3)
		#end
		#if(available==0)
        AND   NOT(v.available=1  AND v.published=1  AND under_maintain=0 AND (od.status is NULL OR od.status=0 OR od.status>=3))
		#end
		#if(otu_imei)
		AND otu_imei like #p(otu_imei)
		#end
		
		#if(oill)
		AND left_oil <= #p(oill)
		#end
		#if(oilp)
		AND left_oil_percent <= #p(oilp)
		#end
		#if(vimid)
		AND v.vmid =  #p(vimid)
		#end
		#if(power)
		AND voltage <= #p(power)
		#end
		
		
        -- orderby
		order by vehicleid desc
		-- orderby
	#end
	
	
		#sql("all")
		select 
			v.vehicleid,
			v.vmid,
			vin,
		  	v.platenumber,
		  	v.oil_type,
		  	color,
		  	available,
		 	buy_date,
		 	annual_date,
		 	insurance_date,
		  	v.levelcode,
		  	v.published,
		  	v.current_order,
		  	v.otu_id,
		  	v.otu_imei,
		  	v.ble_mac,
		  	under_maintain,
		
		  	o.name orgname,
		  	
		  	vm.brandname,
		  	vm.serialname
		  	
		  	,FORMAT(current_mile,2) current_mile
		  	,FORMAT(voltage,2) voltage
		  	,FORMAT(left_oil,2) left_oil
		  	,FORMAT(left_oil_percent,2) left_oil_percent
		  	
		from 
			vehicle v
		inner join @@vehiclemodel@@ vm on v.vmid = vm.vmid
		left join @@org@@ o on v.levelcode = o.levelcode
		left join @@order@@ od on od.orderid = v.current_order
		where 
		v.levelcode like #p(levelCode)
		#if(vin)
			and v.vin like #p(vin)
		#end
		#if(platenumber)
			and v.platenumber like #p(platenumber)
		#end
		#if(available==1)
		 AND  v.available=1  AND v.published=1  AND under_maintain=0 AND (od.status is NULL OR od.status=0 OR od.status>=3)
		#end
		#if(available==0)
        AND   NOT(v.available=1  AND v.published=1  AND under_maintain=0 AND (od.status is NULL OR od.status=0 OR od.status>=3))
		#end
		#if(otu_imei)
		AND otu_imei like CONCAT(#p(otu_imei),'%')
		#end
		
		#if(oill)
		AND left_oil <= #p(oill)
		#end
		#if(oilp)
		AND left_oil_percent <= #p(oilp)
		#end
		#if(vimid)
		AND v.vmid =  #p(vimid)
		#end
		#if(power)
		AND voltage <= #p(power)
		#end
		
		
        -- orderby
		order by vehicleid desc
		-- orderby
	#end
	
	#sql("countByVin")
		select count(*) count from vehicle where vin=#p(vin)
	#end
	
	#sql("allVehicleModel")
		select vmid,name brandname from @@vehiclemodel@@
	#end

	
#end