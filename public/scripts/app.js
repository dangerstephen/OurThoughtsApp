console.log('yes i am connected');

var template;
var $thoughtsList;
var allThoughts = [];

$(document).ready(function() {
    $thoughtsList = $('#thoughtTarget');

    //complie handlebars template
    var source = $('#thoughts-template').html();
    template = Handlebars.compile(source);

    $.ajax({
        method: 'GET',
        url: '/api/thoughts',
        success: handleSuccess,
        error: handleError
    });

    // $('#newThought-form').on('submit', function(e) {
    //   e.preventDefault();
    //   $.ajax({
    //     method: 'POST',
    //     url: '/api/thoughts',
    //     data: $(this).serialize(),
    //     success: newThoughtSuccess,
    //     error: newThoughtError
    //   });
    // });

    //   $thoughtsList.on('click', '.deleteBtn', function() {
    //     console.log('clicked delete button to', '/api/thoughts/'+$(this).attr('data-id'));
    //     $.ajax({
    //       method: 'DELETE',
    //       url: '/api/thoughts/'+$(this).attr('data-id'),
    //       success: deleteThoughtSuccess,
    //       error: deleteThoughtError
    //     });
    //   });
    //
    //

    // helper function to render all posts to view
    // note: we empty and re-render the collection each time our post data changes
    function render() {
        // empty existing posts from view
        $thoughtsList.empty();

        // pass `allThoughts` into the template function
        var thoughtsHtml = template({
            thoughts: allThoughts
        });

        // append html to the view
        $thoughtsList.append(thoughtsHtml);
    };

    function handleSuccess(json) {
        allThoughts = json;
        render();
    }

    function handleError(e) {
        console.log('uh oh');
        $('#thoughtTarget').text('Failed to load thoughts, is the server working?');
    }

    function newThoughtSuccess(json) {
        $('#newThought-form input').val('');
        allThoughts.push(json);
        render();
    }

    function newThoughtError() {
        console.log('newthought error!');
    }

    function deleteThoughtSuccess(json) {
        var thought = json;
        console.log(json);
        var thoughtId = thought._id;
        console.log('delete thought', thoughtId);
        // find the thought with the correct ID and remove it from our allThoughts array
        for (var index = 0; index < allThoughts.length; index++) {
            if (allThoughts[index]._id === thoughtId) {
                allThoughts.splice(index, 1);
                break; // we found our thought - no reason to keep searching (this is why we didn't use forEach)
            }
        }
        render();
    }

    function deleteThoughtError() {
        console.log('deletethought error!');
    }


    //end document.ready
});
