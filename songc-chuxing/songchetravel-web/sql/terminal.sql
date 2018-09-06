#namespace("terminal")

	#sql("list")
		select
			*
			--from
		FROM terminal
		WHERE  levelcode like CONCAT(#p(levelcode),'%')
			
			#if(imei)
				and imei like CONCAT('%',#p(imei),'%') 
			#end
			#if(barCode)
				and barCode like CONCAT('%',#p(barCode),'%')  
			#end
			#if(clientType)
				and clientType = #p(clientType)
			#end
			#if(status)
				and status = #p(status)
			#end
	#end
	
#end