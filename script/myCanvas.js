var ctx,ctx1;//全局的画布标识  
var ctxFlag=0;
var width=1150; //设置线条获得区域宽度  
var height=500; //设置线条获得区域高度  

  
var i = 0; //记录线条长度  
var exp=1; //设置线条每次移动像素大小  
var string;//用来存储用户输入的值  
  
var tranIOLenth; //第二段横线之间的间隔  
var tranIOZuoBiao = {}; //用来存储第二段横线的起始点坐标，用map形式存储  

var tnumOfTranIO; //保存第二段输入的值的个数  


/////////////////////
var input = document.getElementById('input');
var inputText = document.getElementById('input-text');
var cot1=0,cot2=0;
var state=[50],tNum=0;//栈内状态
var ser=[50],sNum=0;//符号

      
//var myStr="",mystr="";
//var rule_text = document.getElementById('rule_text');
var items = document.querySelectorAll('.rule-item');
//document.getElementById("rule_text").innerHTML=mystr;
var val;//输入的语句i+i*i#
var nextNum;// 0|i|1,  其中的1
var toGo;//toGo为其中的i
var toGoflag=0;
var Num;//|β|=Num
function go(kl)//输入的文法
{
    //ruleGo();
     val = input.value.split('');
        if(val[kl]!=""&&val[kl]!=undefined)
        {
            inputText.classList.add('display');
        input.classList.add('disappear');

        
        val[kl] = '<span class="selected">' + val[kl] + '</span>';

        inputText.innerHTML = val.join('');

        //cot1++;
        }
}
function go1()
{
        input.classList.remove('disappear');
        inputText.classList.remove('display');
        input.focus();
        cot1=0;
        cot2=0;
         state=[50];tNum=0;//栈内状态
         ser=[50];sNum=0;//符号
         toGoflag=0;
         LR_fill();
}


function ruleGo()//分析规则
{       go(cot1);
    myXstr="";
        
       if(flag==9&&LRflag1==2)//SLR
            {   
                if(cot2>=4&&cot2<8)
                {
                   
                    var index1=FindX(numVn,state[tNum-1]);
                    var index2=FindX(numVn,"+");
                     toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(parseInt(index1)<parseInt(index2))//移进
                    {
                        nextNum=LR_match(state[tNum-1],toGo,0);
                        if(nextNum!=undefined)
                        {
                                //str4+='<td>' + "s"+Xstr+ '</td>';
                                if(cot2==5)
                                {
                                    draw(state[tNum-1],toGo,nextNum);
                                   // StateⅠ(nextNum);
                                    
                                    
                                }
                                
                                else if(cot2==6)
                                {
                                   
                                }
                                else if(cot2==7)
                                { 
                                         cot1++;
                                         go(cot1);
                                         
                                   // StateⅡ(toGo);
                                    //cot2=16;
                                }
                                
                        }
                          
                        else{
                            cot2=8;
                          }
                    }
                    else if(parseInt(index1)>parseInt(index2))
                    {
                        var kk=SLR(state[tNum-1],toGo);
                         if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                                {
                                    nextNum=LR_match(numVn[i],kk-100,1);

                                    if(nextNum!=undefined)
                                        {   if(cot2==5)
                                            draw(state[tNum-1],toGo,nextNum);
                                        }
                                    else{
                                            cot2=8;
                                        }
                                }
                                else if(kk==1)//以vn[j]移进
                                {
                                    nextNum=LR_match(numVn[i],vn[j],0);

                                    if(nextNum!=undefined)
                                        {           if(cot2==5)
                                                    {draw(state[tNum-1],toGo,nextNum);
                                                    //StateⅠ(nextNum);
                                                }
                                                    else if(cot2==6)
                                                    {
                                                        //cot1++;
                                                    }
                                                    else if(cot2==7)
                                                    { 
                                                        cot1++;
                                                        go(cot1);
                                         
                                                       // StateⅡ(toGo);
                                                       // cot2=16;
                                                    }
                                        }


                                    else{
                                            cot2=8;
                                        }
                                }
                                else if(kk==200)//空
                                {   if(cot2==4)cot2=8;
                                    
                                }

                    }
                }
                else if(cot2>=8&&cot2<12)//ACTION 归约
                {
                    if(cot2==9)
                    {



                    }

                }
                else if(cot2>=12&&cot2<14)
                {

                }
                else if(cot2>=14&&cot2<16)
                {

                }
               // else if(cot2==16)
                //{
                //    cot2=3;
                //}
               
                

            }
      















    StateⅠ(cot2);
    StateⅡ(cot2);
    //if(cot2==8)cot2=16;
    //规格说明  高亮移动 
     //myStr=mystr.split('\n');
      for(var i = 0; i < items.length; i++) {
            if(i == cot2) {
                items[i].classList.add('selected');
            }else {
                items[i].classList.remove('selected');        
            }
        }
        if(cot2==16){
            cot2=3;
            return;}

         if(cot2==7){
             cot2=16;
             return;
         }   
        cot2++;

    

}
function ruleGo1()
{       
        if(cot2==0)
        {
            StateⅠ(0);
        }
        else if(cot2==1)
        {
            StateⅡ(1);
        }
        else if(cot2==2)
        {

        }
        else if(cot2==3)
        {

        }
        else if(cot2==4)
        {
                    var index1=FindX(numVn,state[tNum-1]);
                    var index2=FindX(numVn,"+");
                    toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(parseInt(index1)<parseInt(index2))//移进
                    {   if(state[tNum-1]=="1"&&toGo=="#")
                        {   toGoflag=555;

                        }
                        else
                        {
                            nextNum=LR_match(state[tNum-1],toGo,0);
                            if(nextNum!=undefined)
                            {  toGoflag=1;
                                //draw(state[tNum-1],toGo,nextNum);
                            }
                            else{
                                cot2=8;
                                return;
                            }
                            }
                         

                    }
                    else if(parseInt(index1)>parseInt(index2))
                    {
                         var kk=SLR(state[tNum-1],toGo);
                         if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                                {
                                    nextNum=LR_match(state[tNum-1],kk-100,1);

                                    if(nextNum!=undefined)
                                        {  toGoflag=100+nextNum;//105 
                                            //cot2=8;
                                            //return ;
                                            //draw(state[tNum-1],toGo,nextNum);
                                        }
                                    else{
                                            
                                        }
                                }
                                else if(kk==1)//以vn[j]移进
                                {
                                    nextNum=LR_match(state[tNum-1],toGo,0);

                                    if(nextNum!=undefined)
                                       toGoflag=1;
                                       //draw(state[tNum-1],toGo,nextNum);
                                    else{
                                            cot2=8;
                                            return;
                                        }
                                }
                                else if(kk==200)//空
                                {   if(cot2==4)
                                     {
                                         cot2=8;
                                         return;
                                     }
                                }
                    }
        }
        if(cot2==5)
        {
            if(toGoflag==1)
            {   //ctx.strokeStyle = "red"; //定义颜色
                ctxFlag=0;
                draw(state[tNum-1],nextNum);
                toGoflag=0;
                StateⅡ(5);
            }
        }
        else if(cot2==6)
        {
            StateⅠ(6);
        }
        else if(cot2==7)
        {
            cot1++;
        }
        else if(cot2==8)
        {
            if(toGoflag>=100)
            {
                var xstr=str[toGoflag-100];
                toGo=xstr.substring(0,xstr.indexOf("-"));
                Num=xstr.length-3;
                toGoflag=0;
                
            }
        }
        else if(cot2==9)
        {
            if(toGo>='A'&&toGo<='Z')
            {   //ctx.strokeStyle = "blue"; //定义颜色
                ctxFlag=1;
                for(var i=0;i<Num;i++)
                {
                    draw(state[tNum-(i+1)],state[tNum-(i+2)]);
                }
                
            }
        }
        else if(cot2==10)
        {
            StateⅠ(10);
        }
        else if(cot2==11)
        {
                    var index1=FindX(numVn,state[tNum-1]);
                    var index2=FindX(numVn,"+");
                    //toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(parseInt(index1)<parseInt(index2))//移进
                    {
                         nextNum=LR_match(state[tNum-1],toGo,0);
                         if(nextNum!=undefined)
                         {   //ctx.strokeStyle = "red"; //定义颜色
                             ctxFlag=0;
                             draw(state[tNum-1],nextNum);
                         }
                         else{
                             
                         }

                    }
                    else if(parseInt(index1)>parseInt(index2))
                    {
                         var kk=SLR(state[tNum-1],toGo);
                         if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                                {
                                   /* nextNum=LR_match(numVn[i],kk-100,1);

                                    if(nextNum!=undefined)
                                        {  //toGoflag=100+nextNum;//105 
                                            //cot2=8;
                                            //return ;
                                            draw(state[tNum-1],nextNum);
                                        }
                                    else{
                                            
                                        }*/
                                }
                                else if(kk==1)//以vn[j]移进
                                {
                                    nextNum=LR_match(state[tNum-1],toGo,0);

                                    if(nextNum!=undefined)
                                       {//toGoflag=1;
                                       //ctx.strokeStyle = "red"; //定义颜色
                                       ctxFlag=0;
                                       draw(state[tNum-1],nextNum);}
                                    else{
                                           
                                        }
                                }
                                else if(kk==200)//空
                                {  
                                }
                    }

                 StateⅠ(11); 
                 StateⅡ(11);  
        }
        else if(cot2==12)
        {

        }
        else if(cot2==13)
        {
            StateⅡ(13);
        }



        go(cot1);
      //规格说明  高亮移动 
     // myStr=mystr.split('\n');
      for(var i = 0; i < items.length; i++) {
            if(i == cot2) {
                items[i].classList.add('selected');
            }else {
                items[i].classList.remove('selected');        
            }
        }
        if(cot2==7||cot2==11){
            cot2=16;
            return;
        }
        else if(cot2==16)
        {
            cot2=3;
            return;
        }
        else if(cot2==13)return;
        if(toGoflag>=100&&toGoflag<555){
            cot2=8;
            return;
        }
        else if(toGoflag==555){
            cot2=12;
            toGoflag=0;
            return;
        }
        cot2++;
}
function ruleGo2()
{
      
        if(cot2==0)
        {
            StateⅠ(0);
        }
        else if(cot2==1)
        {
            StateⅡ(1);
        }
        else if(cot2==2)
        {

        }
        else if(cot2==3)
        {

        }
        else if(cot2==4)
        {           if(flag==8||flag==9)
                    {
                        var index1=FindX(numVn,state[tNum-1]);
                    var index2=FindX(numVn,"+");
                    toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(parseInt(index1)<parseInt(index2))//移进
                    {   if(state[tNum-1]=="1"&&toGo=="#")
                        {   toGoflag=555;

                        }
                        else
                        {
                            nextNum=LR_match(state[tNum-1],toGo,0);
                            if(nextNum!=undefined)
                            {  toGoflag=1;
                                //draw(state[tNum-1],toGo,nextNum);
                            }
                            else{
                                cot2=8;
                                return;
                            }
                            }
                         

                    }
                    else if(parseInt(index1)>parseInt(index2))
                    {
                         var kk=SLR(state[tNum-1],toGo);
                         if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                                {
                                    nextNum=LR_match(state[tNum-1],kk-100,1);

                                    if(nextNum!=undefined)
                                        {  toGoflag=100+nextNum;//105 
                                            //cot2=8;
                                            //return ;
                                            //draw(state[tNum-1],toGo,nextNum);
                                        }
                                    else{
                                            
                                        }
                                }
                                else if(kk==1)//以vn[j]移进
                                {
                                    nextNum=LR_match(state[tNum-1],toGo,0);

                                    if(nextNum!=undefined)
                                       toGoflag=1;
                                       //draw(state[tNum-1],toGo,nextNum);
                                   // else{
                                      //      cot2=8;
                                      //      return;
                                      //  }
                                }
                                else if(kk==200)//空
                                {   if(cot2==4)
                                     {
                                        toGoflag=777;
                                     }
                                }
                    }
                    }
                   // var index1=FindX(numVn,state[tNum-1]);
                   // var index2=FindX(numVn,"+");
                   else if(flag==10||flag==11)
                   {
                    toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(state[tNum-1]=="1"&&toGo=="#")
                    {
                        toGoflag=555;//接受
                    }
                    else {
                        if(flag==10)//LR1
                        {
                            nextNum=LR1_match(state[tNum-1],toGo,0);
                            if(nextNum<100)//归约
                            {
                                nextNum=nextNum+100;
                                toGoflag=100+nextNum;
                            }
                            else if(nextNum>100&&nextNum!=500)//移进
                            {    //ctxFlag=0;
                                nextNum=nextNum-100;
                                // draw(state[tNum-1],nextNum);
                                toGoflag=1;
                                

                            }
                            else if(nextNum==500)//
                            {   toGoflag=777;
                                //cot2=8;
                                //return;
                            }
                        }
                        else if(flag==11)//LALR
                        {
                                nextNum=LR1_match(state[tNum-1],toGo,1);
                            if(nextNum<100)//归约
                            {
                                nextNum=nextNum+100;
                                toGoflag=100+nextNum;
                            }
                            else if(nextNum!=500)//移进
                            {    //ctxFlag=0;
                                //nextNum=nextNum-100;
                                // draw(state[tNum-1],nextNum);
                                toGoflag=1;
                                

                            }
                            else if(nextNum==500)//
                            {   toGoflag=777;
                                //cot2=8;
                                //return;
                            }
                        }
                        
                    }
                   }
                    

                    
                    
        }
        if(cot2==5)
        {
            if(toGoflag==1)
            {   //ctx.strokeStyle = "red"; //定义颜色
                ctxFlag=0;
                //if(flag==10)
                if(flag==11)
                {
                    //var sssss=nextNum.substring(0,nextNum.indexOf("_"));
                    if(state[tNum-1].indexOf("_")!=-1)
                             {  if(nextNum.indexOf("_")!=-1)
                                 draw(state[tNum-1].substring(0,state[tNum-1].indexOf("_")),nextNum.substring(0,nextNum.indexOf("_")));
                                 else{
                                     draw(state[tNum-1].substring(0,state[tNum-1].indexOf("_")),nextNum);
                                 }
                             }
                             else{
                                if(nextNum.indexOf("_")!=-1)
                                 draw(state[tNum-1],nextNum.substring(0,nextNum.indexOf("_")));
                                 else{
                                     draw(state[tNum-1],nextNum);
                                 }
                             }
                    //draw(state[tNum-1],nextNum.substring(0,nextNum.indexOf("_")));
                }
                
                else{
                    draw(state[tNum-1],nextNum);
                }
                
                

                toGoflag=0;
                StateⅡ(5);
            }
            
        }
        else if(cot2==6)
        {
            StateⅠ(6);
        }
        else if(cot2==7)
        {
            cot1++;
        }
        else if(cot2==8)
        {
            if(toGoflag>=100)
            {
                var xstr=str[toGoflag-100];
                toGo=xstr.substring(0,xstr.indexOf("-"));
                Num=xstr.length-3;
                toGoflag=0;
                
            }
            else{
                toGoflag=555;
            }
        }
        else if(cot2==9)
        {
            if(toGo>='A'&&toGo<='Z')
            {   //ctx.strokeStyle = "blue"; //定义颜色
                ctxFlag=1;
                for(var i=0;i<Num;i++)
                {   if(flag==11)
                    {
                        if(state[tNum-(i+1)].indexOf("_")!=-1)
                        {
                            if(state[tNum-(i+2)].indexOf("_")!=-1)
                            draw(state[tNum-(i+1)].substring(0,state[tNum-(i+1)].indexOf("_")),state[tNum-(i+2)].substring(0,state[tNum-(i+2)].indexOf("_")));
                            else{
                                draw(state[tNum-(i+1)].substring(0,state[tNum-(i+1)].indexOf("_")),state[tNum-(i+2)]);
                            }
                        }
                        else{
                             if(state[tNum-(i+2)].indexOf("_")!=-1)
                            draw(state[tNum-(i+1)],state[tNum-(i+2)].substring(0,state[tNum-(i+2)].indexOf("_")));
                            else{
                                draw(state[tNum-(i+1)],state[tNum-(i+2)]);
                            }
                        }
                    }
                    else{
                        draw(state[tNum-(i+1)],state[tNum-(i+2)]);
                    }
                    
                }
               // StateⅡ(9);
                
            }
        }
        else if(cot2==10)
        {
            StateⅠ(10);
        }
        else if(cot2==11)
        {       
                    //toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                   if(flag==8||flag==9)
                   {
                         var index1=FindX(numVn,state[tNum-1]);
                    var index2=FindX(numVn,"+");
                    //toGo=val[cot1].charAt(val[cot1].indexOf("/")-2);
                    if(parseInt(index1)<parseInt(index2))//移进
                    {
                         nextNum=LR_match(state[tNum-1],toGo,0);
                        // if(nextNum!=undefined)
                         //{   //ctx.strokeStyle = "red"; //定义颜色
                             ctxFlag=0;
                             draw(state[tNum-1],nextNum);
                        // }
                         //else{
                             
                        // }

                    }
                    else if(parseInt(index1)>parseInt(index2))
                    {
                         var kk=SLR(state[tNum-1],toGo);
                         //if(kk>=100&&kk<200)//Follow中有vn[j]，归约
                              //  {
                                   /* nextNum=LR_match(numVn[i],kk-100,1);

                                    if(nextNum!=undefined)
                                        {  //toGoflag=100+nextNum;//105 
                                            //cot2=8;
                                            //return ;
                                            draw(state[tNum-1],nextNum);
                                        }
                                    else{
                                            
                                        }*/
                              //  }
                               // else
                                 if(kk==1)//以vn[j]移进
                                {
                                    nextNum=LR_match(state[tNum-1],toGo,0);

                                    if(nextNum!=undefined)
                                       {//toGoflag=1;
                                       //ctx.strokeStyle = "red"; //定义颜色
                                       ctxFlag=0;
                                       draw(state[tNum-1],nextNum);}
                                    else{
                                           
                                        }
                                }
                               // else if(kk==200)//空
                               // {  
                               // }
                    }
                   }
                   else if(flag==10||flag==11)
                   {    if(flag==10)
                       {
                        nextNum=LR1_match(state[tNum-1],toGo,0);
                         if(nextNum>100&&nextNum!=500)
                         {   //ctx.strokeStyle = "red"; //定义颜色
                             ctxFlag=0;
                             nextNum=nextNum-100;
                             draw(state[tNum-1],nextNum);
                         }
                         else {
                             alert("第555行");//
                         }
                       }
                       else if(flag==11)
                       {
                           nextNum=LR1_match(state[tNum-1],toGo,1);
                         if(nextNum!=500)
                         {   //ctx.strokeStyle = "red"; //定义颜色
                             ctxFlag=0;
                             //nextNum=nextNum-100;
                             if(state[tNum-1].indexOf("_")!=-1)
                             {  if(nextNum.indexOf("_")!=-1)
                                 draw(state[tNum-1].substring(0,state[tNum-1].indexOf("_")),nextNum.substring(0,nextNum.indexOf("_")));
                                 else{
                                     draw(state[tNum-1].substring(0,state[tNum-1].indexOf("_")),nextNum);
                                 }
                             }
                             else{
                                if(nextNum.indexOf("_")!=-1)
                                 draw(state[tNum-1],nextNum.substring(0,nextNum.indexOf("_")));
                                 else{
                                     draw(state[tNum-1],nextNum);
                                 }
                             }
                             //draw(state[tNum-1],nextNum.substring(0,nextNum.indexOf("_")));
                         }
                         else {
                             alert("第555行");//
                         }
                       }
                        
                   }
                        

                    

                 StateⅠ(11); 
                 StateⅡ(11);  
        }
        else if(cot2==12)
        {
            if(state[tNum-1]=="1"&&toGo=="#")
            {
                        //toGoflag=555;//接受
            }
            else{
                toGoflag=666;//出错
            }
        }
        else if(cot2==13)
        {
            StateⅡ(13);
        }
        else if(cot2==14)
        {

        }
        else if(cot2==15)
        {
            StateⅡ(15);
        }



        go(cot1);
      //规格说明  高亮移动 
     // myStr=mystr.split('\n');
      for(var i = 0; i < items.length; i++) {
            if(i == cot2) {
                items[i].classList.add('selected');
            }else {
                items[i].classList.remove('selected');        
            }
        }
        if(cot2==7||cot2==11){
            cot2=16;
            return;
        }
        else if(cot2==16)
        {
            cot2=3;
            return;
        }
        else if(cot2==13)return;
        else if(cot2==15)return;

        if(toGoflag>=100&&toGoflag<555){
            cot2=8;
            return;
        }
        else if(toGoflag==555){
            cot2=12;
            toGoflag=0;
            return;
        }
        else if(toGoflag==666){
            cot2=14;
            toGoflag=0;
            return;
        }
        else if(toGoflag==777)
        {   cot2=8;
            toGoflag=0;
            return;
        }
        cot2++;
}

function StateⅠ(a)//栈内状态
{   //var xflag=0;
    if(a==0)//0入栈
    {  
        state[0]="0";
        tNum++;

    }
    else if(a==6)//s=[Sm,a]压栈
    {
        state[tNum]=nextNum;
        tNum++;

    }
    else if(a==10)//|β|个状态出栈
    {   tNum=tNum-Num;
        //xflag=1;
    }
    else if(a==11)//GOTO[Sm,a]入栈
    {   state[tNum]=nextNum;
        tNum++;
        //xflag==0;
    }   

    var i=0,xstr="";
    while(i<tNum)
    {
     xstr+=state[i]+'\n';   
     i++;
    }
    document.getElementById("state1").innerHTML=xstr;
    scrollButtom();
}
function StateⅡ(b)//符号
{
    if(b==1)//读入第一个符号
    {   ser[0]="#";
        sNum=1;
    }
    else if(b==5)
    {   //sNum=sNum-Num;
        ser[sNum]=ser[sNum-1]+toGo;
        sNum++;
    }
    else if(b==9)
    {   //sNum=sNum-Num;
       // var pp=ser[sNum-1].length+"|"+ser[sNum-1].substring(0,ser[sNum-1].length-Num+1);
        

    }
    else if(b==11)
    {
        ser[sNum]=ser[sNum-1].substring(0,ser[sNum-1].length-Num)+toGo;
        sNum++;
    }
    else if(b==13)
    {   if(ser[sNum-1]!="---接受---")
        {
            
            ser[sNum]="---接受---";
            sNum++;
        }
        
    }
    else if(b==15)
    {   
        if(ser[sNum-1]!="---出错---")
        {
            
            ser[sNum]="---出错---";
            sNum++;
        }
    }

    var i=0,xstr="";
    while(i<sNum)
    {
     xstr+=ser[i]+'\n';
     i++;   
    }
    document.getElementById("state2").innerHTML=xstr;
    scrollButtom();
}


function draw(A,D){  
    var c=document.getElementById("myCanvas"); 
    ctx=c.getContext("2d"); 
    //var c1=document.getElementById("myCanvas"); 
    if(ctxFlag==0){ 
     
    ctx.strokeStyle = "red";}
    else if(ctxFlag==1){
    //ctx1=c.getContext("2d");  
    ctx.strokeStyle = "blue";}
    //ctx.strokeStyle = "blue"; //定义颜色  
    //x=100;tx
   // D="2";
   ctx.beginPath();
    if(A=="0")
    {   //if(D=="0"){
         //   if(ctxFlag==0)drawCircle(40,120,1,1);
          //  else if(ctxFlag==1)drawCircle(40,120,2,2);
        //}
        if(D=="1")  
         drawColDownLine(40,310,80);
        else if(D=="2")
         drawColUpLine(40,200,80);        
        else if(D=="3")
         drawRowLine(80,260,80);
        else if(D=="4")
         {      drawRowLine(80,290,30);
                setTimeout(function(){drawColDownLine(110,290,130);},150); 
                 setTimeout(function(){drawRowLine(110,420,50);},900);
            }
        else if(D=="5")
         { drawRowLine(80,230,30);
             setTimeout(function(){drawColUpLine(110,230,130);},150);
             setTimeout(function(){ drawRowLine(110,100,50);},900);
        }
    }
    else if(A=="1")
    {    if(D=="1")
            {
            if(ctxFlag==0)drawCircle(40,390,1,2);
            else if(ctxFlag==1)drawCircle(40,390,2,1);
            }  
         else if(D=="6")
         {   drawRowLine(80,430,15);
             setTimeout(function(){drawColUpLine(95,430,60);},80);
             setTimeout(function(){drawRowLine(95,370,150);},400);
             setTimeout(function(){drawColUpLine(245,370,70);},1200);
             setTimeout(function(){drawRowLine(245,300,65);},1600);
         }
         if(D=="7");
         {   drawRowLine(80,440,20);
             setTimeout(function(){drawColUpLine(100,440,55);},100);
             setTimeout(function(){drawRowLine(100,385,150);},400);
             setTimeout(function(){drawColDownLine(250,385,70);},1200);
             setTimeout(function(){drawRowLine(250,455,60);},1600);
         
         }
    }

    else if(A=="2")
     {      if(D=="0")
                drawColDownLine(40,120,80);

            else if(D=="2")
            {
                if(ctxFlag==0)drawCircle(40,120,1,1);
                else if(ctxFlag==1)drawCircle(40,120,2,2);
            }
            if(D=="3")
            {
                drawRowLine(80,55,20);
                setTimeout(function(){drawColDownLine(100,55,180);},100);
                setTimeout(function(){drawRowLine(100,235,60);},1100);
                
            }
            else if(D=="4")
            {
                drawRowLine(80,60,25);
                setTimeout(function(){drawColDownLine(105,60,380);},150);
                setTimeout(function(){drawRowLine(105,440,55);},2150);
                
            }
            else if(D=="5")
            {
                drawRowLine(80,45,80);
            }
            else if(D=="6")
            {
                drawColDownLine(45,120,30);
                setTimeout(function(){
                    drawRowLine(45,150,295);
                },200);
                setTimeout(function(){
                    drawColDownLine(340,150,50);
                },1600);
                
            }
         else if(D=="7")
            {drawRowLine(80,50,15);
                setTimeout(function(){drawColDownLine(95,50,280);},100);
                setTimeout(function(){drawRowLine(95,330,170);},1600);
                setTimeout(function(){drawColDownLine(265,330,70);},2450);
                setTimeout(function(){drawRowLine(265,400,45);},2800);
            
            }


     }
     else if(A=="3")
     {     if(D=="0")
        {drawLeftLine(160,260,80);}
        else if(D=="3"){
             if(ctxFlag==0)drawCircle(200,200,1,2);
            else if(ctxFlag==1)drawCircle(200,200,2,1);
        }
         else if(D=="4")
        {
            drawColDownLine(200,310,80);
        }
        else if(D=="5")
        {
            drawColUpLine(200,200,80);
        }
          else if(D=="6")
          {
              drawRowLine(230,260,80);
          }
          else if(D=="8")
          {  drawRowLine(230,230,30);
             setTimeout(function(){drawColUpLine(260,230,130);},150);
             setTimeout(function(){ drawRowLine(260,100,50);},900);

          }

     }
     else if(A=="4")
     {   if(D=="0")
        {
            drawLeftLine(160,420,50);
            setTimeout(function(){drawColUpLine(110,420,130);},260);
            setTimeout(function(){drawLeftLine(110,290,30);},820);
            
        }
          if(D=="4")
            {
            if(ctxFlag==0)drawCircle(200,390,1,2);
            else if(ctxFlag==1)drawCircle(200,390,2,1);
            }  
         if(D=="2")
        {
                drawLeftLine(160,440,55);
                setTimeout(function(){drawColUpLine(105,440,380);},300);
                setTimeout(function(){drawLeftLine(105,60,25);},2300);
                
        }
         if(D=="3")
        {
            drawColUpLine(200,390,80);
        }
         if(D=="5")
         {
             drawRowLine(230,445,25);
             setTimeout(function(){drawColUpLine(255,445,380);},150);
             setTimeout(function(){drawLeftLine(255,65,25);},2150);
             
         }
         if(D=="6")
         {
             drawRowLine(230,450,35);
             setTimeout(function(){drawColUpLine(265,450,160);},180);
             setTimeout(function(){drawRowLine(265,290,45);},1000);
             
         }
         
         if(D=="7")
            drawRowLine(230,460,80);
         if(D=="8")
            {drawRowLine(230,440,30);
                setTimeout(function(){drawColUpLine(260,440,380);},150);
                setTimeout(function(){drawRowLine(260,60,50);},2150);
            }
          
     }
      else if(A=="5")
    {   if(D=="0")
        {   drawLeftLine(160,100,50);
            setTimeout(function(){drawColDownLine(110,100,130);},350);
            setTimeout(function(){drawLeftLine(110,230,30);},1000);   }
       
        
        if(D=="4")
        {   
             drawRowLine(230,65,25);
             setTimeout(function(){drawColDownLine(255,65,380);},150);
             setTimeout(function(){drawLeftLine(255,445,25);},2150);
             
        }
        else if(D=="5")
            {
                if(ctxFlag==0)drawCircle(200,120,1,1);
                else if(ctxFlag==1)drawCircle(200,120,2,2);
            }
        if(D=="6")
        {
            drawRowLine(230,50,20);
            setTimeout(function(){drawColDownLine(250,50,150);},100);
            setTimeout(function(){drawRowLine(250,200,60);},900);
            
        }
        else if(D=="7")
        {
            drawRowLine(230,55,10);
            setTimeout(function(){drawColDownLine(240,55,380);},50);
            setTimeout(function(){drawRowLine(240,435,70);},2050);
            


        }
        else if(D=="8")
       {
            drawRowLine(230,45,80);


        }
    
    }
        else if(A=="6")
        {    if(D=="2")
            {
                drawColUpLine(340,200,50);
                setTimeout(function(){drawLeftLine(340,150,295);},250);
                setTimeout(function(){drawColUpLine(45,150,30); },1750);
                
            }
            else if(D=="3")
            {
                drawLeftLine(310,260,80);
            }
           else  if(D=="4")
            {
             drawLeftLine(310,290,45);
             setTimeout(function(){drawColDownLine(265,290,160);},300);
            setTimeout(function(){drawLeftLine(265,450,35);},1050);
             

            }
            if(D=="5")
            {
                drawLeftLine(310,200,60);
                setTimeout(function(){drawColUpLine(250,200,150);},300);
                setTimeout(function(){drawLeftLine(250,50,20);},1050);
                
                
            }
            else if(D=="6"){
                if(ctxFlag==0)drawCircle(345,200,1,2);
                else if(ctxFlag==1)drawCircle(345,200,2,1);
            }
             else if(D=="7")
             {
                 drawColDownLine(345,310,80);
             }
             else if(D=="8")
            {
                 drawColUpLine(345,200,80);
             }
             else if(D=="9")
             {  
                 drawRowLine(380,260,80);

             }
             else if(D=="10")
             {
                 drawRowLine(380,265,25);
                 setTimeout(function(){drawColDownLine(405,265,150);},150);
                 setTimeout(function(){drawRowLine(405,415,55);},1000);
                 
             }
                else if(D=="11")
                {
                    drawRowLine(380,255,25);
                    setTimeout(function(){drawColUpLine(405,255,150);},150);
                    setTimeout(function(){drawRowLine(405,105,55);},1000);
                    

                }


        }
        else if(A=="7")
        {   
            if(D=="2")
            {
            drawLeftLine(310,400,45);
            setTimeout(function(){drawColUpLine(265,400,70);},250);
            setTimeout(function(){drawLeftLine(265,330,170);},600);
            setTimeout(function(){drawColUpLine(95,330,280);},1500);
            setTimeout(function(){drawLeftLine(95,50,15);},3000);
            
            
            }
            if(D=="5")
            {
                drawLeftLine(310,435,70);
                setTimeout(function(){drawColUpLine(240,435,380);},350);
                setTimeout(function(){drawLeftLine(240,55,10);},2350);
                
            }
             if(D=="7")
            {
            if(ctxFlag==0)drawCircle(345,390,1,2);
            else if(ctxFlag==1)drawCircle(345,390,2,1);
            }  
            if(D=="10")
            {
                drawRowLine(380,430,80);
            }
            else if(D=="9")
            {
                drawRowLine(380,425,20);
                setTimeout(function(){drawColUpLine(400,425,130);},100);
                setTimeout(function(){drawRowLine(400,295,60);},750);
                
            }
            else if(D=="11")
            {
                drawRowLine(380,450,30);
                setTimeout(function(){drawColUpLine(410,450,340);},150);
                setTimeout(function(){drawRowLine(410,110,50);},1850);
                
            }
        }

      else if(A=="8")
       {   
           if(D=="3"){
                drawLeftLine(310,100,50);
                setTimeout(function(){drawColDownLine(260,100,130);},250);
                setTimeout(function(){ drawLeftLine(260,230,30);},1000);
           }
           else if(D=="4")
            {
                drawLeftLine(310,60,50);
                setTimeout(function(){drawColDownLine(260,60,380);},250);
                setTimeout(function(){drawLeftLine(260,440,30);},2250);
                
            } 
           if(D=="6")
            {
                 drawColDownLine(345,120,80);
            }
           if(D=="11")
           {
               drawRowLine(380,45,80);
           }
           else if(D=="8")
            {
                if(ctxFlag==0)drawCircle(345,120,1,1);
                else if(ctxFlag==1)drawCircle(345,120,2,2);
            }
           else if(D=="9")
           {
               drawRowLine(380,50,15);
               setTimeout(function(){drawColDownLine(395,50,170);},80);
               setTimeout(function(){drawRowLine(395,220,65);},950);
               
           }
           else if(D=="10")
           {
               drawRowLine(380,55,10);
               setTimeout(function(){drawColDownLine(390,55,380);},50);
               setTimeout(function(){drawRowLine(390,435,70);},2050);
               
           }
       }  
       else if(A=="9")
       {    
           if(D=="6")
           {
               drawLeftLine(460,260,80);
           }
           if(D=="7")
            {   drawLeftLine(460,295,60);
                setTimeout(function(){drawColDownLine(500,295,130);},300);
                setTimeout(function(){drawLeftLine(500,425,20);},1100);
                
                
            }
            else if(D=="9")
            {
                if(ctxFlag==0)drawCircle(200,200,1,2);
                else if(ctxFlag==1)drawCircle(200,200,2,1);
            }
           if(D=="10")
           {
               drawColDownLine(500,310,80);
           }
           else if(D=="11")
           {
               drawColUpLine(500,200,80);
           }
       }
       else if(A=="10")
       {    if(D=="6")
            {
                drawLeftLine(460,415,55);
                setTimeout(function(){drawColUpLine(405,415,150);},300);
                 setTimeout(function(){drawLeftLine(405,265,25);},1050);
                 
            }
           if(D=="7")
           {
               drawLeftLine(460,430,80);
           }
           else  if(D=="10")
            {
            if(ctxFlag==0)drawCircle(500,390,1,2);
            else if(ctxFlag==1)drawCircle(500,390,2,1);
            }  
           else if(D=="11")
           {
               drawRowLine(530,440,20);
               setTimeout(function(){drawColUpLine(550,440,380);},100);
               setTimeout(function(){drawLeftLine(550,60,20);},2050);
               
           }
       }
       else if(A=="11")
       {    if(D=="6")
            {   
                    drawLeftLine(460,105,55);
                    setTimeout(function(){drawColDownLine(405,105,150);},300);
                    setTimeout(function(){drawLeftLine(405,255,25);},1050);
                    

            }
           else if(D=="8")
           {
               drawLeftLine(460,45,80);
           }
           if(D=="10")
           {
               drawRowLine(530,60,20);
               setTimeout(function(){drawColDownLine(550,60,380);},100);
               setTimeout(function(){drawLeftLine(550,440,20);},2100);
               
           }
           else if(D=="11")
            {
                if(ctxFlag==0)drawCircle(500,120,1,1);
                else if(ctxFlag==1)drawCircle(500,120,2,2);
            }
           else if(D=="12")
           {    
                drawRowLine(530,50,15);
                setTimeout(function(){drawColDownLine(545,50,170);},80);
               setTimeout(function(){drawRowLine(545,220,65);},900);
               
           }
           else if(D=="13")
           {
               drawRowLine(530,55,10);
               setTimeout(function(){drawColDownLine(540,55,380);},50);
               setTimeout(function(){drawRowLine(540,435,70);},2050);
               
           }
       }
       else if(A=="12")
       {
           if(D=="11")
           {
               drawLeftLine(610,220,65);
               setTimeout(function(){drawColUpLine(545,220,170);},350);
               setTimeout(function(){drawLeftLine(545,50,15);},1200);
               
           }
       } 
       else if(A=="13")
       {
           if(D=="11")
           {
               drawLeftLine(610,435,70);
               setTimeout(function(){drawColUpLine(540,435,380);},350);
               setTimeout(function(){drawLeftLine(540,55,10);},2250);
               
           }
           else if(D=="13")
           {
                //if(D=="1")
            
            if(ctxFlag==0)drawCircle(640,390,1,2);
            else if(ctxFlag==1)drawCircle(640,390,2,1);
              
           }
       }

        //}
        ctx.closePath();
        //StateⅠ(D);//把D压入栈
  
     
   /* tnumOfTranIO = 3; 
    x+=100;//就是下一段的出示x值  
    calcTranIO(x,tnumOfTranIO);  
    //画第一个竖线，表示交易接口的  
    setTimeout(function(){  
        //画第一段竖线  
            drawColUpLine(x,250,250-tranIOLenth);  
            drawColDownLine(x,250,250-tranIOLenth);  
        //画第一段横线，根据number  
    },1300);  
      
    setTimeout(function(){  
        for(i=0;i<tnumOfTranIO;i++){  
                        //通过全局变量取出x和y坐标  
                       var zuobiao = tranIOZuoBiao[i];  
            var zuobiaoX=zuobiao[0];  
            var zuobiaoY=zuobiao[1];  
  
                       drawRowLine(zuobiaoX,zuobiaoY,500);  
        }         
    },3000); 
    */ 
} 

function draw1()
{           var c=document.getElementById("myCanvas"); 
            ctx=c.getContext("2d"); 
            //var c1=document.getElementById("myCanvas"); 
            
            
            ctx.strokeStyle = "red";
           // var circle = {
             //       x : 100,    //圆心的x轴坐标值
            //        y : 100,    //圆心的y轴坐标值
             //       r : 50      //圆的半径
             //   };
                //以canvas中的坐标点(100,100)为圆心，绘制一个半径为50px的圆形
              //  var t=0.01;
               // var circle = {
                //        x : 100,    //圆心的x轴坐标值
               //         y : 100,    //圆心的y轴坐标值
               //         r : 50      //圆的半径
              //  };
                //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
              //  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI, false);  
              //    ctx.arc(circle.x+200, circle.y+200, circle.r,0, Math.PI, true); 
                //按照指定的路径绘制弧线
             //   ctx.stroke();
               // drawCircle(40,120,1,1);
               // drawCircle(40,120,2,2);

                //drawCircle(300,100,2,1);
                drawCircle(100,100,1,1);
                drawCircle(300,100,1,2);
                drawCircle(100,300,2,1);
                drawCircle(300,300,2,2);
           /* drawLeftLine(160,420,50);
            setTimeout(function(){
                    drawColUpLine(110,420,130)
                },300);
            setTimeout(function(){
                drawLeftLine(110,290,30);
            },1000);*/
                  //  drawLeftLine(110,290,30);
            
            
}

 function sleep(d){
                for(var t = Date.now();Date.now() - t <= d;);
                return 0;
                }

//////////////////////////////////
function AAA(){  
    /*var numOfTranIO = 4;*/  
    var c=document.getElementById("myCanvas");  
    ctx=c.getContext("2d");  
    //ctx.strokeStyle = "blue"; //定义颜色          
}


function LR_fill()//设置LR规范族矩形框
{       AAA();
        ctx.clearRect(0,0,width,height);
        //ctx.fillStyle="#FFFFFF";
        ctx.strokeStyle="#000000";/*设置边框*/ 
        ctx.lineWidth=1.5;/*边框的宽度*/ 
        var X=10,Y=200;
        var i=0;

        while(LR_I[i][0]!=""&&LR_I[i][0]!=undefined)
        {   
            //if()
            
            
            if(Y<200)
            {   
                
                var j=0,x=0,y=0;
                string="";
                y=Y;
                while(LR_I[i][j]!=""&&LR_I[i][j]!=undefined)
                {   if(LR_I[i][j]!="!")
                    {
                        if(j==0)
                    {   var u=0,uStr="";
                        while(LALR[u]!=""&&LALR[u]!=undefined)
                        {
                            uStr=LALR[u].split("_");
                            if(i==uStr[0]||i==uStr[1])
                            {
                                ctx.fillText("I"+LALR[u]+":",X+10,y+15);
                                u=100;
                            }
                            u++;
                        }
                        if(u!=100)
                        ctx.fillText("I"+i+":",X+10,y+15);
                        y=y+15;
                    }
                    string=LR_I[i][j]+'\n';
                    ctx.font="10px Arial";
                    ctx.fillText(string,X+10,y+15);
                    y=y+15;
                    
                    }
                    j++;
                     
                }
                


                ctx.strokeRect(X,Y,70,110);
                X=X+150;
                Y=200;
            }
            else if(Y<390&&Y>=200){

                var j=0,x=0,y=0;
                string="";
                y=Y;
                while(LR_I[i][j]!=""&&LR_I[i][j]!=undefined)
                {   if(LR_I[i][j]!="!")
                    {
                        if(j==0)
                    {
                         var u=0,uStr="";
                        while(LALR[u]!=""&&LALR[u]!=undefined)
                        {
                            uStr=LALR[u].split("_");
                            if(i==uStr[0]||i==uStr[1])
                            {
                                ctx.fillText("I"+LALR[u]+":",X+10,y+15);
                                u=100;
                            }
                            u++;
                        }
                        if(u!=100)                       
                        ctx.fillText("I"+i+":",X+10,y+15);
                        y=y+15;
                    }
                    string=LR_I[i][j]+'\n';
                    ctx.font="10px Arial";
                    ctx.fillText(string,X+10,y+15);
                    y=y+15;
                    }
                    
                    j++;
                }
                //ctx.fillText(string,X,Y+20);
                ctx.strokeRect(X,Y,70,110);
                //X=X+150;
                Y=Y+190;
            }
            else if(Y>=390)
            {   var j=0,x=0,y=0;
                string="";
                y=Y;
                while(LR_I[i][j]!=""&&LR_I[i][j]!=undefined)
                {   if(LR_I[i][j]!="!")
                    {
                        if(j==0)
                    {
                         var u=0,uStr="";
                        while(LALR[u]!=""&&LALR[u]!=undefined)
                        {
                            uStr=LALR[u].split("_");
                            if(i==uStr[0]||i==uStr[1])
                            {
                                ctx.fillText("I"+LALR[u]+":",X+10,y+15);
                                u=100;
                            }
                            u++;
                        }
                        if(u!=100)
                        ctx.fillText("I"+i+":",X+10,y+15);
                        y=y+15;
                    }
                    string=LR_I[i][j]+'\n';
                    ctx.font="10px";// Arial
                    ctx.fillText(string,X+10,y+15);
                    y=y+15;
                    }
                    
                    j++;
                }
                //ctx.fillText(string,X,Y+20);
                ctx.strokeRect(X,Y,70,108);
                //X=X+150;
                Y=Y-380;



            }
            i++;
        }


        
    


}















function getInput(something){ 
   // AAA();

    /*string = something;  
    ctx.clearRect(0,0,width,height);   
    ctx.textBaseline="middle";   
    ctx.font="30px sans-serif";  
    ctx.fillText(something,10,10);  
    x = ctx.measureText(something).width+10;  */
}  
//动态画画圆
function drawCircle(cX,cY,F,UD){  // UD标上下，F代表向左还是向右
    var iLen = 0;  
    var flag = 0; 
    var sh;
    function rowLine(){
        ctx.beginPath();  
        if(iLen<=300){
           // if(ctxFlag==0){
               if(F==1){//F=1为顺时针
                   if(UD==1)//向下
                        ctx.arc(cX,cY,15,0,Math.PI*(iLen/300),false);
                    else{
                        ctx.arc(cX,cY,15,Math.PI,Math.PI+Math.PI*(iLen/300),false);
                        }
                    
                        }
                   else{
                      if(UD==1)//向下
                        ctx.arc(cX,cY,15,Math.PI*2,Math.PI*2-Math.PI*(iLen/300),true);
                    else{
                        ctx.arc(cX,cY,15,Math.PI,Math.PI-Math.PI*(iLen/300),true);
                        }
                        }
               //ctx.arc(cX,cY,200,0,Math.PI*(ilen/length),F);
                iLen++;  
                ctx.stroke();   
        //} 
       // else if(ctxFlag==1)
        //{
           // ctx1.moveTo(startX,startY);  
         //   ctx1.lineTo(++startX,startY); 
         //   iLen++;  
          //  ctx1.stroke();  
       // } 
             
            
        }else{ 
            clearInterval(sh);
           // sh=-1;
            return;
        }     
    }  
    //if(iLen>length)return;
    sh=setInterval(rowLine,5);  
    //if(sh==0)return 0;
} 

//动态画向右直线
function drawRowLine(startX,startY,length){   
    var iLen = 0;  
    var flag = 0; 
    var sh;
    function rowLine(){  
        if(iLen<=length){
           // if(ctxFlag==0){
                ctx.moveTo(startX,startY);  
            ctx.lineTo(++startX,startY);
            iLen++;  
            ctx.stroke();   
        //} 
       // else if(ctxFlag==1)
        //{
           // ctx1.moveTo(startX,startY);  
         //   ctx1.lineTo(++startX,startY); 
         //   iLen++;  
          //  ctx1.stroke();  
       // } 
             
            
        }else{ 
            clearInterval(sh);
           // sh=-1;
            return;
        }     
    }  
    //if(iLen>length)return;
    sh=setInterval(rowLine,5);  
    //if(sh==0)return 0;
} 
//动态画向左直线 
function drawLeftLine(startX,startY,length){   
    var iLen = 0;  
    var flag = 0;  
    var sh;
    function rowLine(){  
        if(iLen<=length){
          //  if(ctxFlag==0)  
           // {
                ctx.moveTo(startX,startY);  
            ctx.lineTo(--startX,startY);
        iLen++;  
            ctx.stroke();// }
          //  else if(ctxFlag==1)
          //  {
          //      ctx1.moveTo(startX,startY);  
           // ctx1.lineTo(--startX,startY); 
           // iLen++;  
           // ctx1.stroke();
           // } 
              
        }else{ 
            clearInterval(sh);
           //sh=-1; 
           return;
        }     
    }
    //if(iLen>length)return;  
    sh=setInterval(rowLine,5);  
    //if(sh==0)
    //return 0;
} 
//动态画向上竖线  
function drawColUpLine(startX,startY,length){  
    var iLen = 0; 
    var sh; 
    function colUpLine(){  
        if(iLen<=length){ 
            //if(ctxFlag==0) 
           // {
                ctx.moveTo(startX,startY);  
            ctx.lineTo(startX,--startY);
        iLen++;  
            ctx.stroke();// }
          //  else if(ctxFlag==1)
          //  {
          //      ctx1.moveTo(startX,startY);  
          //  ctx1.lineTo(startX,--startY);
       // iLen++;  
          //  ctx1.stroke(); }
              
             
        }   
        else{
            clearInterval(sh);
           // sh=-1;
            return;
        }      
    }  
    //if(iLen>length)return;
    sh=setInterval(colUpLine,5);
    //if(sh==0)
    //return 0;  
}  
  
  
//动态画向下竖线  
function drawColDownLine(startX,startY,length){  
    var iLen = 0;
    var sh;  
    function colDownLine(){  
        if(iLen<=length){
            //if(ctxFlag==0)  
           // {
                ctx.moveTo(startX,startY);  
            ctx.lineTo(startX,++startY);
            iLen++;  
            ctx.stroke();//}
            //else if(ctxFlag==1)
           // {ctx1.moveTo(startX,startY);  
           // ctx1.lineTo(startX,++startY);
            //    iLen++;  
           // ctx1.stroke();}  
              
        }  
        else {clearInterval(sh);
          // sh=-1; 
            return ;}       
    }  
    //if(iLen>length)return;
    sh=setInterval(colDownLine,5);  
    //if(sh==0)
    //return 0;
}  

/*function calcTranIO(TranIOX,numOfTranIO){  
    tranIOLenth = 500/(numOfTranIO+1);  
    var m = new Array();  
    for(i=0;i<numOfTranIO;i++){  
        m =[];  
        m.push(TranIOX);  
        m.push(tranIOLenth*(1+i));    
        tranIOZuoBiao[i] = m;  
    }  
} */

