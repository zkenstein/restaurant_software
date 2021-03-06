(function (GroupView,
           GroupCollection
           ) {
  window.RS.Views.MenuView = Backbone.View.extend({

    tagName: "div",
    className: "wrap",
    template: JST['backbone/menu/main/templates/menu_template'],

    initialize: function() {
        this.groups_collection = new GroupCollection();
        this.groups_collection.on('reset', this.addAll, this);
        this.groups_collection.fetch();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    addOne: function(group) {
      var view = new GroupView({model: group, id: group.get("name")});
      $("ul#menu").append(view.render().el);
    },

    addAll: function() {
     this.groups_collection.each(this.addOne);
     return this;
    }

  });
})(
window.RS.Views.GroupView,
window.RS.Collections.GroupCollection
);
