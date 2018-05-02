package com.emindsoft.zsj.news.ctrl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import cn.dreampie.routebind.ControllerKey;

import com.emindsoft.zsj.base.anatation.PowerBind;
import com.emindsoft.zsj.base.ctrl.AdminBaseController;
import com.emindsoft.zsj.news.model.Dynamic;
import com.emindsoft.zsj.news.model.Events;
import com.emindsoft.zsj.news.model.History;
import com.emindsoft.zsj.system.model.RolePower;
import com.emindsoft.zsj.system.model.User;
import com.emindsoft.zsj.util.Tools;
import com.emindsoft.zsj.vo.ApageVO;
import com.emindsoft.zsj.vo.EventsSelectVO;
import com.emindsoft.zsj.vo.HistorySelectVO;
import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;

@ControllerKey("history")
public class HistoryCtrl extends AdminBaseController<History>{
	
	public HistoryCtrl(){
		this.modelClass=History.class;
	}
	
	@Before(Tx.class)
	public void add() throws Exception{
		History h;
		try {
			h=(History)getModel();
			h.set("keyid", History.dao.getId());
			Date date = new Date();
			String nowdate = new String(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
			h.set("time", nowdate);
			String creator = getCurrentUserId();
			User u = User.dao.loadUserDetail(creator);
			h.set("creator", u.getStr("relaname"));//生成创建者
			h.set("createuserid", creator);
			h.set("status", 4);
			h.set("regionId",  u.getStr("RegionId"));
			h.save();
			processAttachment(h.getStr("keyid"));
			success(h.getStr("keyid"));
		} catch (Exception e) {
			log.error("保存异常", e);
			this.error(801);
			throw e;
		}
	}
	@PowerBind(code = "1203_EditPower", funcName = "编辑历史事件")
	public void edit(){
		History h;
		try{
			h=(History)getModel();
			h.update();
			success(h.getStr("keyid"));
		} catch (Exception e) {
			log.error("保存异常", e);
			this.rendJson(false, null, "保存数据异常！");
		}
	}
	@PowerBind(code = "1203_DelPower", funcName = "删除历史事件")
	@Before(Tx.class)
	public void delete(){
		String[] keyids = getPara("keyids").split(",");
		History.dao.deleteHistoryByIds(keyids);
		success();
	}
	
	public void editData() {			
		String keyid = getPara("keyid");
		History h = History.dao.loadHistoryDetail(keyid);
		success(h);
	}
	
	public void listPage(){
		RolePower rp ;
		String chooseRegionId = getChooseRegionId();
		String fid = getCurrentUserId();
		String userRegionId = getCurrentUserRegionId();
		String ispublic = getPara("ispublic");
		if(StringUtils.isEmpty(chooseRegionId)||"undefined".equals(chooseRegionId)||userRegionId.equals(chooseRegionId)){
			rp = RolePower.dao.getOperPower("500", getCurrentUserId());
		} else {
			rp = RolePower.dao.getLookPower("500", getCurrentUserId());;
		}		
		
		HistorySelectVO hisVO = Tools.getSubVO(HistorySelectVO.class, getRequest());
		Page<History> hisPage=History.dao.page(getPageNo(), getPageSize(), hisVO,fid,chooseRegionId,userRegionId,ispublic);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("aPage", new ApageVO(hisPage,rp));
		success(map);
	}
	
	/**
	 * 官网分页列表
	 */
	public void getHistoryList() {
		String regioncode=getPara("regioncode");
		Page<History> pageList = History.dao.page(getPageNo(), getPageSize(),regioncode);
		success(pageList);
	}
	
}
