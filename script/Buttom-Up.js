////////////////////////////////////
var LRVn=[50];//文法项目
var LRflag=0,LR1flag=0;//标志有没有求LR0项目集
var LRflag1=0;//1-LR0文法  2-SLR文法 3-LR1文法
var LR_I,LR_L;//规范族和前缀（a A B之类的）的数组
var LR0str="";
var GOTOVn=[50];//ACTION 与GOTO的定义
var numVn=[50];//状态序列号
var err1=[50];//移进-归约冲突 规范族的序号
var err2=[50];//归约-归约冲突 规范族的序号
var errVn=[30];//A->a·归约项 要求Follow(A)， 此数组存入A；
var LALR=[30];//存放合并后的序号
var str8_9="",str10="";
function show8()
{   document.getElementById("t_below_left").innerHTML="PROCEDURE ITEMSETS(G')"+'\n'+
                                                        "BEGIN"+'\n'+
                                                        "     C:={CLOSURE({S'->S})};"+'\n'+
                                                        "     REPEAT"+'\n'+
                                                        "           FOR  C中的每个项目集I和G'的每个符号X  DO"+'\n'+
                                                        "                IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                        "                把GO(I,X)放入C族中"+'\n'+
                                                        "     UNTIL  C    不再增大";
   
  // if(LRflag==0)
  // {
               flag=0
            str1=str2=str3="";
            str3="I0:"+'\n';
            traverse();
            var i=0;
            var j=1;
            LRVn[0]="G'->·"+str[0].charAt(0);//拓展文法
            LRVn[1]="G'->"+str[0].charAt(0)+"·";
            str3+=LRVn[0]+'\n';

            addL(LR_I[0],LRVn[0]);
            //addL(LR_L[0],str[0].charAt(0));
            while(str[i]!="")//项目集存入LRVn
            {    
                //var j=0;
                var index=str[i].indexOf(">")+1;
                while(str[i].charAt(index)!="")
                {    //console.log(str[i].charAt(index));
                    if(str[i].charAt(index)!="ε")
                    {
                            LRVn[++j]=str[i].substring(0,index)+"·"+str[i].substring(index,str[i].length);  //从j=2开始
                        /* if(LRVn[j].charAt(0)==str[0].charAt(0)&&LRVn[j].charAt(LRVn[j].indexOf(">")+1)=="·")
                            {   
                                    addL(LR_I[0],LRVn[j]);
                                    str3+=LRVn[j]+'\n';
                                    addL(LR_L[0],str[i].charAt(index));
                            }*/
                            //index++;
                            if(str[i].charAt(++index)=="")
                            {
                                LRVn[++j]=str[i]+"·";
                                break;
                    
                            }
                            //index++;
                    }
                    else{
                            LRVn[++j]=str[i].substring(0,index)+"·";
                            break;
                    }
                            
                }
                
                i++;
            }

            //整理LR_I[0]
            addLR_I(LR_I[0]);
            ////////////////////////////////////////
                document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                                "把GO(I,X)放入C族中"+'\n'+str3;
            flag=8;
            LRflag=0;
            //console.log(LRVn);
            //console.log(LR_I);
            //console.log(LR_L);
            counter1=counter2=counter3=0;
  /*  }
    else {
        flag=8;
        //if(LRflag1<=1)LRflag1=1;
         document.getElementById("t_below_right1").innerHTML=str8_9;
       // LRflag=1
        alert("已求出项目集规范族");
        showLR();

    }*/
   
   
}
function show9()//SLR文法
{   document.getElementById("t_below_left").innerHTML="PROCEDURE ITEMSETS(G')"+'\n'+
                                                        "BEGIN"+'\n'+
                                                        "     C:={CLOSURE({S'->S})};"+'\n'+
                                                        "     REPEAT"+'\n'+
                                                        "           FOR  C中的每个项目集I和G'的每个符号X  DO"+'\n'+
                                                        "                IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                        "                把GO(I,X)放入C族中"+'\n'+
                                                        "     UNTIL  C    不再增大";
   
  //  if(LRflag==0)//未进行LR(0)
  //  {   
        
   str1=str2=str3="";
   str3="I0:"+'\n';
   traverse();
   var i=0;
   var j=1;
   LRVn[0]="G'->·"+str[0].charAt(0);//拓展文法
   LRVn[1]="G'->"+str[0].charAt(0)+"·";
   str3+=LRVn[0]+'\n';

   addL(LR_I[0],LRVn[0]);
   //addL(LR_L[0],str[0].charAt(0));
   while(str[i]!="")//项目集存入LRVn
   {    
       //var j=0;
       var index=str[i].indexOf(">")+1;
       while(str[i].charAt(index)!="")
       {    //console.log(str[i].charAt(index));
           if(str[i].charAt(index)!="ε")
           {
                LRVn[++j]=str[i].substring(0,index)+"·"+str[i].substring(index,str[i].length);  //从j=2开始
               /* if(LRVn[j].charAt(0)==str[0].charAt(0)&&LRVn[j].charAt(LRVn[j].indexOf(">")+1)=="·")
                {   
                        addL(LR_I[0],LRVn[j]);
                        str3+=LRVn[j]+'\n';
                        addL(LR_L[0],str[i].charAt(index));
                 }*/
                //index++;
                if(str[i].charAt(++index)=="")
                {
                    LRVn[++j]=str[i]+"·";
                     break;
           
                }
                //index++;
           }
           else{
                LRVn[++j]=str[i].substring(0,index)+"·";
                break;
           }
                
       }
       
       i++;
   }

   //整理LR_I[0]
    addLR_I(LR_I[0]);
   ////////////////////////////////////////
    document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+str3;
   flag=9;
   LRflag=0;
   //console.log(LRVn);
   //console.log(LR_I);
   //console.log(LR_L);
   counter1=counter2=counter3=0;
   

   /* }
    else if(LRflag==1)//已进行LR(0)操作
    {        flag=9;
         alert("已求出项目集规范族");
          document.getElementById("t_below_right1").innerHTML=str8_9;
         showLR();
    }*/
}
function show10()//LR(1)
{        // if(LR1flag==0)//未进行LR(0)
           //     {  
                     document.getElementById("t_below_left").innerHTML="PROCEDURE ITEMSETS(G')"+'\n'+
                                                                    "BEGIN"+'\n'+
                                                                    "     C:={CLOSURE({S'->S})};"+'\n'+
                                                                    "     REPEAT"+'\n'+
                                                                    "           FOR  C中的每个项目集I和G'的每个符号X  DO"+'\n'+
                                                                    "                IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "                把GO(I,X)放入C族中"+'\n'+
                                                                    "     UNTIL  C    不再增大";
                        
                        str1=str2=str3="";
                        str3="I0:"+'\n';
                        traverse();
                        var i=0;
                        var j=1;
                        LRVn[0]="G'->·"+str[0].charAt(0);//拓展文法
                        LRVn[1]="G'->"+str[0].charAt(0)+"·";
                        str3+=LRVn[0]+",#"+'\n';

                        addL(LR_I[0],LRVn[0]+",#");
                        //addL(LR_L[0],str[0].charAt(0));
                        while(str[i]!="")//项目集存入LRVn
                        {    
                            //var j=0;
                            var index=str[i].indexOf(">")+1;
                            while(str[i].charAt(index)!="")
                            {    //console.log(str[i].charAt(index));
                                if(str[i].charAt(index)!="ε")
                                {
                                        LRVn[++j]=str[i].substring(0,index)+"·"+str[i].substring(index,str[i].length);  //从j=2开始
                                    /* if(LRVn[j].charAt(0)==str[0].charAt(0)&&LRVn[j].charAt(LRVn[j].indexOf(">")+1)=="·")
                                        {   
                                                addL(LR_I[0],LRVn[j]);
                                                str3+=LRVn[j]+'\n';
                                                addL(LR_L[0],str[i].charAt(index));
                                        }*/
                                        //index++;
                                        if(str[i].charAt(++index)=="")
                                        {
                                            LRVn[++j]=str[i]+"·";
                                            break;
                                
                                        }
                                        //index++;
                                }
                                else{
                                        LRVn[++j]=str[i].substring(0,index)+"·";
                                        break;
                                }
                                        
                            }
                            
                            i++;
                        }

                        //整理LR_I[0]
                            addLR_I1(LR_I[0]);//往LR1的整理
                        ////////////////////////////////////////
                            document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                                            "把GO(I,X)放入C族中"+'\n'+str3;
                        flag=10;
                        LR1flag=0;
                        //console.log(LRVn);
                        //console.log(LR_I);
                        //console.log(LR_L);
                        counter1=counter2=counter3=0;
                        

                         /*    }
                           else if(LR1flag==1)//已进行LR(0)操作
                            {        flag=10;
                                alert("已求出项目集规范族");
                                showLR();
                            }*/

}
function show11()//LALR文法
{       
        for(var ik=0;ik<10;ik++)
        {
            LALR[ik]="";
        }
            // if(LR1flag==0)//未进行LR(1)
              //  {   
                    document.getElementById("t_below_left").innerHTML="PROCEDURE ITEMSETS(G')"+'\n'+
                                                                    "BEGIN"+'\n'+
                                                                    "     C:={CLOSURE({S'->S})};"+'\n'+
                                                                    "     REPEAT"+'\n'+
                                                                    "           FOR  C中的每个项目集I和G'的每个符号X  DO"+'\n'+
                                                                    "                IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "                把GO(I,X)放入C族中"+'\n'+
                                                                    "     UNTIL  C    不再增大";
                        //flag=11;
                        str1=str2=str3="";
                        str3="I0:"+'\n';
                        traverse();
                        var i=0;
                        var j=1;
                        LRVn[0]="G'->·"+str[0].charAt(0);//拓展文法
                        LRVn[1]="G'->"+str[0].charAt(0)+"·";
                        str3+=LRVn[0]+",#"+'\n';

                        addL(LR_I[0],LRVn[0]+",#");
                        //addL(LR_L[0],str[0].charAt(0));
                        while(str[i]!="")//项目集存入LRVn
                        {    
                            //var j=0;
                            var index=str[i].indexOf(">")+1;
                            while(str[i].charAt(index)!="")
                            {    //console.log(str[i].charAt(index));
                                if(str[i].charAt(index)!="ε")
                                {
                                        LRVn[++j]=str[i].substring(0,index)+"·"+str[i].substring(index,str[i].length);  //从j=2开始
                                    /* if(LRVn[j].charAt(0)==str[0].charAt(0)&&LRVn[j].charAt(LRVn[j].indexOf(">")+1)=="·")
                                        {   
                                                addL(LR_I[0],LRVn[j]);
                                                str3+=LRVn[j]+'\n';
                                                addL(LR_L[0],str[i].charAt(index));
                                        }*/
                                        //index++;
                                        if(str[i].charAt(++index)=="")
                                        {
                                            LRVn[++j]=str[i]+"·";
                                            break;
                                
                                        }
                                        //index++;
                                }
                                else{
                                        LRVn[++j]=str[i].substring(0,index)+"·";
                                        break;
                                }
                                        
                            }
                            
                            i++;
                        }

                        //整理LR_I[0]
                            addLR_I1(LR_I[0]);//往LR1的整理
                        ////////////////////////////////////////
                            document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                                            "把GO(I,X)放入C族中"+'\n'+str3;
                        flag=11;
                        LR1flag=0;
                        //console.log(LRVn);
                        //console.log(LR_I);
                        //console.log(LR_L);
                        counter1=counter2=counter3=0;
                        


                        /*     }
                           else if(LR1flag==1)//已进行LR(0)操作
                            {        flag=11;
                                alert("已求出项目集规范族");
                                showLR();
                            }*/
}
function addLR_I(A)//
{ //var i=0;
     
       var j=0;
       while(A[j]!=""&&A[j]!=undefined)
        {
            var index=A[j].indexOf("·");
    //if(A[j].charAt(index+1)>='A'&&A[j].charAt(index+1)<='Z'&&A[j].charAt(index+1)!=A[j].substring(0,A[j].indexOf("-")))
    if(A[j].charAt(index+1)>='A'&&A[j].charAt(index+1)<='Z')
            {
                var w=0;
                while(LRVn[w]!=""&&LRVn[w]!=undefined)
                {   
                    if(LRVn[w].substring(0,LRVn[w].indexOf("-"))==A[j].charAt(index+1)&&LRVn[w].charAt(LRVn[w].indexOf(">")+1)=="·")
                    {
                        if(addL(A,LRVn[w])!=1)
                        str3+=LRVn[w]+'\n';
                    }
                    w++;
                }
            }
            j++;
        }
        //i++;
        
   

}

function LR0()//项目集规范族的具体实现
{   
    //alert("ss");
    if(LRflag==0)
    {
        while(LR_I[counter1][counter2]!=""&&LR_I[counter1][counter2]!=undefined)
        {str1=LR_I[counter1][counter2];
        var index=str1.indexOf("·");
        if(str1.charAt(index+1)!="")
        {//while()
            var z=2;
            if(str1.charAt(index+2)=="'") z=3;  
        
            if(addL(LR_L[counter1],str1.substring(index+1,index+z))!=1)
            {
                str2=str1.substring(0,index)+str1.substring(index+1,index+z)+"·"+str1.substring(index+z,str1.length);
            
            var k=1,xflag=0;
            while(LR_I[k][0]!="")
            {
                if(LR_I[k][0]==str2)
                {
                    xflag=1;
                    break;
                }
                k++;
            }
            if(xflag==0)
            {LR_I[k][0]=str2;

               
            str3+="GOTO(I"+counter1+","+str1.substring(index+1,index+z)+")=I"+k+'\n';
            addL(GOTOVn,counter1+"|"+str1.substring(index+1,index+z)+"|"+k);
            str3+="I"+k+":"+'\n';
            str3+=str2+'\n';

             var t=0;
                while(LR_I[counter1][t]!=""&&LR_I[counter1][t]!=undefined)
                {
                    if(str2.charAt(str2.indexOf("·")-1)==LR_I[counter1][t].charAt(LR_I[counter1][t].indexOf("·")+1)&&LR_I[counter1][t]!=str1)
                    {   var Xstr=LR_I[counter1][t];
                        index=Xstr.indexOf("·");
                        var z=2;
                        if(Xstr.charAt(index+2)=="'") z=3;
                        
                        //if(addL(LR_L[counter1],Xstr.substring(index+1,index+z))!=1)
                            Xstr=Xstr.substring(0,index)+Xstr.substring(index+1,index+z)+"·"+Xstr.substring(index+z,Xstr.length);
                            if(addL(LR_I[k],Xstr)!=1)
                            str3+=Xstr+'\n';
                        
                        
                    }
                    
                    
                    t++;
                }

            addLR_I(LR_I[k]);
          
              break;
            }
            else{
                str3+="GOTO(I"+counter1+","+str1.substring(index+1,index+z)+")=I"+k+'\n';
                addL(GOTOVn,counter1+"|"+str1.substring(index+1,index+z)+"|"+k);
                document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+str3;
                counter2++;
                return ;
            }
        }
        else{
            counter2++;
        }
            
            

        }
        else if(LR_I[counter1][counter2+1]==""||LR_I[counter1][counter2+1]==undefined){
            counter1++;
            counter2=0;
        }
        else{
            counter2++;
        }
   
    }
    counter2++;
    
     if(LR_I[counter1+1][0]==""&&LR_I[counter1][counter2]=="")
    {   LRflag=1;
        LR0str=str3;

    }
    else if(LR_I[counter1][counter2]==""||LR_I[counter1][counter2]==undefined)
    {   counter1++;
        counter2=0;

    }
    document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+str3;
    }
    else if(LRflag==1)
    {   document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+LR0str;
        LRvn();
        LR_X(LR_I);
        if(err1[0]==""&&err2[0]==""&&str3==""&&flag==8){
            alert("已求出项目集规范族,为LR0文法");
            //str8_9=str3;
           // document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
           //                                                         "把GO(I,X)放入C族中"+'\n'+str3;
            //document.getElementById("t_below_right1").innerHTML="已求出项目集规范族,为LR0文法";
            showLR();
            LRflag1=1;
        }
        else if((err1[0]==""||err2[0]=="")&&str3==""&&(flag==8||flag==9))
        {
            alert("已求出项目集规范族,为SLR文法");
            //str8_9=str3;
            document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+LR0str;
            //document.getElementById("t_below_right1").innerHTML="已求出项目集规范族,有冲突,为SLR文法";
            showLR();
            LRflag1=2;
        }
        else if(str3!="")
        {   alert("已求出项目集规范族,不是LR(0)与SLR文法");
            document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+LR0str+'\n'+str3;
            //document.getElementById("t_below_right1").innerHTML=str3+"已求出项目集规范族,为LR1文法";
            showLR();
           // if(flag==9)LRflag1=2;
           // else if(flag==8)
           // {
          //      flag=9;
           //     LRflag1=2;
          //  }
           // LRflag1=3;

        }
        
        
        
        
        
    }
 
    



}
function showLR()//显示项目集规范族
{
        if(flag==10||flag==11)
        {
            str1="";
        var i=0,j=0,z=0,kk=0;
        var Xstr,Xstr1;
        while(LR_I[i][0]!=""&&LR_I[i][0]!=undefined)
        {   j=0;
            while(LR_I[i][j]!=""&&LR_I[i][j]!=undefined)
            {   
                if(LR_I[i][j]!="!")
                {
                     Xstr=LR_I[i][j].substring(0,LR_I[i][j].indexOf(","));
                    z=j+1;
                    while(LR_I[i][z]!=""&&LR_I[i][z]!=undefined)
                    {   Xstr1=LR_I[i][z].substring(0,LR_I[i][z].indexOf(","));

                        if(Xstr==Xstr1)
                        {   Xstr=LR_I[i][j].substring(LR_I[i][j].indexOf(",")+1,LR_I[i][j].length);
                            Xstr1=LR_I[i][z].substring(LR_I[i][z].indexOf(",")+1,LR_I[i][z].length);
                            if(Xstr==Xstr1)LR_I[i][z]="!";
                            else if(Xstr.charAt(1)!="/")
                            {   if(Xstr1.charAt(1)!="/")
                                {   
                                    LR_I[i][j]=LR_I[i][j]+"/"+Xstr1;
                                    LR_I[i][z]="!";
                                }
                                else {
                                    if(Xstr1.indexOf(Xstr)==-1)
                                    {
                                        Xstr1+="/"+Xstr;
                                    }
                                    //Xstr=Xstr.substring(0,Xstr.length-1);
                                    LR_I[i][j]=LR_I[i][j].substring(0,LR_I[i][j].indexOf(",")+1)+Xstr1;
                                    LR_I[i][z]="!";

                                }
                                
                            }
                            else if(Xstr.charAt(1)=="/")
                            {
                                //Xstr=Xstr.split("/");
                                if(Xstr1.charAt(1)!="/")
                                {   
                                    //LR_I[i][j]+=LR_I[i][j]+"/"+Xstr1;
                                   if(Xstr.indexOf(Xstr1)==-1)
                                   {
                                       Xstr+="/"+Xstr1;
                                   }
                                   LR_I[i][j]=LR_I[i][j].substring(0,LR_I[i][j].indexOf(",")+1)+Xstr;
                                    LR_I[i][z]="!";

                                }
                                else {
                                   //if(Xstr.indexOf(Xstr1)==-1)
                                   //Xstr=Xstr.split("/");
                                   Xstr1=Xstr1.split("/");
                                   //addVn(Xstr,Xstr1);
                                   kk=0;
                                   while(Xstr1[kk]!=""&&Xstr1[kk]!=undefined)
                                   {
                                       if(Xstr.indexOf(Xstr1[kk])==-1)Xstr+="/"+Xstr1[kk];
                                       kk++;
                                   }

                                }
                            }
                            

                        }
                        z++;
                    }
                }
               j++;
            }


            i++;
        }


        }
        




        i=0;
        str1="";
        while(LR_I[i][0]!="")
        {
            j=0;
            str1+="I"+i+":"+'\n';
            while(LR_I[i][j]!="")
            {   if(LR_I[i][j]!="!")
                str1+=LR_I[i][j]+'\n';
                j++;
            }
            str1+='\n';
            i++;
        }
        document.getElementById("t_right_1").innerHTML=str1;
}

function LR_X(A)//整理状态序列号
{
    var i;
    var xflag;//xflag1,xflag2;
     var xflag1=-1;//
    var Xstr="";
    var index;
    str3="";
    numVn[0]="0";
    numVn[1]="1";
    i=1;
    while(A[i][0]!=""&&A[i][0]!=undefined)
    {   
        
        var j=0;
        for(j=0;j<30;j++)errVn[j]="";
        j=0;
        xflag=0;
        xflag1=-1;
        //xflag1=0;//标志移进-归约冲突 置3
        //xflag2=0;//标志归约-归约冲突 置4
        while(A[i][j]!=""&&A[i][j]!=undefined)
        {   Xstr=A[i][j];
            index=Xstr.indexOf("·");
            if(Xstr.charAt(index+1)!=""&&Xstr.charAt(index+1)!=undefined)
            {
                j++;
            }
            else{

                if(xflag1==-1)xflag1=j;
                xflag=1;//有归约项
                ///
                if(i==1&&j==0){
                    
                    //str3+=
                }
                else{
                    addL(errVn,Xstr.substring(0,Xstr.indexOf("-")));
                }
                
                //////////break;
                j++;
            }
        }
        //判断errVn中各非终结符的Follow集有没有交集，若有则为LR1，否则未SLR
        var t=0;
        var j,index1,index2;
        var indexF;
        while(errVn[t]!=""&&errVn[t]!=undefined)
        {   j=t+1;
            index1=FindX(Vn,errVn[t],Vnnum);
            if(index1!=undefined)
            {
                 while(errVn[j]!=""&&errVn[j]!=undefined)
                    {   index2=FindX(Vn,errVn[j],Vnnum);
                        index2=VNandVN(FollowVn[index1],FollowVn[index2]);
                        if(index2!=0)//有交集
                        {   
                            str3+="归约项-归约项 I"+i+"中的Follow("+errVn[t]+")与Follow("+errVn[j]+")有交集"+index2+'\n';
                        }
                        j++;
                    }
            }
            
           
            t++;
        }
        ///
        if(xflag==0)
        {
            addL(numVn,""+i+"");
        }
        else if(xflag==1&&xflag1==0&&(A[i][1]==""||A[i][1]==undefined))//LR0的文法
        {  // i++;
        }
        else if(xflag==1&&xflag1==0&&(A[i][1]!=""&&A[i][1]!=undefined))//有冲突
        {   var kk=xflag1;
            j=0;
           while(A[i][j]!=""&&A[i][j]!=undefined)
           {
                Xstr=A[i][j];
            index=Xstr.indexOf("·");
            if(Xstr.charAt(index+1)!=""&&Xstr.charAt(index+1)!=undefined&&j!=kk)//移进-归约冲突
            {
                //j++;
                addL(err1,""+i+"");
                indexF=SLR_LR1panduan(errVn,Xstr.charAt(index+1));
                if(indexF!=-1)//此处判断是LR1文法
                {
                        //alert("I"+i+"项目集中")
                        str3+="移进项-归约项 I"+i+"中Follow("+errVn[indexF]+")与"+Xstr.charAt(index+1)+"有交集"+Xstr.charAt(index+1)+'\n';

                }
                
                
                
                xflag1=3;
            }
            else if(j!=kk) { 
                addL(err2,""+i+"");

                //xflag2=4;//归约-归约冲突
                
                //j++
            }
            j++;
           }
            

        }
        else if(xflag==1&&xflag1>0)//至少有移进-归约冲突
        {   var kk=xflag1;
            j=0;
            while(A[i][j]!=""&&A[i][j]!=undefined)
            {   
                 //xflag1=3;
            Xstr=A[i][j];
            index=Xstr.indexOf("·");
            if(Xstr.charAt(index+1)!=""&&Xstr.charAt(index+1)!=undefined&&j!=kk)//移进-归约冲突
            {   addL(err1,""+i+"");
                indexF=SLR_LR1panduan(errVn,Xstr.charAt(index+1));
                if(indexF!=-1)//此处判断是LR1文法
                {
                        //alert("I"+i+"项目集中")
                        str3+="移进项-归约项 I"+i+"中Follow("+errVn[indexF]+")与"+Xstr.charAt(index+1)+"有交集"+Xstr.charAt(index+1)+'\n';

                }
                //j++;addL(err1,""+i+"");
               // xflag1=3;
            }
            else if(j!=kk){ 
                addL(err2,""+i+"");
                //xflag2=4;//归约-归约冲突
                //j++
            }
            j++;
            }
            
          
        }
        i++;
    }
    i=j=0;
    addL(numVn,"+");
    while(A[i]!=""&&A[i]!=undefined&&A[i][0]!=""&&A[i][0]!=undefined)
    {
        addL(numVn,""+i+"");
        i++;
    }
    
}
function LRvn()//整理LR下的vn(其中是终结符)
{
    var i=0;
    var Xstr;

    while(GOTOVn[i]!=""&&GOTOVn[i]!=undefined)
    {   Xstr=GOTOVn[i].split("|");
        if(Xstr[1]<'A'||Xstr[1]>'Z')
        addL(vn,Xstr[1]);
        
        i++;
    }
    addL(vn,"#");
}

function show12()//产生分析表
{   //LRvn();
    //LR_X(LR_I);
    
    var Xstr;
    var index=FindX(numVn,"+");
    if(flag==8&&LRflag1==1)//不存在移进-归约冲突  也不存在归约-归约冲突
                    {   el.className = 'active';
                        str4 = '';
                    str4+='<tr>'+
                            '<td>'+"状态"+'</td>'+
                            '<td align="center" width="200">'+"ACTION"+
                                '<table class="table-cell" border="0">'+
                                    '<tr>';
                                    for(var i=0;vn[i]!=""&&(vn[i]<'A'||vn[i]>'Z');i++)
                                        str4+='<td>'+vn[i]+'</td>';
                                    
                                str4+=  '</tr>'+
                                '</table>'+
                            '</td>'+
                            '<td align="center">'+"GOTO"+
                                '<table class="table-cell" border="0">'+
                                    '<tr>';
                                    for(var i=0;Vn[i]!="";i++)
                                    {
                                        //if(vn[i]>='A'&&vn[i]<='Z')
                                        str4+='<td>'+Vn[i]+'</td>';
                                    }
                                        
                                    /* '<td>'+"E"+'</td>'+
                                        '<td>'+"A"+'</td>'+
                                        '<td>'+"B"+'</td>'+*/
                                str4+='</tr>'+
                                '</table>'+
                            '</td>'+
                        '</tr>' + 
                        '<tr>' + 
                            '<td>'+
                                '<table align="center">' ;
                                for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++)
                                {   if(i!=index)
                                    str4+='<tr><td>'+numVn[i]+'</td></tr>';
                                }
                                

                                    
                            str4+=  '</table>' + 
                            '</td>'+
                            '<td>' +
                                '<table class="table-cell">';
                                
                                
                                //以下循环为分析表终结符正式内容                               
                    for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++) {
                        
                    if(i<index)
                    {str4 += '<tr>';
                        for(var j=0;vn[j]!=""&&(vn[j]<'A'||vn[j]>'Z');j++) {
                        // str4 += '<td>' + ary[i][j] + '</td>';
                        if(vn[j]=="#"&&numVn[i]=="1")
                        {
                            str4+='<td>' + "acc" + '</td>';
                        }
                        else{
                            Xstr=LR_match(numVn[i],vn[j],0);
                            if(Xstr!=undefined)
                                str4+='<td>' + "s"+Xstr+ '</td>';
                                else{
                                    str4+='<td></td>'
                                }
                        }
                        }
                    

                        str4 += '</tr>';
                    }
                    else if(i>index)
                        {
                        str4 += '<tr>';
                    
                    
                        for(var j=0;vn[j]!="";j++){
                            Xstr=LR_match(numVn[i],0,1);
                            if(Xstr!=undefined)
                            str4+='<td>' +"r"+Xstr+ '</td>';
                            else{
                                str4+='<td></td>';
                            }
                        
                        }

                        str4 += '</tr>';
                    }
                        
                    }


                    str4 += '</table>' + 
                        '</td>'+
                        '<td>'+
                            '<table class="table-cell">' ;//以下循环为分析表非终结符正式内容

                    for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++) {
                        if(i<index){     
                            str4 += '<tr>';
                            for(var j=0;Vn[j]!="";j++){
                                Xstr=LR_match(numVn[i],Vn[j],0);
                                if(Xstr!=undefined) 
                                    str4+='<td>' +Xstr+ '</td>';
                                else{
                                    str4+='<td>' +""+ '</td>';
                                }
                            }

                            str4 += '</tr>';
                        } else if(i>index) {
                            str4+='<tr><td></td></tr>'
                        }
                
                    
                        }
                            str4+=  '</table>' + 
                                        '</td>'+
                                            '</tr>';

                            tbody.innerHTML = str4;
                        }
    else if(flag==9&&LRflag1==2)//有移进-归约冲突（或许有归约-归约冲突）  SLR
        {  
            var Xtt="";
            var Ytt="";
             if(FollowVn[0][0]=="")
                    {
                        alert("此为SLR表，请先求出Follow集");
                        return;
                    }

                if(str3!="")
                {   Xtt=str3.charAt(str3.indexOf("I")+1);
                    Ytt=str3.charAt(str3.indexOf("集")+1);

                }
                el.className = 'active';
                str4 = '';
                str4+='<tr>'+
                        '<td>'+"状态"+'</td>'+
                        '<td align="center" width="200">'+"ACTION"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;vn[i]!=""&&(vn[i]<'A'||vn[i]>'Z');i++)
                                    str4+='<td>'+vn[i]+'</td>';
                                
                            str4+=  '</tr>'+
                            '</table>'+
                        '</td>'+
                        '<td align="center">'+"GOTO"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;Vn[i]!="";i++)
                                {
                                    //if(vn[i]>='A'&&vn[i]<='Z')
                                    str4+='<td>'+Vn[i]+'</td>';
                                }
                                    
                                /* '<td>'+"E"+'</td>'+
                                    '<td>'+"A"+'</td>'+
                                    '<td>'+"B"+'</td>'+*/
                            str4+='</tr>'+
                            '</table>'+
                        '</td>'+
                    '</tr>' + 
                    '<tr>' + 
                        '<td>'+
                            '<table align="center">' ;
                            for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++)
                            {   if(i!=index)
                                str4+='<tr><td>'+numVn[i]+'</td></tr>';
                            }
                            

                                
                        str4+=  '</table>' + 
                        '</td>'+
                        '<td>' +
                            '<table class="table-cell">';
                            
                            
                            
                            
                            
                            //以下循环为分析表终结符正式内容
                            

                for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++) {
                    
                    
                if(i<index){   
                            str4 += '<tr>';
                            for(var j=0;vn[j]!="";j++) {
                    // str4 += '<td>' + ary[i][j] + '</td>';
                                if(vn[j]=="#"&&numVn[i]=="1"){
                                    str4+='<td>' + "acc" + '</td>';
                                    }
                                else{
                                    Xstr=LR_match(numVn[i],vn[j],0);
                                    if(Xstr!=undefined)
                                        str4+='<td>' + "s"+Xstr+ '</td>';
                                    else{
                                        str4+='<td></td>';
                                        }
                                    }
                            }
                

                            str4 += '</tr>';
                    }
                    else if(i>index){
                            str4 += '<tr>'; ///////////////////////////////////// //以下为具有移进-归约冲突部分  
            
                            
            
                            for(var j=0;vn[j]!="";j++){
                                if(Xtt==numVn[i]&&Ytt==vn[j])
                                {
                                     str4+='<td>' +"?"+ '</td>';
                                }
                                else {
                                    var kk=SLR(numVn[i],vn[j]);
                                if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                                {
                                    Xstr=LR_match(numVn[i],kk-100,1);

                                    if(Xstr!=undefined)
                                    str4+='<td>' +"r"+Xstr+ '</td>';
                                    else{
                                        str4+='<td></td>'
                                        }
                                }
                                else if(kk==1)//以vn[j]移进
                                {
                                    Xstr=LR_match(numVn[i],vn[j],0);

                                    if(Xstr!=undefined)
                                    str4+='<td>' + "s"+Xstr+ '</td>';
                                    else{
                                        str4+='<td></td>'
                                        }
                                }
                                else if(kk==200)//空
                                {
                                    str4+='<td></td>'
                                }
                                }
                                

            
                    
                        }

                            str4 += '</tr>';
                    }
                    
                }


                str4 += '</table>' + 
                    '</td>'+
                    '<td>'+
                        '<table class="table-cell">' ;//以下循环为分析表非终结符正式内容

                for(var i=0;numVn[i]!=""&&numVn[i]!=undefined;i++) {
                    if(i<index){     
                        str4 += '<tr>';
                        for(var j=0;Vn[j]!="";j++){
                            Xstr=LR_match(numVn[i],Vn[j],0);
                            if(Xstr!=undefined) 
                                str4+='<td>' +Xstr+ '</td>';
                            else{
                                str4+='<td>' +""+ '</td>';
                            }
                        }

                            str4 += '</tr>';
                        } 
                    else if(i>index) {
                        str4 += '<tr>';
                        for(var j=0;Vn[j]!="";j++){
                            Xstr=LR_match(numVn[i],Vn[j],0);
                            if(Xstr!=undefined) 
                                str4+='<td>' +Xstr+ '</td>';
                            else{
                                str4+='<td>' +""+ '</td>';
                            }
                        }

                            str4 += '</tr>';
                    }
            
                
                }
    
                str4+=  '</table>' + 
                    '</td>'+
                '</tr>';

         tbody.innerHTML = str4;
        }
    else if(flag==10&&LRflag1==3)//LR1文法
        {
                    if(FollowVn[0][0]=="")
                    {
                        alert("此为SLR表，请先求出Follow集");
                        return;
                    }
                el.className = 'active';
                str4 = '';
                str4+='<tr>'+
                        '<td>'+"状态"+'</td>'+
                        '<td align="center" width="200">'+"ACTION"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;vn[i]!=""&&(vn[i]<'A'||vn[i]>'Z');i++)
                                    str4+='<td>'+vn[i]+'</td>';
                                
                            str4+=  '</tr>'+
                            '</table>'+
                        '</td>'+
                        '<td align="center">'+"GOTO"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;Vn[i]!="";i++)
                                {
                                    //if(vn[i]>='A'&&vn[i]<='Z')
                                    str4+='<td>'+Vn[i]+'</td>';
                                }
                                    
                                /* '<td>'+"E"+'</td>'+
                                    '<td>'+"A"+'</td>'+
                                    '<td>'+"B"+'</td>'+*/
                            str4+='</tr>'+
                            '</table>'+
                        '</td>'+
                    '</tr>' + 
                    '<tr>' + 
                        '<td>'+
                            '<table align="center">' ;
                            for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++)
                            {   //if(i!=index)
                                str4+='<tr><td>'+i+'</td></tr>';
                            }
                            

                                
                        str4+=  '</table>' + 
                        '</td>'+
                        '<td>' +
                            '<table class="table-cell">';//以下循环为分析表终结符正式内容
                            

                for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++) {
                    
                    
              
                   
                            str4 += '<tr>'; 
            
                
            
                            for(var j=0;vn[j]!=""&&vn[j]!=undefined;j++){
                                if(i==1&&vn[j]=="#")str4+='<td>'+"acc"+'</td>';
                                else{
                                    Xstr=LR1_match(i,vn[j],0);

                                    if(Xstr<100)
                                    str4+='<td>' +"r"+(Xstr+100)+ '</td>';
                                    else if(Xstr>100&&Xstr!=500){
                                        str4+='<td>'+"s"+(Xstr-100)+'</td>';
                                    }
                                    
                                    else if(Xstr==500)
                                    {
                                        str4+='<td></td>';
                                    }
                                }
                               
                                    
                                
                             

            
                    
                        }

                            str4 += '</tr>';
                    
                    
                }


                str4 += '</table>' + 
                    '</td>'+
                    '<td>'+
                        '<table class="table-cell">' ;//以下循环为分析表非终结符正式内容

                for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++) {
                       
                        str4 += '<tr>';
                       for(var j=0;Vn[j]!=""&&Vn[j]!=undefined;j++)
                       {    Xstr=LR1_match(i,Vn[j],0);

                                    if(Xstr<100)
                                    str4+='<td>' +(Xstr+100)+ '</td>';
                                    else if(Xstr>100&&Xstr!=500){
                                        str4+='<td>'+(Xstr-100)+'</td>';
                                    }
                                    
                                    else if(Xstr==500)
                                    {
                                        str4+='<td></td>';
                                    }

                       }

                            str4 += '</tr>';
                    }
            
                
                
    
                str4+=  '</table>' + 
                    '</td>'+
                '</tr>';

         tbody.innerHTML = str4;


        }

    else if(flag==11&&LRflag1==3){//LALR
            if(LALR_match()==-1)//为LALR文法
            {
                alert("是LALR文法");
            }
            else{
                alert("不是LALR文法");
            }

         
                
                el.className = 'active';
                str4 = '';
                str4+='<tr>'+
                        '<td>'+"状态"+'</td>'+
                        '<td align="center" width="200">'+"ACTION"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;vn[i]!=""&&(vn[i]<'A'||vn[i]>'Z');i++)
                                    str4+='<td>'+vn[i]+'</td>';
                                
                            str4+=  '</tr>'+
                            '</table>'+
                        '</td>'+
                        '<td align="center">'+"GOTO"+
                            '<table class="table-cell" border="0">'+
                                '<tr>';
                                for(var i=0;Vn[i]!="";i++)
                                {
                                    //if(vn[i]>='A'&&vn[i]<='Z')
                                    str4+='<td>'+Vn[i]+'</td>';
                                }
                                    
                                /* '<td>'+"E"+'</td>'+
                                    '<td>'+"A"+'</td>'+
                                    '<td>'+"B"+'</td>'+*/
                            str4+='</tr>'+
                            '</table>'+
                        '</td>'+
                    '</tr>' + 
                    '<tr>' + 
                        '<td>'+
                            '<table align="center">' ;
                            for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++)
                            {   //if(i!=index)
                                if(LR_I[i][0]!="!")
                                {
                                    var j=0,indexflag=0;
                                while(LALR[j]!=""&&LALR[j]!=undefined)
                                {
                                    //if(LALR[j].indexOf(""+i)!=-1)
                                    var xdd=LALR[j].indexOf("_");
                                    if(LALR[j].substring(0,xdd)==i||LALR[j].substring(xdd+1,LALR[j].length)==i)
                                    {   
                                        str4+='<tr><td>'+LALR[j]+'</td></tr>';
                                        indexflag=1;
                                        break;
                                    }
                                    j++;

                                }
                                if(indexflag==0)
                                str4+='<tr><td>'+i+'</td></tr>';
                                }
                                
                            }
                            

                                
                        str4+=  '</table>' + 
                        '</td>'+
                        '<td>' +
                            '<table class="table-cell">';
                            
                            
                            //以下循环为分析表终结符正式内容
                            

                for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++) {
                    
                    if(LR_I[i][0]!="!")
                    {
                          str4 += '<tr>'; 
            
                
            
                            for(var j=0;vn[j]!=""&&vn[j]!=undefined;j++){
                                if(i==1&&vn[j]=="#")str4+='<td>'+"acc"+'</td>';
                                else{
                                    /////////////////////////
                                          var jcc=0,indexflag=0;
                                            while(LALR[jcc]!=""&&LALR[jcc]!=undefined)
                                            {
                                                //if(LALR[jcc].indexOf(""+i)!=-1)
                                                var xdd=LALR[jcc].indexOf("_");
                                                if(LALR[jcc].substring(0,xdd)==i||LALR[jcc].substring(xdd+1,LALR[jcc].length)==i)
                                                {   
                                                    //str4+='<tr><td>'+LALR[j]+'</td></tr>';
                                                    indexflag=1;
                                                    break;
                                                }
                                                jcc++;

                                            }
                                            if(indexflag==0)Xstr=LR1_match(i,vn[j],1);
                                            else if(indexflag==1)Xstr=LR1_match(LALR[jcc],vn[j],1);
                                ////////////////////////////////////
                                    

                                    if(Xstr<100)
                                    str4+='<td>' +"r"+(Xstr+100)+ '</td>';
                                    else if(Xstr!=500){
                                        str4+='<td>'+"s"+Xstr+'</td>';
                                    }
                                    
                                    else if(Xstr==500)
                                    {
                                        str4+='<td></td>';
                                    }
                                }              
                        }

                            str4 += '</tr>';
                    }
              
                   
                          
                    
                    
                }


                str4 += '</table>' + 
                    '</td>'+
                    '<td>'+
                        '<table class="table-cell">' ;//以下循环为分析表非终结符正式内容

                for(var i=0;LR_I[i][0]!=""&&LR_I[i][0]!=undefined;i++) {
                    if(LR_I[i][0]!="!")
                    {
                             str4 += '<tr>';
                       for(var j=0;Vn[j]!=""&&Vn[j]!=undefined;j++)
                       {    
                           
                           /////////////////////////
                                          var jcc=0,indexflag=0;
                                            while(LALR[jcc]!=""&&LALR[jcc]!=undefined)
                                            {
                                                //if(LALR[jcc].indexOf(""+i)!=-1)
                                                var xdd=LALR[jcc].indexOf("_");
                                                if(LALR[jcc].substring(0,xdd)==i||LALR[jcc].substring(xdd+1,LALR[jcc].length)==i)
                                                {   
                                                    //str4+='<tr><td>'+LALR[j]+'</td></tr>';
                                                    indexflag=1;
                                                    break;
                                                }
                                                jcc++;

                                            }
                                            if(indexflag==0)Xstr=LR1_match(i,Vn[j],1);
                                            else if(indexflag==1)Xstr=LR1_match(LALR[jcc],Vn[j],1);
                                ////////////////////////////////////
                          // Xstr=LR1_match(i,Vn[j]);

                                    if(Xstr<100)
                                    str4+='<td>' +Xstr+ '</td>';
                                    else if(Xstr!=500){
                                        str4+='<td>'+Xstr+'</td>';
                                    }
                                    
                                    else if(Xstr==500)
                                    {
                                        str4+='<td></td>';
                                    }

                       }

                            str4 += '</tr>';
                    }
                       
                   
                    }
            
                
                
    
                str4+=  '</table>' + 
                    '</td>'+
                '</tr>';

         tbody.innerHTML = str4;


    }
   // myCanvas();

   LR_fill();

}
function LALR_match()//判断是否为LALR文法
{
    var i=2,j=0,z=0,index=0,index1=0;
    var Xstr="",Xstr1="",Xstr2="",Xstr3="";
    var LALRflag=0;
    var LALRVN=[20];
    for(index=0;index<20;index++)
    {
        LALRVN[index]="";

    }
    while(LR_I[i][0]!=""&&LR_I[i][0]!=undefined)
    {   if(LR_I[i][0]=="!")
        {
            i++;
            continue;
        }
         for(var ik=0;ik<10;ik++)
        {
            LALRVN[ik]="";
        }
        j=i+1;
        index=0;
        LALRflag=0;
        while(LR_I[j][index]!=""&&LR_I[j][index]!=undefined)
        {   
            if(LR_I[i][index]!=""&&LR_I[i][index]!=undefined)
            {
                    Xstr=LR_I[i][index].substring(0,LR_I[i][index].indexOf(","));
                    Xstr1=LR_I[j][index].substring(0,LR_I[j][index].indexOf(","));
                     if(Xstr!=Xstr1)
                        {  // LALRflag=1;
                            //jbreak;
                            j++;
                            index=0;
                            continue;
                        }

                    Xstr2=LR_I[i][index];
                    Xstr3=LR_I[j][index].substring(LR_I[j][index].indexOf(",")+1,LR_I[j][index].length);
                    addL(LALRVN,Xstr2+"/"+Xstr3);
                    LALRflag++;
            }
            
           
            index++;
        }
        if((LR_I[i][index]==""||LR_I[i][index]==undefined)&&(LR_I[j][index]==""||LR_I[j][index]==undefined)&&LALRflag==index)//同心集
        {


            index=0;
            while(LR_I[i][index]!=""&&LR_I[i][index]!=undefined){
                LR_I[i][index]=LALRVN[index];
                LR_I[j][index]="";
                index++;
            }
            //LR_I[i][index]="!"+i+""+j+"";//Iij
            LR_I[j][0]="!";
            var cc=0;
            while(GOTOVn[cc]!=""&&GOTOVn[cc]!=undefined)
            {
                if(GOTOVn[cc].charAt(0)==j)GOTOVn[cc]="!";
                cc++;
            }

            addL(LALR,i+"_"+j);//把36加入
            //LR_I[j][0]

        }



        i++;


    }

    //以下判断合并后，有没有归约冲突
    i=0;
    LALRflag=-1;
    while(LALR[i]!=""&&LALR[i]!=undefined)
    {
        index=parseInt(LALR[i].substring(0,LALR[i].indexOf("_")));
        j=0;
        if(LR_I[index][j].charAt(LR_I[index][0].indexOf("·")+1)==",")
        {   
            z=j+1;
            while(LR_I[index][z]!=""&&LR_I[index][z]!=undefined)
            {
                if(LR_I[index][z].charAt(LR_I[index][z].indexOf("·")+1)==",")
                {
                                    Xstr=LR_I[index][j].substring(LR_I[index][j].indexOf(",")+1,LR_I[index][j].length);
                                    Xstr1=LR_I[index1][z].substring(LR_I[index1][z].indexOf(",")+1,LR_I[index1][z].length);
                                    if(Xstr==Xstr1)LALRflag=0;//不是LALR；
                                    else if(Xstr.charAt(1)=="/"||Xstr1.charAt(1)!="/")
                                    {
                                        Xstr=Xstr.split("/");
                                        index1=0;
                                        while(Xstr[index1]!=""&&Xstr[index1]!=undefined)
                                        {
                                            if(Xstr[index1]==Xstr1)LALRflag=0;
                                            index1++;
                                        }
                                    }
                                    else if(Xstr.charAt(1)!="/"||Xstr1.charAt(1)=="/")
                                    {
                                        Xstr1=Xstr1.split("/");
                                        index1=0;
                                        while(Xstr1[index1]!=""&&Xstr1[index1]!=undefined)
                                        {
                                            if(Xstr1[index1]==Xstr)LALRflag=0;
                                            index1++;
                                        }
                                    }
                                    else if(Xstr.charAt(1)=="/"||Xstr1.charAt(1)=="/")
                                    {
                                        Xstr=Xstr.split("/");
                                        Xstr1=Xstr1.split("/");
                                        index=index1=0;
                                        while(Xstr[index]!=""&&Xstr[index]!=undefined)
                                        {    index1=0;
                                            while(Xstr1[index1]!=""&&Xstr1[index1]!=undefined)
                                            {
                                                if(Xstr[index]==Xstr1[index1])LALRflag=0;
                                                index1++;
                                            }
                                            index++;

                                        }
                                    }
                }

                z++;
            }
            //j++;
        }
        i++;
    }






  /*  i=0;
    LALRflag=-1;
    while(LALR[i]!=""&&LALR[i]!=undefined)
    {   //jwhile()
         index=parseInt(LALR[i].charAt(0));
        if(LR_I[index][0].charAt(LR_I[index][0].indexOf("·")+1)==",")
        {   j=i+1;
            while(LALR[j]!=""&&LALR[j]!=undefined)
            {   index1=parseInt(LALR[j].charAt(0));
                if(LR_I[index1][0].charAt(LR_I[index1][0].indexOf("·")+1)==",")
                {
                   Xstr=LR_I[index][0].substring(LR_I[index][0].indexOf(",")+1,LR_I[index][0].length);
                   Xstr1=LR_I[index1][0].substring(LR_I[index1][0].indexOf(",")+1,LR_I[index1][0].length);
                   if(Xstr==Xstr1)LALRflag=0;//不是LALR；
                   else if(Xstr.charAt(1)=="/"||Xstr1.charAt(1)!="/")
                   {
                       Xstr=Xstr.split("/");
                       index1=0;
                       while(Xstr[index1]!=""&&Xstr[index1]!=undefined)
                       {
                           if(Xstr[index1]==Xstr1)LALRflag=0;
                           index1++;
                       }
                   }
                   else if(Xstr.charAt(1)!="/"||Xstr1.charAt(1)=="/")
                   {
                       Xstr1=Xstr1.split("/");
                       index1=0;
                       while(Xstr1[index1]!=""&&Xstr1[index1]!=undefined)
                       {
                           if(Xstr1[index1]==Xstr)LALRflag=0;
                           index1++;
                       }
                   }
                   else if(Xstr.charAt(1)=="/"||Xstr1.charAt(1)=="/")
                   {
                       Xstr=Xstr.split("/");
                       Xstr1=Xstr1.split("/");
                       index=index1=0;
                       while(Xstr[index]!=""&&Xstr[index]!=undefined)
                       {    index1=0;
                           while(Xstr1[index1]!=""&&Xstr1[index1]!=undefined)
                           {
                               if(Xstr[index]==Xstr1[index1])LALRflag=0;
                               index1++;
                           }
                           index++;

                       }
                   }
                    
                }
                j++;

            }
           
        }
         i++;
        
    }*/

   //修改GOTO
    i=0;
    while(LALR[i]!=""&&LALR[i]!=undefined)
    {   //jwhile()
       j=0;
       while(GOTOVn[j]!=""&&GOTOVn[j]!=undefined)
       {  if(GOTOVn[j]!="!")
            {
                 Xstr=GOTOVn[j].split("|");
                    if(Xstr[0].charAt(1)==""||Xstr[0].charAt(1)==undefined)
                    {    //var cc=;
                        if(LALR[i].indexOf(""+Xstr[0])!=-1) Xstr[0]=LALR[i];

                    }
                    if(Xstr[2].charAt(1)==""||Xstr[2].charAt(1)==undefined)
                    {
                        if(LALR[i].indexOf(""+Xstr[2].charAt(0))!=-1)Xstr[2]=LALR[i];
                    }
                    GOTOVn[j]=Xstr[0]+"|"+Xstr[1]+"|"+Xstr[2];
            }
           

           j++;
       }
       i++;
    }
 /////////////////
 /*   i=0;
    while(LALR[i]!=""&&LALR[i]!=undefined)
    {   //jwhile()
       j=0;
       while(GOTOVn[j]!=""&&GOTOVn[j]!=undefined)
       {    
           if(GOTOVn[j].indexOf(LALR[i].charAt(0))!=undefined)
           {    index=GOTOVn[j].indexOf(LALR[i].charAt(0));
                if(index==0)
                {
                    GOTOVn[j]=+GOTOVn[j].substring(index+1,GOTOVn[j].length);

                }
                else 
                {        GOTOVn[j]=GOTOVn[j].substring(0,GOTOVn[j].length-1)+LALR[i];

                }
               //GOTOVn[j]=GOTOVn[j].
           }
           else if(GOTOVn[j].indexOf(LALR[i].charAt(1)!=undefined)
           {
                index=GOTOVn[j].indexOf(LALR[i].charAt(1));
                if(index==0)
                {
                    GOTOVn[j]=+GOTOVn[j].substring(index+1,GOTOVn[j].length);

                }
                else 
                {        GOTOVn[j]=GOTOVn[j].substring(0,GOTOVn[j].length-1)+LALR[i];

                }
           }

           j++;
       }
    }*/
    return LALRflag;//是LALR文法
}
function LR_match(a,b,c)//LR0 SLR表格内容匹配
{   
     var q=0;
        var Xstr="";
        if(c==0)
        {
            while(GOTOVn[q]!=""&&GOTOVn[q]!=undefined)
        {   Xstr=GOTOVn[q].split("|");
            if(a==Xstr[0]&&b==Xstr[1])
            {
                return Xstr[2];
            }
            q++;
        }
    }
    else if(c==1)
    {   Xstr=LR_I[a][b];
        Xstr=Xstr.substring(0,Xstr.indexOf("·"));
        if(Xstr.charAt(Xstr.indexOf(">")+1)==""||Xstr.charAt(Xstr.indexOf(">")+1)==undefined)Xstr+="ε";
        
        while(str[q]!=""&&str[q]!=undefined)
        {
            if(Xstr==str[q])return q;
            q++;
        }
    }
    
   
        
}
function LR1_match(a,b,p)//LR1 表格内容匹配
{   var cc=a+"";
    if(cc.indexOf("_")!=-1)a=cc.substring(0,cc.indexOf("_"));
    var j=0,index=0,index1=0,Xstr="",q=0,Xstr1="";
    if(LR_I[a][0]!=""&&LR_I[a][0]!=undefined)
    {   j=0;
        while(LR_I[a][j]!=""&&LR_I[a][j]!=undefined)
        {  if(LR_I[a][j]!="!")
            {
             Xstr=LR_I[a][j];
            index=Xstr.indexOf("·");
            if(Xstr.charAt(index+1)==",")//归约项
            {   if(Xstr.charAt(index+3)=="/")
                    {   //var Xstr1="";
                        Xstr1=Xstr.substring(index+2,Xstr.length).split("/");
                        index1=0;
                        while(Xstr1[index1]!=""&&Xstr1[index1]!=undefined)
                        {
                            if(Xstr1[index1]==b){
                                    Xstr=Xstr.substring(0,index);
                                    if(Xstr.charAt(Xstr.indexOf(">")+1)==""||Xstr.charAt(Xstr.indexOf(">")+1)==undefined)Xstr+="ε";
                                    q=0;
                                    while(str[q]!=""&&str[q]!=undefined)
                                    {
                                        if(Xstr==str[q])
                                        {
                                          //  if(p==0)
                                            return parseInt(q)-100;//<100
                                          //  else{

                                            //}
                                        }
                                        q++;
                                    }
                            }
                            index1++;
                        }
                    }
                    else if(Xstr.charAt(index+2)==b)
                    {               Xstr=Xstr.substring(0,index);
                                    if(Xstr.charAt(Xstr.indexOf(">")+1)==""||Xstr.charAt(Xstr.indexOf(">")+1)==undefined)Xstr+="ε";
                                    q=0;
                                    while(str[q]!=""&&str[q]!=undefined)
                                    {
                                        if(Xstr==str[q])return parseInt(q)-100;//<100
                                        q++;
                                    }

                    }
               

            }
            else if(Xstr.charAt(index+1)==b)//移进项
            {       q=0;
                     while(GOTOVn[q]!=""&&GOTOVn[q]!=undefined)
                    {   Xstr=GOTOVn[q].split("|");
                        if(cc==Xstr[0]&&b==Xstr[1])
                        {   if(p==0)
                            return parseInt(Xstr[2])+100;//>100
                            else{
                                return Xstr[2];//>100
                            }
                        }
                        q++;
                    }



                }
            }
            
                j++;
        }

    }
    return 500;
}
function SLR_LR1panduan(A,b)//判断是SLR 还是LR1
{   

    var i=0;
    var index;
    while(errVn[i]!=""&&errVn[i]!=undefined)
    {   index=FindX(Vn,errVn[i],Vnnum);
        if(index!=undefined)
        {   if(addL(FollowVn[index],b)==1)return i;
            else{
                empty1(FollowVn[index],b);
            }

        }
        i++;

    }
    return -1;//

}
function SLR(a,b)//a=横坐标 b=纵坐标
{
    //var i=0;
    if(LR_I[a][0]!=""&&LR_I[a][0]!=undefined)
    {
        var j=0;
        var xflag=0;
        var Xstr;
        var index;
        while(LR_I[a][j]!=""&&LR_I[a][j]!=undefined)
        {    index=LR_I[a][j].indexOf("·");
            if((LR_I[a][j].charAt(index+1)==""||LR_I[a][j].charAt(index+1)==undefined)&&xflag==j&&j==0)
            {
                xflag=0;               
                j=1;
                break;
            }
            else if((LR_I[a][j].charAt(index+1)==""||LR_I[a][j].charAt(index+1)==undefined)&&xflag!=j)
            {
                xflag=j;              
                j=0;
                break;
            }
            j++;
        }
        Xstr=LR_I[a][xflag].charAt(0);//找到单一规约项（SLR）
        //判断b在不在Follow中
        index=FindX(Vn,Xstr,Vnnum);
        if(addL(FollowVn[index],b)==1)return 100+xflag;//b在Follow中，归约
        else{
            empty1(FollowVn[index],b);
           // return 1;
        }

        /////////////////Follow中没有，考虑移进项
        j=0;
        while(LR_I[a][j]!=""&&LR_I[a][j]!=undefined)
         { Xstr=LR_I[a][j];
             index=Xstr.indexOf("·");
             var cc=Xstr.charAt(index+1);
            if(Xstr.charAt(index+1)!=""&&Xstr.charAt(index+1)!=undefined)//移进项
            {
                if(Xstr.charAt(index+1)==b) return 1;
            }
            else if(Xstr.charAt(index-1)!=">"&&j!=xflag)//另一个归约项
            {   Xstr=Xstr.charAt(0);//找到单一规约项（SLR）
                //判断b在不在Follow中
                index=FindX(Vn,Xstr,Vnnum);
                if(addL(FollowVn[index],b)==1)return j+100;//b在Follow中，归约
                else{
                    empty1(FollowVn[index],b);
                    // return 1;
                }

            }
            j++;
         }
    }
    return 200;
}
/////////////////////////////////
//////////////////////////////////

function addLR_I1(A)//LR1的整理
{
        var j=0;
        //var Xstr=A[0];
        //A[0]+=",#";
        var index1,index2;
        var Xstr="";
        while(A[j]!=""&&A[j]!=undefined)
        {
            var index=A[j].indexOf("·");
            //if(Xstr)
    //if(A[j].charAt(index+1)>='A'&&A[j].charAt(index+1)<='Z'&&A[j].charAt(index+1)!=A[j].substring(0,A[j].indexOf("-")))
            if(A[j].charAt(index+1)>='A'&&A[j].charAt(index+1)<='Z')
            {

                if(A[j].charAt(index+2)==",")
                {var w=0;
                    while(LRVn[w]!=""&&LRVn[w]!=undefined)
                    {   
                        if(LRVn[w].substring(0,LRVn[w].indexOf("-"))==A[j].charAt(index+1)&&LRVn[w].charAt(LRVn[w].indexOf(">")+1)=="·")
                        {   
                            if(addL(A,LRVn[w]+","+A[j].substring(index+3,A[j].length))!=1)
                            str3+=LRVn[w]+","+A[j].substring(index+3,A[j].length)+'\n';
                        }
                        w++;
                    }

                }
                else if(A[j].charAt(index+2)>='A'&&A[j].charAt(index+2)<='Z'){
                       
                            var w=0;
                            while(LRVn[w]!=""&&LRVn[w]!=undefined)
                            {   
                                if(LRVn[w].substring(0,LRVn[w].indexOf("-"))==A[j].charAt(index+1)&&LRVn[w].charAt(LRVn[w].indexOf(">")+1)=="·")
                                {   
                                    Xstr="";

                                     index1=FindX(Vn,A[j].charAt(index+2),Vnnum);
                                        index2=0;
                                        while(FirstVn[index1][index2]!=""&&FirstVn[index1][index2]!=undefined)
                                        {
                                            Xstr+=FirstVn[index1][index2]+"/";
                                            index2++;
                                        }
                                        Xstr=Xstr.substring(0,Xstr.length-1);
                                    if(addL(A,LRVn[w]+","+Xstr)!=1)
                                    str3+=LRVn[w]+","+Xstr+'\n';
                                }
                                w++;
                            }


                }
                else if(A[j].charAt(index+2)<'A'||A[j].charAt(index+2)>'Z')
                {
                    var w=0;
                    while(LRVn[w]!=""&&LRVn[w]!=undefined)
                    {   
                        if(LRVn[w].substring(0,LRVn[w].indexOf("-"))==A[j].charAt(index+1)&&LRVn[w].charAt(LRVn[w].indexOf(">")+1)=="·")
                        {   
                            if(addL(A,LRVn[w]+","+A[j].charAt(index+2))!=1)
                            str3+=LRVn[w]+","+A[j].charAt(index+2)+'\n';
                        }
                        w++;
                    }
                }

                
            }
                j++;
        }
        //i++;
        
   
}
function LR1()//项目集规范族的具体实现
{   
    //alert("ss");
    if(LR1flag==0)
    {
        while(LR_I[counter1][counter2]!=""&&LR_I[counter1][counter2]!=undefined)
    {   str1=LR_I[counter1][counter2];
        var index=str1.indexOf("·");
        if(str1.charAt(index+1)!=",")
        {//while()
            var z=2;
            if(str1.charAt(index+2)=="'") z=3;  
        
            if(addL(LR_L[counter1],str1.substring(index+1,index+z))!=1)
            {
                str2=str1.substring(0,index)+str1.substring(index+1,index+z)+"·"+str1.substring(index+z,str1.length);
            
            var k=1,xflag=0;
            while(LR_I[k][0]!="")
            {
                if(LR_I[k][0]==str2)
                {
                    xflag=1;
                    break;
                }
                k++;
            }
            if(xflag==0)
            {LR_I[k][0]=str2;

               
            str3+="GOTO(I"+counter1+","+str1.substring(index+1,index+z)+")=I"+k+'\n';
            addL(GOTOVn,counter1+"|"+str1.substring(index+1,index+z)+"|"+k);
            str3+="I"+k+":"+'\n';
            str3+=str2+'\n';

             var t=0;
                while(LR_I[counter1][t]!=""&&LR_I[counter1][t]!=undefined)
                {
                    if(str2.charAt(str2.indexOf("·")-1)==LR_I[counter1][t].charAt(LR_I[counter1][t].indexOf("·")+1)&&LR_I[counter1][t]!=str1)
                    {   var Xstr=LR_I[counter1][t];
                        index=Xstr.indexOf("·");
                        var z=2;
                        if(Xstr.charAt(index+2)=="'") z=3;
                        
                        //if(addL(LR_L[counter1],Xstr.substring(index+1,index+z))!=1)
                           Xstr=Xstr.substring(0,index)+Xstr.substring(index+1,index+z)+"·"+Xstr.substring(index+z,Xstr.length);
                            if(addL(LR_I[k],Xstr)!=1)
                            str3+=Xstr+'\n';
                        
                        
                    }
                    
                    
                    t++;
                }

            addLR_I1(LR_I[k]);
          
              break;
            }
            else{
                str3+="GOTO(I"+counter1+","+str1.substring(index+1,index+z)+")=I"+k+'\n';
                addL(GOTOVn,counter1+"|"+str1.substring(index+1,index+z)+"|"+k);
                document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+str3;
                counter2++;
                return ;
            }
        }
        else{
            counter2++;
        }
            
            

        }
        else if(LR_I[counter1][counter2+1]==""||LR_I[counter1][counter2+1]==undefined){
            counter1++;
            counter2=0;
        }
        else{
            counter2++;
        }
   
    }
    counter2++;
    
     if(LR_I[counter1+1][0]==""&&LR_I[counter1][counter2]=="")
    {   LR1flag=1;
        LR0str=str3;

    }
    else if(LR_I[counter1][counter2]==""||LR_I[counter1][counter2]==undefined)
    {   counter1++;
        counter2=0;

    }
    document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                    "把GO(I,X)放入C族中"+'\n'+str3;
    }
    else if(LR1flag==1)
    {   //document.getElementById("t_below_right1").innerHTML="IF GO(I,X)非空且不属于C  THEN"+'\n'+
                                                                   // "把GO(I,X)放入C族中"+'\n'+LR0str;
      alert("已求出LR(1)项目集规范族");
      LRvn();
      showLR();
      LRflag1=3;
        
        
        
        
        
    }
 
    



}
/////////////////////////////////////
const el = document.getElementById('popup');
//const btn = document.getElementById('q7');
const close = document.getElementById('close');
const tbody = document.getElementById('tbody');
    
close.onclick = function() {
        el.className = 'disable';
    }
el.ondrag = function(e) {
        //console.log(e.clientX, e.clientY);
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
    }
el.ondragend = function(e) {
        el.style.left = e.screenX + 'px';
        el.style.top = e.screenY - 83 + 'px';
}