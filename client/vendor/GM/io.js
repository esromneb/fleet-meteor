gm.io={},gm.io.constants={OVERWRITE:0,APPEND:1,FAIL:2},gm.io._sanitizeFilename=function(a,b){gm.system._log("Original filename",a);var c=a.split("."),d=c.length-1;if(d>1)return!1;c.join(".");if(!b){var e=new RegExp("share/");return e.test(a)||(a="share/"+a),gm.system._log("Final filename",a),a}return a=gm.hmi.getUser()+"/"+a,gm.system._log("Final filename (private)",a),a},gm.io.readFile=function(){var a,b,c,d,e=!1,f=gm.system._getSig(arguments);if(gm.system._matchesSig(f,"ffso"))a=arguments[0],b=arguments[1],c=arguments[2],d=arguments[3];else if(gm.system._matchesSig(f,"fso"))a=arguments[0],b=gm.system._optionalMethod,c=arguments[1],d=arguments[2];else if(gm.system._matchesSig(f,"ffs"))a=arguments[0],b=arguments[1],c=arguments[2],d={};else if(gm.system._matchesSig(f,"sf"))c=arguments[0],a=arguments[1],b=gm.system._optionalMethod,d={};else if(gm.system._matchesSig(f,"so"))c=arguments[0],d=arguments[1],e=!0;else if(gm.system._matchesSig(f,"s"))c=arguments[0],d={},e=!0;else throw gm.system._EXCEPTIONS.INVALID_SIGNATURE;d.hasOwnProperty("isPrivate")||(d.isPrivate=!1),gm.system._log("filename to read",c);if(e)return gm.filesystem.readFile(c,d);if(!c){b();return}var g;try{g=gm.filesystem.readFile(c,d)}catch(h){b();return}a(g)},gm.io.writeFile=function(){var a,b,c,d,e,f=gm.system._getSig(arguments),g=!1;if(gm.system._matchesSig(f,"ffsso"))a=arguments[0],b=arguments[1],c=arguments[2],d=arguments[3],e=arguments[4];else if(gm.system._matchesSig(f,"ffss"))a=arguments[0],b=arguments[1],c=arguments[2],d=arguments[3],e={};else if(gm.system._matchesSig(f,"fsso"))a=arguments[0],b=gm.system._optionalMethod,c=arguments[1],d=arguments[2],e=arguments[3];else if(gm.system._matchesSig(f,"fss"))a=arguments[0],b=gm.system._optionalMethod,c=arguments[1],d=arguments[2],e={};else if(gm.system._matchesSig(f,"sso"))c=arguments[0],d=arguments[1],e=arguments[2],g=!0;else if(gm.system._matchesSig(f,"ssn"))c=arguments[0],d=arguments[1],e={overwrite:arguments[2]},g=!0;else if(gm.system._matchesSig(f,"ss"))c=arguments[0],d=arguments[1],e={},g=!0;else throw gm.system._EXCEPTIONS.INVALID_SIGNATURE;e.hasOwnProperty("isPrivate")||(e.isPrivate=!1),e.hasOwnProperty("overwrite")||(e.overwrite=gm.io.constants.OVERWRITE),gm.system._log("filename is: ",c);if(gm.system._API_VERSION>1){var h=gm.filesystem.writeFile(c,d,e.overwrite,{isPrivate:e.isPrivate});if(g)return h;a(h);return}if(!c){b();return}switch(e.overwrite){case gm.io.constants.APPEND:var i=gm.filesystem.readFile(c);i+=d;var h=gm.filesystem.writeFile(c,i);if(g)return h;if(h==0){a(h);return}b(h);return;case gm.io.constants.FAIL:gm.filesystem.getResource(function(d){if(d){if(g)return!1;b();return}var e=gm.filesystem.writeFile(c,i);if(e==0){if(g)return e;a(e);return}b(e);return},b,c);return;case gm.io.constants.OVERWRITE:var h=gm.filesystem.writeFile(c,d);if(h){if(g)return h;a(h);return}b(h);return;default:throw gm.system._EXCEPTIONS.INVALID_SIGNATURE}},gm.io.deleteFile=function(){var a,b,c,d,e=gm.system._getSig(arguments);if(gm.system._matchesSig(e,"so"))c=arguments[0],d=arguments[1];else if(gm.system._matchesSig(e,"s"))c=arguments[0],d={};else throw gm.system._EXCEPTIONS.INVALID_SIGNATURE;return d.hasOwnProperty("isPrivate")||(d.isPrivate=!1),gm.filesystem.deleteFile(c)},gm.io.writeBinaryFile=function(){if(typeof gm.filesystem.writeBinaryFile=="function"){var a,b,c,d,e,f=gm.system._getSig(arguments);if(gm.system._matchesSig(f,"sso"))c=arguments[0],d=arguments[1],e=arguments[2];else if(gm.system._matchesSig(f,"ss"))c=arguments[0],d=arguments[1],e={};else throw gm.system._EXCEPTIONS.INVALID_SIGNATURE;return gm.filesystem.writeBinaryFile(c,d,e,a,b)}throw gm.system._EXCEPTIONS.NOT_SUPPORTED},gm.io.getResource=function(){var a,b,c,d,e=gm.system._getSig(arguments);if(gm.system._matchesSig(e,"ffso"))a=arguments[0],b=arguments[1],c=arguments[2],d=arguments[3];else if(gm.system._matchesSig(e,"fso"))a=arguments[0],b=gm.system._optionalMethod,c=arguments[1],d=arguments[2];else if(gm.system._matchesSig(e,"ffs"))a=arguments[0],b=arguments[1],c=arguments[2],d={};else if(gm.system._matchesSig(e,"fs"))a=arguments[0],b=gm.system._optionalMethod,c=arguments[1],d={};else throw gm.system._EXCEPTIONS.INVALID_SIGNATURE;return gm.filesystem.getResource(a,b,c,d)}