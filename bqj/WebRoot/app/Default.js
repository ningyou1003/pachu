﻿var operlevel = 0;
var regionId = "";
$(function () {
	
	//区域查询
//	$("#searchArea").click(function(){
//		alert(2345);
//		var areaname=$("#areaname").val();
//		var isDemonstration=$("#isDemonstration").val();
//		vm.areaname=areaname;
//		vm.isDemonstration=isDemonstration;
//		Public.ajaxPost(Public.rootPath() + '/area/areaListPage', {
//			'page' : 1,
//			"AreaSelectVO" : vm.select.$model,
//			"areaname":vm.areaname,
//			"isDemonstration":vm.isDemonstration
//		}, function(json) {
//			vm.manageData = json.data.page.list;
//			areainitpage(json.data.page);
//			
//		});
//	
//	});
	
	$.ajaxSetup({
		  async: false
		  });
	
    //    binMailbox(); //加载未读邮箱
    //    setInterval(function () {
    //        binMailbox(); //定时加载未读邮箱
    //    }, 80000);
    var obj1 = parent.parent.frames["leftFrame"].window;
    obj1.changeMenu();
    var obj2 = parent.parent.frames["rightFrame"].window;
    obj2.initItem();
    Public.ajaxPost(Public.rootPath() + '/area/loadAllParentArea?regioncode=' + $.cookie('chooseRegionId'), 
    		{}, 
    		function (json) {
			    if (json.status == 001) {
			        var len = json.data.length;
			        var item = "";
			
			        var obj = parent.parent.frames["topFrame"].window;
			        obj.document.getElementById('arealink').innerHTML = "";
			        for (i = 0; i < len; i++) {
			            var region = json.data[i].region;
			            var regioncode = json.data[i].regioncode;
			            regionId = regioncode;
			            item += '<a href="javascript:" style="color: #fff;font-size:14px"  onclick="xhArea(' + regioncode + ')">' + region + '</a>>';
			            if (json.data[i].operlevel > operlevel) {
			                operlevel = json.data[i].operlevel;
			            }
			        }
			        item = item.substring(0, item.length - 1);
			        obj.document.getElementById('arealink').innerHTML = item;
			        var html = "";
			        var chtml = "";
			        if (operlevel == 0) {
			            html += '<ul id="tagsW">';
			            html += '<li class="selectTagW"><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW0",this)  onclick=openManageTabUrl()>领导小组和办公室</a></li>';
			            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW1",this) onclick=openManageTabUrl()>成员单位及其职责</a></li>';
			            //            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW2",this)>文化综合执法队伍</a></li>';
			            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW2",this) onclick=openTabUrl("大事记","news/eventsManage/eventsList.html")>大事记</a></li>';
			            html += '</ul>';
			            $("#tagsW").html(html);
			            chtml += '<div id="tagContentW0" class="tagContentW selectTagW"><div style="height: auto;"><table style="width: 100%">';
			            chtml += '<tr><td valign="top"><h3 style="font-size: 15px; padding-left: 10px">领导小组</h3>';
			            chtml += '<div id="ldxz" style="padding: 10px"></div></td>';
			            chtml += '<td valign="top"><h3 style="font-size: 15px; padding-left: 10px">办公室</h3>';
			            chtml += '<div id="bgs" style="padding: 10px"></div></td></tr></table></div></div>';
			
			            chtml += '<div id="tagContentW1" class="tagContentW">';
			            chtml += '<div style="height: auto;"><table style="width: 100%"><tr><td valign="top">';
			            chtml += '<div id="cydwzz" style="padding: 10px;display:inline-block"></div></td></tr></table></div></div>';
			
			            //            chtml += '<div id="tagContentW2" class="tagContentW">';
			            //            chtml += '<div style="height: auto;"><table style="width: 100%"><tr>';
			            //            chtml += '<td valign="top"><div id="zfd" style="padding: 10px"></div></td></tr></table></div></div>';
			
			            chtml += '<div id="tagContentW2" class="tagContentW"><div style="height: auto;"><table style="width: 100%">';
			            chtml += '<tr><td valign="top"><div class="box"><ul class="event_list" id="listEvents"></ul></div></td></tr></table></div></div>';
			            $("#tagContentW").html(chtml);
			        }
			        if (operlevel > 2) {
			            html += '<ul id="tagsW">';
			            html += '<li class="selectTagW"><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW0",this) onclick=openManageTabUrl()>领导小组和办公室</a></li>';
			            //            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW1",this)>成员单位及其职责</a></li>';
			            //            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW2",this)>文化综合执法队伍</a></li>';
			            //            html += '<li><a href="JavaScript:void()" onmousemove=selectTagW("tagContentW3",this) onclick=openTabUrl("大事记","news/eventsManage/eventsList.html")>大事记</a></li>';
			            html += '</ul>';
			            $("#tagsW").html(html);
			
			            chtml += '<div id="tagContentW0" class="tagContentW selectTagW"><div style="height: auto;"><table style="width: 100%">';
			            chtml += '<tr><td valign="top"><h3 style="font-size: 15px; padding-left: 10px">领导小组</h3>';
			            chtml += '<div id="ldxz" style="padding: 10px"></div></td>';
			            chtml += '<td valign="top"><h3 style="font-size: 15px; padding-left: 10px">办公室</h3>';
			            chtml += '<div id="bgs" style="padding: 10px"></div></td></tr></table></div></div>';
			            $("#tagContentW").html(chtml);
			        }
			
			
			    }
});

THISPAGE.init(); //待办事项


	
	var request = Public.urlRequest();
    var vmAreaname= request.queryString["vmAreaname"];
	vm.areaname=vmAreaname;
	$("#areaname").val(vmAreaname);
	
	var vmIsDemonstration=request.queryString["vmIsDemonstration"];
	vm.isDemonstration=vmIsDemonstration;
	if (vmIsDemonstration.length>0) {
		$("#isDemonstration").val(vmIsDemonstration);
	}
	
	var vmPage=request.queryString["vmPage"];
	//alert(vmAreaname+","+vmIsDemonstration+","+vmPage);
	if (vmPage.length>0 && vmPage>0) {
		
		page(vmPage);
		//alert(vmPage);
	}
});
//
function searchArea(){
	//alert('searchArea');
	var areaname=$("#areaname").val();
	var isDemonstration=$("#isDemonstration").val();
	vm.areaname=areaname;
	vm.isDemonstration=isDemonstration;
	Public.ajaxPost(Public.rootPath() + '/area/areaListPage', {
		'page' : 1,
		"AreaSelectVO" : vm.select.$model,
		"areaname":vm.areaname,
		"isDemonstration":vm.isDemonstration
	}, function(json) {
		vm.manageData = json.data.page.list;
		areainitpage(json.data.page);
		
	});

}

function areainitpage(page){
	
	var pagehtml="<p style=\"text-align:center;\">";
	if(page.pageNumber==1){
		pagehtml+="<span style=\"margin-right:5px;\"><a><<</a></span>";
	}else {
		pagehtml+="<span style=\"margin-right:5px;\"><a href=\"javascript:page('"+(page.pageNumber-1)+"')\"><<</a></span>";
	}
	
	pagehtml+="<span style=\"margin-right:5px;\">"+page.pageNumber+"/"+page.totalPage+"</span>";
	
	if(page.pageNumber==page.totalPage){
		pagehtml+="<span><a>>></a></span>";
	}else {
		pagehtml+="<span><a href=\"javascript:page('"+(page.pageNumber+1)+"')\">>></a></span>";
	}
	pagehtml+="</p>";
	$("#PageInfo").html(pagehtml);
}
function page(page){
	//alert(page+","+vm.areaname+","+vm.isDemonstration);
	Public.ajaxPost(Public.rootPath() + '/area/areaListPage', {
		'page' : page,
		"AreaSelectVO" : vm.select.$model,
		"areaname":vm.areaname,
		"isDemonstration":vm.isDemonstration
	}, function(json) {
    	
		vm.manageData = json.data.page.list;
		areainitpage(json.data.page);
		vm.page=page;
		
	});
}
//绑定未读邮箱
function binMailbox() {
    /*    var url = Public.rootPath() + "/mailbox/unread";
    Public.ajaxPost(url, "", function (json) {
    if (json.data.status != "FAIL") {
    $("#mailbox_unread").html(" <a style=\"color: #307fb1\" href=\"" + json.data.url + "\" target=\"_blank\" title='点击前往查看'>[<label style=\"color: Red\">" + json.data.count + "</label>]封未读邮件</a>");
    } else {
    $("#mailbox_unread").html(" <a style=\"color: #307fb1\" href=\"" + json.data.url + "\" target=\"_blank\" title='点击前往查看'>未绑定邮箱帐号</a>");
    }
    });

    //    var url = Public.rootPath() + "/mailbox/unread";
    //    Public.ajaxPost(url, "", function (json) {
    $("#msgbox_unread").html(" <a style=\"color: #307fb1\" href=\"javascript:\" target=\"_blank\" title='点击前往查看'>[<label style=\"color: Red\">0</label>]条未读短信</a>");
    //    });
    */
}

//------------------待办事项----------------------
var vm = avalon.define({
    $id: "flowCtrl",
    page:1,
    selectId: [],
    areaSelectId:[],
    areaname:"",
    isDemonstration:"",
    msg: "",
    notify: "",
    msgImg: Public.rootPath() + "/images/ticon.png",
    data: {},
    data1: {},
    data2: {},
    data4: {},
    manageData: {},
    reportData: {},
    keyid: "",
    select: {},
    data3: {},
    regionId: "",
    power : {
		addpower : 0,
		editpower : 0,
		delpower : 0,
		apppower : 0
	},
    noticeData: [
        { "title": "test1" },
        { "title": "test2" },
    ]
});

THISPAGE = {
		initPage : function(pageData) {
			
			// 加载分页控件
			$("#PageInfo").pagePlugin({
				totalPage : pageData.totalPage,
				pageNumber : pageData.pageNumber,
				totalRow : pageData.totalRow,
				requst : function(index) {
					Public.ajaxPost(Public.rootPath() + '/area/areaListPage', {
						'page' : index,
						"AreaSelectVO" : vm.select.$model,
						"areaname":vm.areaname,
						"isDemonstration":vm.isDemonstration
					}, function(json) {
			        	$("#checkalls").removeAttr("checked");
						vm.manageData = json.data.page.list;
						vm.power=json.data.rp;
						vm.areaSelectId = [];
					});
				}
			});
		},
    init: function () {
        this.initDom();
        this.loadGrid();
        //        this.addEvent();//下面有此方法，IE8报错，下次注意。
    },
    initDom: function () {
    },
    loadGrid: function () {
        var request = Public.urlRequest();
        vm.regionId = request.queryString["regionId"];

        $.cookie('chooseRegionId', vm.regionId, { path: '/' });
        //        vm.select.parentcode = keyid;//vm.select.parentcode未定义，IE8报错，下次注意。
        Public.ajaxPost(Public.rootPath() + '/dynamic/listUrl', {//最新动态图片
            'number': 5
            //           'regionId' : vm.regionId
        }, function (json) {
            vm.data = json.data;
            vm.selectId = [];
            var len = vm.data.length;
            var first = 0;
            var xh = 0;
            for (i = 0; i < len; i++) {
                if (vm.data[i].url != "" && vm.data[i].url != undefined) {
                    var title = vm.data[i].title;
                    var imgurl = Public.localPath() + vm.data[i].url;
                    if (title.length > 25) {
                        title = title.substring(0, 25) + "…";
                    }
                    var item = ('<li><a href="news/dynamicManage/dynamicReadOnly.html?keyid=' + vm.data[i].keyid + '" target="_blank"><img src="' + imgurl + '" /></a><a href="news/dynamicManage/dynamicReadOnly.html?keyid=' + vm.data[i].keyid + '" target="_blank" class="mc1_ftxt" title=' + vm.data[i].title + '>' + title + '</a></li>');
                    $("#imgnewlist").append(item);
                    xh++;
                    $("#hdlist").append('<li>' + xh + '</li>');
                }
            }
            jQuery(".slideBox1").slide({ mainCell: ".bd ul", effect: "fold", autoPlay: true });
        });

        Public.ajaxPost(Public.rootPath() + '/dynamic/listText', {//最新动态文字
            'number': 10
        }, function (json) {
            vm.data = json.data;
            vm.selectId = [];
            var len = vm.data.length;
            var first = 0;
            var xh = 0;
            for (i = 0; i < len; i++) {
                first++;
                if (first == 1) {
                    var title = vm.data[i].title;
                    if (title.length > 45)
                        title = title.substring(0, 45) + "…";
                    var item = ('<a href="news/dynamicManage/dynamicReadOnly.html?keyid=' + vm.data[i].keyid + '" target="_blank" style="font-weight: bold;color: #b8211b;font-size:16px" title=' + vm.data[i].title + '>' + title + '</a>');
                    $("#firstnew").append(item);
                    var content = delHtmlTag(vm.data[i].content);
                    if (content.length > 140)
                        content = content.substring(0, 140) + "…";
                    $("#firstnewcontent").append(content);

                }
                else {

                    var title = vm.data[i].title;
                    if (title.length > 34)
                        title = title.substring(0, 34) + "…";
                    //var item = ('<li><a href="news/dynamicManage/dynamicReadOnly.html?keyid=' + vm.data[i].keyid + '" target="_blank" title=' + vm.data[i].title + ' >' + title + '</a></li>');
                    var item = ('<li><a href="javascript:" onclick=openDynamic("' + vm.data[i].keyid + '")  title=' + vm.data[i].title + ' style="font-size:12px">' + title + '</a></li>');
                    $("#txtnewlist").append(item);

                }
            }
        });

        Public.ajaxPost(Public.rootPath() + '/events/listEvents', {//大事记
    }, function (json) {
        vm.data = json.data.aPage.page.list;
        var item = "";
        var len = vm.data.length;
        var year = "";
        var month = "";
        var title = "";
        var stryear = "";
        var strmonth = "";
        for (i = 0; i < len; i++) {
            year = vm.data[i].eyear;
            month = vm.data[i].emonth;
            title = vm.data[i].title;
            item += '<div>';
            if (stryear.indexOf(year) < 0) {
                item += '<h3>' + year + '</h3>';
                stryear += year;
            }
            if (strmonth.indexOf(month) < 0) {
                item += '<li><span>' + month + '月</span><p><span onclick=openEventsDetail("' + vm.data[i].keyid + '") style="font-size:12px;cursor:pointer;"><a onclick=openEventsDetail("' + vm.data[i].keyid + '") href="javascript:" style="font-size:12px;">' + title + '</a></span></p></li>';
                strmonth += month;
            }
            else {
                item += '<li><span></span><p><span onclick=openEventsDetail("' + vm.data[i].keyid + '") style="font-size:12px;cursor:pointer;"><a onclick=openEventsDetail("' + vm.data[i].keyid + '") href="javascript:" style="font-size:12px;">' + title + '</a></span></p></li>';
            }
            item += '</div>';

        }
        $("#listEvents").append(item);

    });
    Public.ajaxPost(Public.rootPath() + '/manage/desktop', {
        'pageSize': 100,
        'regionId': vm.regionId
    }, function (json) {
        vm.manageData = json.data;
    });

    //领导小组和办公室
    Public.ajaxPost(Public.rootPath() + '/manage/loadMemberForFront', {
        'page': 1,
        'pageSize': 12,
        'regionId': vm.regionId
    }, function (json) {
        vm.data = json.data;
        var len = vm.data.length;
        for (i = 0; i < len; i++) {
            var job = vm.data[i].job;
            var job2 = vm.data[i].job2;
            var name = vm.data[i].name;
            if (job2 == null) {
                job2 = "";
            }
            else {
                job2 = "(" + job2 + ")";
            }
            if (job != null) {
                job ="" +job + "：<font style='font-weight: 400;font-size:12px'>" + name + job2 + "</font>";
            }
            else {
                job = "  <font style='font-weight: 400;font-size:12px'>" + name + job2 + "</font>"
            }
            if (json.data[i].type == 1) {
                var item = ('<span style="font-weight: 600; line-height: 24px;font-size:12px;">' + job + '</span><br/>');
                $("#ldxz").append(item);
            }
            if (json.data[i].type == 2) {
                var item = ('<span style="font-weight: 600; line-height: 24px;font-size:12px;">' + job + '</span><br/>');
                $("#bgs").append(item);
            }
            if (json.data[i].type == 0) {

                var item = ('<span style="font-weight: 600; line-height: 24px; margin-bottom: 10px;font-size:12px;"><b>' + name + '</b>：<br><font  style="font-weight: 400;font-size:12px">' + vm.data[i].job.replace(/\n/g, '<br/>') + '</font></span><br/>');
                $("#cydwzz").append(item);
               
            }
            if (json.data[i].type == 3) {
                var item = ('<span style="font-weight: 600; line-height: 24px;margin-bottom: 10px;font-size:12px;">' + job + '</span><br/>');
                $("#zfd").append(item);
            }
        }

    });

    /*Public.ajaxPost(Public.rootPath() + '/manage/loadMemberInfo', {
    'page': 1,
    'pageSize': 12,
    'regionId': vm.regionId
    }, function (json) {
    vm.data = json.data;
    $("#cydw").append(vm.data.memberunits);
    $("#cydwzz").append(vm.data.muresponsibility);
    $("#gzjg").append(vm.data.workingorgans);
    });*/



    vm.reportData = [
            { "title": "全国\"扫黄打非\"工作小组办公室举报电话: 12390" },
            { "title": "广西\"扫黄打非\"工作小组办公室举报电话: 0771-5516026, 0771-5516028(传真)" },
            { "title": "举报邮箱: gxshdf@126.com" },
            { "title": "地址: 广西南宁市金湖路53号" }
        ];

    Public.ajaxPost(Public.rootPath() + '/docNotice/noticeList', {
        'pageSize': 10,
        'regionId': vm.regionId
    }, function (json) {
        vm.noticeData = json.data.page.list;
        var len = vm.noticeData.length;
        var obj = parent.parent.frames["rightFrame"].window;
        var item = "";
        for (i = 0; i < len; i++) {
            var title = vm.noticeData[i].title;
            var publishtime = vm.noticeData[i].publishtime;
            if (publishtime != "") {
                publishtime = publishtime.substring(0, 10);
            }
            var beginDate = vm.noticeData[i].publishtime;
            var endDate = "";
            var myDate = new Date();
            var m = myDate.getMonth() < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
            var d = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
            endDate = myDate.getFullYear() + "-" + m + "-" + d;
            var newimg = "";
            var begin = new Date(beginDate.replace(/-/g, "/"));
            var end = new Date(endDate.replace(/-/g, "/"));
            if (begin >= end) {
                newimg = '<img src="../images/new.gif" />';
            }
            item += ('<a href="#" ms-click="openNotice(el.keyid)" style="color: #000;">' + newimg + '&nbsp;' + title + '</a>&nbsp;<span style="color: #b8211b;font-size:12px">(' + publishtime + ')</span>&nbsp;&nbsp;&nbsp;&nbsp;');

        }
        //$("#noticeData").append(item);
        obj.document.getElementById('noticeData').innerHTML = item;
    });
}
};

function openNotice(id) {
    window.parent.parent.frames["rightFrame"].AddItems("通知", "docNotice/noticeManage/noticeDetail.html?keyid=" + id + "&TabItem=home");
}
function openEventsDetail(id) {
    window.parent.parent.frames["rightFrame"].AddItems("大事记", "news/eventsManage/eventsReadOnly.html?keyid=" + id + "&TabItem=home");
}

//选择管理体系下的区域
function openManage(regionCode) {
    var e = regionCode;
    $.cookie('chooseRegionId', e, { path: '/' }); //将选择的区域编码写入cookie
    var url="default.html?regionId=" + e;
    if ((vm.areaname!=null && vm.areaname.length>0) || (vm.isDemonstration!=null && vm.isDemonstration.length>0)) {
		url+="&vmAreaname="+vm.areaname+"&vmIsDemonstration="+vm.isDemonstration+"&vmPage="+vm.page;
		//alert(url);
	}
    window.location = url;
    //    window.parent.parent.frames["rightFrame"].location.reload();
}
//点开传阅公文
function openReadFlow(flowid) {
    window.parent.parent.frames["rightFrame"].AddItems("公文处理", "documentflow/document/documentDetail.html?flowid=" + flowid + "&Read=read&TabItem=home");
}

//点开更多活动 参数活动类型 打开类型(0点开更多活动\1转到活动详情)
function openActivity(id, atype, optype) {
    if (optype == "0") {
        top.opendialog("更多活动", 600, 800, "activity/userActivityList.html", false);
    } else {
        var Url = "";
        switch (atype) {
            case "综合性招商活动":
                Url = "activity/activityManage/comprehensive.html?keyid=" + id;
                break;
            case "专场推介洽谈会":
                Url = "activity/activityManage/meeting.html?keyid=" + id;
                break;
            case "专场签约仪式":
                Url = "activity/activityManage/sign.html?keyid=" + id;
                break;
            case "小分队招商":
                Url = "activity/activityManage/squad.html?keyid=" + id;
                break;
            case "参展参会":
                Url = "activity/activityManage/exhibitors.html?keyid=" + id;
                break;
            case "出境团组":
                Url = "activity/activityManage/exitgroups.html?keyid=" + id;
                break;
            case "调研考察":
                Url = "activity/researchManage/researchDetail.html?keyid=" + id;
                break;
            case "学习培训":
                Url = "activity/trainingManage/trainingDetail.html?keyid=" + id;
                break;
            case "公务接待":
                Url = "activity/officeManage/officeDetail.html?keyid=" + id;
                break;
            case "其他活动":
                Url = "activity/otherManage/otherDetail.html?keyid=" + id;
                break;
            default:
        }
        window.parent.parent.frames["rightFrame"].AddItems("活动内容", Url);
    }
}

function openEvents(month) {
    window.parent.parent.frames["rightFrame"].AddItems("大事记", "news/eventsManage/eventsList.html?month=" + month);
}

//------------------待办事项----------------------
function openManageTabUrl() {
    var url = "manage/manage/areaadd.html?areaId=" + regionId;
    window.parent.parent.frames["rightFrame"].AddItems("管理体系", url);
}
//点开更多
function openTabUrl(title, url) {
    window.parent.parent.frames["rightFrame"].AddItems(title, url);
}

function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}

function openDynamic(keyid) {
    window.parent.parent.frames["rightFrame"].AddItems("最新动态", "news/dynamicManage/dynamicReadOnly.html?keyid=" + keyid);
}