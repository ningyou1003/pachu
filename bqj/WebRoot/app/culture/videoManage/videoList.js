var vm = avalon.define({
	$id : "videoCtrl",
	selectId : [],
	tableTop : {
		title : "标题",
//		content : "内容",
		user : "录入人",
		releasetime : "发布时间",
		status : "审核状态",
		operation : "操作",
	},
	selectType : ["","否","是"],
	type : "",
	select : {
		title : "",
		isPublic : "",
	},
	typeid : "",
	msg : "",
	msgImg : Public.rootPath() + "/images/ticon.png",
	data : {},
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
		//查询条件过滤
		if(vm.type != "") {
			if(vm.type == "否") {
				vm.select.isPublic = 0;
			} else {
				vm.select.isPublic = 1;
			}
		} else {
			vm.select.isPublic = "";
		}
		vm.typeid = request.queryString["typeid"];
		
		//从cookie获取页码
		var videoPage;
		//console.log("vm.typeid="+vm.typeid);
		var videoTypeId = vm.typeid;
		if (videoTypeId==1) {
			videoPage = $.cookie('videoPageNumber1');
			videoPage==null?1:videoPage;
		} else if (videoTypeId==2) {
			videoPage = $.cookie('videoPageNumber2');
			videoPage==null?1:videoPage;
		}else if (videoTypeId==3) {
			videoPage = $.cookie('videoPageNumber3');
			videoPage==null?1:videoPage;
		}
		
		Public.ajaxPost(Public.rootPath() + '/video/List', {
			'page' : videoPage,
			'typeid' : vm.typeid,
			'cultureSelectVO' : vm.select.$model,
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
				var videoTypeId = vm.typeid;
            	if (videoTypeId==1) {
            		$.cookie('videoPageNumber1', index, {path: '/'}); 
        		} else if (videoTypeId==2) {
        			$.cookie('videoPageNumber2', index, {path: '/'}); 
        		}else if (videoTypeId==3) {
        			$.cookie('videoPageNumber3', index, {path: '/'}); 
        		}
				
				Public.ajaxPost(Public.rootPath() + '/video/List', {
					'page' : index,
					'typeid' : vm.typeid,
					'cultureSelectVO' : vm.select.$model,
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
					window.location = "videoAdd.html?keyid=" + vm.selectId[0];
				} else {
					top.openeasydialog("warn", "请不要一次选择多个内容编辑");
				}
			}
		});*/

		$("#add").click(function(t) {// 添加
			window.location = "videoAdd.html?typeid=" + vm.typeid;
		});

/*		$("#delete").click(
				function(t) {

					if (vm.selectId.length == 0) {
						top.openeasydialog("warn", "请选择要删除的内容");
					} else {
						top.openeasydialog("warning", "确认要删除吗？",
								function(yes) {
									if (yes) {
										Public.ajaxPost(Public.rootPath()
												+ "/video/delete", "keyids="
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
				});*/
		
		$("#editShow").click(function() {
			$(".delete").hide();
			$(".edit").toggle();
		});
		
		$("#deleteShow").click(function() {
			$(".edit").hide();
			$(".delete").toggle();
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

//编辑
function edit(keyid, videoimgid, videosourceid) {
	window.location.href = "videoAdd.html?keyid=" + keyid + "&videoimgid=" + videoimgid + "&videosourceid=" + videosourceid;
}

//删除
function deletes(keyid) {
	top.openeasydialog("warning", "确认要删除吗？",
			function(yes) {
				if (yes) {
					Public.ajaxPost(Public.rootPath()
							+ "/video/delete", "keyids="
							+ keyid, function(json) {
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

//上报
function report(keyid) {
	flowSend("video",keyid);
}
//转到视频播放页
 function byVideoShow(keyid) {
	 window.location.href = "videoShow.html?keyid=" + keyid + "&typeid=" + vm.typeid;
 }

$(document).ready(function () {
    	THISPAGE.init();
});
