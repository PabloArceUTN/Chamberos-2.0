$(document).ready(function () {	
	CHAMB.startUp();
	CHAMB.editUserLoad();
	$("#logOut").click(CHAMB.userLogout);/*Log out the current user :)*/ 
	$("#btnmanage").click(function () {
		window.location = "/Chamberos-2.0/main/users/new-user.html";
	});
	var mod = new CHAMB.model();	
	$("#cancel").click(function () {		
		mod.globalIdSet(0);
		window.location = "/Chamberos-2.0/main/users/";
	});
	debugger;
	CHAMB.actualId = $("#iduser").val();
	$("#save").click(CHAMB.editUser);
});