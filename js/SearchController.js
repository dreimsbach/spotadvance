var SearchController = (function() {

  function SearchController(models) {
    var _searchController = this;
    _searchController._models = models;

    $("#searchbutton").on("click", function() {
      _searchController._search.call(_searchController);
    });
    
    $(document).keypress(function(e) {
      if(e.which == 13) {
        _searchController._search.call(_searchController);
      }
    });
  }

  SearchController.prototype._prepareRequest = function(event) {
    var searchString = "",        
        inputs = [];
    $("input").each(function() {
      inputs.push(new Input($(this)));
    });
     
    $.each(inputs, function() {
      if (this.isValid()) {
        if (!this.hideBrackets()) {
          searchString += " " + this.getKey() + ":\"" + this.getValue() + "\"";
        } else {
          searchString += " " + this.getKey() + ":" + this.getValue();
        }
      }
    }); 
  
    return searchString;
  };
  
  SearchController.prototype._search = function(event) {
    var searchString = this._prepareRequest(),
        spotifyModel = this._models,
        $container = $("#search-results"),
        search = new spotifyModel.Search(searchString);
    
    $container.empty();
    search.localResults = spotifyModel.LOCALSEARCHRESULTS.IGNORE;
    search.searchPlaylists = false;
    search.searchTracks = false;
    search.observe(spotifyModel.EVENT.CHANGE, function() {
      console.log(search);
      if(search.albums.length) {
        $.each(search.albums,function(index,album){
          $container.append('<div class="album"><a href="'+album.data.uri+'"><img src="'+ album.data.cover +'" /><div class="artistinfo">' + album.data.artist.name	 + ' </div><div class="albuminfo">' + album.data.name	 + ' </div></a></div>');
        });
       $container.append('<div class="clear"></div>');
      } else {
        $container.append('<div>No albums in results</div>');
      }
    });
    search.appendNext();
    
  };
  return SearchController;
})();

var Input = (function() {

  function Input($input) {
    this.$input = $input;
  }
  
  Input.prototype.isValid = function() {
    var value = this.$input.val()
    return value !== this.$input.attr("title") && value !== "";
  }
  
  Input.prototype.getValue = function() {
    return this.$input.val();
  }

  Input.prototype.getKey = function() {
    return this.$input.data("key");
  }
  
  Input.prototype.hideBrackets = function() {
    return this.$input.data("hidebrackets");
  }
  
  
  return Input;
})();
  

  
  
