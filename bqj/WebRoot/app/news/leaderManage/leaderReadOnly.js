var vm = avalon.define({
    $id: "leaderReadOnlyCtrl",
	data : {
		keyid : "",
		title : "",
		month : "",
		type : "",
		content : "",
		randomNum : randomNum
	},
    keyid: "",
});

THISPAGE = {
	    
		init: function () {
	        this.initEvent();
	        this.initData();
	    },
	    
	    initData:function(){
			var request = Public.urlRequest();
			var opType = request.queryString["opType"];
			var status  = request.queryString["status"];
			
			if(opType==1 && status!=1){
				$("#approval").show();
			}
	        if (request.queryString["keyid"] != null
					&& request.queryString["keyid"].length > 0) {
		            
	        	vm.keyid = request.queryString["keyid"];
		        Public.ajaxPost(Public.rootPath() + "/leader/editData", "keyid="
							+ vm.keyid, function(json) {
						if (json.status == 001) {
							vm.data = json.data;
							$("#title").html(vm.data.title);
							$("#content").html(vm.data.content);
						} else {
							top.openeasydialog("error", "信息获取失败");
						}
					});
		}
		},
		
		initEvent: function () {
		    var request = Public.urlRequest();
			opType = request.queryString["opType"];
		    $("#btback").click(function () {
		    	if(opType==1){//返回待办列表
					window.location = "../../flow/flowManage/flowList.html?status=0";
				} else if(opType==2){//返回已办列表
					window.location = "../../flow/flowManage/flowList.html?status=1";
				} else {
					window.location = "leaderList.html";
				}		        
		    });		    
		    $("#review").click(function() {
		    	flowNewApprove("n_leader", vm.data.keyid);
			});
//			$("#report").click(function() {
//				flowSend("n_leader", vm.data.keyid);
//			});
		},			
};

$(document).ready(function() {
	THISPAGE.init();
	initUpload("leader", vm.keyid);
});