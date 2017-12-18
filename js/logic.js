
function addanimal(animal) {
    $("#buttons").append("<button class='addanimal' data-animal='" + animal + "'>" + animal + "</button>")
}


$(function () {
    i = 1;
    $("#add-animal").submit(function (e) {
        e.preventDefault();

        var animal = $("#user-input").val();

        addanimal(animal);
        $("#user-input").val("");
    });

    $(document).on('click', '.addanimal', function () { // bind event to dynamic elements
        $("#gifs").html("");
        var animal = $(this).attr("data-animal");

        var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + animal;

        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            var data = response.data;
            console.log(data);
            for (var key in data) {

                var still = data[key].images.original_still.url;
                var animated = data[key].images.original.url;
                var rating = data[key].rating;
                var html = "<div class='animal'><div class='rating'>Rating: " + rating + "</div><img class='gif' src='" + still + "' data-state='still' data-still='" + still + "' data-animated='" + animated + "' /></div>"


                $("#gifs").append(html);

                if (i % 3 == 0) {
                    $("#gifs").append("<br style='clear:both' />");
                }
                i++;
            }
        });

    });
    $(document).on('click', '.gif', function () { // bind event to dynamic elements
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animated = $(this).attr("data-animated");

        if (state == "still") {
            $(this).attr("data-state", "animated");
            $(this).attr("src", animated);
        }
        if (state == "animated") {
            $(this).attr("data-state", "still");
            $(this).attr("src", still);
        }

    });

});