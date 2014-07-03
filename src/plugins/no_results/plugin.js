/**
 * Plugin: "no_results" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Mudassir <mudassir@aplopio.com>
 */

/*
    https://github.com/brianreavis/selectize.js/issues/470
    Selectize doesn't display anything to let the user know there are no results.
    This is a temporary patch to display a no results option when there are no
    options to select for the user.
*/

Selectize.define( 'no_results', function( options ) {
    var self = this;

    options = $.extend({
        message: 'No results found.',

        html: function(data) {
            return (
                '<div class="selectize-dropdown ' + data.classNames + ' dropdown-empty-message">' +
                    '<div class="selectize-dropdown-content">' + data.message + '</div>' +
                '</div>'
            );
        }
    }, options );

    self.displayEmptyResultsMessage = function () {
        this.$empty_results_container.css( 'top', this.$control.outerHeight() );
        this.$empty_results_container.show();
    };

    self.refreshOptions = (function () {
        var original = self.refreshOptions;

        return function () {
            original.apply( self, arguments );
            this.hasOptions ? this.$empty_results_container.hide() :
                this.displayEmptyResultsMessage();
        }
    })();

    self.onKeyDown = (function () {
        var original = self.onKeyDown;

        return function ( e ) {
            original.apply( self, arguments );
            if ( e.keyCode === 27 ) {
                this.$empty_results_container.hide();
            }
        }
    })();

    self.onBlur = (function () {
        var original = self.onBlur;

        return function () {
            original.apply( self, arguments );
            this.$empty_results_container.hide();
        };
    })();

    self.setup = (function() {
        var original = self.setup;
        return function() {
            original.apply(self, arguments);
            self.$empty_results_container = $( options.html( $.extend( {
                classNames: self.$input.attr( 'class' ) }, options ) ) );
            self.$empty_results_container.insertBefore( self.$dropdown );
            self.$empty_results_container.hide();
        };
    })();
});
