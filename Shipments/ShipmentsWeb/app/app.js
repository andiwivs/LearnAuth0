(function () {

    "use strict";

    angular.module("shipments", [
        "ngRoute",
        "auth0",
        "shipments.home",
        "shipments.login",
        "angular-storage",
        "angular-jwt"
    ])
        .config(function ($routeProvider, $locationProvider, authProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

            $routeProvider.when("/", {
                controller: "homeController",
                templateUrl: "app/components/home/home.html",
                requiresLogin: true
            });

            $routeProvider.when("/login", {
                controller: "loginController",
                templateUrl: "app/components/login/login.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });

            $locationProvider.hashPrefix(""); // remove "!" added in anglar 1.6

            authProvider.init({
                domain: AUTH0_DOMAIN,
                clientID: AUTH0_CLIENT_ID,
                loginUrl: "/login"
            });

            var refreshingToken = null;

            jwtInterceptorProvider.tokenGetter = function (store, jwtHelper) {

                var token = store.get("token");
                var refreshToken = store.get("refreshToken");

                if (token) {

                    if (!jwtHelper.isTokenExpired(token)) {
                        return token;
                    } else {

                        if (refreshingToken === null) {
                            refreshingToken = auth.refreshIdToken(refreshToken)
                                .then(
                                    function (idToken) {
                                        store.set("token", idToken);
                                        return idToken;
                                    })
                                .finally(
                                    function () {
                                        refreshingToken = null;
                                    }); 
                        }

                        return refreshingToken;
                    }
                }
            };

            jwtOptionsProvider.config({ whiteListedDomains: [ SERVICE_DOMAIN ] });

            $httpProvider.interceptors.push("jwtInterceptor");
        })
        .run(function ($rootScope, auth, store, jwtHelper, $location) {

            var refreshingToken = null;

            // resume auth session if held in storage
            $rootScope.$on("$locationChangeStart", function () {

                var token = store.get("token");
                var refreshToken = store.get("refreshToken");

                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        if (!auth.isAuthenticated) {
                            auth.authenticate(store.get("profile"), token);
                        }
                    } else {

                        if (refreshToken) {
                            if (refreshingToken === null) {
                                refreshingToken = auth.refreshIdToken(refreshToken)
                                    .then(
                                        function (idToken) {
                                            store.set("token", idToken);
                                            return idToken;
                                        })
                                    .finally(
                                        function () {
                                            refreshingToken = null;
                                        });
                            }

                            return refreshingToken;

                        } else {
                            $location.path("/login");
                        }
                    }
                }
            });

            auth.hookEvents();
        });

})();