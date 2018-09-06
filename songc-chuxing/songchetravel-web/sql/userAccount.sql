#namespace("userAccount")

	#sql("list")
		select ua.userid,ua.username,ua.name,ua.status,ua.last_login_time,ua.last_login_ip,
		ua.create_time,ua.phone,ua.email,o.name as depName,
		o.levelcode,ua.memo
		--from
		from @@user_account@@ ua left join @@org@@ o on ua.levelcode=o.levelcode 
		where ua.levelcode like #p(levelcode)
		#if(name)
			and ua.name like #p(name)
		#end
		#if(queryLevelcode)
			and ua.levelcode like #p(queryLevelcode)
		#end
		#if(username)
			and ua.username like #p(username)
		#end
		#if(phone)
			and ua.phone like #p(phone)
		#end
		-- orderby
		order by ua.userid desc
		-- orderby
	#end
	
	#sql("getAuditUserEmail")
		select ua.email  
		--from
		from @@user_role@@ ur left join @@role_permission@@ rp on ur.roleid = rp.roleid left join @@user_account@@ ua on ur.userid = ua.userid 
		where rp.func= #p(func)
	#end
	
	#sql("getRepresentationEmail")
		select ua.email  
		--from
		from @@user_role@@ ur left join @@role_permission@@ rp on ur.roleid = rp.roleid left join @@user_account@@ ua on ur.userid = ua.userid 
		where rp.func= #p(func)
	#end
#end