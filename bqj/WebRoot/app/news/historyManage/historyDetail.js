var vm = avalon.define({
    $id: "historyDetailCtrl",
	data : {
		keyid : "",
		title : "",
		month : "",
		type : "",
		content : "",
		randomNum : randomNum,
		ispublic : "0"
	},
    keyid: "",
    submit: function () {
        $("#base_form").trigger("validate");
    }
});
var isData = 0;//全局变量，上报前是否有记录，0无，1有
var kindeditor;
THISPAGE = {
	    
		init: function () {
	        this.initDom();
	        this.initEvent();
	        this.initData();
	    },
	    
	    initData:function(){
			var request = Public.urlRequest();
	        if (request.queryString["keyid"] != null
					&& request.queryString["keyid"].length > 0) {   
	        	vm.keyid = request.queryString["keyid"];
		        Public.ajaxPost(Public.rootPath() + "/history/editData", "keyid="
							+ vm.keyid, function(json) {
						if (json.status == 001) {
							isData = 1;
							vm.data = json.data;
							kindeditor.html(vm.data.content);
							if(vm.data.status==0 || vm.data.status==3){//如果审核未通过，“上报”按钮显示
//								$("#report").css("display","");
							}
							if(vm.data.status==3 || vm.data.status==1){
//								$("#report,#Button3").css({"background":"#ccc","cursor":"default"});
//								$("#report,#Button3").attr("disabled","true");
								
								$("#Button3").css({"background":"#ccc","cursor":"default"});
								$("#Button3").attr("disabled","true");
							}
						} else {
							top.openeasydialog("error", "信息获取失败");
						}
					});
		}else{
//			$("#report").css("display","");
		}
		},
		
		initEvent: function () {
		    $("#btback").click(function () {
		        window.location = "historyList.html";
		    });
//		    $("#report").click(function () {		    	
//		    	if(isData==0){
//		    		top.openeasydialog("warn", "请先保存数据！");
//		    	}else{
//		    		flowNewSend("n_history", vm.data.keyid);
//		    	}
//		    });
		},
		initDom: function () {
		}				
};

function postData() {
	var url = null;
	vm.data.month=$("#month").val();
	vm.data.content = kindeditor.html();
	if (vm.data.keyid != "" && vm.data.keyid != null && vm.data.keyid != undefined) {
		url = Public.rootPath() + "/history/edit";
	} else {
		url = Public.rootPath() + "/history/add";
		
	}
	Public.ajaxPost(url, vm.data.$model, function(json) {
		if (json.status == "001") {
			vm.data.keyid = json.data;
			isData = 1;//表示有记录
			top.openeasydialog("success", json.msg, function (item, dialog) {
                dialog.close();
            });				
        } else {
            top.openeasydialog("error", json.msg);
        }
	});
	
}

function initValidator() {
	$("#base_form").validator({
		messages : {
			required : "请填写{0}"
		},
		display : function(e) {
			var text = $(e).closest(".row-item").find("label").text().trim();
			return text.substring(0, text.length - 2);
		},
		valid : function() {
			postData();
		},
		ignore : ":hidden",
		theme : "yellow_bottom",
		timely : 1,
		stopOnError : true
	});
}
function KE(){
	kindeditor = KindEditor.create('textarea[name="content"]', {
		resizeType : 1,
		uploadJson : Public.rootPath() + "/ke/fileUpload",
		fileManagerJson : Public.rootPath() + "/ke/fileManager",
		allowPreviewEmoticons : false,
		allowImageUpload : true,
		allowImageRemote : true,
		pasteType : 2,//HTML粘贴
		cssPath : Public.rootPath() + "/assets/js/plugins/kindeditor/plugins/image/imgAuto.css",//图片自适应编辑器
	});
}
$(document).ready(function() {
	KE();
	initValidator();
	THISPAGE.init();
	initUpload("history", vm.keyid);
});