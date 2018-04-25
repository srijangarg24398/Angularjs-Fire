'use strict';

angular.module('myApp.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {

	$scope.addContactForm={
		name:null,
		email:null,
		phone:null
	}

	$scope.editContactForm={}
	$scope.editId=undefined;

	$scope.addFormShow=true;
	
	console.log('Contacts Controller Loaded ...')
	// let url='https://sample-6969.firebaseio.com/';
	// var ref=new Firebase(url);
	// $scope.contacts=$firebaseArray(ref);
	var database = firebase.database();
	$scope.contacts=$firebaseArray(database.ref('contacts/'))

	$scope.addContact=function (){
		$scope.contacts.$add(
		    $scope.addContactForm
  		).then(function(res){
  			var id=res.key;
  			$scope.addContactForm={name:null,email:null,phone:null}
  		}).catch(function(err){
  			console.log(err)
  		});
	}

	$scope.removeContact = function(contact){
		$scope.contacts.$remove(contact)
		.then(function(res){
			console.log(res)
		})
	}

	$scope.showEditContactForm = function(contact){
		$scope.addFormShow=false;
		$scope.editId=contact.$id;
		$scope.editContactForm={
			name:contact.name,
			email:contact.email,
			phone:contact.phone
		}
	}

	$scope.editContact=function (){
		var id=$scope.editId;

		var record=$scope.contacts.$getRecord(id)
		record.name=$scope.editContactForm.name;
		record.email=$scope.editContactForm.email;
		record.phone=$scope.editContactForm.phone;
		$scope.contacts.$save(
		    record
  		).then(function(res){
  			console.log(res.key);
  		}).catch(function(err){
  			console.log(err)
  		});
	}
}]);