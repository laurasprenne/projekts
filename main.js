function switchColor(code) {
    if (0){
        document.getElementById("circle").style.backgroundColor = "blue";
    } else if (1){
        document.getElementById("circle").style.backgroundColor = "yellow";
    } else if (2){
        document.getElementById("circle").style.backgroundColor = "red";
    } else if (3){
        document.getElementById("circle").style.backgroundColor = "purple";
    } else if (4){
        document.getElementById("circle").style.backgroundColor = "orange";
    } else if (5){
        document.getElementById("circle").style.backgroundColor = "pink";
    }
}

(function() {
        
     document.addEventListener('DOMContentLoaded',function(){
         
         var ctMaxH =       30,
             ctMaxVM =      30,
             ctMaxVR =      30,
             
             ctCurH =       ctMaxH,
             ctCurVM =      ctMaxVM,
             ctCurVR =      ctMaxVR,
             
             intervalH =    1000,
             intervalVM =   2000,
             intervalVR =   3000,

             threshold =    ctMaxH * 0.6,
             points =       2,
             widther =      4,
             
             alive =		true,
             dangerH =      false,
             dangerVM =     false,
             dangerVR =     false,

             getMtrH =      document.getElementById('mHealth'),
             getMtrVM =     document.getElementById('mHappiness'),
             getMtrVR =     document.getElementById('mFood'),
             
             getStyleH =    getMtrH.style,
             getStyleVM =   getMtrVM.style,
             getStyleVR =   getMtrVR.style,
             bdrStart =		"1px solid ",
             
                 //Colors for meter borders
             clrDfltH =     "#81F781",  //green
             clrDfltVM =    "#FAAC58",  //orange
             clrDfltVR =    "#5882FA",  //blue
                 
             clrCurH =      clrDfltH,
             clrCurVM =     clrDfltVM,
             clrCurVR =     clrDfltVR,
             
             clrWarn =      "#FF0040", //red
         
                 //Get buttons for click events
             getBtnVM =     document.getElementById('btnFeed'),
             getBtnVR =     document.getElementById('btnPlay'),
             
        
         getStyleFb.display = 'none';
         meterWidth();
         
         //At set intervals, vitamin M decreases.
         setInterval(function(){
             if(alive == true){
                    loseVM();
                     checkDangerVM();
             }
         },intervalVM);
         
         //At set intervals, vitamin R decreases.
         setInterval(function(){
             if(alive == true){
                    loseVR();
                     checkDangerVR();
             }
         },intervalVR);
         
         /*
         What happens in this nest:
         Health starts to drop if vitamin M or vitamin R are too low.
         Meter graphics are adjusted as applicable.
         If the pet is dead, then the ending events trigger.
         */
         setInterval(function(){
             
             meterWidth();
             checkDangerH();
    
             //Adjust graphics
             if(dangerH == true)
                 {
                    warnH();
                    loseH();  
                 }
             else
                 {
                    okH();
                }
             
             if(dangerVM == true)
                 {
                     warnVM();      
                 }
             else
                 {
                     okVM();
                 }
         
             if(dangerVR == true)
                 {
                     warnVR();      
                 }
             else
                 {
                     okVR();
                 }
         
         //When your pet runs out of health, it will be a gonner.
         if(ctCurH < 0){
             alive = false;
         }
             
         if(alive == false)
            {
                ending();
            }
             
         },intervalH);
    
    
         //Clicking on a "Feed" button will restore vitamin and health to your pet.
         getBtnVM.addEventListener("click",function(){
             if(alive == true){
                 if(ctCurVM + points <= ctMaxVM)
                     {
                        ctCurVM = ctCurVM + points;
                     
                        if(ctCurH + points < ctMaxH)
                            {
                                ctCurH = ctCurH + points;
                            }
                     
                        meterWidth();
                     
                        //Check conditions and adjust graphics as appropriate.
                        checkDangerH();
                        checkDangerVM();
                        checkDangerVR();
                     
                        if(dangerH == false)
                        {okH();}
                        if(dangerVM == false)
                        {okVM();}
                        if(dangerVR == false)
                        {okVR();}
                 }
             }
         });
         
         getBtnVR.addEventListener("click",function(){
             if(alive == true){
                 if(ctCurVR + points <= ctMaxVR)
                    {
                        ctCurVR = ctCurVR + points;
                     
                        if(ctCurH + points < ctMaxH)
                            {
                                ctCurH = ctCurH + points;
                            }
                     
                        meterWidth();
                     
                        //Check conditions and adjust graphics as appropriate.
                        checkDangerH();
                        checkDangerVM();
                        checkDangerVR();
                     
                        if(dangerH == false)
                            {okH();}
                        if(dangerVM == false)
                            {okVM();}
                        if(dangerVR == false)
                            {okVR();}
                 }
             }
         });
         
         
         //Functions
         
         function meterWidth(){
             //This updates the width of the meters.
                getStyleH.width = ctCurH * widther + "px";	 
                 getStyleVM.width = ctCurVM * widther + "px";	 
                 getStyleVR.width = ctCurVR * widther + "px";	 
         }
         
         function checkDangerVM(){
                     if(ctCurVM < threshold)
                        {
                            dangerVM = true;
                        }
                     else
                        {
                            dangerVM = false;	
                        }
         }
         
         function checkDangerVR(){
                     if(ctCurVR < threshold)
                        {
                            dangerVR = true;
                        }
                     else
                        {
                            dangerVR = false;	
                        }
         }
         
         function checkDangerH(){
             if((ctCurVM < threshold || ctCurVR < threshold)  && alive == true)
                 {
                     dangerH = true;
                 }
             else
                 {
                     dangerH = false;
                 }
         }
        
         function loseVM(){
             ctCurVM = ctCurVM - points;
         }
         
         function loseVR(){
             ctCurVR = ctCurVR - points;
         }
         
         function loseH(){
              ctCurH = ctCurH - points;        
         }
         function ending(){
            getStyleFb.display = 'block';
        }
        });
        
    })();