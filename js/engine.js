/*Namespace by Pablo Arce Cascante*/
var CHAMB = CHAMB || { /*The target is not confuse with others objects.*/
	admin: false,
	actualUser: '',	
	userLogin: function () {
		/*Validate existing user*/
		var mod = new CHAMB.model();		
		for (var i = 0; i < mod.loadUserData.length; i++) {
			if ((mod.loadUserData[i].user==$("#iduser").val()) && (mod.loadUserData[i]==$("#idpass").val())) {
				mod.saveCU(mod.loadUserData[i].user, false);
				document.location.href = "/Chamberos-2.0/main/chamberos.html";
				return;
			};
		};
		/*Open the gate for the admin*/
		if (($("#iduser").val()=="admin")&&($("#idpass").val()=="a")) {
			mod.saveCU("Admin", true);
			window.location = "/Chamberos-2.0/main/chamberos.html";
			return;		
		}
		/*Error validating here*/		
		$("#iderror").addClass("show");/*Get id of label and add a class '.show'*/		
		$("#field1").addClass("has-error");/*This put the class '.has-error' in the inputs fields*/
		$("#field2").addClass("has-error");
	},
	userLogout: function(){		
		localStorage.currentUser = "";
		window.location = "/Chamberos-2.0/";
	},
	startUp: function(){
		var mod = new CHAMB.model();/*Instance*/
		$("#userName").text(mod.loadCU()[0].user);/*Put the current user name*/
		if (mod.loadCU()[0].state==true) {
			$("#usernav").addClass("show");
			$("#adminpanel").addClass("show");
		};
	},
	userManager: function() {/*Load setings in the user dash... validate a Admin*/
		var mod = new CHAMB.model();
		$("#userName").text(mod.loadCU()[0].user);/*Put the current user name*/
		if (mod.loadCU()[0].state) {
			$("#usernav").addClass("show");
			$("div[name = adminDiv]").addClass("show");
		};
	},
	saveUser: function(){
		debugger;
		var pass1 = $("#pass1").val(),
		pass2 = $("#pass2").val();		
		/*validate the password*/
		if ((pass1 != pass2) || ((pass1 == "") || (pass2 == "")) ||(pass1.includes(" ") || pass2.includes(" "))) {
			$("div[name = passput]").addClass("has-error");
			$("#error").addClass("show");
			return;			
		};	
		/*validate a new id for the new user*/
		var mod = new CHAMB.model(),
		newId = mod.loadUserData().length+1;
		labelagain: for (var i = 0; i < mod.loadUserData().length ; i++) {
			if (1==newId) {/*ask if the new id number exist in the JSON file*/
				newId+=1;
				continue labelagain;
			};
		};
		/*Save a new user*/
		mod.saveUserData(newId, $("#fullname").val(), $("#username").val(), pass1);
	},
	fillUserInfo: function() {		
		var mod = new CHAMB.model();
		for (var i = 0; i < mod.loadUserData().length; i++) {
			CHAMB.loadTables(mod.loadUserData()[i].userid, mod.loadUserData()[i].userid, mod.loadUserData()[i].fullName, mod.loadUserData()[i].username, mod.loadUserData()[i].password,4);
		};		
	},
	fillClientInfo: function  () {
		var mod = new CHAMB.model();
		for (var i = 0; i < mod.loadUserData.length; i++) {
			CHAMB.loadTables(mod.loadUserData[i].userId, mod.loadUserData[i].firstName, mod.loadUserData[i].lastName, mod.loadUserData[i].userName, null,4);
		};		
	},
	fillChambaInfo: function  () {
		var mod = new CHAMB.model();
		for (var i = 0; i < mod.loadUserData.length; i++) {
			CHAMB.loadTables(mod.loadUserData[i].userId, mod.loadUserData[i].firstName, mod.loadUserData[i].lastName, mod.loadUserData[i].userName, null,4);
		};		
	},
	fillInvoiceInfo: function  () {
		var mod = new CHAMB.model();
		for (var i = 0; i < mod.loadUserData.length; i++) {
			CHAMB.loadTables(mod.loadUserData[i].userId, mod.loadUserData[i].firstName, mod.loadUserData[i].lastName, mod.loadUserData[i].userName, null,4);
		};		
	},	
	loadTables: function (pId, p1, p2, p3, p4, p5, pCellNums) {/*Load info on tables and in the select*/
		debugger;
		var table = document.getElementById("idtable");/*Table Object, insert a new row*/
		var tableRow = table.insertRow();
		var selectOtion = $("#selectmov");/*Select Object*/
		$(tableRow).addClass("active");
		/*If is a table with only 4 cells...*/
		var cell0 = tableRow.insertCell(0),
		cell1 = tableRow.insertCell(1),
		cell2 = tableRow.insertCell(2);		
		cell0.innerHTML = p1;
		cell1.innerHTML = p2;
		cell2.innerHTML = p3;
		if (pCellNums>5) {
			var cell3 = tableRow.insertCell(3),
			cell4 = tableRow.insertCell(4),
			cellOptions = tableRow.insertCell(5);
			cell3.innerHTML = p4;
			cell4.innerHTML = p5;
		} else {
			var cellOptions = tableRow.insertCell(pCellNums);
		}

		$(cellOptions).append('<div class = "pull-right"><input name = "deletebutton" value = '+pId+' type="image" src="/Chamberos-2.0/pics/delete.png" alt="button"></div>');
		$(cellOptions).append('<div class = "pull-right"><input name = "editbutton" value = '+pId+' type="image" src="/Chamberos-2.0/pics/edit.png" alt="button"></div>');
		// cellOptions.innerHTML = "Botones";

	},
	changeDelete: function() {
		debugger;
		var op = $(this).val();
		/*window.location ="/Chamberos-2.0/main/users/delete-user.html";*/
	},
	editUserLoad: function () {
		var mod = new CHAMB.model();
		for (var i = 0; i < mod.loadUserData().length; i++) {
			if (mod.loadUserData()[i].userid==localStorage.globalId) {/*if match with the previous id selected exist, load this information*/
				$("#iduser").val(mod.loadUserData()[i].userid);/*Set id number*/
				$("#fullname").val(mod.loadUserData()[i].fullName);/*set fullname of user*/
				$("#username").val(mod.loadUserData()[i].username);/*Set the username on field*/
				$("#oldpassword").text(mod.loadUserData()[i].password);/*again!*/
				$("#pass1").val(mod.loadUserData()[i].password);
				$("#pass2").val(mod.loadUserData()[i].password);
			};
		};
	},
	model: function() {
		this.userArray = [];/*This array save temp*/
		this.chambaArray = [];
		this.clientArray = [];
		this.invoiceArray = [];	
		this.currentUser = [];
		this.globalIdSet = function(tookId) {/*Always create a new globalId in the localStorage*/
			localStorage.setItem("globalId", tookId);
		};
		this.loadUserData = function(){/*This load the users form localStorage*/
			if (localStorage["userStorage"]==undefined)
				localStorage.setItem("userStorage","");
			return JSON.parse(localStorage.userStorage);
		};
		this.saveUserData = function(pId, pName, pUserName, pPass){/*This save an users in the localStorage*/
			debugger;
			if (localStorage["userStorage"]==undefined)
				localStorage.setItem("userStorage","");
			var userObj = {userid: pId, fullName: pName, username: pUserName, password: pPass};
			var mod = new CHAMB.model();			
			this.userArray = mod.loadUserData();
			this.userArray.push(userObj);
			localStorage.userStorage = JSON.stringify(this.userArray);
		};
		this.saveCU = function(pUser, pState){
			debugger;
			if (localStorage["currentUser"]==undefined)/*if currentUser doesn't exist it's created*/
				localStorage.setItem("currentUser", "");
			localStorage.currentUser = "";/*Clear the previous data stored*/
			this.currentUser.push({user: pUser, state: pState});
			localStorage.currentUser = JSON.stringify(this.currentUser);
		};
		this.loadCU = function(){/*load a current user information*/
			return this.currentUser = JSON.parse(localStorage.currentUser);/*Parse the JSON and return a result*/
		};		
	},
};