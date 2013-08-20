var tabs_directive = angular.module('uiTabs', []);

tabs_directive.directive('tabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope, $rootScope, $location) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			}

			this.addPane = function(pane) {
				if (panes.length == 0) $scope.select(pane);
				panes.push(pane);
			}

            $rootScope.$on('$routeChangeSuccess', function () {

                var path = $location.path().substr(1); // Remove beginning /
                var pane;
                angular.forEach(panes, function(pos_pane) {
                    if(pos_pane.title === path) {
                        pane = pos_pane;
                    }
                });

                $scope.select(pane);
            });
		},
		template:
			'<div class="tabbable">' +
			'<ul class="nav nav-tabs">' +
			'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
			'<a href="#/{{pane.title}}" ng-click="select(pane)">{{pane.title}}</a>' +
			'</li>' +
			'</ul>' +
			'<div class="tab-content" ng-transclude></div>' +
			'</div>',
			replace: true
	};
}).
directive('pane', function() {
	return {
		require: '^tabs',
		restrict: 'E',
		transclude: true,
		scope: { title: '@' },
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		template:
			'<div class="tab-pane" ng-class="{active: selected}">' +
			'</div>',
	    replace: true
	};
});
