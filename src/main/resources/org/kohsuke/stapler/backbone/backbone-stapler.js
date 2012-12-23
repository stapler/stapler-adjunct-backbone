// Stapler<->Backbone glue code

Backbone.Stapler = {
    /*
      Creates a function that calls the server-side method
      annotated with @JavaScriptMethod asynchronously.
     */
    makeJavaScriptProxyCall: function(name) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            var model = this;

            var options = args.pop();
            if (typeof(options)=="function")
              options = {success:options};
            else
              options = options ? _.clone(options) : {};

            var success = options.success;

            options = _.extend({
                success : function(retVal) {
                  model.trigger(name, retVal, model, options);
                  if (success) success(retVal, model, options);
                },
                url : model.url()+name,
                type: "POST",
                contentType: "application/x-stapler-method-invocation",
                headers: {"Crumb":crumb},
                data: JSON.stringify(args)
            });
            return Backbone.ajax(options);
        }
    },

    model: function(def) {
        return Backbone.Model.extend(_.extend({
            // in Stapler every resource is like a directory, so it needs '/' in the end
            url: function() { return Backbone.Model.prototype.url.apply(this)+'/';}
        },def))
    }
};
