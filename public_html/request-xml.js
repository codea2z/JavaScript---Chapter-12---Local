/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var panel, request;

function showXML()
{
    if ((request.readyState === 4) &&
       (request.status === 200))
    {
        var i, nums = 
        request.responseXML.getElementsByTagName("num");
        for (i = 0; i < nums.length; i++)
        {
            panel.innerHTML += "<br>" + nums[i].firstChild.data;
        }    
    }
    
}

function doRequest()
{
    request = new XMLHttpRequest();
    request.open("GET", "data.xml", true);
    request.send(null);
    request.onreadystatechange = showXML;
}

function init()
{
    panel = document.getElementById("panel");
    document.getElementById("btn").onclick = doRequest;
}

document.addEventListener("DOMContentLoaded", init, false);


