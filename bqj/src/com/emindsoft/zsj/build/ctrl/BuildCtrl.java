package com.emindsoft.zsj.build.ctrl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import cn.dreampie.routebind.ControllerKey;
import com.emindsoft.zsj.base.anatation.PowerBind;
import com.emindsoft.zsj.base.ctrl.AdminBaseController;
import com.emindsoft.zsj.base.interceptor.PermissionInterceptor;
import com.emindsoft.zsj.build.model.Build;
import com.emindsoft.zsj.build.vo.BuildSelectVO;
import com.emindsoft.zsj.system.model.Area;
import com.emindsoft.zsj.system.model.Role;
import com.emindsoft.zsj.system.model.RolePower;
import com.emindsoft.zsj.system.model.User;
import com.emindsoft.zsj.util.Tools;
import com.emindsoft.zsj.vo.PageVO;
import com.jfinal.aop.ClearInterceptor;
import com.jfinal.aop.ClearLayer;
import com.jfinal.plugin.activerecord.Page;

@ControllerKey("build")
public class BuildCtrl extends AdminBaseController<Build> {
	
	public BuildCtrl() {
		this.modelClass = Build.class;
	}
	
	/**
	 * 添加
	 * 
	 */
	@PowerBind(code = "1511_AddPower", funcName = "制度建设添加")
	// 调用自定义的注解@PowerBind，code权限代码，funcName功能名称
	public void add() {
		Build build;
		try {
			build = getModel();
			build.set("keyid", Build.dao.getId());
//			build.set("releaseTime",dateTimeFormat.format(new Date()));
			build.set("userId",getCurrentUserId());
			
			String RegionId=getCurrentUserRegionId();
			try {
				
				
				if (!"undefined".equals(getChooseRegionId()) && getChooseRegionId().length()>10) {
					if(Integer.parseInt(RegionId)<Integer.parseInt(getChooseRegionId()))
					RegionId=getChooseRegionId();
				}
			} catch (Exception e) {
				e.printStackTrace();
				//异常改变区域id
				RegionId=getCurrentUserRegionId();
			}
			build.set("regionId",RegionId);
			build.save();
			processAttachment(build.getStr("keyid"));
			success();
		} catch(Exception e) {
			log.error("添加异常！", e);
			error(003, "保存失败！");
		}
	}
	
	/**
	 * 删除
	 * 
	 */
	@PowerBind(code = "1511_DelPower", funcName = "制度建设删除")
	// 调用自定义的注解@PowerBind，code权限代码，funcName功能名称
	public void delete() {
		String[] keyids = getPara("keyids").split(",");
		Build.dao.deleteById(keyids);
		success(001);
	}
	
	/**
	 * 更新
	 * 
	 */
	@PowerBind(code = "1511_EditPower", funcName = "制度建设更新")
	// 调用自定义的注解@PowerBind，code权限代码，funcName功能名称
	public void edit() {
		Build build;
		try {
			build = getModel();
			build.set("userId",getCurrentUserId());
//			build.set("releaseTime",dateTimeFormat.format(new Date()));
			build.update();
			success(build.getStr("keyId"));
		} catch(Exception e) {
			log.error("更新异常！", e);
			error(002, "保存失败！");
		}
	}
	
	/**
	 * 获取更新数据
	 */
	@ClearInterceptor(ClearLayer.ALL)
	public void editData() {
		String keyid = getPara("keyId");
		Build build = Build.dao.findById(keyid);
		success(build);
	}
	
	/**
	 * 分页列表
	 * 
	 */
	@PowerBind(code = "1511_LookPower", funcName = "制度建设列表")
	// 调用自定义的注解@PowerBind，code权限代码，funcName功能名称
	public void buildList() {
		String selectRegionId;
		RolePower rp;
		String userRegionId = getCurrentUserRegionId();
		String chooseRegionId =getChooseRegionId();
		Role r=Role.dao.findRolesByUser(getCurrentUserId());
		int orderid=0;
		if (r!=null) {
			orderid=r.getInt("orderid");
		}
		List<String> parentregion=Area.dao.getAllParentAreaRegionId(chooseRegionId);
		
		if(StringUtils.isEmpty(chooseRegionId) || "undefined".equals(chooseRegionId) || userRegionId.equals(chooseRegionId) 
				|| (parentregion.contains(userRegionId) && 5==orderid)) {
			rp = RolePower.dao.getOperPower("1511", getCurrentUserId());
			selectRegionId = userRegionId;
		} else {
			rp = RolePower.dao.getLookPower("1511",getCurrentUserId());
			selectRegionId = chooseRegionId;
		}
		
		if (!"undefined".equals(chooseRegionId)) {
			selectRegionId=chooseRegionId;
		}
		
		BuildSelectVO bsVO = Tools.getSubVO(BuildSelectVO.class, getRequest());
		Page<Build> pageList = Build.dao.page(getPageNo(), getPageSize(),bsVO,selectRegionId);
		success(new PageVO(pageList,rp));
	}
	
	/**
	 * 分页列表
	 * 
	 */
	@ClearInterceptor(ClearLayer.ALL)
	public void  getBuildList() {
		String regioncode=getPara("regioncode");
		Page<Build> list = Build.dao.page(getPageNo(), getPageSize(),regioncode);
		success(list);
	}
	

}
