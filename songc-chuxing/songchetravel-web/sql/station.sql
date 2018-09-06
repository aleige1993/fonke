#namespace("station")

	#sql("list")
		select s.*,o.name as orgname
			--from
		from @@station@@ s left join @@org@@ o on s.levelcode=o.levelcode
		where s.levelcode like #p(levelcode)
		#if(keyWord)
			and (s.name like #p(keyWord) or s.keyword like #p(keyWord) or s.address like #p(keyWord))
		#end
		#if(published)
			and s.published = #p(publishedValue)
		#end
		-- orderby
		order by s.stationid 
		-- orderby
	#end
	
#end