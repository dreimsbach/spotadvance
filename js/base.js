var com = com || {}
com.dreimsbach = com.dreimsbach || {};

com.dreimsbach.SpotAdvance = (function() {
  // Initialize the Spotify objects
  var sp = getSpotifyApi(),
      models = sp.require("sp://import/scripts/api/models");
      
  $(document).on("ready", function(){
    new SearchController(models);
    
    $("input").each(function() {
      var _this = $(this);
      $(_this).val(_this.attr("title"));
      
      _this.on("focus", function() {
        var _this = $(this);
        if (_this.val() === _this.attr("title")) {
          _this.val("");
        }
      });
      
      _this.on("blur", function() {
        var _this = $(this);
        if (_this.val() === "") {
          _this.val(_this.attr("title"));
        }
      });
    });
  });
})();