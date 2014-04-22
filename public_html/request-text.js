/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var panel, request;

function showText()
{
    if (request.readyState === 4)
    {
        if (request.status === 200)
        {
            panel.innerHTML += "<br>" + request.responseText;
        }
    }
}

function doRequest()
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
    
    request.open("GET", "data.txt", true);
    request.send(null);
    request.onreadystatechange = showText;
}

function init()
{
    panel = document.getElementById("panel");
    var btn = document.getElementById("btn");
    btn.onclick = doRequest;
}

document.addEventListener("DOMContentLoaded", init, false);


