
	//var curWwwPath = 'http://222.216.1.196:38229/shdf/';
  
  var curWwwPaths = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPaths.indexOf(pathName);
  //alert(curWwwPaths.substring(0, pos));
  var curWwwPath = curWwwPaths.substring(0, pos)+'/shdf/';
  //var curWwwPath = 'http://127.0.0.1/shdf/WebRoot/';
  function mengban(b){
	  if (b) {
		  $("#mengban").css("display","");
	  }else{
		  $("#mengban").css("display","none");
	  }
	  
	  
  }
  function shouye(){
	  //alert(1);
	  window.location.href=curWwwPath+'index.html';
  }
  var str = '';
    str += '<ul>';
//              str += '  <li id="m_1" class="m_li_a"><a href="'+curWwwPath+'index.html">首页</a></li>';
//               str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">政策法规</a></li>';
//               str += ' <li id="m_3" class="m_li" onmouseover="mover(3);" onmouseout="mout(3);"><a href="">制度建设</a></li>';
//               str += ' <li id="m_4" class="m_li" onmouseover="mover(4);" onmouseout="mout(4);"><a href="">专项行动</a></li>';
//               str += ' <li id="m_5" class="m_li" onmouseover="mover(5);" onmouseout="mout(5);"><a href="">文化宣传</a></li>';
//               //str += ' <li id="m_6" class="m_li" onmouseover="mover(6);" onmouseout="mout(6);"><a href="">区域联防</a></li>';
//               str += ' <li id="m_6" class="m_li" onmouseover="mover(6);" onmouseout="mout(6);"><a href="">案件查办</a></li>';
//               //str += ' <li id="m_8" class="m_li" onmouseover="mover(8);" onmouseout="mout(7);"><a href="">工作动态</a></li>';
//               str += ' <li id="m_7" class="m_li" onmouseover="mover(7);" onmouseout="mout(7);"><a href="">举报投诉</a></li>';
//          
//           
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
           +'<button class="dropbtn" onclick="shouye()">首页</button>'
           +' <div class="dropdown-content" >'
           +'   </div>'
           +' </div></li>';
           
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">领导机构</button>'
               +' <div class="dropdown-content" style="width:170px;">'
               +'    <a href="'+curWwwPath+'ldjg/manage.html">领导小组和办公室</a>'
               +'     <a href="'+curWwwPath+'ldjg/cydwjzz.html">成员单位及职责</a>'
               +'    <a href="'+curWwwPath+'ldjg/bigEvent.html">大事记</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">专项行动</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'zxxd/activityList.html?type=1">清源</a>'
               +'     <a href="'+curWwwPath+'zxxd/activityList.html?type=2">净网</a>'
               +'    <a href="'+curWwwPath+'zxxd/activityList.html?type=3">护苗</a>'
               +'    <a href="'+curWwwPath+'zxxd/activityList.html?type=4">固边</a>'
               +'     <a href="'+curWwwPath+'zxxd/activityList.html?type=5">秋风</a>'
               +'    <a href="'+curWwwPath+'zxxd/activityList.html?type=6">其他</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">案件查办</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'ajcb/caseList.html?type=1">大案要案</a>'
               +'     <a href="'+curWwwPath+'ajcb/caseList.html?type=2">其他案件</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">文化宣传</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'whxc/mediaList.html">媒体宣传</a>'
               +'     <a href="'+curWwwPath+'whxc/videoList.html">视频</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">政策法规</button>'
               +' <div class="dropdown-content" style="width:180px;">'
               +'    <a href="'+curWwwPath+'zcfg/lawList.html">法律</a>'
               +'     <a href="'+curWwwPath+'zcfg/statuteList.html">行政法规</a>'
               +'    <a href="'+curWwwPath+'zcfg/stipulateList.html">部门规章</a>'
               +'     <a href="'+curWwwPath+'zcfg/judicialList.html">司法解释</a>'
               +'    <a href="'+curWwwPath+'zcfg/noticeList.html">其他行政性规范文件</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">制度建设</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'zdjs/buildList.html">制度建设</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">举报投诉</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'tsjb/alarmList.html">举报</a>'
               +'     <a href="'+curWwwPath+'tsjb/appealList.html">投诉</a>'
               +'   </div>'
               +' </div></li>';
           str += ' <li id="m_2" class="m_li"><div class="dropdown">'
               +'<button class="dropbtn">经验交流</button>'
               +' <div class="dropdown-content">'
               +'    <a href="'+curWwwPath+'jyjl/experienceList.html">经验介绍</a>'
               +'   </div>'
               +' </div></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">专项行动</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">案件查办</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">文化宣传</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">政策法规</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">制度建设</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">举报投诉</a></li>';
//           str += ' <li id="m_2" class="m_li" onmouseover="mover(2);" onmouseout="mout(2);"><a href="">经验交流</a></li>';
           str += ' </ul>';
    $('#menu').html(str);


    var htmls = '';
    			htmls += ' <li style="padding-left:29px;" id="s_1" class="s_li_a"></li>';

//                htmls += ' <li style="padding-left:29px;" id="s_2" class="s_li" onmouseover="mover(2);" onmouseout="mout(2);">';
//                htmls += ' <a href="'+curWwwPath+'zcfg/lawList.html" target="_blank" title="">法律</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zcfg/statuteList.html" target="_blank" title="">行政法规</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zcfg/stipulateList.html" target="_blank" title="">部门规章</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zcfg/judicialList.html" target="_blank" title="">司法解释</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zcfg/noticeList.html" target="_blank" title="">其他行政性规范文件</a>&nbsp;&nbsp;&nbsp;';
//                htmls += '</li>';
//
//                htmls += ' <li style="padding-left:29px;" id="s_3" class="s_li" onmouseover="mover(3);" onmouseout="mout(3);">';
//                htmls += ' <a href="'+curWwwPath+'zdjs/buildList.html" target="_blank" title="">制度建设</a>&nbsp;&nbsp;&nbsp;';    
//                htmls += '</li>';
//                
//                htmls += ' <li style="padding-left:29px;" id="s_4" class="s_li" onmouseover="mover(4);" onmouseout="mout(4);">';
//                //htmls += ' 页面正在开发中';
//                
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=1" target="_blank" title="">清源</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=2" target="_blank" title="">净网</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=3" target="_blank" title="">护苗</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=4" target="_blank" title="">固边</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=5" target="_blank" title="">秋风</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'zxxd/activityList.html?type=6" target="_blank" title="">其他</a>&nbsp;&nbsp;&nbsp;';   
//                htmls += '</li>';

//                htmls += ' <li style="padding-left:29px;" id="s_5" class="s_li" onmouseover="mover(5);" onmouseout="mout(5);">';
                //htmls += ' <a href="'+curWwwPath+'whxc/showList.html" target="_blank" title="">演出</a>&nbsp;&nbsp;&nbsp;';
                //htmls += ' <a href="'+curWwwPath+'whxc/bulletinList.html" target="_blank" title="">简报</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'whxc/silhouetteList.html" target="_blank" title="">墙报</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'whxc/videoList.html" target="_blank" title="">视频</a>&nbsp;&nbsp;&nbsp;';
                // htmls += ' <a href="'+curWwwPath+'whxc/otherList.html" target="_blank" title="">其他</a>&nbsp;&nbsp;&nbsp;';  
//                htmls += '</li>';

//                htmls += ' <li style="padding-left:29px;" id="s_6" class="s_li" onmouseover="mover(6);" onmouseout="mout(6);">';
//                htmls += ' 案件公示&nbsp;&nbsp;&nbsp;';
//                htmls += ' 案件(非公式类型)';
//                htmls += '</li>';

//                htmls += ' <li style="padding-left:29px;" id="s_7" class="s_li" onmouseover="mover(7);" onmouseout="mout(7);">';
//                htmls += ' <a href="'+curWwwPath+'tsjb/alarmList.html" target="_blank" title="">举报</a>&nbsp;&nbsp;&nbsp;';
//                htmls += ' <a href="'+curWwwPath+'tsjb/appealList.html" target="_blank" title="">投诉</a>&nbsp;&nbsp;&nbsp;';
//                htmls += '</li>';

                // htmls += ' <li style="padding-left:29px;" id="s_8" class="s_li" onmouseover="mover(8);" onmouseout="mout(8);">';
                // htmls += ' 页面正在开发中';      
                // htmls += '</li>';

                // htmls += ' <li style="padding-left:29px;" id="s_9" class="s_li" onmouseover="mover(9);" onmouseout="mout(9);">';
                // htmls += ' 页面正在开发中';  
                // htmls += '</li>';

                //$('.smenu').html(htmls);