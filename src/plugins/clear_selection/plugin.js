/**
 * Plugin: "clear_selection" (selectize.js)
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
	Displays a "Clear selection" button which as the name suggests, clears the
	selected option on click.
*/

Selectize.define('clear_selection', function ( options ) {
    var self = this;

    self.plugins.settings.dropdown_header = $.extend({
        title: 'Clear Selection'
    }, options);

    this.require('dropdown_header');

    self.setup = (function () {
        var original = self.setup;

        return function () {
            original.apply( this, arguments );
            this.$dropdown.on( 'mousedown', '.selectize-dropdown-header', function ( e ) {
                self.setValue( '' );
                self.close();
                self.blur();

                return false;
            });
        }
    })();
});
