var vm = avalon.define({
	$id : "activityCtrl",
	selectId : [],
	tableTop : {
		title : "行动标题",
		ispublic : "是否公开",
//		status : "审批状态",
		publishtime : "发布时间",
		inputperson : "录入人",
		reportperson : "上报人",
		option : "操作"
	},
	msg : "",
	notify : "",
	msgImg : Public.rootPath() + "/images/ticon.png",
	data : {},
	regioncode : "",
	power : {
		addpower : 0,
		editpower : 0,
		delpower : 0,
		checkpower : 0
	},
	select : {//查询条件
		title : "",
		ispublic : ""
	},
	ispublic : [//是否公开
            {value:"",name:"所有状态"},
            {value:"1",name:"公开"},
            {value:"0",name:"不公开"}],
	checkAll : function() {
		if (this.checked) {
			for ( var i = 0; i < vm.data.length; i++) {
				vm.selectId.push(vm.data[i].keyid);
			}
			$(".itemCheckBox").prop("checked", "true");
		} else {
			vm.selectId.clear();
			$(".itemCheckBox").removeAttr("checked");
		}
	}
});

THISPAGE = {
	init : function() {
		this.initDom();
		this.loadGrid();
		this.addEvent();
	},
	initDom : function() {
	},
	loadGrid : function() {
		var request = Public.urlRequest();
		vm.typeId = request.queryString["type"];
		// 翻页保留 2018-01-02 ny start
		var activityTypeId = vm.typeId;
		var activityPage;
		if (activityTypeId==1) {
    		//从cookie获取页码
    		activityPage = $.cookie('activityPageNumber1');
    		activityPage==null?1:activityPage;
		} else if(activityTypeId==2){
			//从cookie获取页码
			activityPage = $.cookie('activityPageNumber2');
			activityPage==null?1:activityPage;
		}else if(activityTypeId==3){
			//从cookie获取页码
			activityPage = $.cookie('activityPageNumber3');
			activityPage==null?1:activityPage;
		}else if(activityTypeId==4){
			//从cookie获取页码
			activityPage = $.cookie('activityPageNumber4');
			activityPage==null?1:activityPage;
		}else if(activityTypeId==5){
			//从cookie获取页码
			activityPage = $.cookie('activityPageNumber5');
			activityPage==null?1:activityPage;
		}else if(activityTypeId==6){
			//从cookie获取页码
			activityPage = $.cookie('activityPageNumber6');
			activityPage==null?1:activityPage;
		}
		// 翻页保留 2018-01-02 ny end
		Public.ajaxPost(Public.rootPath() + '/activity/activityList', {
			'page' : activityPage,
			"type" : vm.typeId,
			"title" : vm.select.title,
			"ispublic" : vm.select.ispublic
			}, function(json) {
			if (json.status == 001) {
	        	$("#checkalls").removeAttr("checked");
				vm.data = json.data.page.list;
				vm.power = json.data.rp;
				vm.selectId = [];
				THISPAGE.initPage(json.data.page);
			} else {
				alert(json.msg);
			}
		});
	},
	initPage : function(pageData) {

		// 加载分页控件
		$("#PageInfo").pagePlugin({
			totalPage : pageData.totalPage,
			pageNumber : pageData.pageNumber,
			totalRow : pageData.totalRow,
			requst : function(index) {
				// 翻页保留 2018-01-02 ny start
				var activityTypeId = vm.typeId;
            	if (activityTypeId==1) {
            		$.cookie('activityPageNumber1', index, {path: '/'}); 
				} else if(activityTypeId==2){
					$.cookie('activityPageNumber2', index, {path: '/'});
				}else if(activityTypeId==3){
					$.cookie('activityPageNumber3', index, {path: '/'});
				}else if(activityTypeId==4){
					$.cookie('activityPageNumber4', index, {path: '/'});
				}else if(activityTypeId==5){
					$.cookie('activityPageNumber5', index, {path: '/'});
				}else if(activityTypeId==6){
					$.cookie('activityPageNumber6', index, {path: '/'});
				}
            	// 翻页保留 2018-01-02 ny end
            	
				Public.ajaxPost(Public.rootPath() + '/activity/activityList', {
					'page' : index,
					"type" : vm.typeId,
					"title" : vm.select.title,
					"ispublic" : vm.select.ispublic
				}, function(json) {
					if (json.status == 001) {
			        	$("#checkalls").removeAttr("checked");
						vm.data = json.data.page.list;
						vm.power = json.data.rp;
						vm.selectId = [];
					} else {
						top.openeasydialog("error", json.msg);
					}
				});
			}
		});
	},
	addEvent : function() {
/*		$("#edit").click(function(t) {// 查看
			if (vm.selectId.length == 0) {
				top.openeasydialog("warn", "请选择要编辑的活动");
			} else {
				if (vm.selectId.length == 1) {
					window.location = "activityAdd.html?keyid=" + vm.selectId[0] +"&typeid="+vm.typeId;
				} else {
					top.openeasydialog("warn", "请不要一次选择多个活动编辑");
				}
			}
		});*/

		$("#add").click(function(t) {// 添加
			window.location = "activityAdd.html?typeid="+vm.typeId ;
		});
		
		$("#delete").click(
				function(t) {

					if (vm.selectId.length == 0) {
						top.openeasydialog("warn", "请选择要删除的活动");
					} else {
						top.openeasydialog("warning", "确认要删除吗？",
								function(yes) {
									if (yes) {
										Public.ajaxPost(Public.rootPath()
												+ "/activity/delete", "keyids="
												+ vm.selectId, function(json) {
											if (json.status == 001) {
												THISPAGE.loadGrid();
											} else {
												top.openeasydialog("error",
														"删除活动时出错");
											}
										});
									}
								});
					}
				});
		$("#SelButton").click(function() {
			THISPAGE.loadGrid();
		});

		$("#check").click(function() {
			if ($("#sel_div").is(":hidden")) {
				$("#sel_div").fadeIn();
			} else {
				$("#sel_div").fadeOut();
			}
		});

	}
};
function edit(t) {// 查看
	window.location = "activityAdd.html?keyid=" + t +"&typeid="+vm.typeId;
}
function report(keyid){
//	flowSend("activity", keyid);
	//弹出人员选择框
    top.openSelUser("选择人员", 480, 510,
    		"flow/flowManage/selectUser.html",
                false, $("#personsid").val(), $("#personsname").val(), function (item, dialog) {
                    dialog.frame.$("#ok").trigger("click");
                    var UserId = [];
                    UserId = dialog.frame.$("#keyids").val();
                    if(UserId!=""){
                    	dialog.close();
    				    Public.ajaxPost(Public.rootPath() + "/flow/flowSend", {
    				    	"FlowType" : "activity",
    				    	"FlowId" : keyid,
    				    	"UserId" : UserId
    				    }, function(json) {
    						if (json.status == 001) {
    							top.openeasydialog("success","上报成功！",function(){
    								location.href=htmlRootPath+"/app/activity/activityManage/activityList.html?type="+vm.typeId;
    							});
    						} else {
    							top.openeasydialog("error",json.msg);
    						}
    					});
                    }
				    
                }, 
             null);
}
$(document).ready(function () {
    	THISPAGE.init();
});