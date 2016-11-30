// https://gist.github.com/kaveet/e129931f76300e3be3906660972327e0
/**
Transform a string to title case.
Usage:
{{ myString | titleCase }}
*/

angular
    .module('app.core')
    .filter('titleCase', TitleCase);

function TitleCase () {
	return function (str) {
		return str
	        .toLowerCase()
	        .split(' ')
	        .map(function(word) {
	            return word[0].toUpperCase() + word.substr(1);
	        })
	        .join(' ');
	};
}
