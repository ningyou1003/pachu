package com.emindsoft.zsj.system.model;

import cn.dreampie.tablebind.TableBind;
import com.emindsoft.zsj.base.model.BaseModel;
import com.emindsoft.zsj.system.vo.LogSelectVO;
import com.emindsoft.zsj.util.PropertiesContent;
import com.jfinal.plugin.activerecord.Page;
import org.apache.commons.lang.StringUtils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 系统日志的model 系统日记主要为记录系统中所有的操作，比如：登录、退出、查询、修改、删除、添加、审核、等等
 * 
 * @author ym
 */
@TableBind(tableName = "s_log")
// 引用@TableBind注解标签表明该类与数据库的表s_log对应
public class Log extends BaseModel<Log> {
	public static Log dao = new Log(); // new一个log类的静态对象dao，方便进行全局操作数据库
	public static String table = "s_log"; // 把对应的表名赋予给变量table，方便调用

	/**
	 * 日志分页方法
	 * 
	 * @param pageNo
	 *            :当前页
	 * @param pageSize
	 *            :页面显示大小
	 * @param lsVO
	 *            ：日志模块中“查询功能“的类（自定义的）LogSelectVO的对象
	 * @param user
	 * @return
	 */
	public Page<Log> page(int pageNo, int pageSize, LogSelectVO lsVO, User user,String selectRegionId) {

		// 查询日志表和部门表的有关数据
		String sql = "select g.keyid,g.module,g.time,g.username,g.uip,g.ocontent,"
				+ "(select i.departmentname from " + OrgDepartment.table + " i where i.keyid = g.s_departmentid) as department," +
				"(SELECT CASE a.demonstration WHEN 1 THEN CONCAT(a.Region,'(示范)') ELSE a.Region END AS Region FROM " + Area.table + " a WHERE a.RegionCode = g.RegionCode) as region," +
				"(SELECT o.org_fullname FROM " + Org.table + " o WHERE o.keyid = g.OrgId) as org ";

		// 日志按地区分类,可以看到下级日志
		String sqlExceptSelect = "FROM " + table
				+ " g WHERE 1 = 1 and g.RegionCode = '" + selectRegionId + "' ";

		List<String> paramList = new ArrayList<String>();

		// 依次判断查询功能的个个参数值是否为空
		if (lsVO.getName() != null) {
			sqlExceptSelect += " AND g.username like ? ";
			paramList.add("%" + lsVO.getName() + "%");
		}
		/*if (lsVO.getDepartment() != null) {
			sqlExceptSelect += " AND s_departmentid in ("
					+ getDepChildSql(lsVO.getDepartment()) + ")";
		}*/
		if (lsVO.getRegionCode() != null) {
			sqlExceptSelect += " AND g.RegionCode = ? ";
			paramList.add(lsVO.getRegionCode());
		}/*else{
			String regionCode = user.getStr("regionid");
			List<Area> areaList = new ArrayList<Area>();
			areaList = Area.dao.getChildList(areaList, regionCode);
			if(areaList.size()>0){
				sqlExceptSelect += " AND g.RegionCode in ('";
				for(Area area:areaList){
					sqlExceptSelect += area.getStr("regioncode")+"','";
				}
				sqlExceptSelect += "')";
			}
		}*/
		if (lsVO.getOrgId() != null) {
			sqlExceptSelect += " AND g.OrgId = ? ";
			paramList.add(lsVO.getOrgId());
		}
		
		if (lsVO.getBeginTime() != null) {
			sqlExceptSelect += " AND g.time > ? ";
			paramList.add(lsVO.getBeginTime());
		}
		if ((lsVO.getEndTime() != null)) {
			sqlExceptSelect += " AND g.time < ? ";
			paramList.add(lsVO.getEndTime());
		}
		sqlExceptSelect += " ORDER BY g.time DESC";

		if (paramList.size() != 0) {
			return this.paginate(pageNo, pageSize, sql, sqlExceptSelect,
					paramList.toArray());
		} else {
			return this.paginate(pageNo, pageSize, sql, sqlExceptSelect);
		}
	}


	/**
	 * 删除功能，直接调用基础model的删除方法
	 * 
	 * @param keyids
	 * @return
	 */
	public boolean deleteByIds(String[] keyids) {
		return super.deleteByIds(keyids, table);
	}

	/**
	 * 写入基本操作日志
	 * 
	 * @param powerCode
	 * @param currentUserId
	 * @param ip
	 * @param otherdesc
	 */
	public void wirteLog(String powerCode, String currentUserId, String ip,
			String otherdesc) {
		System.out.println(powerCode);
		// 　写入日志是否已经开启
		if (!PropertiesContent.getToBool("wirte_log", false)) {
			return;
		}

		String desc = "";

		if (StringUtils.isEmpty(otherdesc)) {
//			desc = "%s于%s对【%s模块】进行了%s 。";
			desc = "对%s模块进行了%s 。";
		} else {
			desc = otherdesc;
		}
		String[] powers = powerCode.split("_");
		Power p = Power.dao.findById(powers[0]);
		if (p==null) {
			return;
		}
		String pdesc = "";
		
		if ("LookPower".equals(powers[1])) {
			pdesc = "查询操作";
		} else if ("EditPower".equals(powers[1])) {
			pdesc = "修改操作";
		} else if ("AddPower".equals(powers[1])) {
			pdesc = "添加操作";
		} else if ("AppPower".equals(powers[1])) {
			pdesc = "运行操作";
		} else if ("DelPower".equals(powers[1])) {
			pdesc = "删除操作";
		}else if ("CheckPower".equals(powers[1])) {
			pdesc = "审核操作";
		}
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		User u = User.dao.findById(currentUserId);

//		desc = String.format(desc, u.getStr("username"), df.format(new Date()),
//				p.getStr("name"), pdesc);
		desc = String.format(desc, p.getStr("name"), pdesc);
		System.out.println("创建日志："+desc);
		Log l = new Log();
		l.set("KeyID", getId());
		l.set("Module", p.getStr("name"));
		l.set("Time", df.format(new Date()));
		l.set("UserID", u.getStr("keyid"));
		l.set("S_DepartmentID", u.getStr("orgdepid"));
		l.set("UserName", u.getStr("username"));
		l.set("UIP", ip);
		l.set("OContent", desc);
		l.set("RegionCode", u.getStr("RegionId"));
		l.set("OrgId", u.getStr("orgid"));
		
		l.save();
	}

	/**
	 * 无权限无法操作方法的记录
	 * 
	 * @param powerCode
	 *            权限索引
	 * @param currentUserId
	 *            操作人的ID
	 * @param ip
	 */
	public void wirteDeny(String powerCode, String currentUserId, String ip) {
		wirteLog(powerCode, currentUserId, ip, "%s于%s对%s模块进行%s操作，因无权限被拒绝。");
	}
}
