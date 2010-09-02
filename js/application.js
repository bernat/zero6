var currentpage = 'start'
$(document).ready(function() { 
  google.setOnLoadCallback(function() {newSlideShow("zero6_falegnameria")});
	initializeMaps();
	switcher();
	$("#browsable").scrollable().navigator();
});

	function switcher()
	{
		$(".switchpage").click(function() {
			$("#" + currentpage).hide();
		});
		$("#listart").click(function() {
			$("#start").delay(400).fadeIn("slow");
			currentpage = 'start';
		});
		$("#lichisiamo").click(function() {
			$("#chisiamo").fadeIn("slow");
			currentpage = 'chisiamo';
		});
		$("#lidovesiamo").click(function() {
			$("#dovesiamo").delay(400).fadeIn("slow");
			currentpage = 'dovesiamo';
			$("#dovesiamo").removeClass('nondefault');
		});
		$("#lirealizzazioni").click(function() {
			$("#realizzazioni").delay(400).fadeIn("slow");
			currentpage = 'realizzazioni';
			$("#realizzazioni").removeClass('nondefault');			
		});
		$("#licontatti").click(function() {
			$("#contatti").delay(400).fadeIn();
			currentpage = 'contatti';
		});
	}

  function showStatus(msg) {
     var ss = document.getElementById("slideshow");
     ss.innerHTML = '<div class=\"feed-loading\">' + msg + '</div>';
   }

   function ssFeedLoadedCallback(result) {
     if (result.error || result.feed.entries.length <= 0) {
       // Stop the slideshow..
       result.error = true;
     }
   }

   function showSlideShow(url) {
     var options = {
         displayTime: 2500,
         transistionTime: 800,
         scaleImages: true,
         thumbnailTag: 'content',
         pauseOnHover: false,
    		transitionCallback : showTitle,
				linkTarget : google.feeds.LINK_TARGET_BLANK,
         feedLoadCallback: ssFeedLoadedCallback
     };
     new GFslideShow(url, "slideshow", options);
   }

 	function showTitle(entry, transitionTime) {
    	$("#imageTitleSpan").hide().html(entry.title).fadeIn("slow");
 	 }

   function newSlideShow(user) {
     var url = 'http://www.flickr.com/photos/' + user;
     google.feeds.lookupFeed(url, lookupDone);
   }

   function lookupDone(result) {
     if (!result.error && result.url != null) {
       // We need to switch over atom to RSS to get Yahoo Media..
       var url = result.url.replace('format=atom', 'format=rss_200');
       showSlideShow(url);
     }
   }

	function initializeMaps() 
	{
		if (GBrowserIsCompatible()) 
		{
			var map = new GMap2(document.getElementById("mapa"));
			map.setCenter(new GLatLng(45.52110, 10.819049), 9);

			var point = new GLatLng(45.52110, 10.819049);
			map.addOverlay(new GMarker(point));

			var direccio = "<b>Zero6</b> di Bellamoli Claudio & C. s.n.c. <br/>";
			direccio+="Via A. De Gasperi  n° 54 - Domegliara<br/>";
			direccio+="37015 Sant’ Ambrogio di Valpolicella<br/>";
			direccio+="Verona – Italy";
			map.openInfoWindowHtml(map.getCenter(), direccio);
		}
	}