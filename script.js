javascript:(function() {
  var el = document.createElement('div'),
      b = document.getElementsByTagName('body')[0],
      libs = [];

  applyStyles( el, {
      position: 'fixed',
      height: '50px',
      width: '300px',
      marginLeft: '-110px',
      top: '0',
      left: '50%',
      padding: '5px 10px',
      fontSize: '12px',
      color: '#222',
      backgroundColor: '#f99',
      zIndex: 1001
  });

  whichJS(libs);
  showMsg(libs);

  function showMsg(libs) {
    var msg;
    if (libs.length === 0) {
      msg = 'No known JS library is found! Maybe WhichJS does not yet know about this JS library.';
    } else {
      msg = 'Following JS Libraries are used: ';
      libs.forEach(function(libName) {
        msg += (libName + ', ');
      })
    }
    el.innerHTML= msg;
    b.appendChild(el);
    window.setTimeout(function() {
      b.removeChild(el);
    } ,3500);
  }

  function applyStyles(elem, styles ){
      for (var prop in styles) {
          elem.style[prop] = styles[prop];
      }
  }

  function whichJS(libs) {
    if (typeof jQuery === 'function') {
      libs.push('jQuery' +  jQuery.fn.jquery);
      if (typeof jQuery.ui === 'object') {
        libs.push('jQueryUI' +  jQuery.ui.version);
      }
    }

    if (typeof Ext === 'object') {
      var ext;
      if (typeof Ext.version === 'string') {
        //Extjs 3.x or Sencha Touch 1.x
        if (typeof Ext.grid === 'object') ext = 'ExtJS' + Ext.version;
        else ext = 'Sencha Touch' + Ext.version;
      } else if (typeof Ext.versions === 'object') {
        //Extjs 4.x or Sencha Touch 2.x
        if (Ext.versions.touch) ext = 'Sencha Touch' + Ext.versions.touch.version;
        else ext = 'ExtJS' + Ext.versions.extjs.version;
      }
      libs.push(ext);
    }

    if (typeof MooTools === 'object') {
      libs.push('MooTools' +  MooTools.version);
      if (typeof MooTools.More === 'object') {
        libs.push('MoolTools More' +  MooTools.More.version);
      }
    }

    if (typeof angular === 'object') {
      var v = angular.version ? angular.version.full : '';
      libs.push('AngularJS' + v);
    }

    if (typeof ko === 'object') {
      libs.push('KnockOutJS');
    }

    if (typeof Backbone === 'object') {
      libs.push('BackboneJS' + Backbone.VERSION);
    }
  }
})();