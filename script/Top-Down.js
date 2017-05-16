var str=[30];//输入框内容
var selectVn=[30];
var Vn=[20],vn=[20];//非终结符数组  终结符数组
var Vnnum,selectVnnum;//Vn[] selectVn[]中非终结符个数
var counter1,counter2,counter3;//计数器

var FirstVn,FollowVn,FirstVnnum,FollowVnnum,FirstFlag=0,FollowFlag=0;//fist集 follow集
var flag=0,flag1=0,flag2=0;

var recursiveVn=[20];//递归元素集合
var str1,str2,str3;//临时字符串
var LLflag=0;
var LLpanduan=0;

///////////
var I;
var kk=0;

function addF(a,b,c)
{        //if(c!=1)//未开始第三步
        //{        
                    counter2=a;
                    counter3=b;
                    if(c!=1)
                    str1="(2)若有产生式A->αBβ,则把FIRST(β)-ε 加入FOLLOW(B)"+'\n'+'\n'+str[counter1]+'\n';
                    else{
                        str1="(3)若A->αB,或A->αBβ,且ε∈FIRST(β),则把FOLLOW(A)加入FOLLOW(B)"+'\n'+'\n'+str[counter1]+'\n';
                    }

                    while(str[counter1].charAt(counter2)!="")
                    {   
                        if(str[counter1].charAt(counter2)>='A'&&str[counter1].charAt(counter2)<='Z')
                        {   //var xflag=0;//A->aBD 若D有空，则把A的Follow加入B的
                              if(str[counter1].charAt(counter2+1)!="'")
                            {   
                                /*var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                if(str[counter1].charAt(counter2+1)==undefined) //A->....B，把A中的Follow非空加入B中去
                                {   var j=FindX(Vn,str[counter1].charAt(0),FollowVnnum); 
                                    addVn(FollowVn[j],FollowVn[i]);
                                }
                                else *////开始第三步之后
                                if((str[counter1].charAt(counter3+1)<'A'||str[counter1].charAt(counter3+1)>'Z')&&str[counter1].charAt(counter3+1)!="")
                                {   if(c!=1)
                                    {var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                    addL(FollowVn[i],str[counter1].charAt(counter3+1));//A->Ba a计入B的Follow集
                                    str1+=str[counter1].charAt(counter3+1)+"加入到Follow("+Vn[i]+")中"+'\n';
                                    flag1=2;

                                    }
                                    
                                    //xflag=1;
                                }
                                else if(str[counter1].charAt(counter3+1)>='A'&&str[counter1].charAt(counter3+1)<='Z')
                                {   
                                    if(str[counter1].charAt(counter3+2)!="'")//A->aBD  把First(D)-ε加入到Follow(B)
                                    {
                                        var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                        var j=FindX(Vn,str[counter1].charAt(counter3+1),FollowVnnum);
                                        if(j!=undefined)
                                        { 
                                         if(addVn(FollowVn[i],FirstVn[j])!=9)//First（D）中不含ε
                                         {  if(c!=1)
                                             str1+="Fisrt("+Vn[j]+")加入到Follow("+Vn[i]+")中"+'\n';
                                             
                                            flag1=2;
                                            //xflag=1;
                                         }
                                         else//First（D）中含ε
                                         {   if(c!=1)
                                             str1+="Fisrt("+Vn[j]+")-ε加入到Follow("+Vn[i]+")中,其中"+'\n'+
                                                    "其中Fisrt("+Vn[j]+")包含ε，后继元素的First-ε也要加入"+'\n';
                                            else{
                                                str1+="Fisrt("+Vn[j]+")包含ε ";
                                            }
                                            counter3++;
                                         }
                                        

                                        }
                                        else{
                                            if(str[counter1].charAt(1)=="-")var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                            else if(str[counter1].charAt(1)=="'")var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                            str1+="因此"+'\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                        }
                                       
                                    }
                                    else if(str[counter1].charAt(counter3+2)=="'")//A->aBD'  把First(D')-ε加入到Follow(B)
                                    {   var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                        var j=FindX(Vn,str[counter1].substring(counter3+1,counter3+3),FollowVnnum);
                                        if(j!=undefined)
                                        {
                                           if(addVn(FollowVn[i],FirstVn[j])!=9) 
                                           {    if(c!=1)
                                               str1+="Fisrt("+Vn[j]+")加入到Follow("+Vn[i]+")中"+'\n';
                                            flag1=2;

                                           }
                                           else{
                                               if(c!=1)
                                                str1+="Fisrt("+Vn[j]+")-ε加入到Follow("+Vn[i]+")中"+'\n'
                                                    +"其中Fisrt("+Vn[j]+")包含ε，后继元素的Firsts-ε也要加入"+'\n';

                                                else{
                                                    str1+="Fisrt("+Vn[j]+")包含ε ";
                                                }
                                                    counter3=counter3+2;
                                           }
                                        
                                        }
                                         else{
                                            if(str[counter1].charAt(1)=="-")var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                            else if(str[counter1].charAt(1)=="'")var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                            str1+="因此"+'\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                        }
                                        

                                    }
                                }
                                
                            }
                            else if(str[counter1].charAt(counter2+1)=="'")
                            {   
                                    if((str[counter1].charAt(counter3+2)<'A'||str[counter1].charAt(counter3+2)>'Z')&&str[counter1].charAt(counter3+2)!="")//A->B'a a计入B'的Follow集
                                    {
                                    var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                    addL(FollowVn[i],str[counter1].charAt(counter3+2));
                                    str1+=str[counter1].charAt(counter3+2)+"加入到Follow("+Vn[i]+")中"+'\n';
                                    flag1=2;
                                    }
                                    else if(str[counter1].charAt(counter3+2)>='A'&&str[counter1].charAt(counter3+2)<='Z')
                                    {   if(str[counter1].charAt(counter3+3)!="'")////A->aB'D  把First(D)-ε加入到Follow(B')
                                        {   var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                        var j=FindX(Vn,str[counter1].charAt(counter3+2),FollowVnnum);
                                        if(j!=undefined)
                                        {
                                             if(addVn(FollowVn[i],FirstVn[j])!=9)//First(D)不含空
                                             {  if(c!=1)
                                                 str1+="Fisrt("+Vn[j]+")-ε加入到Follow("+Vn[i]+")中"+'\n';
                                            flag1=2;
                                             }
                                             else{//有空
                                                 
                                                 if(c!=1)str1="Fisrt("+Vn[j]+")-ε加入到Follow("+Vn[i]+")中"+'\n'
                                                    +"其中Fisrt("+Vn[j]+")包含ε，后继元素的First()-ε也要加入"+'\n';
                                                else{ str1+="Fisrt("+Vn[j]+")包含ε ";}
                                                    counter3=counter3+2;
                                             }
                                        
                                        }
                                        else{
                                            if(str[counter1].charAt(1)=="-")var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                            else if(str[counter1].charAt(1)=="'")var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                            str1+="因此"+'\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                        }
                                       

                                    }
                                        else if(str[counter1].charAt(counter3+3)=="'")//A->aB'D'  把First(D')-ε加入到Follow(B')
                                        {
                                            var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                        var j=FindX(Vn,str[counter1].substring(counter3+2,counter3+4),FollowVnnum);
                                        if(j!=undefined)
                                        {   if( addVn(FollowVn[i],FirstVn[j])!=9)
                                            {   if(c!=1)
                                                  str1+="Fisrt("+Vn[j]+")加入到Follow("+Vn[i]+")中"+'\n';
                                                flag1=2;
                                            }
                                            else{  if(c!=1)
                                                 str1+="Fisrt("+Vn[j]+")-ε加入到Follow("+Vn[i]+")中"+'\n'
                                                    +"其中Fisrt("+Vn[j]+")包含ε，后继元素的First()-ε也要加入"+'\n';
                                                    else{
                                                        str1+="Fisrt("+Vn[j]+")包含ε ";
                                                    }
                                                    counter3=counter3+3;
                                                }
                                        }
                                        else{
                                            if(str[counter1].charAt(1)=="-")var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                            else if(str[counter1].charAt(1)=="'")var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                            str1+="因此"+'\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                        }
                                        
                                        }
                                    } 
                                
                            
                        } }
                        /////////////////////
                        //////控制循环 关于counter2\3的循环
                             if(flag1==2||str[counter1].charAt(counter3+1)==""||(str[counter1].charAt(counter2+1)=="'"&&str[counter1].charAt(counter3+2)==""))
                             {  if(str[counter1].charAt(counter3+1)=="")
                                {
                                    if(flag1==1&&c!=1)
                                    {
                                       // flag1=2;
                                        if(str[counter1].charAt(1)=="-")
                                        {   
                                            if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].charAt(0)&&i!=undefined)
                                            addR(FollowVn[i],str[counter1].charAt(0));
                                        }
                                        
                                        else{//var i=FindX(Vn,str[counter1].charAt(1),Vnnum);  
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].substring(0,2)&&i!=undefined)
                                            addR(FollowVn[i],str[counter1].substring(0,2))  ;       }

                                    }
                                    else if(c==1)
                                    {
                                        if(str[counter1].charAt(1)=="-")
                                        {   var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                            if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].charAt(0)&&i!=undefined)
                                            {
                                                 
                                            str1+='\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                            }
                                            //addR(FollowVn[i],str[counter1].charAt(0));
                                        }
                                        
                                        else{//var i=FindX(Vn,str[counter1].charAt(1),Vnnum);  
                                            var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].substring(0,2)&&i!=undefined)
                                            {
                                                 
                                            str1+='\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                            }
                                            //addR(FollowVn[i],str[counter1].substring(0,2))  ;       }
                                    }
                                }
                            }
                                else if(str[counter1].charAt(counter2+1)=="'"&&str[counter1].charAt(counter3+2)=="") 
                                {    if(flag1==1&&c!=1)
                                    {
                                        flag1=2;
                                        
                                        if(str[counter1].charAt(1)=="-")
                                        {   //var i=FindX(Vn,str[counter1].charAt(1),Vnnum);
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].charAt(0)&&i!=undefined)
                                            addR(FollowVn[i],str[counter1].charAt(0));
                                        }
                                        
                                        else{//var i=FindX(Vn,str[counter1].charAt(1),Vnnum); 
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].substring(0,2)&&i!=undefined)
                                            addR(FollowVn[i],str[counter1].substring(0,2))  ;       }

                                    }
                                    else if(c==1)
                                    {    if(str[counter1].charAt(1)=="-")
                                        {   //var i=FindX(Vn,str[counter1].charAt(1),Vnnum);
                                            var k=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].charAt(0)&&i!=undefined)
                                            {
                                            str1+='\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                            }
                                            //addR(FollowVn[i],str[counter1].charAt(0));
                                        }
                                        
                                        else{//var i=FindX(Vn,str[counter1].charAt(1),Vnnum); 
                                            var k=FindX(Vn,str[counter1].substring(0,2),FollowVnnum);
                                             if(str[counter1].charAt(counter2+1)!="'") var i=FindX(Vn,str[counter1].charAt(counter2),FollowVnnum);
                                            else if(str[counter1].charAt(counter2+1)=="'")var i=FindX(Vn,str[counter1].substring(counter2,counter2+2),FollowVnnum);
                                            if(Vn[i]!=str[counter1].substring(0,2)&&i!=undefined)
                                            {
                                                str1+='\n'+"Follow("+Vn[k]+")要加入到Follow("+Vn[i]+")中";
                                            }
                                           // addR(FollowVn[i],str[counter1].substring(0,2))  ;       }

                                    }

                                }
                                }
                                counter2++;
                                counter3=counter2;
                                flag1=1;
                             }

                             else {
                            counter2++;
                            counter3=counter2;
                            flag1=1;
                        }  
                    
                
                        //////////////////////////
                         
                         if(str[counter1].charAt(counter2)=="")
                         {
                             if(str1!="(2)若有产生式A->αBβ,则把FIRST(β)-ε 加入FOLLOW(B)"+'\n'+'\n'+str[counter1]+'\n'&&str1!="(3)若A->αB,或A->αBβ,且ε∈FIRST(β),则把FOLLOW(A)加入FOLLOW(B)"+'\n'+'\n'+str[counter1]+'\n')
                             {
                                  document.getElementById("t_below_right1").innerHTML=str1;
                                  counter1++;
                                  flag1=1;
                                  return;
                             }
                             else{
                                 counter1++;//关于counter1的循环
                                flag1=1;
                                return 5;
                             }
                           
                        
                         
                        }

        }
                   
}

function addFollow()
{       
        if(FollowFlag==0)
        {   if(FirstFlag==0)//先求First集
            {   alert("请先求First集！")
                return;
            }
            while(str[counter1]!="")
            {   if(flag1==0)
                {
                    var i=FindX(Vn,str[counter1].charAt(0),FollowVnnum);
                    addL(FollowVn[i],"#");
                    flag1=1;
                    document.getElementById("t_below_right1").innerHTML="(1)置#于FOLLOW("+Vn[i]+")中.";
                    return;
                    
                }
                if(str[counter1].charAt(1)=="-")//A->Ba直接把a加入到Follow（B）中 
                    {
                             if(addF(3,3,flag2)!=5)
                                 return;
                                
                                
                    }
                    ///////////////////////////////////////////////////
                    ///////////////////////////////////////////////////
                    /////////////////////////////////////////
                    else if(str[counter1].charAt(1)=="'")
                    {   
                        if(addF(4,4,flag2)!=5)
                            return;
                    }

                    
            }
            if(str[counter1]==""&&flag2!=1)
            {  
                flag2=1;//置1 标识开始求第三步
                counter1=0;

                //counter2=0;
                //while()
            }
            else{
                var i=0;
                
                while(Vn[i]!="")
                {   var j=19;
                    while(FollowVn[i][j]==""&&j>15)
                    {j--;}
                    if(j!=15)
                    {
                         //if(
                             FollowADD(Vn[i],j,i);//)
                        //{
                         FollowVn[i][j]="";
                         var u=0;
                         while(I[i][u]!="")
                         {
                             if(I[i][u]!="%"&&I[i][u+1]==""&&I[i][u]!="|")
                             {
                                I[i][u+1]="|";
                                break;
                             }
                             u++;
                         }
                        // break;
                        //}
                    }
                    if(j==15)
                        i++;   
                }
                //////////////////////////
                //整理I[]
                ////////////////////////////////
                var i=0;
                while(Vn[i]!="")
                {   
                    var j=-1,k=0;
                    var xxflag=0;
                    while(I[i][j]!="")
                    {
                        if(j==-1||I[i][j]=="|"||I[i][j]=="%")
                        {
                            k=j+1;
                            while(I[i][k]!=""&&I[i][k]!="|")
                            {   if(I[i][k]=="%")
                                {   
                                    xxflag=k;
                                    k--;
                                    while(k>j)
                                    {
                                        var z=FindX(Vn,I[i][k],Vnnum);
                                        addVn(FollowVn[i],FollowVn[z]);
                                        addVn(FollowVn[z],FollowVn[i]);
                                        k--;
                                    }
                                    break;
                                }
                                k++
                                
                            }


                            
                                //k++;
                        }
                        if(I[i][xxflag]=="%"){j=xxflag; xxflag=0;}
                        else if(I[i][k]=="|"||I[i][k]=="") j=k;
                        //else{j++;}
                        
                    }


                    i++;
                }



                ///////////////////////////////////
                alert("已求出Follow集");
                document.getElementById("t_below_right1").innerHTML="已求出Follow集";
                FollowFlag=1;
                showFollow();
                /*i=0;
                str1="";
                while(Vn[i]!="")
                { str1+="Follow("+Vn[i]+")=";
                    var j=0;
                    while(FollowVn[i][j]!="")
                    {
                        str1+=FollowVn[i][j];
                        j++;

                    }
                    
                    str1+='\n';
                    i++;
                }
                document.getElementById("t_right_2").innerHTML=str1;*/
               

            }
        }
        else if( FollowFlag==1) {alert("已求出Follow集");
        document.getElementById("t_below_right1").innerHTML="已求出Follow集";}
}
function FollowADD(A,h,c)//A->a.........B 将Follow（A）加入到Follow(B)的具体实现
{   var i=FindX(Vn,A,FollowVnnum);
    var j=FindX(Vn,FollowVn[i][h],FollowVnnum);
    
    if(Vn[c]==FollowVn[i][h])//I[]中已存在A
        {   //kk++;
            addL(I[c],"%");
            return 1;
        }
        else{
            addL(I[c],FollowVn[i][h]);
        }

    for(var r=0;r<5;r++)
    {   var k=19;
        while(FollowVn[j][k]==""&&k>15)
        {   
             k--;
        }
    
    if(k!=15)
    {
        if(FollowADD(Vn[j],k,c)==0)
        {
            FollowVn[j][k]="";
            //return 0;
        }
        
        else {
           // FollowVn[j][k]="";
            return 1;
            
        }
    }
    else{
        addVn(FollowVn[i],FollowVn[j]);
        return 0;
    }
    }  
    
    
}
function showFollow()
{
     i=0;
                str1="";
                while(Vn[i]!="")
                { str1+="Follow("+Vn[i]+")=";
                    var j=0;
                    while(FollowVn[i][j]!="")
                    {
                        str1+=FollowVn[i][j];
                        j++;

                    }
                    
                    str1+='\n';
                    i++;
                }
                document.getElementById("t_right_2").innerHTML=str1;
}
function showFirst()
{
    str1="";
            var i=0;
            while(Vn[i]!="")
            {   var j=0;
                while(FirstVn[i][j]!="")
                {
                     if(str1==""||str1.charAt(str1.length-1)=="|")
                     {
                            if(FirstVn[i][j+1]!="")
                            str1+="First("+Vn[i]+")="+FirstVn[i][j];
                        else{
                            str1+="First("+Vn[i]+")="+FirstVn[i][j]+"|";
                        }
                     }
                        
                     else{
                         if(FirstVn[i][j+1]!="")
                            str1+=FirstVn[i][j];
                        else{
                            str1+=FirstVn[i][j]+"|";
                        }
                    }
                    j++;

                }
               i++;
            }
            str2=str1.split("|");
            str1="";
            var i=0;

            while(str2[i]!=undefined&&str2[i]!="")
            {
                if(str1=="")
                {
                    str1=str2[i]+'\n';
                }
                else{
                    str1+=str2[i]+'\n';
                }
                i++;
            }
            document.getElementById("t_right_1").innerHTML=str1;
}
function addFirst()//求First集
{
       //document.getElementById("t_below_right1").innerHTML="(2)若X∈Vn，且有产生式X->a...则把a加入FIRST(X)";
        if(FirstFlag==0)
        {
                  
                         while(str[counter1]!="")
                         {
                             if(str[counter1].charAt(1)=="-"&&str[counter1].charAt(str[counter1].length-1)!="~")
                             {
                                 if(str[counter1].charAt(3)<'A'||str[counter1].charAt(3)>'Z')
                                 {  document.getElementById("t_below_right1").innerHTML="(2)若X∈Vn，且有产生式X->a...则把a加入FIRST(X)"+'\n'+'\n'
                                                                                            +str[counter1]+'\n'+str[counter1].charAt(3)+"加入到First("+str[counter1].charAt(0)+")";
                                    for(var i=0;i<FirstVnnum;i++)
                                    {
                                        if(Vn[i]==str[counter1].charAt(0))
                                        {
                                            addL(FirstVn[i],str[counter1].charAt(3));//将终结符加入到First集中
                                            str[counter1]=str[counter1].substring(0,str[counter1].length)+"~";
                                            //counter1++;
                                            return;
                                        }
                                    }
                                 }
                                 
                             }
                             else if(str[counter1].charAt(1)=="'"&&str[counter1].charAt(str[counter1].length-1)!="~")
                             {
                                if(str[counter1].charAt(4)<'A'||str[counter1].charAt(4)>'Z')
                                 {  document.getElementById("t_below_right1").innerHTML="(2)若X∈Vn，且有产生式X->a...则把a加入FIRST(X)"+'\n'+'\n'
                                                                                            +str[counter1]+'\n'+str[counter1].charAt(4)+"加入到First("+str[counter1].substring(0,2)+")";
                                    for(var i=0;i<FirstVnnum;i++)
                                    {
                                        if(Vn[i]==str[counter1].substring(0,2))
                                        {
                                           //var i=FindX(Vn,str[counter1].substring(0,2),Vnnum);
                                            addL(FirstVn[i],str[counter1].charAt(4));//将终结符加入到First集中
                                            str[counter1]=str[counter1].substring(0,str[counter1].length)+"~";
                                            //counter1++;
                                            return;
                                        }
                                    }
                                 }
                             }

                             counter1++;
                                  //A->Ba 把B加入FirstVn中
                             if(str[counter1]=="")
                            {  
                             counter1=0;
                             while(str[counter1]!="")
                             {
                                 if(str[counter1].charAt(str[counter1].length-1)!="~")
                                 {
                                     if(str[counter1].charAt(1)=="'")
                                     {  
                                         var i=FindX(Vn,str[counter1].substring(0,2),FirstVnnum);
                                         if(str[counter1].charAt(5)!="'")
                                         {//var j=FindX(Vn,str[counter1].charAt(4),FirstVnnum);
                                         addR(FirstVn[i],str[counter1].charAt(4));//把B加入到FirstVn[a,b, ......,B];
                                         }
                                         
                                         else{
                                            // var j=FindX(Vn,str[counter1].substring(4,6),FirstVnnum);
                                             addR(FirstVn[i],str[counter1].substring(4,6));//把B'加入到FirstVn[a,b, ......,B'];
                                         }
                                         
                                     }
                                     else if(str[counter1].charAt(1)=="-")
                                     {
                                         var i=FindX(Vn,str[counter1].charAt(0),FirstVnnum);
                                         if(str[counter1].charAt(4)!="'")
                                         {
                                                //var j=FindX(Vn,str[counter1].charAt(3),FirstVnnum);
                                                addR(FirstVn[i],str[counter1].charAt(3));
                                         }
                                         
                                         else{
                                             //var j=FindX(Vn,str[counter1].substring(3,5),FirstVnnum);
                                              addR(FirstVn[i],str[counter1].substring(3,5));

                                         }
                                         
                                     }
                                 }
                                 counter1++;
                             }
                             //break;
                             //while
                            }
                            
                         }
                         ///////////////////////////////////////////
                         //以下正式整合First集中的元素
                         counter2=0;
                         while(str[counter2]!="")
                         {   if(str[counter2].charAt(str[counter2].length-1)!="~")
                                 {
                                     if(str[counter2].charAt(1)=="'")
                                     {      var p=0;
                                         var i=FindX(Vn,str[counter2].substring(0,2),FirstVnnum);
                                         if(str[counter2].charAt(5)!="'")
                                         {  var j=FindX(Vn,str[counter2].charAt(4),FirstVnnum);
                                             p=0;
                                         }
                                         else{p=1;
                                            var j=FindX(Vn,str[counter2].substring(4,6),FirstVnnum);
                                            }
                                         
                                         var h=19;
                                         while(h>15)
                                         {
                                             if(FirstVn[j][h]=="")h--;
                                             else{
                                                 if(FirstVn[j][h]==Vn[j])
                                                 {
                                                     FirstVn[j][h]=="";
                                                     h--;
                                                 }
                                                 else{
                                                        break;
                                                     }


                                                 
                                                 }
                                         }
                                         if(h==15)
                                         {
                                             var L=0;
                                             str1="(3)若X->Y1Y2...Yk,则把FIRST(Yi)中所有非ε元素加入       "+'\n'+
                                                        "       FIRST(X),直到Yj,ε不属于FIRST(Yj)                "+'\n'+
                                                        "       UNTIL 各FIRST集合不再增大为止                   "+'\n'+'\n'+
                                                        str[counter2]+'\n'+
                                                        "First("+Vn[j]+")中的";
                                            var xflag=0;
                                             while(FirstVn[j][L]!="")
                                             {     
                                                    //A->Bt...如果B中有ε，把t加入到First(A)中
                                                    if(FirstVn[j][L]=="ε")
                                                    {   xflag=1;
                                                        if(p==0)
                                                        {
                                                             if(str[counter2].charAt(5)<'A'||str[counter2].charAt(5)>'Z')
                                                                {
                                                                    addL(FirstVn[i],str[counter2].charAt(5))
                                                                    }
                                                            else{   
                                                                  /*  if(str[counter2].charAt(6)!="'")
                                                                    addR(FirstVn[i],str[counter2].charAt(5));
                                                                    else{
                                                                        addR(FirstVn[i],str[counter2].substring(5,7));
                                                                    }*/
                                                                    str2=str[counter2].substring(0,4)+str[counter2].substring(5,str[counter2].length)+"!";
                                                                    addL(str,str2);
                                                                 }
                                                        }
                                                        else{
                                                            if(str[counter2].charAt(6)<'A'||str[counter2].charAt(6)>'Z')
                                                                {
                                                                    addL(FirstVn[i],str[counter2].charAt(6))
                                                                    }
                                                            else{  /* if(str[counter2].charAt(7)!="'")
                                                                    addR(FirstVn[i],str[counter2].charAt(6));
                                                                    else{
                                                                        addR(FirstVn[i],str[counter2].substring(6,8));
                                                                    }*/
                                                                    str2=str[counter2].substring(0,4)+str[counter2].substring(6,str[counter2].length)+"!";
                                                                    addL(str,str2);
                                                                 }
                                                        }
                                                       
                                                    }
                                                    else{
                                                         addL(FirstVn[i],FirstVn[j][L]);
                                                          str1+=FirstVn[j][L];
                                                    }
                                                    

                                                   
                                                    L++;
                                                }

                                            
                                             if(p==0)   
                                             empty(FirstVn[i],str[counter2].charAt(4));
                                             else{
                                                 empty(FirstVn[i],str[counter2].substring(4,6));
                                             }
                                             str1+="加入到First("+Vn[i]+")中";
                                             if(xflag==1)str1+='\n'+"其中Frist("+Vn[j]+")有ε，其后继元素的First集要加入到First("+Vn[i]+")中。";
                                             document.getElementById("t_below_right1").innerHTML=str1;

                                             str[counter2]=str[counter2]+"~";
                                             return;
                                             

                                         }
                                         //addR(FirstVn[i],str[counter2].charAt(4))//把B加入到FirstVn[a,b, ......,B];
                                     }
                                     else if(str[counter2].charAt(1)=="-")
                                     {  var p=0;

                                         var i=FindX(Vn,str[counter2].charAt(0),FirstVnnum);

                                         if(str[counter2].charAt(4)!="'")
                                         {
                                            var j=FindX(Vn,str[counter2].charAt(3),FirstVnnum);
                                            p=0;
                                         }
                                         else{
                                             var j=FindX(Vn,str[counter2].substring(3,5),FirstVnnum);
                                             p=1;
                                         }
                                          var h=19;
                                         while(h>15)
                                         {
                                             if(FirstVn[j][h]=="")h--;
                                             else{
                                                 if(FirstVn[j][h]==Vn[j])
                                                 {
                                                     FirstVn[j][h]=="";
                                                     h--;
                                                 }
                                                 else{
                                                        break;
                                                     }
                                             }
                                         }
                                         if(h==15)
                                         {
                                             var L=0;
                                             str1="(3)若X->Y1Y2...Yk,则把FIRST(Yi)中所有非ε元素加入       "+'\n'+
                                                        "       FIRST(X),直到Yj,ε不属于FIRST(Yj)                "+'\n'+
                                                        "       UNTIL 各FIRST集合不再增大为止                   "+'\n'+'\n'+
                                                        str[counter2]+'\n'+
                                                        "First("+Vn[j]+")中的";

                                            var xflag=0;//标记有无ε
                                             while(FirstVn[j][L]!="")
                                             {
                                                  //A->Bt...如果B中有ε，把t加入到First(A)中
                                                    if(FirstVn[j][L]=="ε")
                                                    {   xflag=1;
                                                        if(p==0)
                                                        {
                                                            if(str[counter2].charAt(4)<'A'||str[counter2].charAt(4)>'Z')
                                                        {
                                                            addL(FirstVn[i],str[counter2].charAt(4))
                                                        }
                                                        else{
                                                           // addR(FirstVn[i],str[counter2].charAt(4));
                                                            str2=str[counter2].substring(0,3)+str[counter2].substring(4,str[counter2].length)+"!";
                                                            addL(str,str2);
                                                        }
                                                    }
                                                    else{
                                                        if(str[counter2].charAt(5)<'A'||str[counter2].charAt(5)>'Z')
                                                        {
                                                            addL(FirstVn[i],str[counter2].charAt(5))
                                                        }
                                                        else{
                                                           // addR(FirstVn[i],str[counter2].charAt(5));
                                                            str2=str[counter2].substring(0,3)+str[counter2].substring(5,str[counter2].length)+"!";
                                                            addL(str,str2);
                                                        }
                                                    }
                                                        
                                                }
                                                else{
                                                    addL(FirstVn[i],FirstVn[j][L]);
                                                     str1+=FirstVn[j][L];
                                                }
                                                
                                                 L++;
                                                
                                            }
                                            
                                            if(p==0)
                                             empty(FirstVn[i],str[counter2].charAt(3));
                                             else{
                                                 empty(FirstVn[i],str[counter2].substring(3,5));
                                             }
                                             
                                             str1+="加入到First("+Vn[i]+")中";
                                             if(xflag==1)str1+='\n'+"其中Frist("+Vn[j]+")有ε，其后继元素的First集要加入到First("+Vn[i]+")中。";
                                             document.getElementById("t_below_right1").innerHTML=str1;
                                             str[counter2]=str[counter2]+"~";
                                             return;
                                             

                                         }
                                         //addR(FirstVn[i],str[counter2].charAt(3))//把B加入到FirstVn[a,b, ......,B];
                                     }
                                 }
                                 counter2++;

                         }
                         if(str[counter2]=="")//First集全部求完，都有后缀“~”，接下来去除带有“！”的
                         {
                            counter2--;
                            while(str[counter2].charAt(str[counter2].length-2)=="!")
                            {
                                str[counter2]="";
                                counter2--;
                            }

                            //////////////////////////
                            //以上First集完成
                            //////////////////////////
                            FirstFlag=1;
                         }
        }
        else if(FirstFlag==1){
            alert("已求出First集");
            document.getElementById("t_below_right1").innerHTML="已求出First集";
            
            /*str1="";
            var i=0;
            while(Vn[i]!="")
            {   var j=0;
                while(FirstVn[i][j]!="")
                {
                     if(str1==""||str1.charAt(str1.length-1)=="|")
                     {
                            if(FirstVn[i][j+1]!="")
                            str1+="First("+Vn[i]+")="+FirstVn[i][j];
                        else{
                            str1+="First("+Vn[i]+")="+FirstVn[i][j]+"|";
                        }
                     }
                        
                     else{
                         if(FirstVn[i][j+1]!="")
                            str1+=FirstVn[i][j];
                        else{
                            str1+=FirstVn[i][j]+"|";
                        }
                    }
                    j++;

                }
               i++;
            }
            str2=str1.split("|");
            str1="";
            var i=0;

            while(str2[i]!=undefined&&str2[i]!="")
            {
                if(str1=="")
                {
                    str1=str2[i]+'\n';
                }
                else{
                    str1+=str2[i]+'\n';
                }
                i++;
            }
            document.getElementById("t_right_1").innerHTML=str1;*/
            showFirst();
            /////消除后缀~
            i=0;
            while(str[i]!="")
            {
                if(str[i].charAt(str[i].length-1)=="~")
                {    str[i]=str[i].substring(0,str[i].length-1);                   }
                
                i++;
            }
            FirstFlag=11;
        }
        else if(FirstFlag==11)
        {
            alert("已求出First集");
            document.getElementById("t_below_right1").innerHTML="已求出First集";
            showFirst();
        }
}
function eliminateRecursive()//消除左递归
{
    if(recursiveVn[counter1]!="")
                    { for(var i=0;i<str.length;i++)
                        {  // var k=0;
                        if(str[i].charAt(0)==recursiveVn[counter1]&&str[i].charAt(0)==str[i].charAt(3))
                            {
                                //str1+="|"+str[i].substring(3,str[i].length);
                                //str[i]="";
                                document.getElementById("t_below_right1").innerHTML=str[i];
                                str[i]=str[i].charAt(0)+"'->"+str[i].substring(4,str[i].length)+str[i].charAt(0)+"'";
                                if(str1!="")
                                    { str1+="|"+str[i];
                                }
                                else{str1=str[i];}
                               // document.getElementById("t_below_right1").innerHTML=str1;
                               

                                break;
                            }
                            else if(str[i].charAt(0)==recursiveVn[counter1]&&str[i].charAt(str[i].length-1)!="'")
                            {
                                document.getElementById("t_below_right1").innerHTML=str[i];
                                str[i]=str[i].charAt(0)+"->"+str[i].substring(3)+str[i].charAt(0)+"'";
                                str1+="|"+str[i];
                                flag1=i;
                                //document.getElementById("t_below_right1").innerHTML=str1;
                                break;
                            }

                            if(i+1==str.length)
                            {
                                str[flag1]+='\n'+str[flag1].substring(0,1)+"'->ε";
                                str1+="|"+str[flag1].charAt(0)+"'->ε";
                                document.getElementById("t_below_right1").innerHTML=str1;
                                //str1="";
                                counter1++;
                                str1="";
                            }
                        }

                    }
                    else{                       
                        flag=0;                       
                        var i=0;
                        while(str[i]!="")
                        {
                            if(str1=="")str1=str[i];
                            else{
                                str1+='\n'+str[i];
                                                        }
                            i++;
                        }
                        document.getElementById("t_left").value=str1;//显示消除左递归后的文法
                        document.getElementById("t_below_right1").innerHTML="已消除左递归";
                        //str1="";
                        alert("已消除左递归");
                        //flag=0;

                        }
                            
}
function show3()//消除左递归
{    //document.getElementById('t_below_left').innerHTML="<span style='font-size:12px; color:green;'>This is content</span>"
      document.getElementById("t_below_left").innerHTML="(1)把文法的非终结符按任意顺序排列成P1P2...Pn,         "+'\n'+
                                                        "(2)for i:=1 to n do                                   "+'\n'+
                                                        "    for j=1 to i-1 do                                 "+'\n'+
                                                        "       把形如Pi->Pjγ的规则改写成                      "+'\n'+
                                                        "       Pi->δ1γ|Pi->δ2γ|...|Pi->δkγ|,                  "+'\n'+
                                                        "       其中Pi->δ1|δ2|...|δk|是可以消除Pi的直接左递归  "+'\n'+
                                                        "(3)化简Pi的得到的文法，消除从开始符号不能到达的规则。 "+'\n'+
                                                        "消除P的直接左递归的算法                               "+'\n'+
                                                        "把P->Pα1|Pα1|...|Pαm|β1|β2|...|βn改写成               "+'\n'+
                                                        "把P->β1P'|β1P'|...|β1nP'                              "+'\n'+
                                                        " P'->α1P'|α2P'|...|αmP'|ε"                
    traverse();

    var j=0;
    for(var i=0;i<str.length;i++)
    {   str1="";
        if(str[i].charAt(0)==str[i].charAt(3))//直接左递归
        {  flag=31;
            recursiveVn[j]=str[i].charAt(0);
           /* if(str1!="")
            {str1+="|"+str[i];}
            else{str1=str[i];}
            //str[i]="";
            */
            j++;

            
        }
    }
    if(flag==0)
    {
        alert("不是左递归文法！");
    }
    counter1=0;
    counter2=0;
    FirstFlag=FollowFlag=LLflag=LLpanduan=0;//First、Follow集重求 分析表也重置

}


function show4()//求First集
{    flag=4;
     document.getElementById("t_below_left").innerHTML="REPEAT                                                 "+'\n'+
                                                        "(1)若X∈Vt,则FIRST(X)={X}                              "+'\n'+
                                                        "(2)若X∈Vn，且有产生式X->a...则把a加入FIRST(X)         "+'\n'+
                                                        "(3)若X->Y1Y2...Yk,则把FIRST(Yi)中所有非ε元素加入       "+'\n'+
                                                        "       FIRST(X),直到Yj,ε不属于FIRST(Yj)                "+'\n'+
                                                        "       UNTIL 各FIRST集合不再增大为止                   "+'\n'+
                                                        "//以下要求各候选的FIRST----------------------          "+'\n'+
                                                       "对于X->Y1Y2...Yk,则把FIRST(Yi)中所有非ε元素加入        "+'\n'+
                                                        "        FIRST(该候选)，直到Yj,ε不属于FIRST(Yj)"
   
//if(FirstFlag==0)
  // {
     traverse();
     FirstFlag==0;
    //
    FirstVnnum=0;
    while(Vn[FirstVnnum]!="")FirstVnnum++;
    
    FirstVn=new Array();
	for(var i=0;i<FirstVnnum;i++)
	{	
		FirstVn[i]=new Array();
		for(var k=0;k<20;k++)
		{
			FirstVn[i][k]="";
		}
	}

    Vnnum=FirstVnnum;
    counter1=0;
    counter2=0;
    counter3=0;
  // }
 /*  else {
       alert("已求出First集");
            document.getElementById("t_below_right1").innerHTML="已求出First集";
    showFirst();
   }*/
   
}
function show5()//求Follow集
{    flag=5;
    document.getElementById("t_below_left").innerHTML="连续应用以下规则，直到FOLLOW不再增大               "+'\n'+
                                                          "(1)置#于FOLLOW(S)                                  "+'\n'+
                                                          "(2)若有产生式A->αBβ,则把FIRST(β)-ε 加入FOLLOW(B)   "+'\n'+
                                                          "(3)若A->αB,或A->αBβ,且ε∈FIRST(β),则把FOLLOW(A)    "+'\n'+
                                                          "   加入FOLLOW(B)"
    
    if(FollowFlag==0)
    {   traverse();
       
        FollowVnnum=0;
        while(Vn[FollowVnnum]!="")FollowVnnum++;

        FollowVn=new Array();
        for(var i=0;i<FollowVnnum;i++)
        {
            FollowVn[i]=new Array();
		    for(var k=0;k<20;k++)
		        {
			        FollowVn[i][k]="";
		        }
        }
        ////////////////////////////////

        /*I=new Array();
        for(var i=0;i<10;i++)
        {   I[i]=new Array();
            for(var j=0;j<10;j++)
            {I[i][j]="";}
        }
        */
        ////////////////////////////////
        Vnnum=FollowVnnum;
        counter1=0;
        counter2=0;
        counter3=0;
        //flag=0;
        flag1=0//表是#是否加入到了开始符的Follow集
        flag2=0;//是否开始求Follow集的第三步了

    }
    else{

                alert("已求出Follow集");
                document.getElementById("t_below_right1").innerHTML="已求出Follow集";
                //FollowFlag=1;
                showFollow();
    }
    
    //addL(str,"T->aaaaaaaaaaaa");
}
function show6()//判断LL（1）
{   
    if((FirstFlag==1||FirstFlag==11)&&FollowFlag==1)
    {
        counter1=0;
    //counter2=0;
    traverse();
   // counter2=3;
    //selectVnnum=str1.length;
    while(str[counter1]!="")
    {         counter3=counter1;//标记用
            if(str[counter1].charAt(1)=="-")//A->....
            {   
                var i=FindX(Vn,str[counter1].charAt(0),Vnnum);
                counter2=3;
             }
             else if(str[counter1].charAt(1)=="'")
             {
                 var i=FindX(Vn,str[counter1].substring(0,2),Vnnum);
                counter2=4;
             }
             while(str[counter1].charAt(counter2)!="")
            {
                if((str[counter1].charAt(counter2)<'A'||str[counter1].charAt(counter2)>'Z')&&str[counter1].charAt(counter2)!="ε")
                {
                    addL(selectVn[counter1],str[counter1].charAt(counter2));
                    counter1++;
                    break;
                    //continue;
                }
                else if(str[counter1].charAt(counter2)=="ε")
                {
                  addVn(selectVn[counter1],FollowVn[i]);
                    counter1++;
                    break;
                    //continue;
                    
                }
                else if(str[counter1].charAt(counter2)>='A'&&str[counter1].charAt(counter2)<='Z')
                {   if(str[counter1].charAt(counter2+1)!="'")
                    {
                        var j=FindX(Vn,str[counter1].charAt(counter2),Vnnum);
                      
                        if(addVn(selectVn[counter1],FirstVn[j])!=9)//First中不含空
                        {
                            counter1++;
                            break;
                        }
                        else {
                            counter2++;
                            //flag=0;
                        }
                    }
                    else if(str[counter1].charAt(counter2+1)=="'")
                    {
                        var j=FindX(Vn,str[counter1].substring(counter2,counter2+2),Vnnum);
                      
                        if(addVn(selectVn[counter1],FirstVn[j])!=9)//First中不含空
                        {
                            counter1++;
                            break;
                            //continue;
                        }
                        else {
                            counter2=counter2+2;
                           // flag=0;
                        }
                    }
                    
                }
            }

            if(counter1==counter3&&str[counter1].charAt(counter2)=="")
            {
                addVn(selectVn[counter2],FollowVn[i]);
                counter1++;
            }
    }
    var i=0,j=0;
    str1="";
    flag=0;
    while(str[i]!="")
    {
        str1+="Select("+str[i]+")=";
        while(selectVn[i][j]!="")
        {
            str1+=selectVn[i][j];
            j++;
        }
        str1+='\n';
        j=0;




        var k=i+1;
        while(str[k]!="")
        {
            if(str[i].charAt(1)=="-"&&str[k].charAt(1)=="-"&&str[i].charAt(0)==str[k].charAt(0))
            {
                if(compare(selectVn[i],selectVn[k])==0)
                {   
                    flag=6;
                    k=29;
                    break;
                }
            }
            else if(str[i].charAt(1)=="''"&&str[k].charAt(1)=="''"&&str[i].charAt(0)==str[k].charAt(0))
            {
                 if(compare(selectVn[i],selectVn[k])==0)
                {   
                    flag=6;
                    k=29;
                    break;
                }
            }
            k++;
        }



        i++;
        
        
    }
    document.getElementById("t_right_3").innerHTML=str1;
    if(flag==6)
    {
        alert("不是LL(1)文法");
        document.getElementById("t_below_right1").innerHTML="不是LL(1)文法";
        LLpanduan=2;
    }
    else {
        alert("是LL(1)文法");
        document.getElementById("t_below_right1").innerHTML="是LL(1)文法";
        LLpanduan=1;
    }
    
    }
    else{
    alert("请求出先求出First集 Follow集");
    document.getElementById("t_below_right1").innerHTML="请求出先求出First集 Follow集";
    }
    
    //i=0;
    //while(str[])
}




function show7()//构造预测分析表
{   
    
    if(LLpanduan==1)
    {    document.getElementById("t_below_left").innerHTML="(1)对文法G的每个产生式A->α执行第2步和第3步"+'\n'+
                                                        "(2)对每个终结符a属于First(α),把A->α加至M[A,a]钟"+'\n'+
                                                        "(3)若ε属于First(α)，则对任何b属于Follow(A)把A->α加至M[A,b]钟"+'\n'+
                                                        "(4)把所有无定义的M[A,a]标上“出错标志”";

    if(LLflag==0)
    {
         var i=0;
    while(selectVn[i][0]!="")
    {   //while(selectVn[i][j]!="")
        addVn(vn,selectVn[i]);
        i++;
    }                                   
    addL(vn,"#");
    el1.className = 'active';
  /*  const ary = [
        [1,2,3,4,5],
        [2,3,4,5,6],
        [3,4,5,6,99]
    ]
    */
    var str4 = '';
    var Xstr="";
    var Y="";
    for(var i = -1; Vn[i]!=""||i==-1; i++) {
        str4 += '<tr>';
    if(i==-1)
    {
          for(var j = -1; vn[j]!=""||j==-1; j++) {
              if(j==-1)str4+='<td>' + "" + '</td>';
              else{str4 += '<td>' + vn[j] + '</td>';}
            
        }

    }
    else{
        for(var j = -1; vn[j]!=""||j==-1; j++) {
            if(j==-1)
            {str4+='<td>' + Vn[i] + '</td>';
            //Xstr=str[i];
            //Y=Xstr.substring(0,Xstr.indexOf("-"));
            }
            
            else
            {   var w=0;
                var wflag=0;
                while(str[w]!="")
                {  
                    if(str[w].substring(0,str[w].indexOf("-"))==Vn[i])  
                    {
                        if(vn[j]=="#"&&str[w].indexOf("ε")!=-1){
                            str4 += '<td>' +str[w] + '</td>';
                             wflag=1;
                             break;

                        } 
                        else if(checkVn(selectVn[w],vn[j])==1)
                        {
                             str4 += '<td>' +str[w] + '</td>';
                             wflag=1;
                             break;
                        }
                    
                    //else str4 += '<td>' +""+ '</td>';

                    }

                    w++;

                }
                if(wflag==0)
                str4 += '<td>' +""+ '</td>';
               

            }
            
        }
    }
      

        str4 += '</tr>';
        Y="";
    }

    tbody1.innerHTML = str4;
    

    //////////////////
    LLflag=1;
    }
    else if(LLflag==1)
    {
    el1.className = 'active';
    }
    

    }
    else if(LLpanduan==2){
        alert("不是LL(1)文法");
        //return;
    }
    else{
        alert("请先进行LL(1)文法判断");
    }


   
}
    const el1 = document.getElementById('popup1');
   // const btn = document.getElementById('q7');
    const close1 = document.getElementById('close1');
    const tbody1 = document.getElementById('tbody1');
    
 close1.onclick = function() {
        el1.className = 'disable';
    }
 el1.ondrag = function(e) {
        //console.log(e.clientX, e.clientY);
        el1.style.left = e.clientX + 'px';
        el1.style.top = e.clientY + 'px';
    }
el1.ondragend = function(e) {
        el1.style.left = e.screenX + 'px';
        el1.style.top = e.screenY - 83 + 'px';
}

/////////////////////////////////////////////
/////////////////////////////////////////////

    ///////////////////////////////////////////
    //以上和浮窗有关
    ///////////////////////////////////////////
    ///////////////////////////
    //以上为自上到下的分析
    /////////////////////////////

function myKeydown(e)//键盘事件
{
    var e = event||window.event||arguments.callee.caller.arguments[0];
             if(e && e.keyCode==118){ // 按 F7
                if(flag==31)//31表示消除左递归
                {     eliminateRecursive();
                      
                }
                if(flag==4)//求First集
                {    addFirst();                                        
                }
                if(flag==5)//求Follow集
                {
                    addFollow();
                }
                if(flag==8||flag==9)//LR0 项目集规范族
                {
                    LR0();
                    scrollButtom();
                }             
                if(flag==10||flag==11)//LR1项目组规范集
                {
                    LR1();
                    scrollButtom();
                }            
               }
}
///////////////////////////////////

function reset3()
{

}
function reset4()//First集重置
{
    FirstFlag=0;
}
function reset5()//Follow重置
{
    FollowFlag=0;
}
function reset8()//LR(0)重置
{
}