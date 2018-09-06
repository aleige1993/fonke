#namespace("test")
	
	#sql("select1")
		select u.*,ur.*  from user_account u,user_role ur  where u.userid = ur.userid  and  u.userid  = 1
	#end
	#sql("select2")
		select u.*,ur.*  from
user_account u,user_role ur  where u.userid = ur.userid  and  u.userid  = 1
	#end
	#sql("select3")
		select u.*,ur.*  
from user_account u,user_role ur  where u.userid = ur.userid  and  u.userid  = 1
	#end
	
	#sql("select4")
		select u.*,ur.*  from user_account u left join user_role ur  on u.userid = ur.userid  where  u.userid  = 1
	#end
	#sql("select5")
		select u.*,ur.*  from user_account u inner join
user_role ur  on u.userid = ur.userid  where  u.userid  = 1
	#end
#end