/**
 * Plugin: "enhanced_control_input" (selectize.js)
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
	When a selectize element is inside a dropdown (In our case Advanced Search Form)
	pressing the ESC should hide selectize & the next ESC keypress should hide the
	form. This is a prerequisite in acheiving that.
*/

Selectize.define( 'enhanced_control_input', function ( options ) {
    var self = this;

    self.setup = (function () {
        var original = self.setup;

        return function () {
            original.apply( this, arguments );
            this.$control_input.addClass( 'selectize-control-input' );
            this.$control_input.data( 'selectize_instance', this );
        }
    })();
});
