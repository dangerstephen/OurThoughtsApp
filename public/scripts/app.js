console.log('yes i am connected');
var template;
var $thoughtsList;
var allThoughts = [];

function showDiv() {
   document.getElementById('eachThought-edit').style.display = "block";

}

$(document).ready(function() {

  // $(".btn").click(function(){
  //       $("#eachThought-edit").show();
  //   });
  //   $(".saveBtn").click(function(){
  //       $("#eachThought-edit").hide();
  //   });



    $thoughtsList = $('#thoughtTarget');

    var source = $('#thoughts-template').html();
    template = Handlebars.compile(source);

    $.ajax({
        method: 'GET',
        url: '/api/thoughts',
        success: handleSuccess,
        error: handleError
    });

    $('#newThought-form').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/thoughts',
        data: $(this).serialize(),
        success: newThoughtSuccess,
        error: newThoughtError
      });
    });

$thoughtsList.on('submit', '.form-edit-thought', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/api/thoughts/'+$(this).attr('data-id'),
      dataType: 'json',
      data: $(this).serialize(),
      success: updateThoughtSuccess,
      error: updateThoughtError
    });
  });

      $thoughtsList.on('click', '.deleteBtn', function() {
        console.log('clicked delete button to', '/api/thoughts/'+$(this).attr('data-id'));
        $.ajax({
          method: 'DELETE',
          url: '/api/thoughts/'+$(this).attr('data-id'),
          success: deleteThoughtSuccess,
          error: deleteThoughtError
        });
      });

    function render() {
        $thoughtsList.empty();

        var thoughtsHtml = template({
            thoughts: allThoughts
        });

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

    function updateThoughtSuccess(json) {
  $('.form-edit-thought');
  var thought = json;
  var thoughtId = thought._id;
  for (var i = 0; i < allThoughts.length; i++) {
    if (allThoughts[i]._id === thoughtId) {
       allThoughts[i] = thought;
       break;
     }
   }
  render();
};

function updateThoughtError(){
  console.log("i am the updte err");
}

    function deleteThoughtSuccess(json) {
        var thought = json;
        console.log(json);
        var thoughtId = thought._id;
        console.log('delete thought', thoughtId);
        for (var index = 0; index < allThoughts.length; index++) {
            if (allThoughts[index]._id === thoughtId) {
                allThoughts.splice(index, 1);
                break;
            }
        }
        render();
    }

    function deleteThoughtError() {
        console.log('deletethought error!');
    }



    //end document.ready
});
