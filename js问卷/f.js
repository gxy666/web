		var ifc = new Boolean(false);
		var iff = new Boolean(false);
		var timu = new Array();
		var ifchecked = new Array();
		var xx;
		var checkanswer = new Array();
		var mode = new Array();
		var modef = new Array();
		function loadchoice()
		{
			iff = false;
			var xmlhttp;
			var que = new Array();
			if (window.XMLHttpRequest)
			{
				xmlhttp=new XMLHttpRequest();
			}
			else
			{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if(xmlhttp.readyState==4&&xmlhttp.status==200)
				{
					var acc = xmlhttp.responseText;
					que = acc.split("!!!!");
					for(var i = 0;i<que.length-1;++i)
					{
						checkanswer[i] = -1;
						ifchecked[i] = false;
					}
					if(ifc==false)
					{	
						var tempt = que[0].split("@@");
						ifchecked.push(false);
						mode[0] = (tempt[5].charCodeAt(0)-48);
						document.getElementById("qu").innerHTML = '<h3 id =  "'+0+'i" ></h3><br><label id =  "'+0+'c1" class = "checkfont"><input type="checkbox" name="c1" onclick = "c(this,ifchecked,0)"><span></span></label><label id =  "'+0+'c2" class = "checkfont"><input type="checkbox" name="c2" onclick = "c(this,ifchecked,0)"><span></span></label><label id =  "'+0+'c3" class = "checkfont"><input type="checkbox" name="c3" onclick = "c(this,ifchecked,0)"><span></span></label><br>';
						document.getElementById('0i').innerHTML = tempt[0]+"\t"+tempt[1]+"";
						document.getElementById('0c1').innerHTML =document.getElementById('0c1').innerHTML+ tempt[2];
						document.getElementById('0c2').innerHTML =document.getElementById('0c2').innerHTML+ tempt[3];
						document.getElementById('0c3').innerHTML =document.getElementById('0c3').innerHTML+ tempt[4];
						for(var i = 1;i<que.length-1;i++)
						{
							xx = i;
							var html = document.getElementById("qu").innerHTML;
							var temp = que[i].split("@@");
							ifchecked.push(false);
							mode[i] = (temp[5].charCodeAt(0)-48);
							document.getElementById("qu").innerHTML = html+'<h3 id =  "'+i+'i" ></h3><br><label id =  "'+i+'c1" class = "checkfont"><input type="checkbox" name="c1" onclick = "c(this,ifchecked,'+i+')"><span></span></label><label id =  "'+i+'c2" class = "checkfont"><input type="checkbox" name="c2" onclick = "c(this,ifchecked,'+i+')"><span></span></label><label id =  "'+i+'c3" class = "checkfont"><input type="checkbox" name="c3" onclick = "c(this,ifchecked,'+i+')"><span></span></label><br>';
							document.getElementById(i+'i').innerHTML = temp[0]+"\t"+temp[1]+"";
							document.getElementById(i+'c1').innerHTML = document.getElementById(i+'c1').innerHTML+temp[2];
							document.getElementById(i+'c2').innerHTML = document.getElementById(i+'c2').innerHTML+temp[3];
							document.getElementById(i+'c3').innerHTML =document.getElementById(i+'c3').innerHTML+temp[4];
						}
						ifc = true;
					}
					else
					{
						alert("没有题目了");
					}
				}
			}
			xmlhttp.open("GET","http://localhost/serve.php?q="+"choice",true);
			xmlhttp.send();
		
		}
		function loadfill()
		{
			ifc = false;
			var xmlhttp;
			if (window.XMLHttpRequest)
			{
				xmlhttp=new XMLHttpRequest();
			}
			else
			{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if(xmlhttp.readyState==4&&xmlhttp.status==200)
				{
					var acc = xmlhttp.responseText;
					que = acc.split("!!!!");
					if(iff==false)
					{	
						var tempt = que[0].split("@@");
						modef[0] = (tempt[2]);
						document.getElementById("qu").innerHTML = '<h3 id =  "'+0+'i" ></h3><br><input type="text" id="a0">';
						document.getElementById('0i').innerHTML = tempt[0]+"\t"+tempt[1];
						for(var i = 1;i<que.length-1;i++)
						{
							var html = document.getElementById("qu").innerHTML;
							var temp = que[i].split("@@");
							modef[i] = (temp[2]);
							document.getElementById("qu").innerHTML = html+'<h3 id =  "'+i+'i" ></h3><br><input type="text" id="a'+i+'">';
							document.getElementById(i+'i').innerHTML = temp[0]+"\t"+temp[1];
						}
						iff = true;
					}
					else
					{
						alert("没有题目了");
					}
				}
			}
			xmlhttp.open("GET","http://localhost/serve.php?q="+"fill",true);
			xmlhttp.send();
		}
		function c(object,arr,x)
		{
			if(arr[x]==false)
			{
				arr[x] = true;
				checkanswer[x] = ((object.name.charCodeAt(1)-48));
			}
			else
			{
				if(object.checked==true)
				{
					object.checked = false;
					alert("只能选择一个选项")
				}
				else
				{
					arr[x] = false;
					checkanswer[x] = (-1);
				}
			}
		}
		function checker()
		{
			var score = 0;
			if(ifc==false&&iff==false)
			{
				alert("您还没有加载题目！");
			}
			else
			{
				if(ifc==true&&iff==true)
					alert("系统错乱，请重新加载");
				else if(ifc==true&&iff==false)
					{
						for(var i = 0;i<checkanswer.length;++i)
						{
							if(checkanswer[i]==-1)
							{
								alert("您还没有作答所有题目！");
								return 0;
							}
							else
							{
								if(checkanswer[i]==mode[i])
								{
									score+=100/checkanswer.length;
								}
							}
						}
					}
					else
					{
						for(var i = 0;i<modef.length;++i)
						{
							if(document.getElementById('a'+i).value=="")
							{
								alert("您还没有作答所有题目！");
								return 0;
							}
							else
							{
								if(document.getElementById('a'+i).value==modef[i])
								{
									score+=100/modef.length;
								}
							}
						}
					}
					alert("您的分数是"+Math.round(score)+"分！");
			}
		}