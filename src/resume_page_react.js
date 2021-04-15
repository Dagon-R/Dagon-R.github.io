import React from 'react';
import ReactDOM from 'react-dom';

var parser= new DOMParser();
var xhttp = new XMLHttpRequest();

function parseFile(){
	if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var xmlDoc = parse.parseFromString(text, xhttp.responseText);
	   renderXML(xmlDoc);
    }
}

function renderXML(){
	var sectionList = xmlDoc.getElementsByTagName("section");
	for(var i = 0; i < sectionList.length; i++){
		renderSection(sectionList[i]);
	}
}

function renderSection(section){
	var entryList = section.getElementsByTagName("entry");
	var sectionName = section.getAttribute("title");
	var root = document.getElementById(sectionName);
	for(var i = 0; i < entryList.length; i++){
		var entry = entryList[i];
		var entryObject = {
			title: entry.getElementsByTagName(title)[0].childNodes[0].nodeValue,
			subtitle: entry.getElementsByTagName(title)[0].childNodes[0].nodeValue,
			description: entry.getElementsByTagName(title)[0].childNodes[0].nodeValue,
			technology: entry.getElementsByTagName(title)[0].childNodes[0].nodeValue
		};
		const newEntry = <BasicEntry entry={EntryObject} />;
		ReactDOM.render(newEntry,root);
	}
}

function BasicEntry(props){
	return (
		<div className="container">
			<div className={"basic-entry"}>
				<div className="entry-header">
					{props.entry.title}
				</div>
				<div className="entry-subtitle">
					{props.entry.subtitle}		
				</div>
				<div className="entry-description">
					{props.entry.description}		
				</div>
			</div>
		</div>
	);
}

xhttp.onreadystatechange = parseFile();
xhttp.open("GET", "resume_page_react.xml", true);
xhttp.send();