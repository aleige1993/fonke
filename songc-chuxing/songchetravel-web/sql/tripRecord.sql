#namespace("TripRecord")

	#sql("findLast")
		SELECT
			* 
		FROM
			TripRecord
		WHERE
			VehicleID = #p(vehicleID)
		AND ISEFFECTIVE = 1
		AND (
			mileage >= 1000
			OR (fuelCons > 0 AND mileage > 10)
		)
					-- orderby
		ORDER BY tripID desc
		-- orderby
		LIMIT 0, #p(c)
	#end
	
	#sql("findByTime")
		SELECT
			*
		FROM
			TripRecord
		WHERE
			VehicleID = #p(vehicleID)
		AND StartTime BETWEEN #p(startTime)
		AND #p(endTime)
		AND ISEFFECTIVE = 1
		AND (
			mileage >= 1000
			OR (fuelCons > 0 AND mileage > 10)
		)
					-- orderby
		ORDER BY startTime
		-- orderby
	#end
	
#end