$(function(){
	$(".slick-next-custom").on("click",function(){
			e.preventDefault();
			alert("aaaaa");
			/*var curpage = $(this).attr('data-page');
			var nextpage = curpage  + 1;

			$.ajax({
				type : "GET",
				url: "api/toys/"+nextpage,
				dataType : "json",
				success : function(response){
					//console.log(response.toys[900].image);
					
					var str = "";
					$.each(response.toys,function(c,v){
						//console.log(v);
						
						str+="<div class='toysparent'><figure class='boxtoys'><img width='100' height='100' src='http://www.kreisel.com/imagen/productos/270/230/"+v.image+"'/><p class='titletoys'>"+v.short_desc+"</p></figure></div>";
						
						
						//console.log(v.compromiso);
					})


					$('#toyscontent').slickAdd(str);

				
					}
			})*/

			
		})
})