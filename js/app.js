FB.init({
appId : '279964725519516'
});

$(function(){
	var cardapio=[];
	$.ajax({
			url : "js/cardapio.csv",
			success : function(result){
				cardapio = $.csv.toObjects(result);
				onReady();
			}
		});
	
	function onReady(){
		var data = new Date();
		var cardapioCompleto="";
		var produto;
		for (i=0; i < cardapio.length; i++){
			if(data.getDate() <= cardapio[i].DATA.substr(0,2)){
				cardapioCompleto = cardapioCompleto + "<li class='ui-first-child'><a href='#dialog' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><span class='ltDia'>"+
														cardapio[i].DIA_SEMANA+"  </span><span class='ltData'>"+cardapio[i].DATA+"  </span><br><h1 class='ltProduto'>"+
															cardapio[i].PRODUTO+"</h1></a></li>";
				
			}
			
		}
		$("#ltCardapio").html(cardapioCompleto);
		
		$('#ulCardapio').on("click","li", function(){
		var word = $(this).first().text();
		word = word.split("  ");
		var dia="";
		if (data.getDate() == word[1].substr(0,2)){
			dia = "Hoje";
		} else {
			if (data.getDate()+1 == word[1].substr(0,2)){
				dia = "Amanhã";
			} else {
				if (data.getDate()+2 == word[1].substr(0,2)){
					dia = "Depois de Amanhã"
				} else {
					dia = "Dia "+word[1];
				}
			}
		}		
		$('#msgQuando').html(dia+" teremos: <br><span class='ltProduto' style='margin-bottom:-15px; border-top: none;'>"+word[2]+".</span>");
		var i=0;
		do {
			if (word[2]==cardapio[i].PRODUTO){
				break;
			} else {
				i++;
			}
			
		} while (i < cardapio.length)
		$('#valoresTb').html("<tr><th>Lipídios/100g: </th><td>"+cardapio[i].LIPIDIOS+", "
								+"</td></tr><tr><th>Carboidratos/100g: </th><td>"+cardapio[i].CARBOIDRATOS+", "
								+"</td></tr><tr><th>Proteinas/100g: </th><td>"+cardapio[i].PROTEINAS+", "
								+"</td></tr><tr><th>Calorias/100g: </th><td>"+cardapio[i].KCAL+"."
								+"</td></tr>")
		});
		
		$('#shareonfacebook').click(function (e) {
			 e.preventDefault();
			 FB.ui({
				 method: 'feed',
				 name: 'Cardápio Escolar',
				 link: 'https://play.google.com/store/apps/details?id=com.diegobonfim.cardapio_escolar',
				 caption: $('#msgQuando').text()+' O que você acha?',
				 description: $('#valoresTb').text(),
				 message: ''
			 });
		});
	}
	
	
});