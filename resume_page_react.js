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
}

class BasicEntry extends React.Component {
	render(){
		
		return (
			
		);
	}
}

xhttp.onreadystatechange = parseFile();
xhttp.open("GET", "resume_page_react.xml", true);
xhttp.send();