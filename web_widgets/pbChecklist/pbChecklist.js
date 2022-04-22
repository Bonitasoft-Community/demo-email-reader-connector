(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('pbChecklist', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbChecklistCtrl($scope, $parse, widgetNameFactory, $log) {

  'use strict';
  var ctrl = this;

  /**
   * Watch the data source and set wrapChoices and $scope.properties.selectedValues
   */
  function comparator(item, initialValue) {
    return angular.equals(item, initialValue);
  }

  function createGetter(accessor) {
    return accessor && $parse(accessor);
  }

  this.getLabel = createGetter($scope.properties.displayedKey) || function (item) {
      return typeof item === 'string' ? item : JSON.stringify(item);
    };

  this.getValue = createGetter($scope.properties.returnedKey) || function (item) {
      return item;
    };


  /**
   * update the scope.properties.selectedValues with the selected items
   */
  this.updateValues = function () {
    $scope.properties.selectedValues = ctrl.selectedItems
      .map(function (checked, index) {
        if (checked !== true) {
          return false;
        }
        var item = $scope.properties.availableValues[index];
        return ctrl.getValue(item);
      }).filter(function (item) {
        return item !== false;
      });
  };

  function updateSelectedValues() {
    ctrl.selectedItems = ($scope.properties.availableValues || []).map(function (item) {
      if (Array.isArray($scope.properties.selectedValues)) {
        return $scope.properties.selectedValues.some(comparator.bind(null, ctrl.getValue(item)));
      }
      return false;
    });
  }

  $scope.$watchCollection('properties.availableValues', updateSelectedValues);
  $scope.$watchCollection('properties.selectedValues', updateSelectedValues);

  this.name = widgetNameFactory.getName('pbChecklist');

  if (!$scope.properties.isBound('selectedValues')) {
    $log.error('the pbCheckList property named "selectedValues" need to be bound to a variable');
  }
}
,
      template: '<div class="row form-group" ng-class="{ \'form-horizontal\':  !properties.labelHidden && properties.labelPosition === \'left\' }">\n    <label\n            ng-if="!properties.labelHidden"\n            class="control-label col-xs-{{ !properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 12 }}"\n            ng-bind-html="properties.label | uiTranslate">\n    </label>\n\n    <div ng-if="properties.inline" class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 0) }}">\n        <label class="checkbox-inline" ng-repeat="choice in properties.availableValues track by $index">\n            <input\n                    type="checkbox"\n                    name="{{ctrl.name}}"\n                    ng-model="ctrl.selectedItems[$index]"\n                    ng-change="ctrl.updateValues()"\n                    ng-disabled="properties.disabled">\n            {{ (ctrl.getLabel(choice) || choice) | uiTranslate }}\n        </label>\n    </div>\n\n    <div ng-if="!properties.inline" class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 0) }}">\n        <div ng-if="!properties.inline" class="checkbox checklist-margin" ng-repeat="choice in properties.availableValues track by $index">\n            <label>\n                <input\n                        type="checkbox"\n                        name="{{ctrl.name}}"\n                        ng-model="ctrl.selectedItems[$index]"\n                        ng-change="ctrl.updateValues()"\n                        ng-disabled="properties.disabled">\n                {{ (ctrl.getLabel(choice) || choice) | uiTranslate }}\n            </label>\n        </div>\n    </div>\n</div>\n'
    };
  });
