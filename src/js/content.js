 jq = jQuery.noConflict(); 
 
var rblockmatch = {};
jq.each(blokkmatches,function(k,v){
	rblockmatch[v] = k;
}) 
var blokkskeys = [];
var blokksvalues = [];	
for(kkey in blokkmatches){
		blokkskeys.push(kkey);
		blokksvalues.push(blokkmatches[kkey]);
		
}

 jq(document).ready(function(){
     chrome.extension.sendRequest({name: "isPaused"}, function(response) {
			  if (response.value != 'true') {
				 
					 var blokkstring =  blokkskeys.join('|') ;
					 var blokkstring2 =  blokksvalues.join('|') ; 
					var reg = new RegExp( '([^a-zA-Z0-9_-]|^)('+blokkstring+"|"+blokkstring2+')(?![a-zA-Z0-9_])' ,'ig');
					jq("body *").replaceText( reg, changeFontBlokk ); 
			  }
	})
 
 });
 function changeFontBlokk( str ){ 
	var original = str;
	var str2 = jq.trim(str);
	str = str2.toLowerCase();
	var end = "";
	var start = "";
	if(original.charAt(original.length - 1) == " " )
		end = " ";
		
	if(original.charAt(0) == " " )
		start = " ";
	if(blokkmatches[str])
		return start+transform(str2, blokkmatches[str])+end ;
	
	if(rblockmatch[str])
		return  start + transform(str2,rblockmatch[str]) + end;
	return start+ original + end;
 }; 
 
function transform(olds,news){
var character;
var str='';
var i = 0; 

while (i <= olds.length){
    character = olds.charAt(i); 
    if (!isNaN(character * 1)){
    	str += character;
    }else{ 
    	if (character == character.toUpperCase()) {
			if(news.charAt(i))
				str += news.charAt(i).toUpperCase();
			
    	}
    	if (character == character.toLowerCase()){	
			if(news.charAt(i))
    			 str += news.charAt(i).toLowerCase();
    	}
    }
	
    i++;
} 
if(olds.length<news.length){
	 
	str += news.substr(i-1,news.lentgh);
}
return str;
 }