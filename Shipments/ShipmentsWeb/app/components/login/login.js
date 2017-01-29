(function () {

    "use strict";

    angular.module("shipments.login", [ "auth0" ])
        .controller("loginController", loginController);

    function loginController($scope, auth, $location, store) {

        $scope.login = function () {
            auth.signin({
                authParams: {
                    scope: "openid offline_access"
                }
            },
                function (profile, token, state, access_token, refresh_token) {
                    store.set("profile", profile);
                    store.set("token", token);
                    store.set("refreshToken", refresh_token);
                    $location.path("/");
                },
                function (error) {
                    console.log("failed to sign in", error)
                });
        };
    }
})();