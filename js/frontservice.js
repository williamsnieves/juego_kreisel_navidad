$(function(){

	$(window).keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			return false;
		}
	})

	window.toynotFound = [
		"900301.jpg",
		"500035.jpg",
		"112040.jpg",
		"112063.jpg",
		"700200.jpg",
		"111956.jpg",
		"112051.jpg",
		"112065.jpg",
		"500025.jpg",
		"500026.jpg",
		"111951.jpg",
		"900199.jpg",
		"900056.jpg",
		"900306.jpg",
		"111350.jpg",
		"500031.jpg",
		"500033.jpg",
		"111439.jpg",
		"900288.jpg",
		"110327.jpg",
		"110568.jpg",
		"112044.jpg",
		"112052.jpg",
		"112062.jpg"
	];
	window.curpage = 1;
	window.nextPage = curpage;
	window.prevPage = 182;
	window.toyList = [];
	window.toyListTmp = [];
	window.success = false;

	function addToysList(toy){

		
		window.toyListTmp.push(toy);

		window.toyList = window.toyListTmp.filter(function(elem, index, self) {
    		return index == self.indexOf(elem);
		})

		
		//console.log(window.toyList);
	}


	window.removeStorage = function(){
		localStorage.removeItem("answer1");
		localStorage.removeItem("answer2");
		localStorage.removeItem("answer3");
		localStorage.removeItem("answer4");
		//localStorage.removeItem("city");
		localStorage.removeItem("commitment");
		//localStorage.removeItem("country");
		//localStorage.removeItem("city");
		localStorage.removeItem("dataletter");
		//localStorage.removeItem("email");
		//localStorage.removeItem("email_parent");
		//localStorage.removeItem("iduser");
		localStorage.removeItem("level1");
		localStorage.removeItem("level2");
		localStorage.removeItem("level3");
		localStorage.removeItem("level4");
		localStorage.removeItem("question1");
		localStorage.removeItem("question2");
		localStorage.removeItem("question3");
		localStorage.removeItem("question4");
		localStorage.removeItem("questions");
		//localStorage.removeItem("username");

	}

	function unionToylist(listToy){
		window.toyList = window.toyList.concat(listToy);
		var index = window.toyList.indexOf("");
		if( index != -1){
			window.toyList.splice(index , 1);
		}

		//console.log(window.toyList);
	}

	function toTitleCase(str)
	{
   	 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	function removeToyList(toy){

		var index = window.toyList.indexOf(toy);
		if(index !== -1){
			window.toyList.splice(index, 1);
		}

		//console.log(window.toyList);
		
	}

	function createToyObject(ref){
		//console.log($(ref.target).parent());

		
		$(ref.target).parent().toggleClass("toySelected");

		if($(ref.target).parent().hasClass("toySelected")){
			//console.log("tengo la clase");
			var toy = $(ref.target).attr("data-toy").toString();
			addToysList(toy);
			
		}else{
			//console.log("no tengo la clase");
			var toy = $(ref.target).attr("data-toy").toString();
			removeToyList(toy)
			//$("#toySelected").slickRemove(1);
		}

	}

	function getPage(page){
		//console.log(page);

			/*$('#toyscontentsearch').hide();
			$('#toyscontent').show();*/

			$("#toyscontent").slickRemove(1);

			$(".boxtoys").click(function(e){
				createToyObject(e)
			})
	
			$.ajax({
				type : "GET",
				url: "api/toys/"+page,
				dataType : "json",
				success : function(response){
					//console.log(response.toys[900].image);
					var str = "";
					$.each(response.toys,function(c,v){
						//console.log(v);
						if(window.toynotFound.indexOf(v.image) != -1){
							return
						}else{
							str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.short_desc+"' width='100' height='100' src='http://www.kreisel.com/assets/main/media/productos/"+v.image+"'/><p data-toy='"+v.short_desc+"' class='titletoys'>"+v.short_desc+"</p></figure></div>";
						}
						
						//str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.desc_corta+"' width='100' height='100' src='http://www.kreisel.com/imagen/productos/270/230/"+v.imagen_peq+"'/><p data-toy='"+v.desc_corta+"' class='titletoys'>"+v.desc_corta+"</p></figure></div>";
						
						
						//console.log(v.compromiso);
					})

					

					$('#toyscontent').slickAdd(str);
					$(".boxtoys").click(function(e){
						createToyObject(e)
					})


					/*$(".boxtoys").click(function(e){
						createToyObject()
					})*/
					
				}
			})

			
	}






	$('#toyscontent').slick({
		        speed: 300,
		        slidesToShow: 4,
		        slidesToScroll: 4,
		        prevArrow : "<button type='button' class='slick-prev-custom'>Previous</button>",
		        nextArrow : "<button type='button' class='slick-next-custom'>Next</button>",
				onBeforeChange : function(){
					
					$(".slick-prev-custom").attr("id", "prevPage");
					$(".slick-next-custom").attr("id", "nextPage");
					//$(".slick-next-custom").attr("data-page",window.nextPage);
					//window.curpage = window.curpage +  1;
					//console.log(window.nextPage++);
					window.nextPage++
					window.prevPage--
					if(window.nextPage <= 113){
						getPage(window.nextPage);	
					}

					
					
				}
	});

	$("#toyscontent").slickSetOption('responsive', true, true);


	

	$.ajax({
			type : "GET",
			url: "api/questions",
			dataType : "json",
			success : function(response){
				//console.log(response);
				
				//var name = response.users[0].name;	
				localStorage.setItem("questions", JSON.stringify(response));
			}
	})

	$.ajax({
		type : "GET",
		url: "api/commitments",
		dataType : "json",
		success : function(response){
			//console.log(response.commitments);
			var str = "";
			$.each(response.commitments,function(c,v){
				//console.log(v);
				var capitalized = v.compromiso.toString()[0].toUpperCase() + v.compromiso.toString().substring(1);
				if(c === 0){
					str += "<div class='wrappercompromiso'><input type='radio' name='compromiso' value='"+v.compromiso+"' checked> <span class='textcompromiso'>"+capitalized+"</span></div>";
				}else{
					str += "<div class='wrappercompromiso'><input type='radio' name='compromiso' value='"+v.compromiso+"'> <span class='textcompromiso'>"+capitalized+"</span></div>";
				}
				
				
				//console.log(v.compromiso);
			})



			$(".container_compromiso .content").html(str);
			//var name = response.users[0].name;	
			//localStorage.setItem("questions", JSON.stringify(response));
		}
	})


	//window.onload = function(){

		/**/



		$.ajax({
			type : "GET",
			url: "api/toys/1",
			dataType : "json",
			success : function(response){
				//console.log(response.toys[900].image);
				
				var str = "";
				$.each(response.toys,function(c,v){
					//console.log(v);
					
					str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.short_desc+"' width='100' height='100' src='http://www.kreisel.com/assets/main/media/productos/"+v.image+"'/><p data-toy='"+v.short_desc+"' class='titletoys'>"+v.short_desc+"</p></figure></div>";
					//str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.desc_corta+"' width='100' height='100' src='http://www.kreisel.com/imagen/productos/270/230/"+v.imagen_peq+"'/><p data-toy='"+v.desc_corta+"' class='titletoys'>"+v.desc_corta+"</p></figure></div>";
					
					
					//console.log(v.compromiso);
				})


				$('#toyscontent').slickAdd(str);

					$(".boxtoys").click(function(e){
						createToyObject(e)
					})

			
				}
		})

		


	//}
	

	$.ajax({
			type : "GET",
			url: "api/countries",
			dataType : "json",
			success : function(response){
				//console.log(response);
				$.each(response.countries, function(c,v){
					$("#country").append("<option id='"+v.id+"' data-id='"+v.id+"' value='"+v.country+"'>"+toTitleCase(v.country)+"</option>");
				})

				
				$("#country").change(function(e){
					//console.log(e.target.value);
					if(e.target.value === 'venezuela'){
						$.ajax({
							type : "GET",
							url: "api/cities/14",
							dataType : "json",
							success : function(response){

								$.each(response.cities, function(c,v){
									
									$("#city").append("<option value='"+v.city_name+"'>"+toTitleCase(v.city_name)+"</option>")
								})
								
							}	
						})

					}
				})
			}
	})


	$.ajax({
		type : "GET",
		url: "api/ages",
		dataType : "json",
		success : function(response){

			$.each(response.ages, function(c,v){
				
				$("#edad").append("<option value='"+v.edad+"'>"+v.edad+"</option>")
			})
			
		}	
	})
	
	

	/*$(".initgame").click(function(e){
		e.preventDefault();
		$("#mainscreen").hide();


		if(localStorage.getItem("username")){

			var usermail = localStorage.getItem("email_parent");

			$.ajax({
				type : "GET",
				url: "api/user/"+usermail,
				dataType : "json",
				success : function(response){
					
					if(response.success){
						window.game.state.start("menu");
						$("#carta").show();
						//console.log(window.game.state.start("menu"));
					}else{
						//alert("false");
						$("#registro").show();
					}
					
				}
			})	
		}else{
			$("#registro").show();
		}
		
	})*/

	$("#boy").click(function(e){
		e.preventDefault();
		if($("#girl").hasClass("add-border")){
			$("#girl").removeClass("add-border")
		}
		$("#boy").toggleClass("add-border");
		var $gen = $("#boy").attr("data-type");
		$("#genero").val($gen);
	})

	$("#girl").click(function(e){
		e.preventDefault();
		if($("#boy").hasClass("add-border")){
			$("#boy").removeClass("add-border")
		}
		$("#girl").toggleClass("add-border");
		var $gen = $("#girl").attr("data-type");
		$("#genero").val($gen);
	})

	$(".imgSubmit").click(function(e){
		e.preventDefault();

		var $name = $("#name").val();
		var $country = $("#country").val();
		var $email_parent= $("#email_parent").val();
		var $age = $("#edad").val();
		var $city = $("#city").val();
		var $email = $("#email").val();

		var validGen = false;

		
		if($("#girl").hasClass("add-border")){
			var $genere = $("#girl").attr("data-type");
			validGen = true;
		}else if($("#boy").hasClass("add-border")){
			var $genere = $("#boy").attr("data-type");
			validGen = true;
		}else{
			validGen = false;
		}

		
		
		var validform = false;

		localStorage.setItem("country" , $country);
		localStorage.setItem("city" , $city);

		

		var fields = [$name,$country,$email_parent,$age];

		for(var item in fields){

			if(fields[item] === "" || fields[item] === "empty"){
				//alert("debes llenar todos los campos");
				validform = false;
			}else{
				validform = true;
			}

		}

		//alert(validGen);

		if(validform && validGen){

			var data = $("#formsubmit").serialize();


			$.ajax({
				type : "POST",
				url: "api/users",
				data: data,
				dataType : "json",
				success : function(response){
					

					/*if(response.user_repeat){
						//console.log("muestro el modal");
						$("#veloRegister p").text("Ya existe un usuario con los correos que ingresaste!!!")
						$("#veloRegister").fadeIn("fast").delay(3000).fadeOut("slow");
					}else{*/
						var id = response.users[0].id;
						var name = response.users[0].name;
						var email_parent = response.users[0].email_parent;
						var email = response.users[0].email;
						var genero = response.users[0].genero;	
						localStorage.setItem("iduser", id);
						localStorage.setItem("username", name);
						localStorage.setItem("email_parent", email_parent);
						localStorage.setItem("email", email);
						localStorage.setItem("genere" , genero);
						$("#veloRegister p").text("listo te has registrado. Ahora a jugar!!!")
						$("#veloRegister").fadeIn("fast").delay(3000).fadeOut("slow",function(){

							$("#registro").hide();
							window.game.state.start("menu");
							$("#carta").show();
						});
					//}
					
				}
			})
		}else{
			$("#veloRegister p").text("Debes llenar todos los campos")
			$("#veloRegister").fadeIn("fast").delay(3000).fadeOut("slow");
		}
	})


	$("#search-button").click(function(e){
		e.preventDefault();

		$("#toyscontent").slickRemove(1);
		//$('#toyscontent').hide();
		//$('#toyscontentsearch').show();

		var term = $("#term").val();

		if(term != ""){

			$.ajax({
				type : "GET",
				url: "api/toys/search/"+term,
				dataType : "json",
				success : function(response){
					//console.log(response.toys[900].image);
					var str = "";
					$.each(response.toys,function(c,v){
						//console.log(v);
						if(window.toynotFound.indexOf(v.image) != -1){
							return
						}else{
							str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.short_desc+"' width='100' height='100' src='http://www.kreisel.com/assets/main/media/productos/"+v.image+"'/><p data-toy='"+v.short_desc+"' class='titletoys'>"+v.short_desc+"</p></figure></div>";
						}
						
						//str+="<div class='toysparent'><figure class='boxtoys'><img data-toy='"+v.desc_corta+"' width='100' height='100' src='http://www.kreisel.com/imagen/productos/270/230/"+v.imagen_peq+"'/><p data-toy='"+v.desc_corta+"' class='titletoys'>"+v.desc_corta+"</p></figure></div>";
						
						
						//console.log(v.compromiso);
					})

					//console.log()

					//var currentSlide = $('#toyscontent').slickCurrentSlide();
					//console.log(currentSlide);

					//console.log($("#toyscontent").slickGetOption());
					
					//var contentSearchSlide = currentSlide + 8;
					$('#toyscontent').slickAdd(str,1);

					$('#toyscontent').slickGoTo(1);
					$(".toysparent figure.boxtoys").click(function(e){
						//$("figure.boxtoys").toggleClass('toySelected');
						createToyObject(e)
					})


					/*$(".boxtoys").click(function(e){
						createToyObject()
					})*/
					
				}
			})

		}else{
			return;
		}
		
	})
	

	$(".btntoys").click(function(e){
			e.preventDefault();
			var commitment,
				customcommitment,
				genere,
				email_parent,
				email,
				question1,
				answer1,
				level1,
				question2,
				answer2,
				level2,
				question3,
				answer3,
				level3,
				question4,
				answer4,
				level14;

			var strtoy = $(".toys_undefined input").val();
			var listcommatoy = [];
			var objtoys = {};
			listcommatoy = strtoy.split(',');

			unionToylist(listcommatoy)


			$(".toys_content").hide()
			$(".toys_undefined").hide();
			$(".loader").show();

			if(localStorage.getItem("question1")){
				question1 = localStorage.getItem("question1");
			}
		
			if(localStorage.getItem("answer1")){
				answer1 = localStorage.getItem("answer1");
			}

			if(localStorage.getItem("question2")){
				question2 = localStorage.getItem("question2");
			}
			
			if(localStorage.getItem("answer2")){
				answer2 = localStorage.getItem("answer2");
			}

			if(localStorage.getItem("question3")){
				question3 = localStorage.getItem("question3");
			}
			
			if(localStorage.getItem("answer3")){
				answer3 = localStorage.getItem("answer3");
			}

			if(localStorage.getItem("question4")){
				question4 = localStorage.getItem("question4");
			}
			
			if(localStorage.getItem("answer4")){
				answer4 = localStorage.getItem("answer4");
			}
			if(localStorage.getItem("commitment")){
				commitment = localStorage.getItem("commitment");
			}
			if(localStorage.getItem("customcommitment")){
				customcommitment = localStorage.getItem("customcommitment");
			}
			if(localStorage.getItem("genere")){
				genere = localStorage.getItem("genere");
			}
			if(localStorage.getItem("username")){
				username = localStorage.getItem("username");
			}
			if(localStorage.getItem("email")){
				email = localStorage.getItem("email");
			}else{
				email = "";
			}
			if(localStorage.getItem("email_parent")){
				email_parent = localStorage.getItem("email_parent");
			}

			if(localStorage.getItem("country")){
				country = localStorage.getItem("country");
			}
			if(localStorage.getItem("city")){
				city = localStorage.getItem("city");
			}

			data = {
				commitment : commitment,
				customcommitment : customcommitment,
				genere : genere,
				email_parent : email_parent,
				email : email,
				question1 : question1,
				answer1 : answer1,
				question2 : question2,
				answer2 : answer2,
				question3 : question3,
				answer3 : answer3,
				question4 : question4,
				answer4 : answer4,
				username : username,
				country : country,
				city : city
			}

			objtoys = {
				mytoys : window.toyList
			}

			$.ajax({
				type : "POST",
				url: "api/letter",
				data: JSON.stringify({letter: data, toys : objtoys}),
				dataType : "json",
				success : function(response){

					
					if(!response.success){
						
						//alert("vacio");
						$(".loader").hide();
						$(".warning-toy").show().delay(1000).fadeOut("fast",function(){
							$(".toys_content").show()
							$(".toys_undefined").show();
						});

					}else{
						var usernameletter = localStorage.getItem("username");

						$.ajax({
							type : "GET",
							url: "api/letter/"+usernameletter,
							dataType : "json",
							success : function(response){
								$(".loader").hide();
								//console.log(response)
								
								var $str = $(".text_letter p").text();

								$str = $str.replace('$name', response['letter'].username);
								$str = $str.replace('$ans1', response['letter'].answer1);
								if(response['letter'].answer2 === "SI")
									$str = $str.replace('$negativa2', "");
								else
									$str = $str.replace('$negativa2', "no");

								if(response['letter'].answer3 === "SI")
									$str = $str.replace('$negativa3', "");
								else
									$str = $str.replace('$negativa3', "no");

								$str = $str.replace('$compromiso', response['letter'].compromiso);

								$str = $str.replace('$customcompromiso', response['letter'].custom_compromiso);


								$(".text_letter p").text($str);

								var strlisttoy = "";

								$.each(response['toys'], function(k,v){
									strlisttoy +="<li>- "+v+"</li>";
								})

								var objletter = {};
								var emailparent = localStorage.getItem("email_parent");

								objletter = {
									data : {
										name : response['letter'].username,
										answer1 : response['letter'].answer1,
										answer2 : response['letter'].answer2,
										answer3 : response['letter'].answer3,
										compromiso : response['letter'].compromiso,
										custom_compromiso : response['letter'].custom_compromiso,
										email_parent : emailparent
									},

									toys : response['toys']
									
								}

								localStorage.setItem('dataletter' , JSON.stringify(objletter))

								$(".list_toys ul").append(strlisttoy);

								$("#toys").hide();

								$("#letter").show();
								
								
							}

						})
					}
					
					
					
				}
		});




	})

	
	$(".btnletter").click(function(e){
		e.preventDefault();

		$(".container_letter").css("top", "0.7em");
		$(".loaderfinal").show();
		$(".text_letter p").hide();
		$(".list_toys").hide();

		var data = JSON.parse(localStorage.getItem('dataletter'));

		$.ajax({
				type : "POST",
				url: "api/email-letter",
				data: JSON.stringify(data),
				dataType : "json",
				success : function(response){
					//console.log(response)
					if(response.success){
						$(".loaderfinal").hide()
						
						$(".message-letter p").text(response.message);
						$(".message-letter").show()
					}else{
						$(".loaderfinal").hide()
						$(".message-letter p").text(response.message);
						$(".message-letter").show()
					}

					window.removeStorage();
				}
		})
	})

	$(".btnletterimp").click(function(e){
		e.preventDefault();

		window.print();
	})

	$(".btncompromiso").click(function(e){
		e.preventDefault();

		var currentcommitment;
		var customcommitment;
		var email_parent;
		var email;
		var question1;
		var answer1;
		var level1;
		var question2;
		var answer2;
		var level2;
		var question3;
		var answer3;
		var level3;
		var question4;
		var answer4;
		var level14;
		var iduser;
		window.data = {};
		window.question_save = false;
		window.commit_save = false;

		$.each($("#compromisocontent").children(),function(c,v){
			if($(v).find('input[name=compromiso]').is(":checked")){
				currentcommitment = $(v).find('input[name=compromiso]:checked').val();	
				return false;	
			}
			
		})

		if($("#custom-commitment").val() != ""){
			customcommitment = $("#custom-commitment").val();
		}else{
			$(".content-custom-compromiso").hide();
			$("#compromisocontentmsg p").text("Debes colocar tu compromiso en el espacio en blanco");
			$("#compromisocontentmsg").show().delay(2000).fadeOut("fast",function(){
				$(".content-custom-compromiso").show();
			});
			
			return;
		}

		if($("#custom-commitment").val().length <= 105){
			customcommitment = $("#custom-commitment").val();
		}else{
			$(".content-custom-compromiso").hide();
			$("#compromisocontentmsg p").text("El texto debe ser menor a 105 caracteres");
			$("#compromisocontentmsg").show().delay(2000).fadeOut("fast",function(){
				$(".content-custom-compromiso").show();
			});
			
			return;
		}

		

		localStorage.setItem("customcommitment", customcommitment);

		localStorage.setItem("commitment", currentcommitment);

		$("#compromisocontent").hide();
		$(".content-custom-compromiso").hide();
		$(".loader-commit").show();

		if(localStorage.getItem("email_parent")){
			email_parent = localStorage.getItem("email_parent");
		}

		if(localStorage.getItem("email")){
			email = localStorage.getItem("email");
		}else{
			email = "";
		}
		if(localStorage.getItem("iduser")){
			iduser = localStorage.getItem("iduser");
		}

		if(localStorage.getItem("question1")){
			question1 = localStorage.getItem("question1");
		}
		if(localStorage.getItem("level1")){
			level1 = localStorage.getItem("level1");
		}
		if(localStorage.getItem("answer1")){
			answer1 = localStorage.getItem("answer1");
		}

		if(localStorage.getItem("question2")){
			question2 = localStorage.getItem("question2");
		}
		if(localStorage.getItem("level2")){
			level2 = localStorage.getItem("level2");
		}
		if(localStorage.getItem("answer2")){
			answer2 = localStorage.getItem("answer2");
		}

		if(localStorage.getItem("question3")){
			question3 = localStorage.getItem("question3");
		}
		if(localStorage.getItem("level3")){
			level3 = localStorage.getItem("level3");
		}
		if(localStorage.getItem("answer3")){
			answer3 = localStorage.getItem("answer3");
		}

		if(localStorage.getItem("question4")){
			question4 = localStorage.getItem("question4");
		}
		if(localStorage.getItem("level4")){
			level4 = localStorage.getItem("level4");
		}
		if(localStorage.getItem("answer4")){
			answer4 = localStorage.getItem("answer4");
		}

		data = {
			commitment_selected : currentcommitment,
			custom_commitment_selected : customcommitment,
			email_parent : email_parent,
			email : email
		}

		dataquestion = [
			{
				question : question1,
				level : level1,
				answer : answer1,
				email_parent : email_parent,
				email : email,
				iduser : iduser
			},
			{
				question : question2,
				level : level2,
				answer : answer2,
				email_parent : email_parent,
				email : email,
				iduser : iduser
			},
			{
				question : question3,
				level : level3,
				answer : answer3,
				email_parent : email_parent,
				email : email,
				iduser : iduser
			},
			{
				question : question4,
				level : level4,
				answer: answer4,
				email_parent : email_parent,
				email : email,
				iduser : iduser
			}
		]



		$.ajax({
				type : "POST",
				url: "api/questions",
				data: JSON.stringify({questions: dataquestion}),
				dataType : "json",
				success : function(response){
					//console.log(response)
					window.question_save = true;
					/*$("#compromiso").hide();
					$("#toys").show();*/

					
					
					
				}
		});

		$.ajax({
			type : "POST",
			url: "api/commitments",
			data: JSON.stringify({commitment: data}),
			dataType : "json",
			success : function(response){
				//console.log(response)
				window.commit_save = true;


				if(window.commit_save){
					$(".loader-commit").hide();
					$("#compromiso").hide();
					$("#toys").css("opacity","1");
					/*$(".infocontent").show().delay(2000).fadeOut("fast",function(){
						$("#compromiso").hide();
						$("#toys").css("opacity","1");
						//$("#toys").show();
					})*/

					
				}
				
				
			}
		});


		

		/*$.ajax({
				type : "POST",
				url: "api/commitments",
				data: JSON.stringify({commitment: data}),
				dataType : "json",
				success : function(response){
					console.log(response)
					window.commit_save = true;
					$("#compromiso").hide();
					$("#toys").show();
					
					
				}
		});*/

		
	})
})