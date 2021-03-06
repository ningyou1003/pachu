package com.emindsoft.zsj.system.model;

import cn.dreampie.tablebind.TableBind;
import com.emindsoft.zsj.base.model.BaseModel;

import java.util.Date;
import java.util.List;

@TableBind(tableName = "s_area_member", pkName = "KeyId")
public class AreaMember extends BaseModel<AreaMember> {

	public static AreaMember dao = new AreaMember();
	public static String table = "s_area_member";

	/**
	 * 根据区域编码和类型查询
	 * @param regionCode
	 * @param type
	 * @return
	 */
	public List<AreaMember> findByRegion(String regionCode, String type) {
		return find("select * from " + table
				+ " where regionCode=? and type=? order by orderid is null, orderid+0 asc,createtime ,millisecond",
				regionCode, type);
	}
	//2016-12-6 Excel导入  开始
	public List<AreaMember> findByName(String regionCode,String type,String name){
		return find("select * from "+table
				+ " where regionCode=? and type=? and name=? order by orderid is null, orderid+0 asc,createtime ,millisecond",
				regionCode,type,name);
	}
	//2016-12-6 Excel导入  结束
}
