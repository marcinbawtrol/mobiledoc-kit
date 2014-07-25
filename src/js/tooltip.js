function Tooltip(options) {
  var tooltip = this;
  var rootElement = options.rootElement;
  var delay = options.delay || 200;
  var timeout;
  options.classNames = ['ck-tooltip'];
  View.call(tooltip, options);

  rootElement.addEventListener('mouseover', function(e) {
    var target = getEventTargetMatchingTag(options.showForTag, e.target, rootElement);
    if (target) {
      timeout = setTimeout(function() {
        tooltip.showLink(target.href, target);
      }, delay);
    }
  });
  
  rootElement.addEventListener('mouseout', function(e) {
    clearTimeout(timeout);
    var toElement = e.toElement || e.relatedTarget;
    if (toElement && toElement.className !== tooltip.element.className) {
      tooltip.hide();
    }
  });
}
inherits(Tooltip, View);

Tooltip.prototype.showMessage = function(message, element) {
  var tooltip = this;
  var tooltipElement = tooltip.element;
  tooltipElement.innerHTML = message;
  tooltip.show();
  positionElementCenteredBelow(tooltipElement, element);
};

Tooltip.prototype.showLink = function(link, element) {
  var message = '<a href="' + link + '" target="_blank">' + link + '</a>';
  this.showMessage(message, element);
};
