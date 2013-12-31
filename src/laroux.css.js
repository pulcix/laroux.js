(function(laroux) {
    "use strict";

    // css
    laroux.css = {
        hasClass: function(element, className) {
            return element.classList.contains(className);
        },

        addClass: function(element, className) {
            element.classList.add(className);
        },

        removeClass: function(element, className) {
            element.classList.remove(className);
        },

        toggleClass: function(element, className) {
            if (element.classList.contains(className)) {
                element.classList.remove(className);
            } else {
                element.classList.add(className);
            }
        },

        getProperty: function(element, styleName) {
            var style = window.getComputedStyle(element);

            return style.getPropertyValue(styleName);
        },

        setProperty: function(element, styleName, value) {
            var elements = laroux.helpers.getAsArray(element);
            var newStyleName = laroux.helpers.camelCase(styleName);

            for (var i = elements.length - 1;i >= 0; i--) {
                elements[i].style[newStyleName] = value;
            }
        },

        setTransitions: function(element, transitions) {
            var elements = laroux.helpers.getAsArray(element);

            for (var styleName in transitions) {
                if (!transitions.hasOwnProperty(styleName)) {
                    continue;
                }

                var value = transitions[styleName];
                var newStyleName = laroux.helpers.camelCase(styleName);

                for (var i = elements.length - 1;i >= 0; i--) {
                    var style = window.getComputedStyle(elements[i]);
                    var currentTransitions = style.getPropertyValue('transition');

                    if (currentTransitions !== null) {
                        var currentTransitionsArray = currentTransitions.split(',');
                        for (var j = 0; j < currentTransitionsArray.length; j++) {
                            if (currentTransitionsArray[j].trim().localeCompare(styleName) === 0) {
                                delete currentTransitionsArray[j];
                            }
                        }

                        if (value !== null) {
                            elements[i].style.transition = currentTransitionsArray.join(', ') + ', ' + styleName + ' ' + value;
                        } else {
                            elements[i].style.transition = currentTransitionsArray.join(', ');
                        }
                    } else if (value !== null) {
                        elements[i].style.transition = styleName + ' ' + value;
                    }
                }
            }
        },

        transition: function(element, transitions, callback) {
            var elements = laroux.helpers.getAsArray(element);

            for (var styleName in transitions) {
                if (!transitions.hasOwnProperty(styleName)) {
                    continue;
                }

                var value = (transitions[styleName] instanceof Array) ? transitions[styleName] : [ transitions[styleName] ];
                if (typeof value[1] == 'undefined') {
                    value[1] = '2s ease';
                }

                var newStyleName = laroux.helpers.camelCase(styleName);

                for (var i = elements.length - 1;i >= 0; i--) {
                    var style = window.getComputedStyle(elements[i]);
                    var currentTransitions = style.getPropertyValue('transition');

                    if (currentTransitions !== null) {
                        var currentTransitionsArray = currentTransitions.split(',');
                        for (var j = 0; j < currentTransitionsArray.length; j++) {
                            if (currentTransitionsArray[j].trim().localeCompare(styleName) === 0) {
                                delete currentTransitionsArray[j];
                            }
                        }

                        if (value[1] !== null) {
                            elements[i].style.transition = currentTransitionsArray.join(', ') + ', ' + styleName + ' ' + value[1];
                        } else {
                            elements[i].style.transition = currentTransitionsArray.join(', ');
                        }
                    } else if (value[1] !== null) {
                        elements[i].style.transition = styleName + ' ' + value;
                    }

                    elements[i].style[newStyleName] = value[0];
                    laroux.dom.unsetEvent(elements[i], 'transitionend');
                    if (typeof callback != 'undefined') {
                        laroux.dom.setEvent(elements[i], 'transitionend', callback);
                    }
                }
            }
        }
    };

})(this.laroux);
