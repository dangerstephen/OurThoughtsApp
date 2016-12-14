angular
  .module('ourThoughts')
  .controller('indexController', indexController);

indexController.$inject = ['$http'];

function indexController ($http) {
  var vm = this;
  
  vm.newThought = {};
  vm.newThought = {
    description: "This is my newThought description",
    category: "Just a test category"
  };

  $http({
    method: 'GET',
    url: '/api/thoughts'
  }).then(function successCallback(response) {
    vm.thought = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createThought = function () {
    $http({
      method: 'POST',
      url: '/api/thoughts',
      data: vm.newThought,
    }).then(function successCallback(response) {
      vm.thoughts.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editThought = function (thought) {
    $http({
      method: 'PUT',
      url: '/api/thoughts/'+thought._id,
      data: thought
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteThought = function (thought) {
    $http({
      method: 'DELETE',
      url: '/api/thoughts/'+ thought._id
    }).then(function successCallback(json) {
      var index = vm.thoughts.indexOf(thought);
      vm.thoughts.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

}
