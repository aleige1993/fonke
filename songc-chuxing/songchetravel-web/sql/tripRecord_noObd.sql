#namespace("triprecord_noObd")

	#sql("findLast")
		SELECT
			*
		FROM
			TripRecord_NoOBD
		WHERE
			VehicleID = #p(vehicleID)
		AND ISEFFECTIVE = 1
					-- orderby
		ORDER BY tripID desc
		-- orderby
		LIMIT 0,#p(c)
	#end
	
	#sql("findByTime")
		SELECT
			*
		FROM
			TripRecord_NoOBD
		WHERE
			VehicleID = #p(vehicleID)
		AND StartTime BETWEEN #p(startTime)
		AND #p(endTime)
		AND ISEFFECTIVE = 1

					-- orderby
		ORDER BY startTime
		-- orderby
	#end
	
#end