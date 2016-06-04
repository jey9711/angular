'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	var ref = new Firebase('https://mycontacts-jerry.firebaseio.com/contacts');

	$scope.contacts = $firebaseArray(ref);
	//console.log($scope.contacts);

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	$scope.showEditForm = function(contact){
		$scope.editFormShow = true;
		console.log($scope.editFormShow);

		$scope.id				= contact.$id;
		$scope.name 			= contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
		$scope.work_phone 		= contact.phones[0].work;
		$scope.home_phone 		= contact.phones[0].home;
		$scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zipcode 			= contact.address[0].zipcode;

	}

	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	$scope.addFormSubmit = function(){
		 console.log('Adding Contact');
	
		 if($scope.name){var name = $scope.name;}else{var name = "";}
		 if($scope.email){var email = $scope.email;}else{var email = "";}
		 if($scope.company){var company = $scope.company;}else{var company = "";}
		 if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone;}else{var mobile_phone = "";}
		 if($scope.home_phone){var home_phone = $scope.home_phone;}else{var home_phone = "";}
		 if($scope.work_phone){var work_phone = $scope.work_phone;}else{var work_phone = "";}
		 if($scope.street_address){var street_address = $scope.street_address;}else{var street_address = "";}
		 if($scope.city){var city = $scope.city;}else{var city = "";}
		 if($scope.state){var state = $scope.state;}else{var state = "";}
		 if($scope.zipcode){var zipcode = $scope.zipcode;}else{var zipcode = "";}


		 $scope.contacts.$add({
		 	name: name,
		 	email: email,
		 	company: company,
		 	phones: [
		 		{
		 			mobile: mobile_phone,
		 			home: home_phone,
		 			work: work_phone
		 		}
		 	],
		 	address: [
		 		{
		 			street_address: street_address,
		 			city: city,
		 			state: state,
		 			zipcode: zipcode
		 		}
		 	]
		 }).then(function(ref){
		 	var id = ref.key();
		 	console.log('added Contact with ID: ' + id);
		 
		 	clearFields();

		 	$scope.addFormShow = false;

		 	$scope.msg = "Contact Added!";
		 });

	}

	$scope.editFormSubmit = function(){
		console.log('Updating Contact...');

		// Get ID
		var id = $scope.id;

		// Get Record
		var record = $scope.contacts.$getRecord(id);

		// Assign Values
		record.name 						= $scope.name;
		record.email 						= $scope.email;
		record.company 						= $scope.company;
		record.phones[0].work 				= $scope.work_phone;
		record.phones[0].home 				= $scope.home_phone;
		record.phones[0].mobile 			= $scope.mobile_phone;
		record.address[0].street_address 	= $scope.street_address;
		record.address[0].city 				= $scope.city;
		record.address[0].state 			= $scope.state;
		record.address[0].zipcode 			= $scope.zipcode;

		// Save Conrtact
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		clearFields();

		// Hide Form
		$scope.editFormShow = false;

		$scope.msg = "Contact Updated";
	}

	$scope.showContact = function(contact){
		console.log('Getting Contact...');

		$scope.name = contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
		$scope.work_phone 		= contact.phones[0].work;
		$scope.home_phone 		= contact.phones[0].home;
		$scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zipcode 			= contact.address[0].zipcode;

		$scope.contactShow = true;
	}



	$scope.showContact = function(contact){
		$scope.name 			= contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
		$scope.work_phone 		= contact.phones[0].work;
		$scope.home_phone 		= contact.phones[0].home;
		$scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zipcode 			= contact.address[0].zipcode;
	
		$scope.contactShow = true;
	}

	$scope.removeContact = function(contact){
		console.log('Removing Contact');

		$scope.contacts.$remove(contact);

		$scope.msg = "Contact Removed!";
	}


	var clearFields = function(){
		console.log("Clearing All Fields");

		$scope.name = "";
		$scope.email = "";
		$scope.company = "";
		$scope.mobile_phone = "";
		$scope.home_phone = "";
		$scope.work_phone = "";
		$scope.street_address = "";
		$scope.city = "";
		$scope.state = "";
		$scope.zipcode = "";
	}

}]);