 sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginExtensionProvider",
    "pkp/ext/ritsplugins/assemblyPointExtensionProvider/LifecycleExtension",
    "pkp/ext/ritsplugins/assemblyPointExtensionProvider/PluginEventExtension",
    "pkp/ext/ritsplugins/assemblyPointExtensionProvider/PropertyEditorExtension",
    "pkp/ext/ritsplugins/assemblyPointExtensionProvider/ExtensionUtilities",
    "pkp/ext/ritsplugins/utils/ExtensionUtilities"
], function (PluginExtensionProvider, LifecycleExtension, PluginEventExtension, 
             PropertyEditorExtension, ExtensionUtilities) {
    "use strict";
    return PluginExtensionProvider.extend("pkp.ext.ritsplugins.assemblyPointExtensionProvider.ExtensionProvider", {
        constructor: function () {
            this.oExtensionUtilities = new ExtensionUtilities();
        },
        getExtensions: function () {
           return [
               new LifecycleExtension(this.oExtensionUtilities),
               new PluginEventExtension(this.oExtensionUtilities),
               new PropertyEditorExtension(this.oExtensionUtilities)
           ];
        }
    })
});
