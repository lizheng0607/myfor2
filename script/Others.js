function scrollButtom()
{
    t_below_right1.scrollTop=t_below_right1.scrollHeight;
    state1.scrollTop=state1.scrollHeight;
    state2.scrollTop=state2.scrollHeight;
}
function VNandVN(A,B)//判断A[] B[]有没有交集
{
    var i=0;
    while(A[i]!=""&&A[i]!=undefined)
    {
        var j=0;
        while(B[j]!=""&&B[j]!=undefined)
        {
            if(A[i]==B[j])
            {
                return A[i];//有交集
            }
            j++;
        }
        i++;
    }
    return 0;//没有交集
}
function addVn(A,B)//B[]加入到A[]
{
    //var i=0;
    var j=0;
    var xflag;
    //var xflag=0;
    while(B[j]!=""&&B[j]!=undefined)
    {   if(B[j]!="ε")
        {
            addL(A,B[j]);
            
        }
        else {
            xflag=9;
        }
        j++;
        
    }
    return xflag;
}
function addL(a,b)//把b加入到a[]
{  // flag=0;
    var i=0;
    if(b=="!")return;
    while(a[i]!=""&&a[i]!=undefined)
    {
        if(a[i]==b)
        {
            return 1;
        }
        i++;
    }
    a[i]=b;
    return 0;
    //Vnnum=i+1;
}
function checkVn(a,b)//判断b在不在a[]
{  // flag=0;
    var i=0;
    if(b=="!")return;
    while(a[i]!=""&&a[i]!=undefined)
    {
        if(a[i]==b)
        {
            return 1;
        }
        i++;
    }
    //a[i]=b;
    return 0;
    //Vnnum=i+1;
}
function addR(a,B)//把B加入到FirstVn[a,b, ......,B];
{
    var i=19;
    while(a[i]!=""){
        if(a[i]==B)return;

        i--;
    }
    a[i]=B;
}
function traverse()//把输入框内的左部非终结符加入[]
{   I=new Array();
    LR_I=new Array();
    LR_L=new Array();
    for(var i=0;i<30;i++)//[]置空
    {   I[i]=new Array();
        //
        //
        //L[i]
        Vn[i]="";
        vn[i]="";
        //errVn[i]="";
        selectVn[i]=new Array();
		    for(var k=0;k<20;k++)
		        {
			        selectVn[i][k]="";
                    I[i][k]="";
                    
		        }
        recursiveVn[i]="";
    }
    for(var i=0;i<50;i++)
    {LRVn[i]="";
    GOTOVn[i]="";
    numVn[i]="";
    err1[i]="";
    err2[i]="";
        LR_I[i]=new Array();
        LR_L[i]=new Array();
        for(var j=0;j<50;j++)
        {
            LR_I[i][j]="";
            LR_L[i][j]="";
        }
    }
    for(var i=0;i<30;i++)
    {
        str[i]="";
        LALR[i]="";
        //i++;

    }
    

    str1=document.getElementById("t_left").value.split('\n');
    var j=0;
    //Vnnum=0;
    while(str1[j]!=undefined)
    {
        str[j]=str1[j];
        j++;
       // Vnnum++;var i=0;
    }
    str1="";
    for( var i=0;i<str.length;i++)
    {   
        if(str[i].charAt(1)=="'"){addL(Vn,str[i].substring(0,2));}
        else{addL(Vn,str[i].charAt(0));}
    }

     
}


function myClick(id)//鼠标事件
{
    if(id==t_below_left)
    {
        // alert("ssss111");
    }
}



function empty(A,a)//把A[s,c,.......,B,D]中的D或B置空
{
    var j=19;
    while(j>15)
    {
        if(A[j]==a)A[j]="";

        j--;
    }
}
function empty1(A,a)
{
    var j=0;
    while(A[j]!=""&&A[j]!=undefined)
    {
        if(A[j]==a)
        {
            A[j]="";
            break;
        }
        j++;
    }
}
function FindX(A,b,num)//从A[]中找到b所在的位置，其中b肯定在A[]中,A[]的大小为num
{
    for(var i=0;i<num;i++)
    {
        if(b==A[i])return i;
    }
}
function FindX(A,b)
{   var i=0;
    while(A[i]!=""&&A[i]!=undefined)
    {
        if(A[i]==b)return i;
        i++;
    }
}
function compare(A,B)//比较A[] B[]有无相同元素
{
    var i=0,j=0;
    while(A[i]!="")
    {
        while(B[j]!="")
        {
            if(A[i]==B[j])return 0;

            j++;
        }
        i++;
    }
}

