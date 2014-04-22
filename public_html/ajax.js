/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var request, xml;

function populateCells()
{
    var i, nums = xml.getElementsByTagName("num");
    for (i = 0; i < nums.length; i++)
    {
        document.getElementById("n" + i).innerHTML += nums[i].firstChild.data;
    }
}

function storeXML()
{
    if ((request.readyState === 4) &&
            (request.status === 200))
    {
        xml = request.responseXML;
        populateCells();
    }
}

function init()
{
    if (XMLHttpRequest)
    {
        request = new XMLHttpRequest();
    }
    else if (ActiveXObject)
    {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else
    {
        return false; 
    }
    
    request.open("GET", "ajax.xml", true);
    request.send(null);
    request.onreadystatechange = storeXML;
   
    //document.getElementById("btn").onclick = update;
}

document.addEventListener("DOMContentLoaded", init, false);

