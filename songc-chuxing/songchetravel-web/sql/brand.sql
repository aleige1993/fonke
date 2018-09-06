#namespace("brand")

	#sql("chexing")
		SELECT
	#if(vmid)
			DISTINCT
	#end
		v.vmid AS vmID,
	v.Name AS vmName,
	b.id AS bID,
	b.Name AS bName,
	 	#if(seriesId)
			DISTINCT
		#end s.SeriesID AS sID,
	s.Name AS sName
	FROM	@@VehicleModel@@ v,
			@@Series@@ s,
			@@Brand@@ b,
			@@Brand_Series@@ bs
	WHERE b.id = bs.BrandID AND bs.SeriesID = s.SeriesID AND s.SeriesID = v.series_id
		#if(brandId)
			and b.id=#p(brandId)
		#end
		#if(seriesId)
			and s.SeriesID = #p(seriesId)
		#end
		#if(vmid)
			and v.vmid = #p(vmid)
		#end
		#if(vmids)
			and and v.vmid in #p(vmids)
		#end
	#end
	
	#sql("querySeriesByBrandId")
		SELECT s.SeriesID sID,s.`Name` sName  FROM @@brand_series@@ bs LEFT JOIN @@series@@ s ON s.SeriesID = bs.SeriesID
		WHERE bs.BrandID=#p(brandId)
	#end
	
	#sql("queryVmBySid")
		SELECT vm.vmid vmID,vm.`name` vmName FROM @@vehiclemodel@@ vm LEFT JOIN @@series_vehiclemodel@@ svm ON svm.VehicleModelID=vm.vmid
		where svm.SeriesID=#p(seriesId)
	#end
	
	#sql("countByName")
		select count(*) count from @@brand@@ where name=#p(name)
	#end
#end