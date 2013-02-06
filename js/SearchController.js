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
        $band = $("#band"),
        $track = $("#track"),
        $label = $("#label"),
        $year = $("#year");
    
    
    //TODO alls schöner
    if ($band.val() !== $band.attr("title") && $band.val() !== "") {
      searchString = searchString + " artist:\"" + $band.val() + "\"";
    }

    if ($track.val() !== $track.attr("title") && $track.val() !== "") {
      searchString = searchString + " track:\"" +$track.val() + "\"";
    }

    if ($label.val() !== $label.attr("title") && $label.val() !== "") {
      searchString = searchString + " label:\"" + $label.val() + "\"";
    }

    if ($year.val() !== $year.attr("title") && $year.val() !== "") {
      searchString = searchString + " year:" + $year.val();
    }    
    
    console.log(searchString);
  
  
    return searchString;
  };
  
  SearchController.prototype._search = function(event) {
    var searchString = this._prepareRequest(),
        spotifyModel = this._models,
        $container = $("#search-results"),
        search = new spotifyModel.Search(searchString);
    
    $container.empty();
    search.localResults = spotifyModel.LOCALSEARCHRESULTS.APPEND;		// Local files last
    search.observe(spotifyModel.EVENT.CHANGE, function() {
      console.log(search);
      if(search.albums.length) {
        $.each(search.albums,function(index,album){
          console.log(album);
          $container.append('<div class="album"><a href="'+album.data.uri+'"><img src="'+ album.data.cover +'" /></div>');
        });
      } else {
        $container.append('<div>No albums in results</div>');
      }
    });
    search.appendNext();
    
  };
  return SearchController;
})();
  

  
  
