package com.emindsoft.zsj.news.model;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.emindsoft.zsj.base.model.BaseModel;
import com.emindsoft.zsj.vo.DynamicSelectVO;
import com.jfinal.plugin.activerecord.Page;

import cn.dreampie.tablebind.TableBind;

@TableBind(tableName = "n_dynamic",pkName = "KeyId")
public class Dynamic extends BaseModel<Dynamic>{

	private static final long serialVersionUID = -5877095461333921908L;
	public static Dynamic dao = new Dynamic();
	public static String table = "n_dynamic";
	
	
	public boolean deleteDynamicByIds(String[] keyids) {
		return super.deleteByIds(keyids, table);
		
	}


	public Dynamic loadDynamicDetail(String keyid) {
		if (!StringUtils.isEmpty(keyid)) {
			return findFirst("select * from n_dynamic d where d.keyid='"+keyid+"' ");
		} else {
			return null;
		}
	}


	public Page<Dynamic> page(int pageNo, int pageSize, DynamicSelectVO dyVO,String uid,String chooseRegionId,String userRegionId,String ispublic) {
		if(!StringUtils.isEmpty(chooseRegionId)&& !"undefined".equals(chooseRegionId)&& !chooseRegionId.equals(userRegionId)){
			String sqlExceptSelect = " FROM n_dynamic d where d.regionId='"+chooseRegionId+"' and d.status<>0 ";
			if (!StringUtils.isEmpty(dyVO.getName())) {
				sqlExceptSelect += " and d.Title like '%" + dyVO.getName()
						+ "%' ";
			}
			if(StringUtils.isNotEmpty(ispublic)){
				sqlExceptSelect += "and d.ispublic='" +ispublic+"'";
			}
			sqlExceptSelect += " ORDER BY d.Time DESC";
			return this
					.paginate(
							pageNo,
							pageSize,
							"select d.*,(SELECT u.RelaName FROM s_user u WHERE u.KeyID=d.reportPersonId) as reporter",
							sqlExceptSelect);
		}else{
			String sqlExceptSelect = " FROM n_dynamic d where d.regionId='"+userRegionId+"' and d.status<>0 ";
			if (!StringUtils.isEmpty(dyVO.getName())) {
				sqlExceptSelect += " and d.Title like '%" + dyVO.getName()
						+ "%' ";
			}
			if(StringUtils.isNotEmpty(ispublic)){
				sqlExceptSelect += "and d.ispublic='" +ispublic+"'";
			}
			sqlExceptSelect += " ORDER BY d.Time DESC";
			return this
					.paginate(
							pageNo,
							pageSize,
							"select d.*,(SELECT u.RelaName FROM s_user u WHERE u.KeyID=d.reportPersonId) as reporter",
							sqlExceptSelect);
		}
	}


	public List<Dynamic> findIndexPage(String userRegionId,String chooseRegionId) {
		String sql="select d.KeyId, d.Title from n_dynamic d where 1=1 ";
		if(!StringUtils.isEmpty(chooseRegionId)&& !"undefined".equals(chooseRegionId)&& !chooseRegionId.equals(userRegionId)){//点击区域展示的数据
			sql +="and d.regionId='"+chooseRegionId+"' ORDER BY d.Time DESC ";
		}else{
			sql +="and d.regionId='"+userRegionId+"'  ORDER BY d.Time DESC ";
		}
		return find(sql);
	}
	/**
	 * 新的平台首页图片轮播查询，Content就是图片附件的path（地址）
	 * @param userRegionId 用户区域编码
	 * @param chooseRegionId 当前区域编码
	 * @return
	 */
	public List<Dynamic> findIndexPageNew(String userRegionId,String chooseRegionId,int number) {
		//与旧的相比，不是单表查询，是与附件表一起查询，一次返回所需结果
		String sql="select d.KeyId, d.Title,a.Path as Content,COUNT(DISTINCT d.KeyId) from n_dynamic d,base_attachment a where 1=1 ";
		//如果没有获取到当前区域编码，则默认使用用户区域编码
		if(!StringUtils.isEmpty(chooseRegionId)&& !"undefined".equals(chooseRegionId)&& !chooseRegionId.equals(userRegionId)){//点击区域展示的数据
			sql +="and d.regionId='"+chooseRegionId+"' ";
		}else{
			sql +="and d.regionId='"+userRegionId+"' ";
		}
		//           不显示未审核内容                                                      只获得附件是图片的记录                                                                                               只获取前n条记录
		sql+=" AND d.`Status`<>0 and a.relateType='dynamic' and a.relateId=d.KeyId AND (a.Path LIKE '%.jpg%' OR a.Path  LIKE '%.jpeg%' OR a.Path LIKE '%.png%' OR a.Path LIKE '%.bmp%') group by d.KeyId ORDER BY d.Time DESC LIMIT "+number;
		return find(sql);
	}

	public List<Dynamic> findIndexPageText(String userRegionId,String chooseRegionId) {
		String sql="select * from n_dynamic d where 1=1 ";
		if(!StringUtils.isEmpty(chooseRegionId)&& !"undefined".equals(chooseRegionId)&& !chooseRegionId.equals(userRegionId)){//点击区域展示的数据
			sql +="and IsPublic=1 and d.regionId='"+chooseRegionId+"' ORDER BY d.Time DESC ";
		}else{
			sql +="and IsPublic=1 and d.regionId='"+userRegionId+"'  ORDER BY d.Time DESC ";
		}
		return find(sql);
	}
	
	public List<Dynamic> findIndexPageWeb() {
		//String sql="select d.KeyId from n_dynamic d where d.IsPublic =1 ORDER BY d.Time DESC";
		String sql = "select d.KeyId, d.Title from n_dynamic d where d.KeyId in (SELECT RelateId FROM base_attachment where  Path like('%.jpg') or Path like('%.png') or Path like('%.jpeg') or Path like('%.bmp') ) AND d.IsPublic =1 ORDER BY d.Time DESC LIMIT 20";
		return find(sql);
	}
	
	public List<Dynamic> findIndexPageWeb(String regioncode) {
		//String sql="select d.KeyId from n_dynamic d where d.IsPublic =1 ORDER BY d.Time DESC";
		String sql = "select d.KeyId, d.Title from n_dynamic d where d.regionId='"+regioncode+"' and d.KeyId in (SELECT RelateId FROM base_attachment where  Path like('%.jpg') or Path like('%.png') or Path like('%.jpeg') or Path like('%.bmp') ) AND d.IsPublic =1 ORDER BY d.Time DESC LIMIT 20";
		return find(sql);
	}
	
	public List<Dynamic> findIndexPageWebText() {
		String sql="select * from n_dynamic d where d.IsPublic =1 ORDER BY d.Time DESC";
		return find(sql);
	}
	public List<Dynamic> findIndexPageWebText(String regioncode,int number) {
		String sql="select * from n_dynamic d where d.IsPublic =1 and d.regionId='"+regioncode+"' ORDER BY d.Time DESC limit "+number;
		return find(sql);
	}

	public Page<Dynamic> pageApp(int page, int pageSize,String regionId) {
		String sqlExceptSelect = " FROM n_dynamic d where d.IsPublic= 1 and d.regionId='" +regionId+"'";
		sqlExceptSelect += " ORDER BY d.Time DESC";
		return this.paginate(page,pageSize,"select * ",sqlExceptSelect);
	}


	public List<Dynamic> findIndexPageApp() {
		//String sql="select d.KeyId, d.Title from n_dynamic d where d.IsPublic =1 ORDER BY d.Time DESC";
		String sql="select d.KeyId, d.Title from n_dynamic d where d.KeyId in (SELECT RelateId FROM base_attachment where  Path like('%.jpg') or Path like('%.png') or Path like('%.jpeg') or Path like('%.bmp') ) AND d.IsPublic =1 ORDER BY d.Time DESC LIMIT 20";
		return find(sql);
	}	
}
