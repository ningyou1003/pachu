var vm = avalon.define({
	$id : "ledgerCtrl",
	selectId : [],
	tableTop : {
		title : "台账名称",
//		content : "内容",
		user: "录入人",
		releasetime: "发布时间",
		status : "上报人",
		operation : "操作"
	},
	msg : "",
	msgImg : Public.rootPath() + "/images/ticon.png",
	data : {},
	keyid : "",
	select : {
		title : "",
	},
	power : {
		addpower : 0,
		editpower : 0,
		delpower : 0,
		checkpower : 0
	},
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
		//从cookie获取页码
		var ledgerPage = $.cookie('ledgerPageNumber');
		ledgerPage==null?1:ledgerPage;
		
		Public.ajaxPost(Public.rootPath() + '/ledger/ledgerList', {
			'page' : ledgerPage,
			'SelectTitle' : vm.select.title,
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
				// 存储页码到cookie 
            	$.cookie('ledgerPageNumber', index, {path: '/'}); 
            	
				Public.ajaxPost(Public.rootPath() + '/ledger/ledgerList', {
					'page' : index,
					'ledgerSelectVO' : vm.select.$model
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
				top.openeasydialog("warn", "请选择要编辑内容");
			} else {
				if (vm.selectId.length == 1) {
					window.location = "ledgerAdd.html?keyid=" + vm.selectId[0];
				} else {
					top.openeasydialog("warn", "请不要一次选择多个内容编辑");
				}
			}
		});*/
		$("#add").click(function(t) {// 添加
			window.location = "ledgerAdd.html" ;
		});

		$("#delete").click(
				function(t) {

					if (vm.selectId.length == 0) {
						top.openeasydialog("warn", "请选择要删除的内容");
					} else {
						top.openeasydialog("warning", "确认要删除吗？",
								function(yes) {
									if (yes) {
										Public.ajaxPost(Public.rootPath()
												+ "/ledger/delete", "keyids="
												+ vm.selectId, function(json) {
											if (json.status == 001) {
												THISPAGE.loadGrid();
											} else {
												top.openeasydialog("error",
														"删除时出错");
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
	},
};

//上报
function report(keyid) {
	flowSend("ledger",keyid);
}

$(document).ready(function () {
    	THISPAGE.init();
    	
    	var regionid=$.cookie("regionCode");
    	if (regionid!=null && regionid=='450000000000') {
    		$("#report").css("display","none");
    	}else {
    		$("#report").css("display","");
    	}
});