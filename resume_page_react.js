
var parser = new DOMParser();
var xhttp = new XMLHttpRequest();

function renderXML(xmlDoc) {
	var sectionList = xmlDoc.getElementsByTagName("section");
	for (var i = 0; i < sectionList.length; i++) {
		renderSection(sectionList[i]);
	}
}

function renderSection(section) {
	var entryList = section.getElementsByTagName("entry");
	var sectionName = section.getAttribute("title");
	var root = document.getElementById(sectionName);
	var entryArray = [];
	for (var i = 0; i < entryList.length; i++) {
		var entry = entryList[i];
		var title = null;
		var subtitle = null;
		var description = null;
		var technology = null;
		var url = null;
		if (entry.getElementsByTagName("title")[0].hasChildNodes()) {
			title = entry.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		}
		if (entry.getElementsByTagName("subtitle")[0].hasChildNodes()) {
			subtitle = entry.getElementsByTagName("subtitle")[0].childNodes[0].nodeValue;
		}
		if (entry.getElementsByTagName("description")[0].hasChildNodes()) {
			description = entry.getElementsByTagName("description")[0].childNodes[0].nodeValue;
		}
		if (entry.getElementsByTagName("technology")[0].hasChildNodes()) {
			technology = entry.getElementsByTagName("technology")[0].childNodes[0].nodeValue;
		}
		if (entry.getElementsByTagName("url")[0].hasChildNodes()) {
			url = entry.getElementsByTagName("url")[0].childNodes[0].nodeValue;
		}
		var entryObject = {
			title: title || "",
			subtitle: subtitle || "",
			description: description || "",
			technology: technology || "",
			url: url || ""
		};
		var newEntry = React.createElement(LeftEntry, { entry: entryObject });
		entryArray.push(newEntry);
		if (i != entryList.length - 1) {
			entryArray.push(React.createElement(Divider, null));
		}
	}
	ReactDOM.render(entryArray, root);
}

function LeftEntry(props) {
	var link;
	if (props.entry.url == "") {
		link = null;
	} else {
		link = props.entry.url;
	}
	return React.createElement(
		"div",
		{ className: "container" },
		React.createElement(
			"div",
			{ className: "left-entry" },
			React.createElement(
				"div",
				{ className: "left-entry-left-column" },
				React.createElement(
					"div",
					{ className: "entry-header" },
					React.createElement(
						"h5",
						null,
						React.createElement(
							"b",
							null,
							props.entry.title
						)
					)
				),
				React.createElement(
					"div",
					{ className: "entry-subtitle" },
					React.createElement(
						"h5",
						null,
						props.entry.subtitle
					)
				),
				React.createElement(
					"div",
					{ className: "entry-technology" },
					props.entry.technology
				),
				React.createElement(
					"div",
					{ className: "entry-link" },
					props.entry.url != "" && React.createElement(
						"a",
						{ className: "button", href: link, target: "_blank", rel: "noopener noreferrer" },
						"Link"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "left-entry-right-column" },
				React.createElement(
					"div",
					{ className: "entry-description" },
					props.entry.description
				)
			)
		)
	);
}

function Divider() {
	return React.createElement("hr", { className: "entry-divider" });
}

xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
		var xmlDoc = xhttp.responseXML;
		renderXML(xmlDoc);
	}
};
xhttp.open("GET", "resume_page_xml.xml", true);
xhttp.send();