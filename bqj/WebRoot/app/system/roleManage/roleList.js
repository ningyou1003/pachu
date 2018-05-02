var vm = avalon.define({
	$id : "roleCtrl",
	selectId : [],
	tableTop : {
		roleName : "角色名称",
//		sort : "排序",
		level : "角色等级",
		option  : "操作"
	},
	msg : "",
	notify : "",
	msgImg : Public.rootPath() + "/images/ticon.png",
	data : {
		keyid : ""
	},
	regioncode : "",
	power : {
		addpower : 0,
		editpower : 0,
		delpower : 0,
		apppower : 0
	},
	checkAll : function() {
		if (this.checked) {
			for ( var i = 0; i < vm.data.length; i++) {
				vm.selectId.push(vm.data[i].keyid);
			}
		} else {
			vm.selectId.clear();
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
		if (request.queryString["keyid"] != null
				&& request.queryString["keyid"].length > 0) {
			vm.regioncode = vm.data.keyid = request.queryString["keyid"];
		}
		//从cookie获取页码
		var rolePage = $.cookie('rolePageNumber');
		rolePage==null?1:rolePage;
		
		Public.ajaxPost(Public.rootPath() + '/role/roleList', {
			'page' : rolePage,
			'regionCode' : vm.data.keyid
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
            	$.cookie('rolePageNumber', index, {path: '/'}); 
            	
				Public.ajaxPost(Public.rootPath() + '/role/roleList', {
					'page' : index,
					'regionCode' : vm.data.keyid
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
		$("#edit").click(function(t) {// 查看
			if (vm.selectId.length == 0) {
				top.openeasydialog("warn", "请选择要编辑的角色");
			} else {
				if (vm.selectId.length == 1) {
					window.location = "roleedit.html?keyid=" + vm.selectId[0];
				} else {
					top.openeasydialog("warn", "请不要一次选择多个角色编辑");
				}
			}
		});

		$("#add").click(function(t) {// 添加
			window.location = "roleedit.html?regioncode=" + vm.regioncode;
		});

		$("#delete").click(
				function(t) {

					if (vm.selectId.length == 0) {
						top.openeasydialog("warn", "请选择要删除的角色");
					} else {
						top.openeasydialog("warning", "确认要删除吗？",
								function(yes) {
									if (yes) {
										Public.ajaxPost(Public.rootPath()
												+ "/role/deleteRole", "keyids="
												+ vm.selectId, function(json) {
											if (json.status == 001) {
												THISPAGE.loadGrid();
											} else {
												top.openeasydialog("error",
														"删除角色时出错");
											}
										});
									}
								});

					}
				});

	}
};

$(document).ready(function () {
    	THISPAGE.init();
});
