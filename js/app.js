var app=angular.module('dashboard_app',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/bloodsure');

	$stateProvider
		.state('bloodsure',{
			url: '/bloodsure',
			templateUrl: 'bloodsure.html',
			controller: 'bloodsure_controller'
		})

		.state('userprofile',{
			url: '/userprofile',
			templateUrl: 'userprofile.html',
			controller: 'userprofileController'
		})

		.state('history',{
			url: '/history',
			templateUrl: 'history.html',
			controller: 'historyController'
		})

		.state('hospital',{
			url: '/s',
			templateUrl: 'hospital.html',
			controller: 'hospitalController'
		})
});

app.controller('bloodsure_controller',function($scope,$http){
	$scope.data={};

	console.log("bloodsure_controller called");
	$scope.mysubmit=function(){
	/* code for payment gateway*/

		$http({
		method: 'POST',
		url: 'http://localhost:8080/dashboard/submit_patient_detail',
		data:{
			patient_name: $scope.data.patient_name,
			blood_grp: $scope.data.blood_grp,
			doctor_name: $scope.data.doctor_name,
			hospital: $scope.data.hospital,
			unit_of_blood: $scope.data.unit_of_blood,
			city: $scope.data.city,
			//cost: $scope.cost
		}
	}).then(function(response){
		
		console.log(response.data);
		alert("done");
	});
	}
});

app.controller('userprofileController',function($scope,$http,$state){
	console.log("userprofileController controller");

	console.log("getting details");

	$http({
		method: 'POST',
		url: 'http://localhost:8080/register/get_details',
		data:{
			user_email: 'sakshi781996@gmail.com'
		}
	}).then(function(response){
		$scope.show_data=response.data;
	})

	console.log("updating details");

	$scope.update_profile=function(){
		$scope.user_email='sakshi781996@gmail.com'
		$http({
			method: 'POST',
			url: 'http://localhost:8080/register/update_details',
			data:{
				user_name: $scope.user_name,
				user_email: $scope.user_email,
				user_blood_grp: $scope.user_blood_grp,
				user_mobile_no: $scope.user_mobile_no,
				user_dob: $scope.user_dob,
				user_gender: $scope.user_gender
			}
		}).then(function(response){
			console.log("user updated");
			console.log(response.data);
			$http({
				method: 'POST',
				url: 'http://localhost:8080/register/get_details',
				data:{
					user_email: 'sakshi781996@gmail.com'
				}
			}).then(function(response){
				$scope.show_data=response.data;
			})
		})
	}
})


app.controller('historyController',function($scope,$http){
	console.log("historyController called");
})

app.controller('hospitalController',function($scope,$http){
	console.log("hospitalController called");
})