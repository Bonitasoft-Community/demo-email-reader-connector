(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('pbTitle', function() {
    return {
      template: '<h1 ng-if="\'Level 1\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n<h2 ng-if="\'Level 2\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n<h3 ng-if="\'Level 3\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n<h4 ng-if="\'Level 4\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n<h5 ng-if="\'Level 5\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n<h6 ng-if="\'Level 6\' === properties.level" class="text-{{ properties.alignment }}" ng-bind-html="properties.text | uiTranslate"/>\n'
    };
  });
