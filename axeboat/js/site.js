/* ------------------------------------------------------- *\
	Powered by Incredibox
	Incredibox © So Far So Good
	http://www.sofarsogood.fr
\* ------------------------------------------------------- */

var $flash;
var flash;
var popup;
var IE8 = false;

// --------------------------------------------
// --------------------------------------- INIT
function init(_btId){
	// ------------------------- SI HOME PAGE
	if(_btId == "#bt1"){ 
		activeTab();
	}else{
		$("#bt1").attr("href", "javascript:clickBtHome()");	
	}
	$(_btId).addClass("click");
	//clickBtHome();
	//afficherHeader();
	//transitionFondBlanc();
	//openMail();
	if(jQuery.browser.version.substring(0, 2) == "8.") {
		IE8 = true;
	}
	if(IE8 || jQuery.browser.version.substring(0, 2) == "9.") {
		$('input').placeholder();
	}
	
}
// ------------------------------------------------------
// --------------------------------------- NAVIGATION TAB
function activeTab(){
	$(".openTab").each(function(){
		var href = $(this).attr("href");
		var id = $(this).attr("id");
		$(this).attr("href", "javascript:openNewTab('"+href+"')");
	});
}
function openNewTab(href){
	if(popup!=null){
		popup.close();
	}
	if(IE8){
		popup = window.open(href, 'tab', 'top=0,left=0,width='+$(window).width()+',height='+$(window).height()+'location=1,menubar=1,resizable=1,scrollbars=1,status=1,titlebar=1,toolbar=1');
	}else{
		popup = window.open(href, 'tab');
	}
	popup.focus();
}
function clickBtHome(){
	// pour safari, tester opener.document
	popup = null;
	if(window.opener == null || (window.opener != null && window.opener.closed) || (window.opener != null && window.opener.document == null)){
		window.name="";
		window.location = "./home";
	}else{
		window.close();	
	}
}

// ----------------------------------------------
// --------------------------------------- GLOBAL
function trace(t){
	//console.log(t);
}
function getHash() {
	var url = location.hash.split("#/").join("");
	if(url != ""){
		window.location.hash="/";	
	}
	return url;
}
function ajaxCall(AXhttp, AXurl, AXdata, AXfunc, AXparam){
	$.ajax({
		type: AXhttp,// str
		url: AXurl,// str
		data: AXdata,// {obj}
		success: function(msg){ 
			AXfunc(msg, AXparam);// function callback
		}
	});
}
function shareCompo(_compoURL, _social){
	var url= "";
	switch(_social){
		case "facebook":
			saveGA("_TOP50_FB()","Click sur Partage FB");
			if(check){
				url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://www.mixforpeace.fr/share/mix.php?url="+_compoURL);
			}else{
				url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://www.mixforpeace.fr/share/mixfin.php?url="+_compoURL);
			}
		break;
		case "twitter":
			saveGA("_TOP50_TW()","Click sur Partage TW");
			if(check){
				url = "http://twitter.com/share?url="+encodeURIComponent("http://www.mixforpeace.fr/"+_compoURL)+"&text="+encodeURIComponent("Fais un geste PEACE, vote pour mon mix pour me faire gagner un weekend VIP sur le AXE BOAT ! #MIXFORPEACE #INCREDIBOX");
			}else{
				url = "http://twitter.com/share?url="+encodeURIComponent("http://www.mixforpeace.fr/"+_compoURL)+"&text="+encodeURIComponent("Fais un geste Peace, vote pour mon mix pour qu'il intègre le Top 50 d'Incredibox #MIXFORPEACE #INCREDIBOX");
			}
		break;
		case "tumblr":
			saveGA("_TOP50_TUMBLR()","Click sur Partage TUMBLR");
			if(check){
				url = "http://www.tumblr.com/share/link?url="+encodeURIComponent("http://www.mixforpeace.fr/"+_compoURL)+"&name="+encodeURIComponent("AXE BOAT #MIXFORPEACE avec INCREDIBOX")+"&description="+encodeURIComponent("Fais un geste PEACE, vote pour mon mix sur mixforpeace.fr pour me faire gagner un weekend VIP sur le AXE BOAT ! #MIXFORPEACE");
			}else{
				url = "http://www.tumblr.com/share/link?url="+encodeURIComponent("http://www.mixforpeace.fr/"+_compoURL)+"&name="+encodeURIComponent("AXE BOAT #MIXFORPEACE avec INCREDIBOX")+"&description="+encodeURIComponent("Fais un geste PEACE, vote pour mon mix sur mixforpeace.fr pour qu'il intègre le Top 50 d'Incredibox ! #MIXFORPEACE");
			}
		break;
		default:
		break;
	}
	window.open(url , '_blank');
}

// ------------------------------------------------------
// --------------------------------------- RESIZE BROWSER
function activeResize(){
	$(window).resize(function(){
		onResize();
	});
	onResize();
}
function onResize(){
	sendPositionSWF();
}

// --------------------------------------------------
// --------------------------------------- FROM FLASH
function showFlash(){
	$("#box-flash").addClass("show-flash");
}
function sendPositionSWF(){
	var fl = document.getElementById("flashContent");
	if(fl.drawTrame!=undefined){
		var pos = $(fl).offset();
		fl.drawTrame(pos.top, pos.left);
	}
}
function transitionFondBlanc(){
	TweenMax.to($("#bg2"), 0.6,{top:"0px", height:"100%", ease:Quint.easeInOut, overwrite:true});
}
function afficherHeader(){
	TweenMax.to($("#header"), 0.5,{top:"0px", ease:Quint.easeOut, overwrite:true, delay:.3});
	TweenMax.to($("#full-content"), 0.5,{paddingTop:"150px", ease:Quint.easeOut, overwrite:true, delay:.3});
}
function fondNoir(){
	$("#full-content").css({"background-color":"#000"});
}
function fondBlanc(){
	$("#full-content").css({"background-color":"transparent"});
}

/*	***********************************************************************************************************************
	.______   .______     ______   ___   ___ 
	|   _  \  |   _  \   /  __  \  \  \ /  / 
	|  |_)  | |  |_)  | |  |  |  |  \  V  /  
	|   _  <  |   _  <  |  |  |  |   >   <   
	|  |_)  | |  |_)  | |  `--'  |  /  .  \  
	|______/  |______/   \______/  /__/ \__\  

	*********************************************************************************************************************** */
	
var popupOpen = false;
var formProcess = false;
var objMail = [];
var fromTop50 = false;

function openMailTop50(compositeur, titre, compoURL){
	saveGA("_TOP50_MAIL()","Click sur Partage MAIL");
	objMail[0] = compositeur;
	objMail[1] = titre;
	objMail[2] = compoURL;
	fromTop50 = true;
	openMail();
}
function openMail(){
	if(!popupOpen){
		if(fromTop50){
			$("#form-mail #name").hide();
		}else{
			$("#form-mail #name").show();
		}
		popupOpen = true;
 		rapportTexte("", "alert-mail", "", "");
		$("#bbox #bbox-body #bbox-click").bind("click", closeMail);
		$("#bbox .popup#box-mail").show();
		$("#bbox").show();
		TweenMax.to($("#bbox-fd"), 0,{opacity:0, ease:Linear.easeNone});
		TweenMax.to($("#box-mail"), 0,{opacity:0, top:"55%",ease:Linear.easeNone});
		//
		TweenMax.to($("#bbox-fd"), 0.3,{opacity:0.65, ease:Linear.easeNone});
		TweenMax.to($("#box-mail"), 0.4,{opacity:1, top:"50%", ease:Quad.easeOut, delay:0.2});
	}
}
function closeMail(){
	if(popupOpen){
		$("#bbox #bbox-body #bbox-click").unbind("click", closeMail);
		popupOpen = false;
		TweenMax.killDelayedCallsTo(closeMail);
		//
		TweenMax.to($("#bbox-fd"), 0.3,{opacity:0, ease:Linear.easeNone, overwrite:true, delay:0.4, onComplete:masquerMail});
		TweenMax.to($("#box-mail"), 0.3,{opacity:0, top:"45%", ease:Quint.easeIn, overwrite:true});
	}
}
function masquerMail(){
	objMail = [];
	fromTop50 = false;
	formProcess = false;
	//$("#form-mail #email").val(""); // virer l'adresse
	$("#bbox").hide();
	$("#bbox .popup#box-mail").hide();
	TweenMax.to($("#bt-send-mail"), 0, {autoAlpha:1});
}

// ------------------------------------------------------------
// --------------------------------------- FONCTIONS SEND EMAIL

function sendInvitation(){
	if(!formProcess){
		formProcess = true;
		var mailInvitation = $("#form-mail #email").val();
		var nomInvitation = $("#form-mail #name").val();
		//
		if((!fromTop50 && checkMail($("#form-mail #email")) && checkInput($("#form-mail #name"))) || (fromTop50 && checkMail($("#form-mail #email")))){
			TweenMax.to($("#bt-send-mail"), 0.2, {autoAlpha:0});
			if(fromTop50){
				ajaxCall("POST", "php/send-mail.php", {expediteur:encodeURIComponent(nomInvitation), email:encodeURIComponent(mailInvitation), type:"composition", compositeur:objMail[0], morceau:objMail[1], compoURL:objMail[2]}, callbackMailShare, {});
			}else{
				ajaxCall("POST", "php/send-mail.php", {expediteur:encodeURIComponent(nomInvitation), email:encodeURIComponent(mailInvitation), message:"", type:"invitation"}, callbackMailShare, {});
			}
			rapportTexte("", "alert-mail", "preload.gif", "0px 0px");
		}else{
			if(!checkMail($("#form-mail #email"))) { 
				inputWarning($("#form-mail #email"));
			}
			if(!checkInput($("#form-mail #name"))) { 
				inputWarning($("#form-mail #name"));
			}
			rapportTexte("Vérifie tes informations", "alert-mail", "icone-warning.gif", "0px 2px");
			formProcess = false;
		}
	}
}
function checkMail(input){
	var ad = input.val();
	var val = input.attr("placeholder");
	if(ad.indexOf("@")!=-1 && ad.length>5 && ad!="" && ad!=val){
		return true;
	}
	return false;
}
function checkInput(input){
	var txt = input.val();
	var val = input.attr("placeholder");
	if(txt.length>2 && txt!="" && txt!=val){
		return true;
	}
	return false;
}
function inputWarning(input){	
	input.focus( function(){
		TweenMax.to($(this), 0,{ease:Linear.easeNone, overwrite:true});
		$(this).css({'background-color' : '#9BAFCC'});
	});
	input.blur( function(){
		TweenMax.to($(this), 0,{ease:Linear.easeNone, overwrite:true});
		$(this).css({'background-color' : '#C2C7CE'}); 
	});
	TweenMax.to(input, 0,{backgroundColor:"#C2C7CE", ease:Linear.easeNone, overwrite:true});
	TweenMax.to(input, 0.3,{backgroundColor:"#AC8351", ease:Quad.easeIn, repeat:3, yoyo:true, overwrite:true});
}
function callbackMailShare(msg, param){
	var retour = msg;
	switch (retour){
		// ---------- mail envoyé, adresse enregistrée
		case "reponse=ok" :
			rapportTexte("Invitation envoyée !", "alert-mail", "icone-ok.gif", "0px 2px");
		break;
		default:
			rapportTexte("Envoi impossible...", "alert-mail", "icone-bug.gif", "0px 2px");
		break;
	}
	TweenMax.delayedCall(4,closeMail);
}

// --------------------------------------------------------------
// --------------------------------------- RAPPORT MESSAGE ALERTE

function rapportTexte(txt, div, image, posXY){
	var div = $("#"+div);
	if(image!=""){
		if(image=="preload.gif"){
			posXY = "0px 1px";
			div.css({"padding-left":"22px"});
		}else{
			div.css({"padding-left":"18px"});
		}
		div.css({
			"background-image":"url('img/alert/"+image+"')",
			"background-repeat":"no-repeat",
			"background-position":posXY
		});
	}else{
		div.css({
			"background":"none", 
			"padding-left":"0px"
		});
	}
	div.html(txt);
	div.css({"margin-left":"20px"});
	TweenMax.to(div, 0.4,{marginLeft:"0px", ease:Bounce.easeOut});
}

// --------------------------------------------------------------------------
// --------------------------------------- OUVRIR POPUP VIDEO YOUTUBE GOODIES

function openCredit(){
	if(!popupOpen){
		popupOpen = true;
		//
		$("#bbox #bbox-body #bbox-click").bind("click", closeCredit);
		$("#bbox .popup#box-credit").show();
		$("#bbox").show();
		TweenMax.to($("#bbox-fd"), 0,{opacity:0, ease:Linear.easeNone});
		TweenMax.to($("#box-credit"), 0,{opacity:0, top:"55%",ease:Linear.easeNone});
		//
		TweenMax.to($("#bbox-fd"), 0.3,{opacity:0.65, ease:Linear.easeNone});
		TweenMax.to($("#box-credit"), 0.4,{opacity:1, top:"50%", ease:Quad.easeOut, delay:0.2});
	}
}
function closeCredit(){
	if(popupOpen){
		popupOpen = false
		$("#bbox #bbox-body #bbox-click").unbind("click", closeCredit);
		TweenMax.to($("#bbox-fd"), 0.3,{opacity:0, ease:Linear.easeNone, overwrite:true, delay:0.4, onComplete:masquerCredit});
		TweenMax.to($("#box-credit"), 0.3,{opacity:0, top:"45%", ease:Quint.easeIn, overwrite:true});
	}
}
function masquerCredit(){
	formProcess = false;
	$("#bbox").hide();
	$("#bbox .popup#box-credit").hide();
}

/*	***********************************************************************************************************************
	.___________.  ______   .______       _____    ___   
	|           | /  __  \  |   _  \     | ____|  / _ \  
	`---|  |----`|  |  |  | |  |_)  |    | |__   | | | | 
	    |  |     |  |  |  | |   ___/     |___ \  | | | | 
	    |  |     |  `--'  | |  |          ___) | | |_| | 
	    |__|      \______/  | _|         |____/   \___/  

	*********************************************************************************************************************** */

var lineOpen;
var tabInclude;
var tabResearch;
	
function initTop50(){
	$("#top-50 .top-line").bind("mouseover", overTopLine)
	$("#top-50 .top-line").bind("mouseleave", outTopLine);
	tabInclude = $("#tab-include");
	tabResearch = $("#tab-research");
	initSearchCompo();
}
function overTopLine(){
	$(this).addClass("overTopLine");
}
function outTopLine(){
	$(this).removeClass("overTopLine");
}
function openLine(line, compoLink){
	if(lineOpen != undefined && lineOpen != line){
		closeLine(lineOpen);
	}
	if(lineOpen != line){
		lineOpen =  line;
		$(line).unbind("mouseover", overTopLine)
		$(line).unbind("mouseleave", outTopLine);
		$(line).removeClass("overTopLine");
		$(line).addClass("top-line-open");
		$(".t-content .t-mini-app", line).html("<div id='miniApp'></div>");
		openMiniApp(compoLink);
	}
}
function ajusterHauteurTabSearch(h){
	$("#tab-research").css({"height":$("#tab-research").height()+(h)+"px"});
	$("#searchTableau").css({"height":$("#searchTableau").height()+(h)+"px"});
}
function closeLine(line){
	$(".t-content .t-mini-app", line).empty();
	$(line).bind("mouseover", overTopLine);
	$(line).bind("mouseleave", outTopLine);
	$(line).removeClass("top-line-open");
	lineOpen = undefined;
}
function openMiniApp(compoLink){
	var flashvars = {};
	flashvars.compo = compoLink;
	flashvars.siteURL = "http://www.incredibox.fr/";
	flashvars.visible = true;
	var params = {};
	params.menu = "false";
	params.quality = "best";
	params.wmode = "opaque";
	params.bgcolor = "#535D72";
	params.allowfullscreen = "false";
	params.allowscriptaccess = "always";
	var attributes = {};
	var r = new Date().getMilliseconds();
	swfobject.embedSWF("app/loader-player.swf?"+r, "miniApp", "500px", "200px", "9.0.0", "", flashvars, params, attributes);
}
function stopMiniApp(compoLink){
	openMiniApp(compoLink);
}

// -------------------------------------------------------------------
// --------------------------------------- VOTER POUR UNE COMPO TOP 50

var voteEnCours = false;

function voteLine(bt, urlCompo){
	if(!voteEnCours){
		voteEnCours = true;
		ajaxCall("POST", "php/save-like-music.php", {lienMusic:urlCompo}, callbackVoteLine, {bouton:bt});
	}
}
function callbackVoteLine(msg, params){
	var bt = params.bouton;
	switch(msg){
		case "reponse=ok":
			$(bt).attr("onclick","").addClass("like-ok").html("Vote enregistré !");
		break;
		case "reponse=deja":
			$(bt).attr("onclick","").addClass("like-deja").html("Tu as déjà voté !");
		break;
		default:
			$(bt).attr("onclick","").addClass("like-deja").html("Vote impossible...");
		break;
	}
	TweenMax.to($(bt), 0.3,{autoAlpha:0, width:0, padding:0, margin:0, ease:Quint.easeInOut, overwrite:true, delay:2});
	voteEnCours = false;
}

// -------------------------------------------------------------------------
// ---------------------------------------------- RECHERCHER UNE COMPOSITION

var searchEnCours = false;
var lastSearch = "";
var sNom;
var searchRapport;
var searchTableau;
var searchNav;
var nbPageSearch;
var curPageSearch = 0;

function initSearchCompo(){
	sNom = $("#sNom");
	searchRapport = $("#searchRapport");
	searchTableau = $("#searchTableau");
	searchNav = $("#searchNav");
}
function searchCompo(){
	if(!searchEnCours){
		searchEnCours=true;
		var nom = sNom.val();
		var test = nom.split(" ").join("");
		if(test.length<3) {
			displaySearchRapport("Ta recherche est trop courte");
			nom="";
		}
		if(nom.length<3 || nom==lastSearch) {
			nom="";
		}
		if(nom!=""){
			lastSearch = nom;
			$("#sBtSearch").addClass("sNomSearch");
			ajaxCall("POST", "php/recup-top-50-search.php", {nom:encodeURIComponent(nom)}, callbackSearchCompo, {});
		}else{
			curPageSearch = 0;
			searchEnCours = false;
		}
	}
}
function callbackSearchCompo(msg, params){
	if(searchEnCours){
		if(msg == "0"){
			displaySearchRapport("Aucun mix ne correspond à ta recherche");
		}else{
			tabInclude.hide();
			searchNav.empty();
			searchRapport.empty();
			afficherTab(tabResearch)
    		searchTableau.html(msg);
    		TweenMax.to($("#search-compo form #sBtClear"), 0.25, {width:"30px", ease:Quint.easeOut, overwrite:true});
    		nbPageSearch = $("#tab-research #sNbPage").html();
    		$("#tab-research #result0").show();
    		$("#searchTableau #blocNavSearch").appendTo(searchNav);
    		$("#searchTableau .top-line").bind("mouseover", overTopLine)
			$("#searchTableau .top-line").bind("mouseleave", outTopLine);
		}
		$("#sBtSearch").removeClass("sNomSearch");
		curPageSearch = 0;
		searchEnCours = false;
	}
}
function displaySearchRapport(txt){
	searchRapport.html(txt)
	TweenMax.to(searchRapport, 0,{marginRight:"20px", ease:Quint.easeInOut, overwrite:true});
	TweenMax.to(searchRapport, 0.3,{marginRight:"0px", ease:Bounce.easeOut, overwrite:true});
}

// ----------------------------------------------------------------------------
// ---------------------------------------------- VIDER LE TABLEAU DE RECHERCHE

function clearSearchCompo(){
	if(searchTableau.html() != "" ){
		TweenMax.to($("#search-compo form #sBtClear"), 0.25, {width:"0px", ease:Quint.easeOut, overwrite:true});
		$("#sBtSearch").removeClass("sNomSearch");
		lastSearch ="";
		searchRapport.empty();
		sNom.val("");
		curPageSearch = 0;
		$("#searchTableau .top-line").unbind("mouseover", overTopLine)
		$("#searchTableau .top-line").unbind("mouseleave", outTopLine);
		searchEnCours = false;
		searchTableau.empty();
		searchNav.empty();
		afficherTab(tabInclude)
		tabResearch.hide();
	}
}
function afficherTab(tab){
	tab.show();
	TweenMax.to(tab, 0,{marginTop:"110px", ease:Quint.easeOut, overwrite:true});
	TweenMax.to(tab, 0.3,{marginTop:"0px", ease:Quint.easeOut, overwrite:true});
}

// -------------------------------------------------------------------------------
// ---------------------------------------------- SELECTIONNER LE BT 0 DE LA LISTE

function avanceSearch(){
	if(curPageSearch<nbPageSearch-1){
		if(lineOpen != undefined){
			closeLine(lineOpen);
			lineOpen = undefined;
		}
		$("#tab-research #result"+curPageSearch.toString()).hide();
		curPageSearch++;
		$("#tab-research #result"+curPageSearch.toString()).show();
		$("#tab-research #sNbNum").html((curPageSearch+1));
	}
}
function reculeSearch(){
	if(curPageSearch>0){
		if(lineOpen != undefined){
			closeLine(lineOpen);
			lineOpen = undefined;
		}
		$("#tab-research #result"+curPageSearch.toString()).hide();
		curPageSearch--;
		$("#tab-research #result"+curPageSearch.toString()).show();
		$("#tab-research #sNbNum").html((curPageSearch+1));
	}
}

/*	***********************************************************************************************************************
	     ___      ___   ___  _______ .______     ______        ___   .___________.
	    /   \     \  \ /  / |   ____||   _  \   /  __  \      /   \  |           |
	   /  ^  \     \  V  /  |  |__   |  |_)  | |  |  |  |    /  ^  \ `---|  |----`
	  /  /_\  \     >   <   |   __|  |   _  <  |  |  |  |   /  /_\  \    |  |     
	 /  _____  \   /  .  \  |  |____ |  |_)  | |  `--'  |  /  _____  \   |  |     
	/__/     \__\ /__/ \__\ |_______||______/   \______/  /__/     \__\  |__|     

	*********************************************************************************************************************** */

var numfiche = 0;
var totalfiche = 5;
var tweening = false;

function initDiapo(){
	diapoAfficher($("#bloc-dj #fiche0"), true);
}
function diapoPrev(){
	if(numfiche>0 && !tweening){
		tweening = true;
		var $fiche1 = $("#bloc-dj #fiche"+numfiche);
		diapoEnlever($fiche1, true);
		numfiche--;
		$fiche2 = $("#bloc-dj #fiche"+numfiche);
		diapoAfficher($fiche2, true);
	}
}
function diapoNext(){
	if(numfiche<totalfiche-1 && !tweening){
		tweening = true;
		var $fiche1 = $("#bloc-dj #fiche"+numfiche);
		diapoEnlever($fiche1, false);
		numfiche++;
		var $fiche2 = $("#bloc-dj #fiche"+numfiche);
		diapoAfficher($fiche2, false);
	}	
}
function diapoEnlever(_$fiche, _sens){
	if(_sens){
		TweenMax.to($(".photo",_$fiche), .3, {opacity:0, right:"-=50px", ease:Quint.easeIn, overwrite:true});
		TweenMax.to($(".logo",_$fiche), .3, {opacity:0, left:"+=50px", delay:.05, ease:Quint.easeIn, overwrite:true});
		TweenMax.to($(".bio",_$fiche), .3, {opacity:0, left:"+=50px", delay:.1, ease:Quint.easeIn, overwrite:true, onComplete:diapoMasquer, onCompleteParams:[_$fiche]});
	}else{
		TweenMax.to($(".logo",_$fiche), .3, {opacity:0, left:"-=50px", ease:Quint.easeIn, overwrite:true});
		TweenMax.to($(".bio",_$fiche), .3, {opacity:0, left:"-=50px", delay:.05, ease:Quint.easeIn, overwrite:true});
		TweenMax.to($(".photo",_$fiche), .3, {opacity:0, right:"+=50px", delay:.1, ease:Quint.easeIn, overwrite:true, onComplete:diapoMasquer, onCompleteParams:[_$fiche]});
	}
}
function diapoAfficher(_$fiche, _sens){
	$("#bloc-dj #dj-nav span").html((numfiche+1)+"/"+totalfiche);
	_$fiche.addClass("visible");

	if(_sens){
		TweenMax.to($(".photo",_$fiche), 0, {opacity:0, right:"50px", ease:Linear.easeNone, overwrite:true});
		TweenMax.to($(".logo",_$fiche), 0, {opacity:0, left:"-50px", ease:Linear.easeNone, overwrite:true});
		TweenMax.to($(".bio",_$fiche), 0, {opacity:0, left:"-50px", ease:Linear.easeNone, overwrite:true});
		//
		TweenMax.to($(".photo",_$fiche), .5, {opacity:1, right:"0px", ease:Quint.easeOut, delay:.4, overwrite:true});
		TweenMax.to($(".bio",_$fiche), .5, {opacity:1, left:"0px", ease:Quint.easeOut, delay:.45, overwrite:true});
		TweenMax.to($(".logo",_$fiche), .5, {opacity:1, left:"0px", ease:Quint.easeOut, delay:.5, overwrite:true});
		
	}else{
		TweenMax.to($(".logo",_$fiche), 0, {opacity:0, left:"50px", ease:Linear.easeNone, overwrite:true});
		TweenMax.to($(".bio",_$fiche), 0, {opacity:0, left:"50px", ease:Linear.easeNone, overwrite:true});
		TweenMax.to($(".photo",_$fiche), 0, {opacity:0, right:"-50px", ease:Linear.easeNone, overwrite:true});
		//
		TweenMax.to($(".logo",_$fiche), .5, {opacity:1, left:"0px", ease:Quint.easeOut, delay:.4, overwrite:true});
		TweenMax.to($(".bio",_$fiche), .5, {opacity:1, left:"0px", ease:Quint.easeOut, delay:.45, overwrite:true});
		TweenMax.to($(".photo",_$fiche), .5, {opacity:1, right:"0px", ease:Quint.easeOut, delay:.5, overwrite:true});
	}
}
function diapoMasquer(_$fiche){
	_$fiche.removeClass("visible");
	tweening = false;
}


