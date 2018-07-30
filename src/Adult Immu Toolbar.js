////////////////////////// Telus Template 2016 /////////////////////////////////////
//  Toolbar Template 2016-05-09

function note(parm) {
	try {
		var noteText = parm + "";
		var newNote = ScriptUtil.getScriptPatientManager().insertProgressNote(noteText);
		ScriptUI.scrollToNote(newNote,true);
	} catch(a){}
}

function insertNote(item) {
	if (item != null) {
		note(item.getResource());
	}
}

function stamp(parm) {
	try {
		var stampName = parm + "";
		ui = ScriptUI.getUI().getNoteUI();
		if (ui.getSelectedNote() == null) {
			wrappers = ui.getNoteWrappers();
			if (wrappers.size() > 0) {
				ui.setSelectedNote(wrappers.get(wrappers.size()-1));
			} else {
				ScriptUtil.getScriptPatientManager().insertProgressNote(' ');
				stamp(parm);
				return;
			}
		}
		var newNote = ScriptUtil.getScriptPatientManager().insertProgressNoteWithStamp(stampName);
		ScriptUI.scrollToNote(newNote,true);
	} catch(a) {}
}

function insertStamp(item) {
	if (item != null) {
		stamp(item.getResource());
	}
}

function insertFavouriteStamp(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		stamp(item.getText());
	}
}

function letter(parm) {
	try {
		var stamp = parm + "";
		var letterBody = ScriptUtil.getScriptPatient().createStyledText(stamp);
		var note = ScriptUtil.getScriptPatient().insertLetter(letterBody,false);
		ScriptUI.scrollToNote(note,true);
	} catch(a){}
}

function insertLetter(item) {
	if (item != null) {
		letter(item.getResource());
	}
}

function createFavouriteLetter(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		letter(item.getText());
	}
}

function insertForm(fName) {
	try {
		ScriptUtil.getScriptPatient().insertForm(fName+"");
	} catch(a){}
}

function insertCustomForm(item) {
	if (item != null) {
		insertForm(item.getResource());
	}
}

function createFavouriteForm(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		insertForm(item.getText());
	}
}

function diagram(dName) {
	try {
		ScriptUtil.getScriptPatient().insertDiagram(dName+"");
	} catch(a){}
}

function insertDiagram(item) {
	if (item != null) {
		diagram(item.getResource());
	}
}

function insertFavouriteDiagram(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		diagram(item.getText());
	}
}

function viewForm(parm) {
	try {
		ScriptUI.viewForm(parm+"");
	} catch(a){}
}

function viewCustomForm(item) {
	if (item != null) {
		viewForm(item.getResource());
	}
}

function viewFavouriteForm(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		viewForm(item.getText());
	}
}

function showGraph(parm) {
	try {
		ScriptUI.showGraph(parm+"");
	} catch(a){}
}

function viewGraph(item) {
	if (item != null && item.getResource() != null && item.getResource().trim().length()>0) {
		points = item.getResource();
		if (points.indexOf(",")>-1) {
			try {
				ScriptUI.showGraph(Java.to(points.split(","),"java.lang.String[]"));
			} catch (a) {
				ScriptUI.showGraph(points.split(","));
			}
		} else {
			ScriptUI.showGraph(points);
		}
	} else {
		ScriptUI.error("No graph data has been defined for this action");
	}
}

function viewFavouriteGraph(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		showGraph(item.getText());
	}
}

function prescribe(parm) {
	try {
		ScriptUtil.getScriptPatientManager().startPrescription(parm+"");
	} catch(a){}
}

function prescribeRx(item) {
	if (item != null && item.getResource() != null && item.getResource().trim().length()>0) {
		if (item.getResource().indexOf(",")>-1) {
			try {
				ScriptUtil.getScriptPatientManager().startPrescription(Java.to(item.getResource().split(","),"java.lang.String[]"));
			} catch (a) {
				ScriptUtil.getScriptPatientManager().startPrescription(item.getResource().split(","));
			}
		} else {
			ScriptUtil.getScriptPatientManager().startPrescription(item.getResource());
		}
	} else {
		ScriptUI.error("No medications or favourites has been defined for this action");
	}

}

function prescribeFavouriteRx(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		prescribe(item.getText());
	}
}

function showFlowsheet(parm) {
	try {
		ScriptUI.showFlowsheet(parm+"");
	} catch(a){}
}

function viewFlowsheet(item) {
	if (item != null) {
		showFlowsheet(item.getResource());
	}
}

function viewFavouriteFlowsheet(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		showFlowsheet(item.getText());
	}
}

function printHandout(parm) {
	try {
		parm += "";
		var handoutManager = ScriptUtil.call('netmedical.nmr.handouts.HandoutManager','access');
		var handoutMetadata = handoutManager.getHandoutMetadata();
		for (var i=0; i< handoutMetadata.length; i++) {
			meta = handoutMetadata[i];
			if (meta.getName()==parm) {
				var handout = handoutManager.getHandout(meta);
				if (handout != null) {
					var displayer = ScriptUtil.call('netmedical.nmr.ui.handouts.handoutdisplayers.HandoutDisplayerFactory','getHandoutDisplayer',handout);
					if (displayer != null) {
						if (displayer.getClass().equals(ScriptUtil.newInstance('netmedical.nmr.ui.handouts.handoutdisplayers.PDFHandoutDisplayer').getClass())) {
							displayer.displayHandout(handout,true);
						} else {
							ScriptUI.error('Cannot display handout "'+hName+'" Only PDF handouts can be viewed using this action');
						}
						return;
					}
				}
			}
		}
		ScriptUI.error("Could not open handout "+parm+"");
	} catch(a) {}
}

function viewHandout(item) {
	if (item != null) {
		printHandout(item.getResource());
	}
}

function viewFavouriteHandout(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		printHandout(item.getText());
	}
}


function createBill(parm) {
	var sc = parm+"";
	if (sc.trim().length > 0) {
		var scriptPat = ScriptUtil.getScriptPatient();
		var supercode = scriptPat.getSupercode(sc);
		if (supercode == null) {
			ScriptUI.error('You must first create a billing supercode named "'+sc+'".');
			return;
		}
		scriptPat.billSupercode(null, supercode);
	} else {
		ScriptUI.error("No billing supercode was defined for this action");
	}
}

function billSupercode(item) {
	if (item != null) {
		createBill(item.getResource());
	}
}

function billFavouriteSupercode(item) {
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		createBill(item.getText());
	}
}

function trackForm(item) {
	if (item == null) return;
	var resource = item.getResource();
	if (resource == null || resource.trim()=="") {
		ScriptUI.error("No custom form defined for this action");
		return;
	}
	var notes = ScriptUtil.getFormInstances(resource);
	if (notes.length == 0) {
		if (ScriptUI.question('Form "'+resource+'" does not exist for this patient.  Would you like to create one in their chart?',"Yes","No")) {
			ScriptUtil.getScriptPatient().insertForm(resource);
			ScriptUI.displayProfile();
		}
		return;
	}
	ScriptUI.scrollToNote(notes[notes.length-1],true);
}


function runSearch(searchName) {
	if (searchName == null || searchName.trim().length() == 0) {
		ScriptUI.error("No search specified");
		return;
	}
	var searchManager = ScriptUtil.call('netmedical.nmr.search.NMRSearches','access',false);
	var searchList = searchManager.getSearches();
	for (var i=0; i<searchList.length; i++) {
		if (searchList[i].mName.equals(searchName)) {
			var search = searchList[i];
			var doctors = ScriptUtil.newInstance('netmedical.nmr.ui.DoctorSelectionPanel','').getDoctors();
			var mUI = ScriptUI.getUI();

			var columns = null;
			var notes = null;
			var includeResults = false;

			if (search.getCustomizedReportTemplate() == null) {
				var template = ScriptUtil.newInstance('netmedical.nmr.search.ReportTemplate');
				template.addDefaultColumns();
				columns = template.getColumns();
				includeResults = template.getIncludeResults();
				notes = "";
			} else {
				columns = search.getCustomizedReportTemplate().getColumns();
				notes = search.getCustomizedReportTemplate().getFollowingText();
			}

			var searchReport = ScriptUtil.newInstance('netmedical.nmr.ui.SearchReport',
				mUI, null, search, searchName, doctors,
				false,  columns, notes,
				includeResults, mUI.getBrowser().getNMRAccess(), false);
			searchReport.begin();
			return;
		}
	}
	ScriptUI.error('Could not find search "'+searchName+'"');
}

function performSearch(item) {
	if (item != null) {
		runSearch(item.getResource());
	}
}

function performFavouriteSearch(item) {
	if (item == null) return;
	if (item != null && !(item.getText().trim().endsWith("..."))) {
		runSearch(item.getText());
	}
}

function viewFilter(item) {
	if (item == null || item.getResource()==null || item.getResource().trim().length()==0) return;
	var options = item.getResource().trim()+"";

	var subset = new Array();

	filterDescription = "Only ";
	if (options.indexOf("My ") == 0) {
		subset.push(14);
		options = options.substring(3,options.length);
		filterDescription += "My";
	} else if (options.indexOf("Dr ") == 0) {
		subset.push(15);
		options = options.substring(3,options.length);
		filterDescription += "Doctor";
	}

	filters = new Array();
	if (options.indexOf("+") > -1) {
		filters = options.split("+");
	} else {
		filters.push(options);
	}

	for (v=0;v<filters.length;v++) {
		var view = filters[v];
		var filter = "";
		if (view.indexOf("=") > 0) {
			pair = view.split("=");
			view = pair[0].trim();
			filter = pair[1].trim();
		}

		view = view.trim();
		filterDescription += " " +view;
		switch (view) {
			case "Data" : subset = subset.concat([1,2,3,4,5,6,7,8,10,11,12,13]); break;
			case "Notes" : subset.push(1); break;
			case "Letters" : subset.push(2); break;
			case "Treatments" : subset.push(3); break;
			case "Contains" :
				if (filter == "?") {
					filter = ScriptUI.input("Enter data to filter on:","");
					if (filter == null || (filter+"").trim().length == 0) {
						return;
					}
				}
				ScriptUI.getUI().getNotesPane().showNoteSubset(filter);
				return;
			case "Diagrams" : subset.push(4); break;
			case "Imaging" : subset.push(5); break;
			case "Tests" : subset.push(6); break;
			case "Reports" : subset.push(7); break;
			case "Labs" : subset.push(10); break;
			case "Forms" : subset.push(12); break;
			case "Consults" : subset.push(13); break;
			case "User"  :
				subset.push(18);
				if (filter == "?") {
					filter = ScriptUI.input("Enter user initials:","");
					if (filter == null || (filter+"").trim().length == 0) {
						return;
					}
				}
				ScriptUI.getUI().getNotesPane().setNoteAuthorInitialsFilter(filter);
				filterDescription += " created by "+filter;
				break;
			default:
				ScriptUI.error("Unknown Filter ["+view+"]"); return;
		}
	}

	ScriptUI.getUI().getNotesPane().showNoteSubset(filterDescription,subset);
}

function updateActionLabels() {
	items = ScriptUtil.getItems();
	mUI = ScriptUI.getUI();
	for (var i=0; i< items.length; i++) {
		action = items[i];
		if (action.isVisible()&& (typeof action.getEventName == 'function')) {
			if (action.getEventName() == 'trackForm') {
				var resource = action.getResource();
				action.setTooltipText(resource);
				if (resource == null || resource.trim()=="") {
					break;
				}
				var notes = ScriptUtil.getFormInstances(resource);
				if (notes.length == 0) {
					action.setText('never done');
				} else {
					var dd = notes[notes.length-1].getDate().toMonthDayYearString();
					action.setText(dd);
				}
			} else if (action.getEventName() == 'trackValue') {
				var resource = action.getResource();
				if (resource == null || resource.trim()=="") {
					break;
				}
				arr = resource.split(".");
				var notes = ScriptUtil.getFormInstances(arr[0]);
				if (notes.length == 0) {
					action.setText('never done');
				} else {
					var target = notes[notes.length-1].getStamp().getItemWithName(arr[1]);
					if (target != null) action.setText(target.getText());
				}
			}
				/*
			} else if (action.getEventName() == 'toggleTOC') {
				action.setText(mUI.isNoteSummaryTableVisible() ? "Hide TOC" : "Show TOC");
			} else if (action.getEventName() == 'toggleCPP') {
				mask = mUI.getProfilePane().getComponentMask();
				action.setText(mask==65535 ? "Hide CPP" : "Show CPP");
			}
				*/
		}
	}
}


function checkForFavourite(treatment) {
	try {
		return ScriptUtil.call("netmedical.nmr.treatments.PrescriptionFavouriteManager","access").checkForFavourite(treatment);
	} catch (a) {
		return Java("netmedical.nmr.treatments.PrescriptionFavouriteManager").access().checkForFavourite(treatment);
	}
}

function getTreatmentIDFromName(treatment) {
	try {
		return ScriptUtil.call("netmedical.nmr.treatments.TreatmentUtil","getNMRTreatmentIDFromName",treatment);
	} catch (a) {
		return Java("netmedical.nmr.treatments.TreatmentUtil").getNMRTreatmentIDFromName(treatment);
	}
}

function getTreatmentResourceWithNMRID(tid) {
	try {
		return ScriptUtil.call("netmedical.nmr.treatments.TreatmentUtil","getTreatmentResourceWithNMRID",tid);
	} catch (a) {
		return Java("netmedical.nmr.treatments.TreatmentUtil").getTreatmentResourceWithNMRID(tid);
	}
}

function getNMRTreatmentResources(trt) {
	try {
		return ScriptUtil.call("netmedical.nmr.treatments.TreatmentUtil","getNMRTreatmentResources",trt,true);
	} catch (a) {
		return Java("netmedical.nmr.treatments.TreatmentUtil").getNMRTreatmentResources(trt,true);
	}
}

function getTreatmentFactory() {
	try {
		return ScriptUtil.call("netmedical.nmr.ui.dialogs.txandrx.innerpanels.MedHandlingFactory","getFactory");
	} catch (a) {
		return Java("netmedical.nmr.ui.dialogs.txandrx.innerpanels.MedHandlingFactory").getFactory();
	}
}

function performTreatment(item) {
	if (item == null) return;
	trt = item.getResource() != null ? item.getResource() : "";
	txInfo = null;

	mUI = ScriptUI.getUI();
	if (trt != "") {
		favourite = checkForFavourite(trt);
		if (favourite != null) {
			tsr = ScriptUtil.newInstance("netmedical.nmr.treatments.TreatmentSearchResult",favourite);
		} else {
			tid = getTreatmentIDFromName(trt);
			if (tid != null) {
				tr = getTreatmentResourceWithNMRID(tid);
			} else {
				tv = getNMRTreatmentResources(trt);
				if (tv.size() > 0) {
					tid = tv.get(0).getTreatmentID();
					tr = getTreatmentResourceWithNMRID(tid);
				} else {
					ScriptUI.error('Could not find treatment for "'+trt+'"');
					return;
				}
			}
			tsr = ScriptUtil.newInstance("netmedical.nmr.treatments.TreatmentSearchResult",tr);
		}
		txInfo = ScriptUtil.newInstance("netmedical.util.UnorderablePair",null,tsr);
	}
	getTreatmentFactory().getNewTreatmentDialog(mUI, mUI.getPatient(), txInfo).show();
}

function openURL(item) {
	if (item == null) return;
	var url = item.getResource()+"";
	if (url.trim().length>0) {
		ScriptUI.openURL(url);
	}
}

function isListItem(item) {
	return item.isVisible() && (item.getType()=="combo") && (item.getEventName() == 'selectFromList');
}

function buildLists() {
	items = ScriptUtil.getItems();
	for (var i=0; i< items.length; i++) {
		var myList = items[i];
		if (isListItem(myList)) {
			var listName = myList.getResource()+"";
			if (listName.trim().length==0) break;
			var listItems = ScriptUtil.getItemsInSection(listName);
			var myItems = new Array();
			for (var j=0; j< listItems.length; j++) {
				myItems.push(listItems[j].getText());
			}
			myItems = myItems.sort();
			for (var j=0; j< myItems.length; j++) {
				myList.getItems().addItem(myItems[j]);
			}
		}
	}
}

function selectFromList(item) {
	if (item==null || (item.getResource+"").trim().length == 0 || item.getText().endsWith("...") || item.getText()=="") return;
	var listItems = ScriptUtil.getItemsInSection(item.getResource());
	for (var i=0; i< listItems.length; i++) {
		var targetItem = listItems[i];
		if (targetItem.getText()==item.getText()) {
			var runner = ScriptUtil.newInstance('netmedical.nmr.structuredstamps.scripting.StampScriptRunner',ScriptUtil.getForm());
			runner.invoke(targetItem.getEventName(), targetItem);
			return;
		}
	}
}


function fhs() {
	mUI = ScriptUI.getUI();
	ScriptUtil.call('netmedical.nmr.ui.FutureHealthServicesWindow','show', mUI.getMainWindow(), mUI.getBrowser().getPatient(), mUI);
}

function doInitPreferences() {
	var items = ScriptUtil.getItemsInSection("init");
	if (items.length == 0) return;
	var runner = ScriptUtil.newInstance('netmedical.nmr.structuredstamps.scripting.StampScriptRunner',ScriptUtil.getForm());

	for (var i=0; i< items.length; i++) {
		var target = items[i];
		if (target.getType()=="toggle" && target.isChecked()) {
			runner.invoke(target.getResource(), target);
		}
	}
}

function hideCPP() {
	mUI = ScriptUI.getUI();
	mUI.getProfilePane().setComponentMask(512);
	mUI.setProfileVisible(true);
}

function toggleCPP() {
	mUI = ScriptUI.getUI();
	mask = mUI.getProfilePane().getComponentMask();
	mUI.getProfilePane().setComponentMask(mask==65535 ? 512 : 65535);
	mUI.setProfileVisible(true);
	updateActionLabels();
}


function showTOC() {
	ScriptUI.getUI().setTableOfContentsVisible(true);
	updateActionLabels();
}

function toggleTOC(item) {
	ui = ScriptUI.getUI();
	ui.setTableOfContentsVisible(!ui.isNoteSummaryTableVisible());
	updateActionLabels();
}

function floatToolbar() {
	var toolbar = ScriptUtil.getForm();
	viewForm(toolbar.getName());
	ScriptUtil.getItemWithName("toolbar band").setVisible(false);
}


var kTemplateGUID = "1c821bc8-dfd5-41c8-9252-e8ba7f03d0ef";
function verifyTemplateGUID() {
	var guid = ScriptUtil.getForm().getGUID();
	if (guid.equals(kTemplateGUID)) {
		ScriptUI.error("Warning:  You should not use the PSS Toolbar Template as toolbar.  Duplicate it.");
	}
}

function init() {
	if (get("EWFHT_Logo") !== null) {showEWFHTLogo()};
	if (get("SDMButton") !== null) {checkSDM()};
	if (get("AdultImmuButton") !== null) {AdultImmuToolbar();}
	if (get("EmailConsent") !== null) {EmailConsent();}
	verifyTemplateGUID();
	updateActionLabels();
	buildLists();

	var expand = ScriptUtil.getItemWithName("Expand Toolbar");
	if (expand != null) {
		expand.setText(ScriptUtil.getForm().getName()+" Click to expand");
	}

	doInitPreferences();
	ScriptUtil.getForm().getDirtyItems().clear();
}

function start() {
	var note = ScriptUI.getNoteWrapper();
	if (note != null && note.getNote() != null) {
		ScriptUI.error('This toolbar is not meant to be added to a patient chart.  Use a reminder to display it');
		ScriptUI.deleteForm();
		return;
	}
}

function getDate(fName) {
	var text = new String(get(fName).getValue());
	if (text == "never done" || text == "") return null;
	return ScriptUtil.parseDate(text);
}

//////////////////////////////////// Adult Immu Toolbar /////////////////////////////////////////////////
/*
This toolbar borrows heavily from the EWFHT Preventative Care Toolbar

Immunizations Covered:
 1) Tetanus/Diptheria Booster -- every 10 years after turning 24-26
 2) Herpes Zoster -- 65+
 3) Pneumococcal -- 65+
 3) Annual Influenza -- annually between Sept - Jan

 */

/*
* The function that initially runs when the toolbar is opened
*/
function initToolbar() {
	// is Adult
	if (overAge(18))
	{
		performCheck();
	}
	else
	{
		var button = new Button();
		button.shiftButton("AdultImmu", "hide");
	}
}


function Button()
{
	this.buttons = this.getButtons();
  	this.buttons = this.buttons.sort(function(a,b) {return (a.getX() > b.getX()) ? 1 : ((b.getX() > a.getX()) ? -1 : 0);} );
  	this.num = sizeOfArray(this.buttons);
}

Button.prototype.getButtons = function()
{
  // Returns an array of all Buttons on the toolbar
  var i = 0;
  var items = ScriptUtil.getItems();
  var buttons = [];
  for (i ; i < sizeOfArray(items); i++)
  {
    if (items[i].getType() == "button")
      buttons.push(items[i]);
  }
  return buttons;
}

Button.prototype.shiftButton = function (buttonname, action) {
	// "hide" or "show" a button an shift surrounding buttons
	// to either fill space left by hiding a button, or vacate space
	// made by showing button
	var i = -1;
	var found = false;
	var foundButton;
	var xval = 0;
	var width = 0;
	var mov = 0;
	while (i < sizeOfArray(this.buttons) && !(found))
	{
		i++;

		found = this.buttons[i].getText() == buttonname;
	}

	if (!(found))
	{
		ScriptUI.note("That button doesn't exist.");
    	return;
	} else {
		foundButton = this.buttons[i]
	}

	// Hide or show the button 
	if (action == "hide") {
		setVis(foundButton.getId(), false);
	} 
	else if (action == "show") {
		setVis(foundButton.getId(), true);
	}

	if (foundButton.getText() == buttonname)
	{
		setVis(buttonname + "ButtonTitle", false);
		setVis(buttonname + "ButtonColour", false);
		setVis(buttonname + "ButtonOutline", false);
	}

	// Shift all buttons to the right of this one to fill space
	// that was either freed up by hiding, or created by showing
	width = foundButton.getWidth();
	i++;
	while (i < sizeOfArray(this.buttons))
	{
		xval = foundButton.getX();
		if (action == "hide")
		{
			mov = xval - width;
		}
		else if (action == "show")
		{
			mov = xval + width;
		}
		else
		{
			ScriptUI.error(action + " is not a valid action.");
			return;
		}

		this.buttons[i].setX(mov);
		if (buttonname != "AdultImmu" && this.buttons[i].getText() == "AdultImmu") {
			get("AdultImmuButtonTitle").setX(mov);
			get("AdultImmuButtonColour").setX(mov);
			get("AdultImmuButtonOutline").setX(mov);
		}
		i++;
	}
}

function Patient ()
{
	this.gender = getGender();
	this.age = getAge();
	this.probandhx = lowerCase(getVal("patPROB") + " " + getVal("patHPH"));
}

function ScreeningTest (type)
{

	// The patient object
	this.patient = new Patient();
	// The screening test type
	this.immu_type = type;
	// Whether the patient is eligible
	this.eligible = true;
	var immu_exists = true;

	// The date that this immunization was last given
	this.immu = ScriptUtil.getItemWithIdOrName(this.immu_type); 
	this.immu_date = getDate(this.immu.getText());

	if (isnull(immu_date)) {
		this.immu_exists = false;
	}

	// The response answer from the form
	this.ranswer  = getVal(this.immu_type + "ResponseAnswer");
	// The date of the latest response form
	this.rdate = getVal(this.immu_type + "ResponseDate");;
	// The override inclusion/exclusion
	this.oincexc  = getVal(this.immu_type + "OverrideCriteria");
	// The include checkbox from previous override form incase no action was taken
	this.incchk = isChecked(this.immu_type + "IncludeCheckbox");
	// The reason for override
	this.oincexcreason  = getVal(this.immu_type + "OverrideCriteriaReason");
	// The override frequency
	this.ofreq  = getVal(this.immu_type + "OverrideFrequency");
	// The units for frequency
	this.ofrequnits = getVal(this.immu_type + "OverrideFrequencyUnits");
	// the reason for frequency override
	this.ofreqreason  = getVal(this.immu_type + "OverrideFrequencyReason");
	// The starting and ending age criteria
	this.start_age  = parseInt(getVal(this.immu_type + "StartAge"));
	this.end_age  = parseInt(getVal(this.immu_type + "EndAge"));

	if (isNaN(this.start_age))
	{
		this.start_age = 0;
	}

	if (isNaN(this.end_age))
	{
		this.end_age = 10000;
	}
	// The exclusion text
	this.statustxt  = lowerCase(getVal(this.immu_type + "TextCriteria")).split(", ");
	// The itemid for exclusion reason textbox
	this.excreasonbox = this.immu_type + "StatusReason";
	// The itemid for frequency reason textbox
	this.freqreasonbox = this.immu_type + "FrequencyReason";

	// The default frequency
	this.freq = getVal(this.immu_type + "FrequencyCriteria");
	// The default frequency units
	this.frequnits = getVal(this.immu_type + "FrequencyUnits");
	// The criteria array
	this.criteria = [];

	// The status colour
	this.statuscolour = "grey";
	this.statusbox = this.immu_type + "Status";

	this.showtest = isChecked(this.immu_type + "ShowTest");
	// Store Criteria values
	if (this.oincexc === "")
	{
		// Gender Criteria
		var isInAgeRange = [inAgeRange(this.patient.age, this.start_age, this.end_age)];
		// Text Criteria
		var noTextExclusion = !(existsIn(this.patient.probandhx, this.statustxt));
		this.eligible = isInAgeRange && noTextExclusion;
	}
	// Override eligibility from form
	if ((this.oincexc == "In" || this.incchk) && this.patient.age <= this.end_age)
	{
		this.eligible = true;
	}
	else if (this.oincexc == "Ex")
	{
		this.eligible = false;
	}

	// Override Frequency from Form
	if (sizeOf(this.ofreq) > 0)
		this.freq = this.ofreq;
	if (sizeOf(this.ofrequnits) > 0)
		this.frequnits = this.ofrequnits;
}

/*
*  This function determines if a patient is eligable for Colorectal Screening by looking at their Age and Prob/Past Hx for the required criteria
*/
function performCheck()
{
	// Number used to control the loop
	var i = 0;
	// The boolean values for each colour status
	var rflag = false;
	var yflag = false;
	var gflag = false;
	// The Screening Test Object
	var screeningtest;
	// An array of all the immunization types
	var immu_types = ["Td", "HZ", "Pneu", "Inf"];
	// Number of screening tests according to the array size
	var num_immus = immu_types.length;

	// Fix items if the there is a Private note in the patient's chart
	fixPRIVATE();
	// Check the patient's status until you have gone through each screening test or find a lab that is red
	while (i < num_immu && !(rflag))
	{
		screeningtest = new ScreeningTest(immu_types[i]);
		if (screeningtest.showtest)
		{
			// Perform the eligibility test
			screeningtest.isEligible();

			// If they are red, then indicate true
			if (screeningtest.statuscolour == "red")
				rflag = true;
			// If they are yellow, indicate true
			else if (screeningtest.statuscolour == "yellow")
				yflag = true;
			// If they are green, indicate true
			else if (screeningtest.statuscolour == "green")
				gflag = true;
			// Increase count to check next screening test if no red test was found
		}
		i++;
	}
	// If there was no red test found then change the colour in order of importance such as yellow, then green, then black
	if (screeningtest.statuscolour != "red")
	{
		if (yflag)
		{
			screeningtest.statuscolour = "yellow";
		}
		else if (gflag)
		{
			screeningtest.statuscolour = "green";
		}
		else
		{
			screeningtest.statuscolour = "grey";
		}
	}
	// Set the button's colour according to the value found
	screeningtest.statusColour();
}

/*
* Fixes the issue with PRIVATE in fields
*/
function fixPRIVATE()
{
	if (ScriptUtil.getPatient().hasPrivatePieces(ScriptUtil.getUser()))
	{
		var items = ScriptUtil.getItemsInSection("Adult Immu Last Form Items");
		var i = 0;
		var curitem;
		for (i ; i < sizeOfArray(items); i++)
		{
			if (get(items[i].getId()).getValue() == "PRIVATE")
			{
				setVal(items[i].getId(), "");
			}
		}
	}
}

// Check the date of latest immunization and handle if no immunization has been given
ScreeningTest.prototype.immuDate = function()
{
	// If no immunization exist, mark as red
	if (!(this.immu_exists))
	{
		this.statuscolour = "r";
		return;
	}
	// Otherwise, check the status of the screening test
	else
		this.statusChecker();
}

/*
* Handle whether the patient is eligible or not
*/
ScreeningTest.prototype.isEligible = function ()
{
	// If all tests were passed, then the patient is eligible
	if (this.eligible)
		this.latestLab();
	// If one test failed, then indicate that the patient does not meet criteria if there is no reason
	else
	{
		this.statuscolour = "grey";
	}

	setVal(this.statusbox, this.statuscolour);
}

/*
* Check how long it has been (in months) since the day given
*/
ScreeningTest.prototype.statusChecker = function ()
{
	// The months used to calculate when the patient is due
	var months;
	var redmonth;
	var yellowmonth;

	// Todays Date
	var today = new Date();

	// Combine the lab type with each colour
	var colour;

	var labdateTxtBox;

	redmonth = parseInt(this.freq);
	if (this.frequnits == "yr")
		redmonth = redmonth * 12;
	yellowmonth = redmonth - 6;


	// Calculate the number of months difference from the given date
	months = (today.getFullYear() - this.immu_date.getFullYear()) * 12;
	months += today.getMonth();
	months -= this.immu_date.getMonth();


	// If it has been more than a certain number of years since the last lab, then make red, or if 6 months from due date, yellow, otherwise, green
	// Return the item id of the box that will display the status
	if (months >= redmonth)
	{
		if ((this.immu_date.getDate() > today.getDate()) && (months == redmonth))
			this.statuscolour = "yellow";
		else
			this.statuscolour = "red";
	}
	else if (months >= yellowmonth)
	{
		if ((this.immu_date.getDate() > today.getDate()) && (months == yellowmonth))
			this.statuscolour = "green";
		else
			this.statuscolour = "yellow";
	}
	else
		this.statuscolour = "green";
}

/*
* Change the visibility of a precoloured label in the form based on the colour given
*/
ScreeningTest.prototype.statusColour = function ()
{
	// The colour value
	var cval = 0;

	// Set the proper colour value according to the status of the screening test
	switch (this.statuscolour) {
		case "red":
			cval = -965825;
			break;
		case "yellow":
			cval = -256;
			break;
		case "green":
			cval = -6496679;
			break;
		case "grey":
			cval = -1513240;
			break;
	}
	//Set the colour of the button appropriately
	setColour("AdultImmuButtonColour", cval);
}

/*
* Checks if the patient is over age
*/
function overAge(age)
{
	// The patient's age
	var page = getAge();
	// If the patient is 18 or older, return true
	if (page >= age)
		return true;
}


////////////////////////////////////////////////   Utilities  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
* Returns the item requested based on ID or name
*/
function get(itemName) {
	return ScriptUtil.getItemWithIdOrName(itemName);
}

/*
* Get the age of the patient in question.
*/
function getAge() {
	return ScriptUtil.getPatient().getDemographics().getAge();
}

/*
* Gets the patient's gender
*/
function getGender() {
	var male = ScriptUtil.getPatient().getDemographics().getSexIsMale();
	if (male)
		return "Male";
	else
		return "Female";
}

/*
* Get the text value of the item
*/
function getVal(itemName)
{
	if (typeof itemName === 'undefined')
		ScriptUI.note("note definted " + itemName);
	else
		return get(itemName).getText().trim();
}


/*
* Return integer value
*/
function getInt(itemName)
{
	return parseInt(getVal(itemName));
}

/*
* Sets the value of the given item
*/
function setVal(itemName, value)
{
 	return get(itemName).setText(value);
}

/*
* Set the visibility of the given item
*/
function setVis(itemName, value)
{
	return get(itemName).setVisible(value);
}

/*
* Set the colour of the item
*/
function setColour(itemName, value)
{
	return get(itemName).setColour(value);
}

/*
* Set the colour of the item
*/
function getColour(itemName)
{
	return get(itemName).getColour();
}

/*
* Returns the boolean value of a checkbox
*/
function isChecked(itemName) {
	return get(itemName).isChecked();
}

/*
* Checks if the patient is within the two ages given
*/
function inAgeRange(page, sage, eage)
{
	if (isNaN(eage))
		return page >= sage;
	else if (isNaN(sage))
		return page <= eage;
	else if (page >= sage && page <= eage)
		return true;
	return false;
}


/*
* Convert a text structure of a date (given by PS) into the Date class for Javascript
*/
function makeDate(date) {
	// Eliminate all spaces in the date
	var workingdate = date.replace(" ", "");
	//Eliminate all commas in the date
	workingdate = workingdate.replace(",", "");
	workingdate = workingdate.replace(" ", "");
	var month, day, year;
	// Process Month
	month =  MonthCalc(workingdate.substr(0, 3));

	//Process Day and Year (changes depending on if numberic date is greater than or less than 9
	if (workingdate.length() == 9) {
		day = parseInt(workingdate.substr(3, 2));
		year = parseInt(workingdate.substr(5, 4));
	}
	else {
		day = parseInt(workingdate.substr(3,1));
		year = parseInt(workingdate.substr(4, 4));
	}

	// Return the new Date object processed from the PS date given
	return new Date(year, month, day);
}

/*
* Make object all lowercase
*/
function lowerCase(item)
{
	return item.toLowerCase();
}

/*
* Return the size of an item
*/
function sizeOf(item)
{
	return item.length();
}

/*
* Retrun the size of an array
*/
function sizeOfArray(item)
{
	return item.length;
}

/*
* Check if an item exists within another item
*/
function existsIn(item1, item2)
{
	if (item1 == "" || item2 == "")
	{
		return;
	}
	var j = 0;
	var i = 0;
	for (j; j < sizeOfArray(item2); j++)
	{
		if (item1.indexOf(item2[j]) >= 0)
		{
			if (!(existsInString(item1, "no " + item2[j])))
				return true;
		}
	}
	return false;
}

/*
* Check if an item exists within another item
*/
function existsInString(item1, item2)
{
	if (item1 === "" || item2 === "")
	{
		return;
	}
	return item1.indexOf(item2) >= 0;
}

/*
* Convert the month given into a numeric representation
*/
function MonthCalc(m) {
	var month = m + "";
	switch (month) {
		case "Jan":
			return 0;
			break;
		case "Feb":
			return 1;
			break;
		case "Mar":
			return 2;
			break;
		case "Apr":
			return 3;
			break;
		case "May":
			return 4;
			break;
		case "Jun":
			return 5;
			break;
		case "Jul":
			return 6;
			break;
		case "Aug":
			return 7;
			break;
		case "Sep":
			return 8;
			break;
		case "Oct":
			return 9;
			break;
		case "Nov":
			return 10;
			break;
		case "Dec":
			return 11;
			break;
		default:
			return 12;
	}
}

function openAdultImmuSummary()
{
	if (viewForm("Adult Immu - Summary"))
			ScriptUI.error("Adult Immunization Summary Form did not open properly");
}