#namespace("balancePayments")

	#sql("list")
		select *
			--from
		from @@balance_payments@@ b left join @@org@@ o on b.levelcode=o.levelcode
		where b.levelcode like #p(levelcode)
		#if(type)
			and b.type = #p(type)
		#end
		#if(begin_time)
			and b.time >= #p(begin_time)   
		#end
		#if(end_time)
			and b.time <= #p(end_time)   
		#end
		
	#end
	
	#sql("orderDetail")
		select *
			--from
		from @@order@@ o left join @@customer@@ c on o.customerid=c.customerid
		where o.payid = #p(payid)
	#end
	
	#sql("refundDetail")
		select *,ua.name as operationname
			--from
		from @@refund@@ r left join @@customer@@ c on r.customerid=c.customerid left join @@user_account@@ ua on r.operationid=ua.userid
		where r.payid = #p(payid)
	#end
	
	#sql("transactionRecordDetail")
		select *
			--from
		from @@transaction_record@@ t left join @@customer@@ c on t.customerid=c.customerid 
		where t.payid = #p(payid)
	#end
	
#end