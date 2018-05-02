package com.emindsoft.zsj.zoneDefence.ctrl;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import cn.dreampie.routebind.ControllerKey;

import com.emindsoft.zsj.base.anatation.PowerBind;
import com.emindsoft.zsj.base.ctrl.AdminBaseController;
import com.emindsoft.zsj.system.model.RolePower;
import com.emindsoft.zsj.vo.PageVO;
import com.emindsoft.zsj.zoneDefence.model.ZoneDefence;
import com.jfinal.plugin.activerecord.Page;

@ControllerKey("zoneDefence")
public class ZoneDefenceCtrl extends AdminBaseController<ZoneDefence>{

	public ZoneDefenceCtrl() {
		this.modelClass = ZoneDefence.class;
	}
	
	@PowerBind(code = "200_LookPower", funcName = "区域联防列表")
	public void zoneDefenceList() {
		RolePower rp ;
		String chooseRegionId = getChooseRegionId();
		String userRegionId = getCurrentUserRegionId();
		String regionCode = "";
		if(StringUtils.isEmpty(chooseRegionId)||"undefined".equals(chooseRegionId)||userRegionId.equals(chooseRegionId)){
			rp = RolePower.dao.getOperPower("200", getCurrentUserId());
			regionCode = userRegionId;
		} else {
			rp = RolePower.dao.getLookPower("200", getCurrentUserId());
			regionCode = chooseRegionId;
		}
		String title = getPara("title");
		String ispublic = getPara("ispublic");
		Page<ZoneDefence> zdList = ZoneDefence.dao.page(getPageNo(), getPageSize(), regionCode,title, ispublic);
		PageVO zdVO = new PageVO(zdList, rp);
		success(zdVO);
	}
	
	/**
	 * 添加区域联防
	 */
	@PowerBind(code = "200_AddPower", funcName = "添加区域联防")
	public void add() {
		ZoneDefence zd;
		try {
			zd = getModel();
			zd.set("KeyId", ZoneDefence.dao.getId());
			zd.set("createUserId", getCurrentUserId());
			Date date=new Date();
			DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time=format.format(date);
			zd.set("createTime", time);
			zd.set("regionId", getCurrentUserRegionId());
			zd.set("status", 4);
			zd.save();
			processAttachment(zd.getStr("keyid"));
			success(zd.get("keyid"));
		} catch (Exception e) {
			log.error("添加区域联防异常", e);
			error(003);
		}
	}
/**
 * 修改区域联防
 */
	@PowerBind(code = "200_EditPower", funcName = "编辑区域联防")
	public void edit() {					
		ZoneDefence zd;
		try {
			zd = getModel();
			zd.update();
			success(zd.getStr("KeyId"));
		} catch (Exception e) {
			log.error("更新区域联防异常", e);
			error(003);
		}
	}

	/**
	 * 获取区域联防修改数据
	 */
	public void editData(){
		String keyid = getPara("keyid");
		ZoneDefence zd = ZoneDefence.dao.findById(keyid);
		success(zd);
	}
	
	/**
	 * 删除选择的区域联防
	 */
	@PowerBind(code = "200_DelPower", funcName = "删除区域联防")
	public void delete() {
		String[] keyids = getPara("keyids").split(",");
		ZoneDefence.dao.deleteByIds(keyids);
		success(001);
	}

}
