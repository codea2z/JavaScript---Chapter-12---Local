/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var request, xml;

function formatted(sum)
{
    if (sum.toString().indexOf(".") < 0)
    {
        sum += ".00"; 
    }
    if (sum.toString().indexOf(".") ===
            (sum.toString().length - 2)) 
    {
        sum += "0";
    }
    return sum; 
}

function totalise()
{
    var i, sum = 0, row_number =1, col_number = 0;
    var nums = xml.getElementsByTagName("num");
    
    for (i = 0; i < nums.length; i++)
    {
        sum += parseFloat(nums[i].firstChild.data);
        if ((i+1)%5 === 0)
        {
            document.getElementById("rt" + row_number).innerHTML 
                    = formatted(sum);
            sum = 0;
            row_number++;
        }
    }
    while (col_number !== 5)
    {
        for (i = 0; i < nums.length; i++)
        {
            if (i % 5 === 0)
            {
                sum += parseFloat(nums[i + col_number].firstChild.data);
            }
        }
        col_number++;
        document.getElementById("ct"+col_number).innerHTML 
                = formatted(sum);
        sum = 0; 
    }
    for (i = 0; i < nums.length; i++)
    {
        sum+= parseFloat(nums[i].firstChild.data);
    }
    document.getElementById("gt").innerHTML = formatted(sum); 
}

function populateCells()
{
    var i, nums = xml.getElementsByTagName("num");
    for (i = 0; i < nums.length; i++)
    {
        document.getElementById("n" + i).innerHTML = nums[i].firstChild.data;
        
        totalise();
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

function update()
{
    var row = document.getElementById("rownum").options.selectedIndex;
    var col = document.getElementById("colnum").options.selectedIndex;
    var new_value =
              document.getElementById("new_value").value;
      
    var panel = document.getElementById("title");
    
    if (row === 0)
    {
        panel.innerHTML = "Select a row"; 
        return;
    }
    if (col === 0)
    {
        panel.innerHTML = "Select a column"; 
        return;
    }
   if (!new_value)
   {
       panel.innerHTML = "Enter a value"; 
       return;
   }
   if (isNaN(new_value))
   {
       panel.innerHTML = "Enter number"; 
       return;
   }
   
   var target = (((row - 1) * 5) + col) - 1;
   xml.getElementsByTagName("num")[target].firstChild.data 
           = formatted(new_value);
   populateCells();
   totalise();
   
   document.getElementById("rownum").options[0].selected = true;
   document.getElementById("colnum").options[0].selected = true;
   document.getElementById("new_value").value = "";
   document.getElementById("title").innerHTML = "Cell Editor";
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
   
    document.getElementById("btn").onclick = update;
}

document.addEventListener("DOMContentLoaded", init, false);

