package com.emindsoft.zsj;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.emindsoft.zsj.system.model.User;
import com.emindsoft.zsj.vo.onlineUser;

public class SessionListener implements HttpSessionListener{

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("=============创建新session==================");
//
//		ServletContext sc=se.getSession().getServletContext();
//		String uid=(String) se.getSession().getAttribute("onlineUser");
//		Map<String, String> onlineUser=(Map<String, String>) sc.getAttribute("onlineUser");
//		if (onlineUser==null || onlineUser.size()==0 || uid==null) {
//			return;
//		}
//		
//		if (!onlineUser.containsKey(uid)) {
//			User u=User.dao.findById(uid);
//			String uip=se.getSession().getgetRequest().getHeader("X-Real-IP");
//			sc.setAttribute("onlineUser", onlineUser);
//		}
	
	}

	@Override
	public synchronized void  sessionDestroyed(HttpSessionEvent se) {
		ServletContext sc=se.getSession().getServletContext();
		String uid=(String) se.getSession().getAttribute("onlineUser");
		List<onlineUser> onlineUsers=(List<onlineUser>) sc.getAttribute("onlineUser");
		if (onlineUsers==null || onlineUsers.size()==0 || uid==null) {
			return;
		}
		for(onlineUser u:onlineUsers){
		if (u.getUid().equals(uid)) {
			onlineUsers.remove(u);
			
		}
		}
		sc.setAttribute("onlineUser", onlineUsers);
	}

}
