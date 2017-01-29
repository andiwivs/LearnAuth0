(function () {

    "use strict";

    angular.module("shipments.home", [ "auth0" ])
        .controller("homeController", homeController);

    function homeController($scope, auth, $location, $http, store) {

        $scope.shipments = [];
        $scope.auth = auth;

        $scope.logout = function () {
            auth.signout();
            store.remove("profile");
            store.remove("token");
            store.remove("refreshToken");
            $location.path("/login");
        };
        
        $scope.viewShipments = function() {
            $http({
                url: SERVICE_BASE + "/api/shipments",
                method: "Get"
            })
            .then(
                function (response) {
                    $scope.shipments = response.data;
                },
                function (error) {
                    alert("Failed to get shipment data");
                    console.log(error);
                });
        }
    }
})();