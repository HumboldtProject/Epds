jQuery.noConflict();
   
 jQuery(function() {
	// su tablet e mobile il libro non si sfoglia: le pagine sono una sotto l'altra
	if (window.matchMedia("(max-width: 1024px)").matches) {
		return;
	}

	jQuery('#mybook').booklet({
		manual: true,
     arrows: true,
          width: 700,
        height: 500,
      
       
   
       
	});
});




function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";

  // su tablet e mobile la scheda è sotto il libro: ci porto l'utente
  if (window.matchMedia("(max-width: 1024px)").matches) {
    document.getElementById(cityName).scrollIntoView({ behavior: 'smooth' });
  }




}




